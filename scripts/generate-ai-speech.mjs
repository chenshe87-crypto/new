#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'assets/audio/nce1-ai');
const manifestPath = path.join(rootDir, 'ai-speech-manifest.js');
const dashScopeEndpoints = {
    qwen: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
    cosyvoice: 'https://dashscope.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer'
};

const args = new Map(
    process.argv.slice(2).map(arg => {
        const [key, ...rest] = arg.replace(/^--/, '').split('=');
        return [key, rest.length ? rest.join('=') : 'true'];
    })
);

const engine = (args.get('engine') || 'qwen').toLowerCase();
const engineDefaults = {
    qwen: {
        model: 'qwen3-tts-instruct-flash',
        voice: 'Cherry',
        language: 'English',
        format: 'wav'
    },
    cosyvoice: {
        model: 'cosyvoice-v3-flash',
        voice: 'loongabby_v3',
        language: 'en',
        format: 'mp3',
        sampleRate: 24000
    }
};

if (!engineDefaults[engine]) {
    console.error('Please pass --engine=cosyvoice or --engine=qwen.');
    process.exit(1);
}

const defaults = engineDefaults[engine];
const model = args.get('model') || defaults.model;
const voice = args.get('voice') || defaults.voice;
const languageType = args.get('language') || defaults.language;
const audioFormat = args.get('format') || defaults.format;
const extension = args.get('extension') || audioFormat;
const sampleRate = Number(args.get('sample-rate') || defaults.sampleRate || 24000);
const normalRate = Number(args.get('normal-rate') || 1);
const slowRate = Number(args.get('slow-rate') || 0.75);
const generateSlow = args.get('generate-slow') === 'true';
const instruction = args.get('instruction') || '';
const overwrite = args.get('overwrite') === 'true';
const quietSkip = args.get('quiet-skip') === 'true';
const delayMs = Number(args.get('delay-ms') || 300);
const retries = Number(args.get('retries') || 2);
const requestTimeoutMs = Number(args.get('request-timeout-ms') || 90000);
const maxSentences = Number(args.get('max-sentences') || 0);
const manifestOnly = args.get('manifest-only') === 'true';
const bookId = Number(args.get('book') || 1);
const allEven = args.get('all-even') === 'true';
const lessonNumbers = (args.get('lessons') || '')
    .split(',')
    .map(value => Number(value.trim()))
    .filter(Number.isFinite);

if (!allEven && lessonNumbers.length === 0) {
    console.error('Please pass --lessons=2,4 or --all-even.');
    process.exit(1);
}

const apiKey = process.env.DASHSCOPE_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey && !manifestOnly) {
    console.error('DASHSCOPE_API_KEY is required to generate speech files.');
    process.exit(1);
}

const speechVariants = generateSlow ? ['normal', 'slow'] : ['normal'];

function pad(num, size = 3) {
    return String(num).padStart(size, '0');
}

async function loadLessons() {
    const dataCode = await fs.readFile(path.join(rootDir, 'data.js'), 'utf8');
    const sandbox = {
        localStorage: {
            getItem() { return null; },
            setItem() {},
            removeItem() {}
        },
        console
    };
    vm.createContext(sandbox);
    vm.runInContext(dataCode + '\nthis.__lessons = lessons;', sandbox);
    return sandbox.__lessons;
}

function getTargetLessons(lessons) {
    return lessons
        .filter(lesson => lesson.bookId === bookId)
        .filter(lesson => lesson.lessonNumber % 2 === 0)
        .filter(lesson => allEven || lessonNumbers.includes(lesson.lessonNumber))
        .sort((a, b) => a.lessonNumber - b.lessonNumber);
}

function getInstructions(variant) {
    if (variant === 'slow') {
        return [
            'Read only the sentence in clear American English.',
            'Use a warm English teacher voice with natural emotion.',
            'Speak slowly, about half of normal classroom speed, and pronounce every word carefully.',
            'Do not add explanations, translations, titles, or extra words.'
        ].join(' ');
    }

    return [
        'Read only the sentence in clear American English.',
        'Use a warm English teacher voice with natural emotion.',
        'Keep a natural classroom pace and expressive but not dramatic intonation.',
        'Do not add explanations, translations, titles, or extra words.'
    ].join(' ');
}

function shouldUseInstructionModel() {
    return engine === 'qwen' && model.includes('instruct');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createQwenRequest(text, variant) {
    const input = {
        text,
        voice,
        language_type: languageType
    };

    if (shouldUseInstructionModel()) {
        input.instructions = getInstructions(variant);
        input.optimize_instructions = true;
    }

    return {
        endpoint: dashScopeEndpoints.qwen,
        body: {
            model,
            input
        }
    };
}

function createCosyVoiceRequest(text, variant) {
    const input = {
        text,
        voice,
        format: audioFormat,
        sample_rate: sampleRate,
        rate: variant === 'slow' ? slowRate : normalRate,
        language_hints: [languageType]
    };

    if (instruction) {
        input.instruction = instruction;
    }

    return {
        endpoint: dashScopeEndpoints.cosyvoice,
        body: {
            model,
            input
        }
    };
}

function createSpeechRequest(text, variant) {
    return engine === 'cosyvoice'
        ? createCosyVoiceRequest(text, variant)
        : createQwenRequest(text, variant);
}

async function createSpeechFile(text, filePath, variant) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            await requestSpeechFile(text, filePath, variant);
            return;
        } catch (error) {
            const isLastAttempt = attempt >= retries;
            if (isLastAttempt || isPermanentError(error)) {
                throw error;
            }

            const waitMs = 1000 * (attempt + 1);
            console.warn(`retry ${attempt + 1}/${retries}: ${error.message}`);
            await sleep(waitMs);
        }
    }
}

