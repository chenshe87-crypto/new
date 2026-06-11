#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const defaultSourceDir = path.join(rootDir, 'assets/audio/nce1-ai');

const args = new Map(
    process.argv.slice(2).map(arg => {
        const [key, ...rest] = arg.replace(/^--/, '').split('=');
        return [key, rest.length ? rest.join('=') : 'true'];
    })
);

const sourceDir = path.resolve(rootDir, args.get('source') || defaultSourceDir);
const overwrite = args.get('overwrite') === 'true';
const dryRun = args.get('dry-run') === 'true';
const bitrate = args.get('bitrate') || '64k';
const preferredTool = args.get('tool') || '';
const explicitFfmpegPath = args.get('ffmpeg-path') || '';

async function pathExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function findExecutable(name) {
    const pathEntries = (process.env.PATH || '').split(path.delimiter).filter(Boolean);
    for (const entry of pathEntries) {
        const candidate = path.join(entry, name);
        if (await pathExists(candidate)) {
            return candidate;
        }
    }
    return null;
}

async function collectWavFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...await collectWavFiles(fullPath));
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.wav')) {
            files.push(fullPath);
        }
    }

    return files.sort();
}

function runCommand(command, commandArgs) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, commandArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
        let stderr = '';

        child.stderr.on('data', chunk => {
            stderr += chunk.toString();
        });
        child.on('error', reject);
        child.on('close', code => {
            if (code === 0) {
                resolve();
                return;
            }
            reject(new Error(`${path.basename(command)} exited with ${code}: ${stderr.trim()}`));
        });
    });
}

async function convertWithFfmpeg(ffmpegPath, inputPath, outputPath) {
    const commandArgs = [
        '-hide_banner',
        '-loglevel',
        'error',
        overwrite ? '-y' : '-n',
        '-i',
        inputPath,
        '-ac',
        '1',
        '-ar',
        '24000',
        '-b:a',
        bitrate,
        outputPath
    ];
    await runCommand(ffmpegPath, commandArgs);
}

async function convertWithAfconvert(inputPath, outputPath) {
    const commandArgs = [
        inputPath,
        outputPath,
        '-f',
        'MPG3',
        '-d',
        '.mp3',
        '-b',
        String(parseInt(bitrate, 10) * 1000 || 64000)
    ];
    await runCommand('/usr/bin/afconvert', commandArgs);
}

async function resolveTool() {
    if (explicitFfmpegPath) {
        const ffmpegPath = path.resolve(explicitFfmpegPath);
        if (!await pathExists(ffmpegPath)) throw new Error(`ffmpeg was not found at ${ffmpegPath}.`);
        return { name: 'ffmpeg', path: ffmpegPath };
    }

    if (preferredTool === 'ffmpeg') {
        const ffmpegPath = await findExecutable('ffmpeg');
        if (!ffmpegPath) throw new Error('ffmpeg was requested but was not found in PATH.');
        return { name: 'ffmpeg', path: ffmpegPath };
    }

    if (preferredTool === 'afconvert') {
        if (!await pathExists('/usr/bin/afconvert')) throw new Error('afconvert was requested but was not found.');
        return { name: 'afconvert', path: '/usr/bin/afconvert' };
    }

    const ffmpegPath = await findExecutable('ffmpeg');
    if (ffmpegPath) return { name: 'ffmpeg', path: ffmpegPath };

    throw new Error('No ffmpeg executable found. Install ffmpeg or pass --ffmpeg-path=/absolute/path/to/ffmpeg, then rerun this script.');
}

async function main() {
    const wavFiles = await collectWavFiles(sourceDir);
    const pendingFiles = [];

    for (const inputPath of wavFiles) {
        const outputPath = inputPath.replace(/\.wav$/i, '.mp3');
        if (!overwrite && await pathExists(outputPath)) continue;
        pendingFiles.push({ inputPath, outputPath });
    }

    if (pendingFiles.length === 0) {
        console.log(`No WAV files need conversion in ${path.relative(rootDir, sourceDir)}.`);
        return;
    }

    const tool = await resolveTool();
    console.log(`Converting ${pendingFiles.length} WAV file(s) with ${tool.name} at ${bitrate}.`);

    if (dryRun) {
        pendingFiles.slice(0, 10).forEach(file => {
            console.log(`${path.relative(rootDir, file.inputPath)} -> ${path.relative(rootDir, file.outputPath)}`);
        });
        if (pendingFiles.length > 10) {
            console.log(`...and ${pendingFiles.length - 10} more`);
        }
        return;
    }

    let converted = 0;
    for (const file of pendingFiles) {
        if (tool.name === 'ffmpeg') {
            await convertWithFfmpeg(tool.path, file.inputPath, file.outputPath);
        } else {
            await convertWithAfconvert(file.inputPath, file.outputPath);
        }
        converted++;
        if (converted % 50 === 0 || converted === pendingFiles.length) {
            console.log(`converted ${converted}/${pendingFiles.length}`);
        }
    }
}

main().catch(error => {
    console.error(error?.message || error);
    process.exit(1);
});