function isPermanentError(error) {
    const message = String(error?.message || '');
    return /401|403|quota|Quota|余额|额度|Unauthorized|Forbidden|InvalidApiKey/i.test(message);
}

async function requestSpeechFile(text, filePath, variant) {
    const request = createSpeechRequest(text, variant);

    const response = await fetchWithTimeout(request.endpoint, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.body)
    });

    const body = await response.text();
    if (!response.ok) {
        throw new Error(`Speech API failed ${response.status}: ${body}`);
    }

    let payload;
    try {
        payload = JSON.parse(body);
    } catch {
        throw new Error(`Speech API returned non-JSON response: ${body.slice(0, 300)}`);
    }

    const audioUrl = payload?.output?.audio?.url;
    if ((payload.status_code && payload.status_code !== 200) || !audioUrl) {
        throw new Error(`Speech API returned no audio URL: ${JSON.stringify(payload).slice(0, 800)}`);
    }

    const audioResponse = await fetchWithTimeout(audioUrl);
    if (!audioResponse.ok) {
        throw new Error(`Audio download failed ${audioResponse.status}: ${await audioResponse.text()}`);
    }

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const arrayBuffer = await audioResponse.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
}

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal
        });
    } catch (error) {
        if (error?.name === 'AbortError') {
            throw new Error(`Request timed out after ${requestTimeoutMs}ms`);
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

async function generateLesson(lesson) {
    const allEnglishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const englishTexts = maxSentences > 0 ? allEnglishTexts.slice(0, maxSentences) : allEnglishTexts;
    const lessonDir = path.join(outputDir, `lesson-${pad(lesson.lessonNumber)}`);

    for (let index = 0; index < englishTexts.length; index++) {
        const sentence = englishTexts[index];
        const sentenceNumber = pad(index + 1);

        for (const variant of speechVariants) {
            const filePath = path.join(lessonDir, `sentence-${sentenceNumber}-${variant}.${extension}`);

            if (!overwrite) {
                try {
                    await fs.access(filePath);
                    if (!quietSkip) {
                        console.log(`skip ${path.relative(rootDir, filePath)}`);
                    }
                    continue;
                } catch {}
            }

            console.log(`generate Lesson ${lesson.lessonNumber} sentence ${index + 1} ${variant}`);
            await createSpeechFile(sentence, filePath, variant);
            if (delayMs > 0) await sleep(delayMs);
        }
    }
}

async function writeManifest(lessons) {
    const manifest = {};
    const lessonByNumber = new Map(
        lessons
            .filter(lesson => lesson.bookId === bookId)
            .map(lesson => [lesson.lessonNumber, lesson])
    );

    let lessonDirs = [];
    try {
        lessonDirs = await fs.readdir(outputDir, { withFileTypes: true });
    } catch {
        lessonDirs = [];
    }

    for (const dirent of lessonDirs) {
        if (!dirent.isDirectory()) continue;

        const match = dirent.name.match(/^lesson-(\d{3})$/);
        if (!match) continue;

        const lessonNumber = Number(match[1]);
        const lesson = lessonByNumber.get(lessonNumber);
        if (!lesson) continue;

        const files = (await fs.readdir(path.join(outputDir, dirent.name))).sort();
        const entries = [];

        for (const file of files) {
            const fileMatch = file.match(/^sentence-(\d{3})-(normal|slow)\.(mp3|wav)$/);
            if (!fileMatch) continue;

            const sentenceIndex = Number(fileMatch[1]) - 1;
            const variant = fileMatch[2];
            const current = entries[sentenceIndex]?.[variant];
            const candidate = `assets/audio/nce1-ai/${dirent.name}/${file}`;

            if (!entries[sentenceIndex]) entries[sentenceIndex] = {};
            if (!current || getFileScore(candidate) >= getFileScore(current)) {
                entries[sentenceIndex][variant] = candidate;
            }
        }

        manifest[lesson.id] = entries;
    }

    await fs.writeFile(
        manifestPath,
        'window.nce1GeneratedSentenceAudio = ' + JSON.stringify(manifest, null, 2) + ';\n' +
        'var nce1GeneratedSentenceAudio = window.nce1GeneratedSentenceAudio;\n'
    );
}

function getFileScore(filePath) {
    const ext = path.extname(filePath).replace('.', '');
    if (ext === extension) return 3;
    if (ext === 'mp3') return 2;
    if (ext === 'wav') return 1;
    return 0;
}

const lessons = await loadLessons();
const targets = getTargetLessons(lessons);

if (targets.length === 0) {
    console.log('No matching lessons found.');
    process.exit(0);
}

try {
    if (!manifestOnly) {
        for (const lesson of targets) {
            await generateLesson(lesson);
            await writeManifest(lessons);
            console.log(`checkpoint: Lesson ${lesson.lessonNumber}, manifest updated`);
        }
    }

    await writeManifest(lessons);
    console.log(`done: ${targets.length} lesson(s), manifest updated`);
} catch (error) {
    await writeManifest(lessons);
    console.error(error?.stack || error?.message || error);
    console.error('stopped: manifest updated with all generated files');
    process.exit(1);
}
