let currentBookId = null;
let currentLessonId = null;
let lastPage = 'home';
let selectedLessons = [];
let randomChallengeQuestions = [];
let practiceSource = null;

function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
}

function saveMistakes(newMistakes) {
    mistakes = newMistakes;
    saveUserData();
}

function addMistake(mistake) {
    const exists = mistakes.find(m =>
        m.lessonId === mistake.lessonId &&
        m.chinese === mistake.chinese
    );
    if (!exists) {
        mistake.id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
        mistake.addedAt = new Date().toISOString();
        mistake.successCount = 0;
        mistake.wrongCount = 1;
        mistakes.unshift(mistake);
        saveUserData();
        return;
    }

    exists.wrongCount = (exists.wrongCount || 1) + 1;
    exists.successCount = 0;
    exists.addedAt = new Date().toISOString();
    exists.userAnswer = mistake.userAnswer;
    saveUserData();
}

document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
    window.addEventListener('hashchange', () => {
        stopSentenceAudio();
        handleHashRoute();
    });
    window.addEventListener('pagehide', stopSentenceAudio);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSentenceAudio();
        }
    });
});

function checkLogin() {
    loadUserData();
    updateNavUser();
    initHomePage();
    if (!handleHashRoute()) {
        navigate('home');
    }
}

function updateNavUser() {
    const navUser = document.getElementById('navUser');
    const userName = document.getElementById('userName');
    const loginBtn = document.getElementById('loginNavBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (!navUser || !userName) return;
    if (currentUser) {
        navUser.style.display = 'flex';
        userName.textContent = currentUser.username;
        if (loginBtn) loginBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
        navUser.style.display = 'flex';
        userName.textContent = '游客模式';
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    }
}

function requireLogin(actionName) {
    if (currentUser) return true;
    const message = actionName ? actionName + '需要先登录，用于保存学习记录和错题。' : '请先登录后继续。';
    alert(message);
    navigate('login');
    return false;
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
    
    document.getElementById('loginError').textContent = '';
    document.getElementById('registerError').textContent = '';
}

function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    
    if (!username || !password) {
        errorEl.textContent = '请填写用户名和密码';
        return;
    }
    
    const result = loginUser(username, password);
    if (result.success) {
        updateNavUser();
        navigate('home');
    } else {
        errorEl.textContent = result.message;
    }
}

function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const errorEl = document.getElementById('registerError');
    
    if (!username || !password || !confirmPassword) {
        errorEl.textContent = '请填写所有信息';
        return;
    }
    
    if (password !== confirmPassword) {
        errorEl.textContent = '两次输入的密码不一致';
        return;
    }
    
    if (password.length < 3) {
        errorEl.textContent = '密码至少3位';
        return;
    }
    
    const result = registerUser(username, password);
    if (result.success) {
        updateNavUser();
        navigate('home');
    } else {
        errorEl.textContent = result.message;
    }
}

function logout() {
    logoutUser();
    updateNavUser();
    navigate('home');
}

let pageHistory = [];

function parseHashRoute() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!rawHash) return null;

    const parts = rawHash.split('/').map(part => decodeURIComponent(part));
    const page = parts[0];
    const value = parts[1];

    if (page === 'home' || page === 'random' || page === 'mistakes' || page === 'history' || page === 'login') {
        return { page };
    }
    if (page === 'course' && value) {
        const bookId = parseInt(value, 10);
        return Number.isNaN(bookId) ? null : { page, bookId };
    }
    if ((page === 'lesson' || page === 'translation' || page === 'dictation') && value) {
        return { page, lessonId: value };
    }
    return null;
}

function handleHashRoute() {
    const route = parseHashRoute();
    if (!route) return false;

    if (route.bookId) {
        navigate('course', { bookId: route.bookId });
        return true;
    }

    if (route.lessonId) {
        const lesson = lessons.find(l => l.id === route.lessonId);
        if (!lesson) return false;

        if (route.page === 'lesson') {
            navigate('course', { bookId: lesson.bookId });
            showLessonDetail(lesson.id);
            return true;
        }

        navigate(route.page, { lessonId: lesson.id });
        return true;
    }

    navigate(route.page);
    return true;
}

function navigate(page, data = null) {
    const publicPages = ['home', 'course', 'login'];
    if (!currentUser && !publicPages.includes(page)) {
        requireLogin();
        return;
    }
    
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
        pageHistory.push(currentPage.id);
        if (pageHistory.length > 20) {
            pageHistory.shift();
        }
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    const targetPage = document.getElementById('page-' + page);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch(page) {
        case 'home':
            initHomePage();
            break;
        case 'course':
            if (data && data.bookId) {
                currentBookId = data.bookId;
                initCoursePage(data.bookId);
            }
            break;
        case 'translation':
            practiceSource = 'course';
            if (data && data.lessonId) {
                currentLessonId = data.lessonId;
                initTranslationPage(data.lessonId);
            }
            break;
        case 'dictation':
            practiceSource = 'course';
            if (data && data.lessonId) {
                currentLessonId = data.lessonId;
                initDictationPage(data.lessonId);
            }
            break;
        case 'random':
            initRandomPage();
            break;
        case 'mistakes':
            initMistakesPage();
            break;
        case 'mistakes-challenge':
            initMistakesChallengePage();
            break;
        case 'history':
            initHistoryPage();
            break;
    }

    if (page !== 'login') {
        lastPage = page;
    }
}

function goBack() {
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;
    
    const pageId = currentPage.id;
    
    if (pageId === 'page-random') {
        const randomChallenge = document.getElementById('random-challenge');
        if (randomChallenge && !randomChallenge.classList.contains('hidden')) {
            randomChallenge.classList.add('hidden');
            const randomSetup = document.getElementById('random-setup');
            if (randomSetup) {
                randomSetup.classList.remove('hidden');
            }
            const randomResult = document.getElementById('random-result');
            if (randomResult) {
                randomResult.classList.add('hidden');
            }
            return;
        }
    }
    
    if (pageId === 'page-translation' || pageId === 'page-dictation') {
        if (practiceSource === 'random') {
            navigate('random');
        } else {
            navigate('course', { bookId: currentBookId });
        }
        return;
    }
    
    const pageParent = {
        'page-random-challenge': 'random',
        'page-mistakes-challenge': 'mistakes',
        'page-course': 'home',
        'page-random': 'home',
        'page-mistakes': 'home',
        'page-history': 'home'
    };
    
    const parent = pageParent[pageId];
    navigate(parent || 'home');
}

function goBackFromPractice() {
    navigate('course', { bookId: currentBookId });
}

function startPractice(type, lessonId) {
    const label = type === 'translation' ? '翻译挑战' : '默写挑战';
    if (!requireLogin(label)) return;
    navigate(type, { lessonId: lessonId });
}

function padLessonNumber(num) {
    return String(num).padStart(3, '0');
}

function getNce1AudioRange(lessonNumber) {
    const start = lessonNumber % 2 === 0 ? lessonNumber - 1 : lessonNumber;
    const end = start + 1;
    return {
        start: padLessonNumber(start),
        end: padLessonNumber(end)
    };
}

function getLessonAudio(bookId, lessonNumber) {
    if (bookId !== 1 || lessonNumber < 1 || lessonNumber > 144) return null;
    if (lessonNumber % 2 === 0) return null;

    const range = getNce1AudioRange(lessonNumber);
    const basePath = 'assets/audio/nce1-us/lesson-' + range.start + '-' + range.end;
    return {
        label: 'Lesson ' + parseInt(range.start, 10) + ' 美音',
        mp3: basePath + '.mp3',
        lrc: basePath + '.lrc'
    };
}

function renderAudioPlayer(audio) {
    if (!audio) return '';

    const lyricsLink = audio.lrc
        ? '<a class="audio-lyrics-link" href="' + audio.lrc + '" download>' +
            '<i class="fas fa-align-left"></i> LRC' +
        '</a>'
        : '';

    return '<div class="audio-panel">' +
        '<div class="audio-panel-header">' +
            '<div>' +
                '<div class="audio-label"><i class="fas fa-volume-up"></i> 美音朗读</div>' +
                '<div class="audio-title">' + audio.label + '</div>' +
            '</div>' +
            lyricsLink +
        '</div>' +
        '<audio class="lesson-audio" controls preload="none" playsinline webkit-playsinline src="' + audio.mp3 + '">' +
            '当前浏览器不支持音频播放。' +
        '</audio>' +
    '</div>';
}

let speechVoiceCache = null;
const sentenceAudioController = {
    player: null,
    token: 0,
    timer: null,
    currentButton: null,
    currentKey: null,
    cleanup: null,
    status: 'idle'
};

function bindLessonAudioRecovery(root) {
    const scope = root || document;
    scope.querySelectorAll('.lesson-audio').forEach(audio => {
        if (audio.dataset.recoveryBound === 'true') return;
        audio.dataset.recoveryBound = 'true';
        audio.dataset.retryCount = '0';
        audio.setAttribute('playsinline', '');
        audio.setAttribute('webkit-playsinline', '');

        const retryLoad = () => {
            const retryCount = parseInt(audio.dataset.retryCount || '0', 10);
            if (retryCount >= 1 || !audio.currentSrc && !audio.src) return;

            audio.dataset.retryCount = String(retryCount + 1);
            const wasPaused = audio.paused;
            const src = audio.currentSrc || audio.src;
            setTimeout(() => {
                audio.src = src;
                audio.load();
                if (!wasPaused) {
                    audio.play().catch(() => {});
                }
            }, 250);
        };

        audio.addEventListener('error', retryLoad);
        audio.addEventListener('stalled', retryLoad);
        audio.addEventListener('canplay', () => {
            audio.dataset.retryCount = '0';
        });
    });
}

function getSentenceAudioSegment(lessonId, sentenceIndex) {
    if (typeof nce1SentenceAudio === 'undefined') return null;
    if (!nce1SentenceAudio[lessonId]) return null;
    return nce1SentenceAudio[lessonId][sentenceIndex] || null;
}

function getSentenceTextForSpeech(lessonId, sentenceIndex) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return null;

    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    if (sentenceIndex < 0 || sentenceIndex >= englishTexts.length) return null;

    return englishTexts[sentenceIndex] || null;
}

function getGeneratedSentenceAudio(lessonId, sentenceIndex, playbackRate) {
    const generatedAudioMap = window.nce1GeneratedSentenceAudio ||
        (typeof nce1GeneratedSentenceAudio !== 'undefined' ? nce1GeneratedSentenceAudio : null);
    if (!generatedAudioMap) return null;

    const lessonAudio = generatedAudioMap[lessonId];
    if (!lessonAudio) return null;

    const sentenceAudio = lessonAudio[sentenceIndex];
    if (!sentenceAudio) return null;

    const wantsSlow = (playbackRate || 1) < 1;
    const src = sentenceAudio.normal || sentenceAudio.slow;
    if (!src) return null;

    return {
        src,
        playbackRate: wantsSlow && sentenceAudio.normal ? 0.75 : 1
    };
}

function renderSentenceAudioButton(lessonId, sentenceIndex) {
    if (!getSentenceAudioSegment(lessonId, sentenceIndex) && !getSentenceTextForSpeech(lessonId, sentenceIndex)) return '';

    return '<span class="sentence-audio-actions" aria-label="逐句播放">' +
        '<button type="button" class="sentence-audio-btn sentence-audio-btn-slow" title="0.75 倍速播放本句美音" aria-label="0.75 倍速播放本句美音" onclick="playSentenceAudio(\'' + lessonId + '\', ' + sentenceIndex + ', 0.75, this)">' +
            '<i class="fas fa-volume-low" aria-hidden="true"></i>' +
            '<span class="sentence-audio-speed">0.75x</span>' +
        '</button>' +
        '<button type="button" class="sentence-audio-btn" title="常速播放本句美音" aria-label="常速播放本句美音" onclick="playSentenceAudio(\'' + lessonId + '\', ' + sentenceIndex + ', 1, this)">' +
            '<i class="fas fa-volume-high" aria-hidden="true"></i>' +
            '<span class="sentence-audio-speed">1x</span>' +
        '</button>' +
    '</span>';
}

function getSentenceAudioKey(lessonId, sentenceIndex, playbackRate) {
    return lessonId + ':' + sentenceIndex + ':' + (playbackRate || 1);
}

function getSentenceAudioPlayer() {
    if (!sentenceAudioController.player) {
        sentenceAudioController.player = new Audio();
        sentenceAudioController.player.preload = 'auto';
        sentenceAudioController.player.setAttribute('playsinline', '');
        sentenceAudioController.player.setAttribute('webkit-playsinline', '');
    }
    return sentenceAudioController.player;
}

function clearSentenceAudioState() {
    if (sentenceAudioController.timer) {
        clearTimeout(sentenceAudioController.timer);
        sentenceAudioController.timer = null;
    }
    document.querySelectorAll('.sentence-audio-btn.is-loading, .sentence-audio-btn.is-playing, .sentence-audio-btn.is-error').forEach(button => {
        button.classList.remove('is-loading', 'is-playing', 'is-error');
    });
    sentenceAudioController.currentButton = null;
    sentenceAudioController.currentKey = null;
    sentenceAudioController.status = 'idle';
}

function setSentenceAudioButtonState(button, state) {
    if (!button) return;
    button.classList.remove('is-loading', 'is-playing', 'is-error');
    if (state) {
        button.classList.add(state);
    }
}

function stopSentenceAudio() {
    sentenceAudioController.token++;
    clearSentenceAudioState();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    if (sentenceAudioController.cleanup) {
        sentenceAudioController.cleanup();
        sentenceAudioController.cleanup = null;
    }

    const player = sentenceAudioController.player;
    if (player) {
        player.pause();
        player.removeAttribute('src');
        player.load();
        player._activeSegment = null;
    }
}

function getPreferredEnglishVoice() {
    if (!('speechSynthesis' in window)) return null;
    if (speechVoiceCache) return speechVoiceCache;

    const voices = window.speechSynthesis.getVoices();
    speechVoiceCache = voices.find(voice => /^en[-_]?US/i.test(voice.lang)) ||
        voices.find(voice => /^en/i.test(voice.lang)) ||
        null;
    return speechVoiceCache;
}

function speakSentenceText(text, playbackRate, button) {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
        alert('当前浏览器不支持文字朗读。');
        return;
    }

    stopSentenceAudio();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = playbackRate || 1;
    utterance.pitch = 1;
    utterance.voice = getPreferredEnglishVoice();
    utterance.onend = stopSentenceAudio;
    utterance.onerror = stopSentenceAudio;

    setSentenceAudioButtonState(button, 'is-playing');

    window.speechSynthesis.speak(utterance);
}

function fallbackToSpeechText(text, playbackRate, button, fallbackMessage) {
    if (text) {
        speakSentenceText(text, playbackRate, button);
        return;
    }

    alert(fallbackMessage || '音频暂时无法播放，请稍后再试。');
}

function setSentenceAudioStartTime(player, startTime) {
    if (!player) return;
    try {
        player.currentTime = startTime;
    } catch (error) {
        // Mobile browsers may reject seeking before metadata is ready; loadedmetadata retries it.
    }
}

function bindSentenceAudioPlayerEvents(player, options) {
    const token = options.token;
    let started = false;

    const isCurrent = () => token === sentenceAudioController.token;
    const markLoading = () => {
        if (!isCurrent() || sentenceAudioController.status === 'playing') return;
        sentenceAudioController.status = 'loading';
        setSentenceAudioButtonState(options.button, 'is-loading');
    };
    const markPlaying = () => {
        if (!isCurrent() || started) return;
        started = true;
        sentenceAudioController.status = 'playing';
        setSentenceAudioButtonState(options.button, 'is-playing');
        if (options.onStarted) {
            options.onStarted();
        }
    };
    const handleEnded = () => {
        if (isCurrent()) {
            stopSentenceAudio();
        }
    };
    const handleError = () => {
        if (!isCurrent()) return;
        stopSentenceAudio();
        setSentenceAudioButtonState(options.button, 'is-error');
        if (options.onFailure) {
            options.onFailure();
        }
    };
    const handleMetadata = () => {
        if (isCurrent() && typeof options.startTime === 'number') {
            setSentenceAudioStartTime(player, options.startTime);
        }
    };
    const handleTimeUpdate = () => {
        if (!isCurrent() || !options.segment) return;
        if (player.currentTime >= options.segment.end) {
            stopSentenceAudio();
        }
    };

    const listeners = [
        ['loadstart', markLoading],
        ['waiting', markLoading],
        ['canplay', markLoading],
        ['playing', markPlaying],
        ['ended', handleEnded],
        ['error', handleError],
        ['loadedmetadata', handleMetadata],
        ['timeupdate', handleTimeUpdate]
    ];

    listeners.forEach(([eventName, listener]) => {
        player.addEventListener(eventName, listener);
    });

    return () => {
        listeners.forEach(([eventName, listener]) => {
            player.removeEventListener(eventName, listener);
        });
    };
}

function handleSentenceAudioPlayFailure(error, options) {
    if (options.token !== sentenceAudioController.token) return;

    const isNotAllowed = error && error.name === 'NotAllowedError';
    stopSentenceAudio();
    setSentenceAudioButtonState(options.button, 'is-error');

    if (isNotAllowed) {
        alert('浏览器拦截了本次播放，请再点一次播放按钮。');
        return;
    }

    if (options.onFailure) {
        options.onFailure();
    }
}

function playSentenceAudioElement(options) {
    const player = getSentenceAudioPlayer();

    stopSentenceAudio();
    const playToken = ++sentenceAudioController.token;
    sentenceAudioController.currentButton = options.button || null;
    sentenceAudioController.currentKey = options.key;
    sentenceAudioController.status = 'loading';

    player.preload = 'auto';
    player.src = options.src;
    player.playbackRate = options.playbackRate || 1;
    player.preservesPitch = true;
    player.mozPreservesPitch = true;
    player.webkitPreservesPitch = true;
    player._activeSegment = options.segment || null;

    setSentenceAudioButtonState(options.button, 'is-loading');
    if (typeof options.startTime === 'number') {
        setSentenceAudioStartTime(player, options.startTime);
    }

    sentenceAudioController.cleanup = bindSentenceAudioPlayerEvents(player, {
        token: playToken,
        button: options.button,
        segment: options.segment,
        startTime: options.startTime,
        onStarted: options.onStarted,
        onFailure: options.onFailure
    });

    const playPromise = player.play();
    if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => {
            if (playToken === sentenceAudioController.token) {
                sentenceAudioController.status = 'playing';
                setSentenceAudioButtonState(options.button, 'is-playing');
            }
        }).catch(error => {
            handleSentenceAudioPlayFailure(error, {
                token: playToken,
                button: options.button,
                onFailure: options.onFailure
            });
        });
    }
}

function playGeneratedSentenceAudio(generatedAudio, button, speechText, requestedPlaybackRate) {
    playSentenceAudioElement({
        key: button ? button.dataset.audioKey : generatedAudio.src + ':' + requestedPlaybackRate,
        button,
        src: generatedAudio.src,
        playbackRate: generatedAudio.playbackRate,
        startTime: 0,
        onFailure: () => {
            fallbackToSpeechText(speechText, requestedPlaybackRate, button, 'AI 语音暂时无法播放，请稍后再试。');
        }
    });
}

function getSentenceAudioStopOffset() {
    const isDesktopPointer = typeof window.matchMedia === 'function' &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    return isDesktopPointer ? -0.26 : 0.04;
}

function playSentenceAudio(lessonId, sentenceIndex, playbackRate, button) {
    const audioKey = getSentenceAudioKey(lessonId, sentenceIndex, playbackRate);
    if (button) {
        button.dataset.audioKey = audioKey;
    }
    if (sentenceAudioController.currentKey === audioKey && sentenceAudioController.status !== 'idle') {
        stopSentenceAudio();
        return;
    }

    const lesson = lessons.find(l => l.id === lessonId);
    const generatedAudio = getGeneratedSentenceAudio(lessonId, sentenceIndex, playbackRate);
    const segment = getSentenceAudioSegment(lessonId, sentenceIndex);
    const audio = lesson ? getLessonAudio(lesson.bookId, lesson.lessonNumber) : null;
    const speechText = getSentenceTextForSpeech(lessonId, sentenceIndex);
    if (!lesson || (!generatedAudio && !segment && !speechText)) return;

    if (generatedAudio) {
        playGeneratedSentenceAudio(generatedAudio, button, speechText, playbackRate);
        return;
    }

    if (!segment || !audio) {
        speakSentenceText(speechText, playbackRate, button);
        return;
    }

    const playResolvedSegment = (resolvedSegment) => {
        if (!resolvedSegment || resolvedSegment.end <= resolvedSegment.start) {
            stopSentenceAudio();
            alert('这句音频暂时无法定位，请稍后再试。');
            return;
        }

        playSentenceAudioElement({
            key: audioKey,
            button,
            src: audio.mp3,
            playbackRate: playbackRate || 1,
            segment: resolvedSegment,
            startTime: resolvedSegment.start,
            onStarted: () => {
                const rate = sentenceAudioController.player.playbackRate || 1;
                const wallClockDuration = (resolvedSegment.end - resolvedSegment.start) / rate;
                sentenceAudioController.timer = setTimeout(stopSentenceAudio, Math.max(0.1, wallClockDuration + getSentenceAudioStopOffset()) * 1000);
            },
            onFailure: () => {
                fallbackToSpeechText(speechText, playbackRate, button, '音频暂时无法播放，请稍后再试。');
            }
        });
    };

    if (segment) {
        playResolvedSegment(segment);
        return;
    }
}

function findLessonSentenceIndex(lessonId, englishText) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return -1;

    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const target = normalizeText(englishText || '');
    return englishTexts.findIndex(text => normalizeText(text) === target);
}

function initHomePage() {
    renderDashboard();

    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';

    books.forEach(book => {
        const icons = ['fa-book', 'fa-graduation-cap', 'fa-university', 'fa-star'];
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => navigate('course', { bookId: book.id });
        card.innerHTML = 
            '<div class="course-card-header">' +
                '<div class="course-icon">' +
                    '<i class="fas ' + icons[book.id - 1] + '"></i>' +
                '</div>' +
                '<div>' +
                    '<div class="course-title">' + book.title + '</div>' +
                    '<div class="course-description">' + book.description + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="course-lesson-count">' +
                '<i class="fas fa-file-alt"></i> ' + book.lessons + ' 篇课文' +
            '</div>' +
            '<div class="course-card-footer">' +
                '<button class="btn btn-primary">' +
                    '<i class="fas fa-arrow-right"></i> 开始学习' +
                '</button>' +
            '</div>';
        coursesGrid.appendChild(card);
    });
}

function renderDashboard() {
    const dashboard = document.getElementById('dashboard-grid');
    if (!dashboard) return;

    const totalLessons = books.reduce((sum, book) => sum + book.lessons, 0);
    const availableLessons = lessons.length;

    if (!currentUser) {
        dashboard.innerHTML =
            '<div class="dashboard-card dashboard-primary">' +
                '<div class="dashboard-label">今日继续学习</div>' +
                '<div class="dashboard-title">先浏览课程，再开始记录</div>' +
                '<div class="dashboard-meta">当前可预览 ' + availableLessons + ' / ' + totalLessons + ' 篇课文</div>' +
            '</div>' +
            '<div class="dashboard-card">' +
                '<div class="dashboard-label">最近练习</div>' +
                '<div class="dashboard-title">登录后自动保存</div>' +
                '<div class="dashboard-meta">记录翻译、默写和随机挑战成绩</div>' +
            '</div>' +
            '<div class="dashboard-card">' +
                '<div class="dashboard-label">错题数量</div>' +
                '<div class="dashboard-title">0 题</div>' +
                '<div class="dashboard-meta">登录后建立个人错题集</div>' +
            '</div>';
        return;
    }

    const latestRecord = history[0];
    const latestLesson = latestRecord ? lessons.find(l => l.id === latestRecord.lessonId) : null;
    const latestTitle = latestRecord
        ? (latestRecord.lessonId === 'random' ? '随机挑战' : (latestLesson ? 'Lesson ' + latestLesson.lessonNumber + ': ' + latestLesson.title : '未知课程'))
        : '还没有练习记录';
    const latestType = latestRecord ? getPracticeTypeText(latestRecord.type) + ' · ' + latestRecord.score + '分' : '完成一次挑战后会显示在这里';
    const nextLesson = latestLesson ? getNextLessonId(latestLesson.id) : (lessons[0] ? lessons[0].id : null);
    const nextLessonData = nextLesson ? lessons.find(l => l.id === nextLesson) : lessons[0];
    const continueTitle = nextLessonData ? 'Lesson ' + nextLessonData.lessonNumber + ': ' + nextLessonData.title : '选择一门课程开始';

    dashboard.innerHTML =
        '<div class="dashboard-card dashboard-primary" data-book-id="' + (nextLessonData ? nextLessonData.bookId : '') + '">' +
            '<div class="dashboard-label">今日继续学习</div>' +
            '<div class="dashboard-title">' + continueTitle + '</div>' +
            '<div class="dashboard-meta">点击进入课程列表继续学习</div>' +
        '</div>' +
        '<div class="dashboard-card">' +
            '<div class="dashboard-label">最近练习</div>' +
            '<div class="dashboard-title">' + latestTitle + '</div>' +
            '<div class="dashboard-meta">' + latestType + '</div>' +
        '</div>' +
        '<div class="dashboard-card">' +
            '<div class="dashboard-label">错题数量</div>' +
            '<div class="dashboard-title">' + mistakes.length + ' 题</div>' +
            '<div class="dashboard-meta">其中 ' + mistakes.filter(m => (m.successCount || 0) === 1).length + ' 题已连续答对 1 次</div>' +
        '</div>';

    const continueCard = dashboard.querySelector('[data-book-id]');
    if (continueCard && continueCard.dataset.bookId) {
        continueCard.onclick = () => navigate('course', { bookId: parseInt(continueCard.dataset.bookId) });
    }
}

function getPracticeTypeText(type) {
    const labels = {
        translation: '翻译挑战',
        dictation: '默写挑战',
        'random-translation': '随机翻译',
        'random-dictation': '随机默写'
    };
    return labels[type] || '练习';
}

function initCoursePage(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById('course-title').textContent = book.title;

    const lessonList = document.getElementById('lesson-list');
    lessonList.innerHTML = '';

    const bookLessons = lessons.filter(l => l.bookId === bookId);

    for (let i = 1; i <= book.lessons; i++) {
        const lesson = bookLessons.find(l => l.lessonNumber === i);
        const audio = getLessonAudio(bookId, i);
        const item = document.createElement('div');
        item.className = 'lesson-item ' + (i % 2 === 1 ? 'lesson-odd' : 'lesson-even');
        
        const hasTranslation = history.some(h => h.lessonId === (lesson ? lesson.id : '') && h.type === 'translation');
        const hasDictation = history.some(h => h.lessonId === (lesson ? lesson.id : '') && h.type === 'dictation');
        
        let badges = '';
        if (hasTranslation) {
            badges += '<span class="lesson-badge lesson-badge-translation"></span>';
        }
        if (hasDictation) {
            badges += '<span class="lesson-badge lesson-badge-dictation"></span>';
        }
        
        if (lesson) {
            item.innerHTML = badges + 'Lesson ' + i + ': ' + lesson.title + (audio ? ' <span class="audio-dot"><i class="fas fa-volume-up"></i></span>' : '');
            item.onclick = () => showLessonDetail(lesson.id);
        } else if (audio) {
            item.innerHTML = badges + 'Lesson ' + i + ' <span class="audio-dot"><i class="fas fa-volume-up"></i></span>';
            item.onclick = () => showAudioOnlyLesson(bookId, i);
        } else {
            item.innerHTML = badges + 'Lesson ' + i;
            item.style.opacity = '0.5';
        }
        lessonList.appendChild(item);
    }

    document.getElementById('lesson-detail').innerHTML = 
        '<div class="empty-state">' +
            '<i class="fas fa-hand-pointer"></i>' +
            '<p>请从左侧选择一篇课文开始学习</p>' +
        '</div>';
}

function showAudioOnlyLesson(bookId, lessonNumber) {
    const book = books.find(b => b.id === bookId);
    const audio = getLessonAudio(bookId, lessonNumber);
    if (!book || !audio) return;

    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach((item, index) => {
        item.classList.remove('active');
        if (lessonNumber === index + 1) {
            item.classList.add('active');
        }
    });

    currentBookId = bookId;
    currentLessonId = null;

    const lessonDetail = document.getElementById('lesson-detail');
    lessonDetail.innerHTML =
        '<div class="lesson-detail-header">' +
            '<div class="lesson-detail-title">Lesson ' + lessonNumber + '</div>' +
            '<div class="lesson-detail-meta">' +
                '<i class="fas fa-book"></i> ' + book.title +
            '</div>' +
        '</div>' +
        renderAudioPlayer(audio) +
        '<div class="audio-only-note">' +
            '<i class="fas fa-headphones"></i>' +
            '<p>这课暂未录入课文文本，可以先用本地美音音频跟读和听写。</p>' +
        '</div>';
    bindLessonAudioRecovery(lessonDetail);

    if (window.innerWidth < 900) {
        setTimeout(() => {
            lessonDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const ENGLISH_INPUT_ATTRIBUTES = ' lang="en" inputmode="text" autocorrect="off" autocapitalize="none" autocomplete="off" spellcheck="false"';

function capitalizeEnglishAnswerStart(input) {
    if (!input || typeof input.value !== 'string') return;

    const value = input.value;
    const firstLetterIndex = value.search(/[a-z]/);
    if (firstLetterIndex === -1) return;

    const capitalizedLetter = value.charAt(firstLetterIndex).toUpperCase();
    if (capitalizedLetter === value.charAt(firstLetterIndex)) return;

    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    input.value = value.slice(0, firstLetterIndex) + capitalizedLetter + value.slice(firstLetterIndex + 1);

    if (typeof selectionStart === 'number' && typeof selectionEnd === 'number') {
        input.setSelectionRange(selectionStart, selectionEnd);
    }
}

function renderEnglishAnswerInput(id, placeholder) {
    return '<input type="text" class="dictation-input" id="' + id + '" placeholder="' + escapeHtml(placeholder) + '"' + ENGLISH_INPUT_ATTRIBUTES + ' oninput="capitalizeEnglishAnswerStart(this)">';
}

function renderStudyText(lines) {
    if (!Array.isArray(lines) || !lines.length) return '';

    const headingPattern = /^(听力原文|重点讲解|Written exercises|New words|New words and expressions|Exercises|Examples?|Example|[ABC]\b)/i;

    return '<div class="text-block study-text-block">' +
        '<h3><i class="fas fa-book-open"></i> 课文与练习</h3>' +
        '<div class="study-content">' +
            lines.map(line => {
                const className = headingPattern.test(line) ? 'study-line study-heading' : 'study-line';
                return '<div class="' + className + '">' + escapeHtml(line) + '</div>';
            }).join('') +
        '</div>' +
    '</div>';
}

function showLessonDetail(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach((item, index) => {
        item.classList.remove('active');
        if (lesson.lessonNumber === index + 1) {
            item.classList.add('active');
        }
    });

    currentLessonId = lessonId;

    const book = books.find(b => b.id === lesson.bookId);
    const audio = getLessonAudio(lesson.bookId, lesson.lessonNumber);
    
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
    
    const englishText = englishTexts.map(escapeHtml).join(' ');
    const chineseText = chineseTexts.map(escapeHtml).join(' ');
    const lessonTextHtml =
        '<div class="text-block">' +
            '<h3><i class="fas fa-language"></i> 英文原文</h3>' +
            '<div class="text-content en">' + englishText + '</div>' +
        '</div>' +
        '<div class="text-block">' +
            '<h3><i class="fas fa-globe"></i> 中文翻译</h3>' +
            '<div class="text-content">' + chineseText + '</div>' +
        '</div>';

    const lessonDetail = document.getElementById('lesson-detail');
    lessonDetail.innerHTML = 
        '<div class="lesson-detail-header">' +
            '<div class="lesson-detail-title">Lesson ' + lesson.lessonNumber + ': ' + lesson.title + '</div>' +
            '<div class="lesson-detail-meta">' +
                '<i class="fas fa-book"></i> ' + (book ? book.title : '') +
            '</div>' +
        '</div>' +
        renderAudioPlayer(audio) +
        lessonTextHtml +
        '<div class="practice-actions">' +
            '<button class="btn btn-translation" onclick="startPractice(\'translation\', \'' + lesson.id + '\')">' +
                '<i class="fas fa-language"></i> 翻译挑战' +
            '</button>' +
            '<button class="btn btn-dictation" onclick="startPractice(\'dictation\', \'' + lesson.id + '\')">' +
                '<i class="fas fa-pencil-alt"></i> 默写挑战' +
            '</button>' +
        '</div>';
    bindLessonAudioRecovery(lessonDetail);
    
    if (window.innerWidth < 900) {
        setTimeout(() => {
            lessonDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function initTranslationPage(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    currentLessonId = lessonId;
    currentBookId = lesson.bookId;
    
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    const lessonTitleDiv = document.getElementById('translation-lesson-title');
    lessonTitleDiv.innerHTML = '<span class="lesson-number">Lesson ' + lesson.lessonNumber + '</span> - ' + lesson.title;

    const container = document.getElementById('translation-sentences-container');
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];

    container.innerHTML = englishTexts.map((english, index) => {
        return '<div class="translation-sentence-item" data-index="' + index + '">' +
            '<div class="translation-sentence-header">' +
                '<div class="sentence-header-left">' +
                    '<span class="sentence-number">第 ' + (index + 1) + ' 句</span>' +
                    renderSentenceAudioButton(lesson.id, index) +
                '</div>' +
                '<label class="translation-toggle">' +
                    '<input type="checkbox" id="toggle-' + index + '" onchange="toggleTranslation(' + index + ')">' +
                    '<span>译文</span>' +
                '</label>' +
            '</div>' +
            '<div class="translation-original">' + english + '</div>' +
            '<div class="translation-answer" id="answer-' + index + '" style="display: none;">' +
                '<div class="translation-reference">' + chineseTexts[index] + '</div>' +
            '</div>' +
        '</div>';
    }).join('');

    document.getElementById('translation-result').classList.add('hidden');
}

function toggleTranslation(index) {
    const checkbox = document.getElementById('toggle-' + index);
    const answerDiv = document.getElementById('answer-' + index);
    if (checkbox.checked) {
        answerDiv.style.display = 'block';
    } else {
        answerDiv.style.display = 'none';
    }
}

function toggleRandomTranslation(index) {
    const checkbox = document.getElementById('random-toggle-' + index);
    const answerDiv = document.getElementById('random-answer-' + index);
    if (checkbox.checked) {
        answerDiv.style.display = 'block';
    } else {
        answerDiv.style.display = 'none';
    }
}

function checkAllTranslation() {
    const lesson = lessons.find(l => l.id === currentLessonId);
    if (!lesson) return;

    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
    
    let translationAnswers = [];
    let correctCount = 0;

    for (let i = 0; i < englishTexts.length; i++) {
        const checkbox = document.getElementById('toggle-' + i);
        const isChecked = checkbox ? checkbox.checked : false;
        const isCorrect = !isChecked;
        
        if (!isCorrect) {
            addMistake({
                lessonId: currentLessonId,
                chinese: chineseTexts[i],
                userAnswer: '需要查看答案',
                correctAnswer: englishTexts[i]
            });
        } else {
            correctCount++;
        }
        
        translationAnswers.push({
            userAnswer: isChecked ? '查看译文' : '已掌握',
            correctAnswer: chineseTexts[i],
            isCorrect: isCorrect,
            index: i
        });
    }

    const score = Math.round((correctCount / englishTexts.length) * 100);

    addHistoryRecord({
        lessonId: lesson.id,
        type: 'translation',
        userAnswer: translationAnswers.map(a => a.userAnswer).join(' | '),
        score: score
    });

    showTranslationResult(translationAnswers, correctCount, englishTexts.length, score);
    
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
}

function getNextLessonId(currentId) {
    const parts = currentId.split('-');
    const bookId = parseInt(parts[0]);
    const lessonNum = parseInt(parts[1]);
    const bookLessons = lessons.filter(l => l.bookId === bookId);
    const nextNum = lessonNum + 1;
    const nextLesson = bookLessons.find(l => l.lessonNumber === nextNum);
    return nextLesson ? nextLesson.id : null;
}

function showTranslationResult(translationAnswers, correctCount, totalCount, score) {
    const container = document.getElementById('translation-sentences-container');
    
    translationAnswers.forEach(answer => {
        const item = container.querySelector('[data-index="' + answer.index + '"]');
        const checkbox = document.getElementById('toggle-' + answer.index);
        const answerDiv = document.getElementById('answer-' + answer.index);
        
        if (checkbox) {
            checkbox.disabled = true;
        }
        
        if (answer.isCorrect) {
            item.classList.add('translation-correct');
        } else {
            item.classList.add('translation-incorrect');
            if (answerDiv) {
                answerDiv.style.display = 'block';
            }
        }
    });

    let scoreClass = 'need-improve';
    let scoreLabel = '需要加强';
    if (score >= 80) {
        scoreClass = 'good';
        scoreLabel = '优秀！';
    } else if (score >= 60) {
        scoreClass = 'medium';
        scoreLabel = '继续努力';
    }

    const nextLessonId = getNextLessonId(currentLessonId);
    
    const resultDiv = document.getElementById('translation-result');
    resultDiv.classList.remove('hidden');
    
    let nextBtn = '';
    if (nextLessonId) {
        nextBtn = '<button class="btn btn-success" style="margin-left: 0.75rem;" onclick="scrollToTop();initTranslationPage(\'' + nextLessonId + '\')">' +
            '<i class="fas fa-arrow-right"></i> Next Lesson' +
        '</button>';
    }
    
    resultDiv.innerHTML = 
        '<div class="result-header">' +
            '<div class="score-display ' + scoreClass + '">' + score + '分</div>' +
            '<div class="score-label">' + scoreLabel + '</div>' +
            '<div style="margin-top: 1rem; font-size: 0.95rem; color: #64748b;">' +
                '正确: ' + correctCount + ' / ' + totalCount + ' 句' +
            '</div>' +
            '<div style="margin-top: 1.5rem;">' +
                '<button class="btn btn-primary" onclick="scrollToTop();initTranslationPage(\'' + currentLessonId + '\')">' +
                    '<i class="fas fa-redo"></i> 再来一次' +
                '</button>' +
                nextBtn +
            '</div>' +
        '</div>';
}

function initDictationPage(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    currentLessonId = lessonId;
    currentBookId = lesson.bookId;
    
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    const lessonTitleDiv = document.getElementById('dictation-lesson-title');
    lessonTitleDiv.innerHTML = '<span class="lesson-number">Lesson ' + lesson.lessonNumber + '</span> - ' + lesson.title;

    const container = document.getElementById('dictation-container');
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];

    container.innerHTML = chineseTexts.map((chinese, index) => {
        return '<div class="dictation-sentence-item" data-index="' + index + '">' +
            '<div class="dictation-sentence-header">' +
                '<div class="sentence-header-left">' +
                    '<span class="sentence-number">第 ' + (index + 1) + ' 句</span>' +
                    renderSentenceAudioButton(lesson.id, index) +
                '</div>' +
            '</div>' +
            '<div class="dictation-chinese-text">' + chinese + '</div>' +
            '<div class="dictation-input-wrapper">' +
                renderEnglishAnswerInput('dictation-' + index, '请输入对应的英文句子...') +
            '</div>' +
        '</div>';
    }).join('');

    document.getElementById('dictation-result').classList.add('hidden');
}

function normalizeAnswerCharacters(str) {
    const rawText = String(str || '');
    const normalizedText = typeof rawText.normalize === 'function' ? rawText.normalize('NFKC') : rawText;

    return normalizedText
        .replace(/&rsquo;|&lsquo;|&apos;|&#39;|&#x27;|&#8217;/gi, "'")
        .replace(/[‘’‛`´]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/\u00a0/g, ' ');
}

function removeIgnoredPunctuation(str) {
    return normalizeAnswerCharacters(str)
        .replace(/[^a-zA-Z0-9\s']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const CONTRACTION_MAP = {
    "here's": "here is", "there's": "there is", "there're": "there are",
    "it's": "it is", "it'll": "it will", "that'll": "that will",
    "that's": "that is", "what's": "what is", "he's": "he is",
    "she's": "she is", "who's": "who is", "where's": "where is",
    "when's": "when is", "how's": "how is", "colour's": "colour is",
    "weather's": "weather is", "everyone's": "everyone is",
    "everything's": "everything is", "i'm": "i am", "you're": "you are",
    "we're": "we are", "they're": "they are", "isn't": "is not",
    "aren't": "are not", "don't": "do not", "doesn't": "does not",
    "can't": "can not", "won't": "will not", "didn't": "did not",
    "wasn't": "was not", "weren't": "were not", "haven't": "have not",
    "hasn't": "has not", "hadn't": "had not", "couldn't": "could not",
    "wouldn't": "would not", "shouldn't": "should not", "mustn't": "must not",
    "shan't": "shall not",
    "let's": "let us", "i'll": "i will", "you'll": "you will",
    "he'll": "he will", "she'll": "she will", "we'll": "we will",
    "they'll": "they will", "i'd": "i would", "i've": "i have",
    "you'd": "you would", "you've": "you have", "we've": "we have",
    "they've": "they have", "o'clock": "o clock"
};

const ANSWER_PHRASE_EQUIVALENTS = {
    "cannot": "can not"
};

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const CONTRACTION_KEYS_SORTED = Object.keys(CONTRACTION_MAP).sort((a, b) => b.length - a.length);
const CONTRACTION_REGEX = new RegExp('\\b(' + CONTRACTION_KEYS_SORTED.map(escapeRegex).join('|') + ')\\b', 'g');
const ANSWER_PHRASE_REGEX = new RegExp('\\b(' + Object.keys(ANSWER_PHRASE_EQUIVALENTS).map(escapeRegex).join('|') + ')\\b', 'g');

function normalizeText(str) {
    let text = removeIgnoredPunctuation(str).toLowerCase();
    text = text.replace(CONTRACTION_REGEX, match => CONTRACTION_MAP[match]);
    text = text.replace(ANSWER_PHRASE_REGEX, match => ANSWER_PHRASE_EQUIVALENTS[match]);
    return text.replace(/\s+/g, ' ').trim();
}

function wordsMatch(str1, str2) {
    return normalizeText(str1) === normalizeText(str2);
}

function checkAllDictation() {
    const lesson = lessons.find(l => l.id === currentLessonId);
    if (!lesson) return;

    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    
    let dictationAnswers = [];
    let correctCount = 0;

    for (let i = 0; i < chineseTexts.length; i++) {
        const userAnswer = document.getElementById('dictation-' + i).value.trim();
        const correctAnswer = englishTexts[i];
        const isCorrect = wordsMatch(userAnswer, correctAnswer);
        
        if (!isCorrect) {
            addMistake({
                lessonId: currentLessonId,
                chinese: chineseTexts[i],
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            });
        } else {
            correctCount++;
        }
        
        dictationAnswers.push({
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
            index: i
        });
    }

    const score = Math.round((correctCount / chineseTexts.length) * 100);

    addHistoryRecord({
        lessonId: lesson.id,
        type: 'dictation',
        userAnswer: dictationAnswers.map(a => a.userAnswer).join(' | '),
        score: score
    });

    showDictationResult(dictationAnswers, correctCount, chineseTexts.length, score);
    
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
}

function showDictationResult(dictationAnswers, correctCount, totalCount, score) {
    const container = document.getElementById('dictation-container');
    
    dictationAnswers.forEach(answer => {
        const item = container.querySelector('[data-index="' + answer.index + '"]');
        const input = item.querySelector('.dictation-input');
        input.disabled = true;
        
        if (answer.isCorrect) {
            input.classList.add('correct');
        } else {
            input.classList.add('incorrect');
            
            if (answer.userAnswer) {
                const userDiv = document.createElement('div');
                userDiv.className = 'dictation-user';
                userDiv.innerHTML = '<i class="fas fa-user"></i> 您的答案：' + highlightDifferences(answer.userAnswer, answer.correctAnswer, true);
                item.appendChild(userDiv);
            }
            
            // 无论用户是否答题，都显示正确答案
            const correctDiv = document.createElement('div');
            correctDiv.className = 'dictation-correct';
            correctDiv.innerHTML = '<i class="fas fa-lightbulb"></i> 正确答案：' + highlightCorrectAnswer(answer.userAnswer, answer.correctAnswer);
            item.appendChild(correctDiv);
        }
    });

    let scoreClass = 'need-improve';
    let scoreLabel = '需要加强';
    if (score >= 80) {
        scoreClass = 'good';
        scoreLabel = '优秀！';
    } else if (score >= 60) {
        scoreClass = 'medium';
        scoreLabel = '继续努力';
    }

    const nextLessonId = getNextLessonId(currentLessonId);
    
    const resultDiv = document.getElementById('dictation-result');
    resultDiv.classList.remove('hidden');
    
    let nextBtn = '';
    if (nextLessonId) {
        nextBtn = '<button class="btn btn-success" style="margin-left: 0.75rem;" onclick="scrollToTop();initDictationPage(\'' + nextLessonId + '\')">' +
            '<i class="fas fa-arrow-right"></i> Next Lesson' +
        '</button>';
    }
    
    resultDiv.innerHTML = 
        '<div class="result-header">' +
            '<div class="score-display ' + scoreClass + '">' + score + '分</div>' +
            '<div class="score-label">' + scoreLabel + '</div>' +
            '<div style="margin-top: 1rem; font-size: 0.95rem; color: #64748b;">' +
                '正确: ' + correctCount + ' / ' + totalCount + ' 句' +
            '</div>' +
            '<div style="margin-top: 1.5rem;">' +
                '<button class="btn btn-primary" onclick="scrollToTop();initDictationPage(\'' + currentLessonId + '\')">' +
                    '<i class="fas fa-redo"></i> 再来一次' +
                '</button>' +
                nextBtn +
            '</div>' +
        '</div>';
}

function expandWords(text) {
    const cleaned = removeIgnoredPunctuation(text).toLowerCase();
    const words = cleaned.split(/\s+/);
    const expanded = [];
    const originalIndex = [];
    
    for (let i = 0; i < words.length; i++) {
        const parts = (CONTRACTION_MAP[words[i]] || words[i]).split(/\s+/);
        for (let j = 0; j < parts.length; j++) {
            expanded.push(parts[j]);
            originalIndex.push(i);
        }
    }
    
    return { expanded, originalIndex, originalWords: text.trim().split(/\s+/) };
}

function highlightDifferences(userInput, correctAnswer, isEnglish = true) {
    if (!userInput || !correctAnswer) return correctAnswer || '';
    
    if (wordsMatch(userInput, correctAnswer)) {
        return correctAnswer;
    }
    
    if (!isEnglish) {
        const correctWordsOriginal = correctAnswer.split(/\s+/);
        let result = [];
        const userChars = userInput.split('');
        for (let i = 0; i < correctWordsOriginal.length; i++) {
            if (i < userChars.length && userChars[i] === correctWordsOriginal[i]) {
                result.push(correctWordsOriginal[i]);
            } else {
                result.push('<span class="highlight-correct">' + correctWordsOriginal[i] + '</span>');
            }
        }
        return result.join('');
    }
    
    const userExp = expandWords(userInput);
    const corrExp = expandWords(correctAnswer);
    
    const userWrong = new Array(userExp.originalWords.length).fill(false);
    const maxLen = Math.min(userExp.expanded.length, corrExp.expanded.length);
    
    for (let i = 0; i < maxLen; i++) {
        if (userExp.expanded[i] !== corrExp.expanded[i]) {
            userWrong[userExp.originalIndex[i]] = true;
        }
    }
    if (userExp.expanded.length > maxLen) {
        for (let i = maxLen; i < userExp.expanded.length; i++) {
            userWrong[userExp.originalIndex[i]] = true;
        }
    }
    
    let result = [];
    for (let i = 0; i < userExp.originalWords.length; i++) {
        if (userWrong[i]) {
            result.push('<span class="highlight-incorrect">' + userExp.originalWords[i] + '</span>');
        } else {
            result.push(userExp.originalWords[i]);
        }
    }
    return result.join(' ');
}

function highlightCorrectAnswer(userInput, correctAnswer) {
    if (!userInput || !correctAnswer) return correctAnswer || '';
    
    if (wordsMatch(userInput, correctAnswer)) {
        return correctAnswer;
    }
    
    const userExp = expandWords(userInput);
    const corrExp = expandWords(correctAnswer);
    
    const corrWrong = new Array(corrExp.originalWords.length).fill(false);
    const maxLen = Math.min(userExp.expanded.length, corrExp.expanded.length);
    
    for (let i = 0; i < maxLen; i++) {
        if (userExp.expanded[i] !== corrExp.expanded[i]) {
            corrWrong[corrExp.originalIndex[i]] = true;
        }
    }
    if (corrExp.expanded.length > maxLen) {
        for (let i = maxLen; i < corrExp.expanded.length; i++) {
            corrWrong[corrExp.originalIndex[i]] = true;
        }
    }
    
    let result = [];
    for (let i = 0; i < corrExp.originalWords.length; i++) {
        if (corrWrong[i]) {
            result.push('<span class="highlight-correct-word">' + corrExp.originalWords[i] + '</span>');
        } else {
            result.push(corrExp.originalWords[i]);
        }
    }
    return result.join(' ');
}

function initRandomPage() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    
    const selectGrid = document.getElementById('random-lesson-select');
    selectGrid.innerHTML = '';
    
    const book = books[0];
    const bookLessons = lessons.filter(l => l.bookId === book.id);
    const maxLessonNumber = Math.max(...bookLessons.map(l => l.lessonNumber));

    ['rangeStart', 'rangeEnd'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.max = String(maxLessonNumber);
        }
    });
    
    const savedSelection = JSON.parse(localStorage.getItem('randomLessonSelection') || 'null');
    const defaultChecked = savedSelection ? savedSelection : bookLessons.map(l => l.id);
    
    bookLessons.forEach(lesson => {
        const isChecked = defaultChecked.includes(lesson.id);
        const item = document.createElement('div');
        item.className = 'lesson-select-item';
        item.dataset.lessonId = lesson.id;
        item.innerHTML = '<input type="checkbox" id="select-' + lesson.id + '"' + (isChecked ? ' checked' : '') + '>' +
            '<label for="select-' + lesson.id + '">Lesson ' + lesson.lessonNumber + ': ' + lesson.title + '</label>';
        item.onclick = (e) => {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = item.querySelector('input');
                checkbox.checked = !checkbox.checked;
            }
        };
        selectGrid.appendChild(item);
    });
    
    document.getElementById('random-setup').classList.remove('hidden');
    document.getElementById('random-challenge').classList.add('hidden');
    document.getElementById('random-result').classList.add('hidden');
}

function selectAllLessons() {
    const checkboxes = document.querySelectorAll('#random-lesson-select input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = true);
}

function deselectAllLessons() {
    const checkboxes = document.querySelectorAll('#random-lesson-select input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
}

function setSentenceCount(count) {
    const buttons = document.querySelectorAll('.sentence-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes('setSentenceCount(' + count + ')'));
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    document.getElementById('random-sentence-count').value = count;
}

function selectRangeLessons() {
    const start = parseInt(document.getElementById('rangeStart').value);
    const end = parseInt(document.getElementById('rangeEnd').value);
    const book = books[0];
    const bookLessons = lessons.filter(l => l.bookId === book.id);
    const maxLessonNumber = Math.max(...bookLessons.map(l => l.lessonNumber));
    
    if (isNaN(start) || isNaN(end)) {
        alert('请输入有效的数字范围');
        return;
    }
    
    if (start > end) {
        alert('起始数字不能大于结束数字');
        return;
    }
    
    if (start < 1 || end > maxLessonNumber) {
        alert('范围必须在 1-' + maxLessonNumber + ' 之间');
        return;
    }
    
    deselectAllLessons();

    bookLessons.forEach(lesson => {
        if (lesson.lessonNumber >= start && lesson.lessonNumber <= end) {
            const checkbox = document.getElementById('select-' + lesson.id);
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    });
}

function startQuickChallenge(type) {
    const book = books[0];
    
    const checkboxes = document.querySelectorAll('#random-lesson-select input[type="checkbox"]:checked');
    let selectedLessonIds = Array.from(checkboxes)
        .map(cb => cb.id.substring(7))
        .filter(id => id.length > 0);
    
    if (selectedLessonIds.length === 0) {
        const bookLessons = lessons.filter(l => l.bookId === book.id);
        const shuffled = [...bookLessons];
        shuffleArray(shuffled);
        selectedLessonIds = shuffled.slice(0, Math.min(5, shuffled.length)).map(l => l.id);
    }
    
    localStorage.setItem('randomLessonSelection', JSON.stringify(selectedLessonIds));
    
    const selectedLessons = lessons.filter(l => selectedLessonIds.includes(l.id));
    
    if (selectedLessons.length === 0) {
        alert('暂无课程数据！');
        return;
    }
    
    const sentenceCount = parseInt(document.getElementById('random-sentence-count').value);
    
    let allSentences = [];
    const seenSentences = new Set();
    selectedLessons.forEach(lesson => {
        const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
        const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
        chineseTexts.forEach((chinese, index) => {
            const key = chinese.trim();
            if (!seenSentences.has(key)) {
                seenSentences.add(key);
                allSentences.push({
                    lessonId: lesson.id,
                    lessonNumber: lesson.lessonNumber,
                    lessonTitle: lesson.title,
                    sentenceIndex: index,
                    chinese: chinese,
                    english: englishTexts[index]
                });
            }
        });
    });
    
    shuffleArray(allSentences);
    randomChallengeQuestions = allSentences.slice(0, Math.min(sentenceCount, allSentences.length));
    
    const challengeTypeSelect = document.getElementById('random-challenge-type');
    if (challengeTypeSelect) {
        challengeTypeSelect.value = type;
    }
    
    document.getElementById('random-setup').classList.add('hidden');
    document.getElementById('random-challenge').classList.remove('hidden');
    
    practiceSource = 'random';
    renderRandomChallenge(type);
}

function startRandomChallenge() {
    const checkboxes = document.querySelectorAll('#random-lesson-select input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('请至少选择一篇课文！');
        return;
    }
    
    const selectedLessonIds = Array.from(checkboxes).map(cb => cb.id.replace('select-', ''));
    const sentenceCount = parseInt(document.getElementById('random-sentence-count').value);
    const challengeTypeSelect = document.getElementById('random-challenge-type');
    const challengeType = challengeTypeSelect ? challengeTypeSelect.value : 'dictation';
    
    localStorage.setItem('randomLessonSelection', JSON.stringify(selectedLessonIds));
    
    let allSentences = [];
    const seenSentences = new Set();
    selectedLessonIds.forEach(lessonId => {
        const lesson = lessons.find(l => l.id === lessonId);
        if (lesson) {
            const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
            const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
            chineseTexts.forEach((chinese, index) => {
                const key = chinese.trim();
                if (!seenSentences.has(key)) {
                    seenSentences.add(key);
                    allSentences.push({
                        lessonId: lesson.id,
                        lessonNumber: lesson.lessonNumber,
                        lessonTitle: lesson.title,
                        sentenceIndex: index,
                        chinese: chinese,
                        english: englishTexts[index]
                    });
                }
            });
        }
    });
    
    shuffleArray(allSentences);
    randomChallengeQuestions = allSentences.slice(0, sentenceCount);
    
    document.getElementById('random-setup').classList.add('hidden');
    document.getElementById('random-challenge').classList.remove('hidden');
    
    practiceSource = 'random';
    renderRandomChallenge(challengeType);
}

function renderRandomChallenge(type) {
    const container = document.getElementById('random-question-container');
    
    if (type === 'dictation') {
        container.innerHTML = randomChallengeQuestions.map((q, index) => {
            return '<div class="dictation-sentence-item" data-index="' + index + '">' +
                '<div class="dictation-sentence-header">' +
                    '<div class="sentence-header-left">' +
                        '<span class="sentence-number">第 ' + (index + 1) + ' 题</span>' +
                        '<span class="sentence-source">（Lesson ' + q.lessonNumber + '）</span>' +
                        renderSentenceAudioButton(q.lessonId, q.sentenceIndex) +
                    '</div>' +
                '</div>' +
                '<div class="dictation-chinese-text">' + q.chinese + '</div>' +
                '<div class="dictation-input-wrapper">' +
                    renderEnglishAnswerInput('random-' + index, '请输入对应的英文句子...') +
                '</div>' +
            '</div>';
        }).join('');
    } else {
        container.innerHTML = '<div style="color: #ef4444; font-size: 0.95rem; margin-bottom: 1rem; font-weight: 500;">' +
            '⚠️ 判定规则：勾选"译文"代表错误（需要查看答案），未勾选"译文"代表正确（已掌握）' +
        '</div>' +
        '<div class="translation-sentences-container">' + randomChallengeQuestions.map((q, index) => {
            return '<div class="translation-sentence-item" data-index="' + index + '">' +
                '<div class="translation-sentence-header">' +
                    '<div class="sentence-header-left">' +
                        '<span class="sentence-number">第 ' + (index + 1) + ' 题</span>' +
                        '<span class="sentence-source">（Lesson ' + q.lessonNumber + '）</span>' +
                        renderSentenceAudioButton(q.lessonId, q.sentenceIndex) +
                    '</div>' +
                    '<label class="translation-toggle">' +
                        '<input type="checkbox" id="random-toggle-' + index + '" onchange="toggleRandomTranslation(' + index + ')">' +
                        '<span>译文</span>' +
                    '</label>' +
                '</div>' +
                '<div class="translation-original">' + q.english + '</div>' +
                '<div class="translation-answer" id="random-answer-' + index + '" style="display: none;">' +
                    '<div class="translation-reference">' + q.chinese + '</div>' +
                '</div>' +
            '</div>';
        }).join('') + '</div>';
    }
}

function submitRandomChallenge() {
    const challengeTypeSelect = document.getElementById('random-challenge-type');
    const challengeType = challengeTypeSelect ? challengeTypeSelect.value : 'dictation';
    const container = document.getElementById('random-question-container');
    
    if (challengeType === 'translation') {
        let correctCount = 0;
        const results = [];
        
        randomChallengeQuestions.forEach((q, index) => {
            const checkbox = document.getElementById('random-toggle-' + index);
            const isChecked = checkbox ? checkbox.checked : false;
            const isCorrect = !isChecked;
            
            if (!isCorrect) {
                addMistake({
                    lessonId: q.lessonId,
                    chinese: q.chinese,
                    userAnswer: '需要查看答案',
                    correctAnswer: q.english
                });
            } else {
                correctCount++;
            }
            
            results.push({
                userAnswer: isChecked ? '查看译文' : '已掌握',
                correctAnswer: q.chinese,
                isCorrect: isCorrect,
                index: index
            });
            
            const item = container.querySelector('[data-index="' + index + '"]');
            const answerDiv = document.getElementById('random-answer-' + index);
            
            if (checkbox) {
                checkbox.disabled = true;
            }
            
            if (isCorrect) {
                item.classList.add('translation-correct');
            } else {
                item.classList.add('translation-incorrect');
                if (answerDiv) {
                    answerDiv.style.display = 'block';
                }
            }
        });
        
        const score = Math.round((correctCount / randomChallengeQuestions.length) * 100);
        
        addHistoryRecord({
            lessonId: 'random',
            type: 'random-translation',
            userAnswer: results.map(r => r.userAnswer).join(' | '),
            score: score
        });
        
        let scoreClass = 'need-improve';
        let scoreLabel = '需要加强';
        if (score >= 80) {
            scoreClass = 'good';
            scoreLabel = '优秀！';
        } else if (score >= 60) {
            scoreClass = 'medium';
            scoreLabel = '继续努力';
        }
        
        const resultDiv = document.getElementById('random-result');
        resultDiv.classList.remove('hidden');
        
        resultDiv.innerHTML = 
            '<div class="result-header">' +
                '<div class="score-display ' + scoreClass + '">' + score + '分</div>' +
                '<div class="score-label">' + scoreLabel + '</div>' +
                '<div style="margin-top: 1rem; font-size: 0.95rem; color: #64748b;">' +
                    '正确: ' + correctCount + ' / ' + randomChallengeQuestions.length + ' 句' +
                '</div>' +
                '<div style="margin-top: 1.5rem;">' +
                    '<button class="btn btn-primary" onclick="scrollToTop();initRandomPage()">' +
                        '<i class="fas fa-redo"></i> 再来一次' +
                    '</button>' +
                '</div>' +
            '</div>';
        
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
        return;
    }
    
    let correctCount = 0;
    const results = [];
    
    randomChallengeQuestions.forEach((q, index) => {
        const userAnswer = document.getElementById('random-' + index).value.trim();
        const correctAnswer = q.english;
        const isCorrect = wordsMatch(userAnswer, correctAnswer);
        
        if (!isCorrect) {
            addMistake({
                lessonId: q.lessonId,
                chinese: q.chinese,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            });
        }
        
        if (isCorrect) correctCount++;
        
        results.push({
            userAnswer,
            correctAnswer,
            isCorrect,
            index
        });
    });
    
    const score = Math.round((correctCount / randomChallengeQuestions.length) * 100);
    
    results.forEach(result => {
        const item = container.querySelector('[data-index="' + result.index + '"]');
        const input = item.querySelector('.dictation-input');
        input.disabled = true;
        
        if (result.isCorrect) {
            input.classList.add('correct');
        } else {
            input.classList.add('incorrect');
            
            if (result.userAnswer) {
                const userDiv = document.createElement('div');
                userDiv.className = 'dictation-user';
                userDiv.innerHTML = '<i class="fas fa-user"></i> 您的答案：' + highlightDifferences(result.userAnswer, result.correctAnswer, true);
                item.appendChild(userDiv);
            }
            
            // 无论用户是否答题，都显示正确答案
            const correctDiv = document.createElement('div');
            correctDiv.className = 'dictation-correct';
            correctDiv.innerHTML = '<i class="fas fa-lightbulb"></i> 正确答案：' + highlightCorrectAnswer(result.userAnswer, result.correctAnswer);
            item.appendChild(correctDiv);
        }
    });
    
    addHistoryRecord({
        lessonId: 'random',
        type: 'random-dictation',
        userAnswer: results.map(a => a.userAnswer).join(' | '),
        score: score
    });
    
    let scoreClass = 'need-improve';
    let scoreLabel = '需要加强';
    if (score >= 80) {
        scoreClass = 'good';
        scoreLabel = '优秀！';
    } else if (score >= 60) {
        scoreClass = 'medium';
        scoreLabel = '继续努力';
    }
    
    const resultDiv = document.getElementById('random-result');
    resultDiv.classList.remove('hidden');
    
    resultDiv.innerHTML = 
        '<div class="result-header">' +
            '<div class="score-display ' + scoreClass + '">' + score + '分</div>' +
            '<div class="score-label">' + scoreLabel + '</div>' +
            '<div style="margin-top: 1rem; font-size: 0.95rem; color: #64748b;">' +
                '正确: ' + correctCount + ' / ' + randomChallengeQuestions.length + ' 题' +
            '</div>' +
            '<div style="margin-top: 1.5rem;">' +
                '<button class="btn btn-primary" onclick="scrollToTop();initRandomPage()">' +
                    '<i class="fas fa-redo"></i> 再来一次' +
                '</button>' +
            '</div>' +
        '</div>';
    
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function calculateSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;

    const s1 = str1.toLowerCase().replace(/[^\w\s\u4e00-\u9fa5]/g, '');
    const s2 = str2.toLowerCase().replace(/[^\w\s\u4e00-\u9fa5]/g, '');

    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);

    const set1 = new Set(words1);
    const set2 = new Set(words2);

    let intersection = 0;
    for (const word of set1) {
        if (set2.has(word)) intersection++;
    }

    const union = set1.size + set2.size - intersection;
    if (union === 0) return 0;

    const similarity = (intersection / union) * 100;
    const lenRatio = Math.min(words1.length, words2.length) / Math.max(words1.length, words2.length);

    return Math.round(similarity * 0.7 + lenRatio * 30);
}

function initMistakesPage() {
    const mistakesList = document.getElementById('mistakes-list');
    let mistakes = getMistakes();
    
    const uniqueMistakes = [];
    const seenKeys = new Set();
    
    mistakes.forEach(mistake => {
        const key = mistake.lessonId + '|' + mistake.chinese + '|' + mistake.correctAnswer;
        if (!seenKeys.has(key)) {
            seenKeys.add(key);
            uniqueMistakes.push(mistake);
        }
    });
    
    if (uniqueMistakes.length < mistakes.length) {
        saveMistakes(uniqueMistakes);
    }
    mistakes = uniqueMistakes;
    
    const pendingMasterCount = mistakes.filter(m => m.successCount === 1).length;
    
    if (mistakes.length === 0) {
        mistakesList.innerHTML = 
            '<div class="mistakes-stats" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 1.5rem;">' +
                '<div style="display: flex; gap: 2rem; flex-wrap: wrap;">' +
                    '<div style="text-align: center; min-width: 80px;">' +
                    '<div style="font-size: 2rem; font-weight: bold; color: var(--primary-dark);">0</div>' +
                    '<div style="font-size: 0.85rem; color: var(--text-light);">错题总数</div>' +
                '</div>' +
                '<div style="text-align: center; min-width: 80px;">' +
                    '<div style="font-size: 2rem; font-weight: bold; color: #f59e0b;">0</div>' +
                    '<div style="font-size: 0.85rem; color: var(--text-light);">即将掌握</div>' +
                '</div>' +
                '</div>' +
            '</div>' +
            '<div class="empty-history">' +
                '<i class="fas fa-check-circle"></i>' +
                '<p>暂无错题记录，继续加油！</p>' +
            '</div>';
        return;
    }
    
    mistakesList.innerHTML = 
        '<div class="mistakes-stats" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05)); border: 1px solid rgba(59, 130, 246, 0.2); padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 1.5rem;">' +
            '<div style="display: flex; gap: 2rem; flex-wrap: wrap;">' +
                '<div style="text-align: center; min-width: 80px;">' +
                    '<div style="font-size: 2rem; font-weight: bold; color: var(--primary-dark);">' + mistakes.length + '</div>' +
                '<div style="font-size: 0.85rem; color: var(--text-light);">错题总数</div>' +
            '</div>' +
            '<div style="text-align: center; min-width: 80px;">' +
                '<div style="font-size: 2rem; font-weight: bold; color: #f59e0b;">' + pendingMasterCount + '</div>' +
                '<div style="font-size: 0.85rem; color: var(--text-light);">即将掌握</div>' +
            '</div>' +
            '</div>' +
        '</div>' +
        mistakes.map(mistake => {
            const lesson = lessons.find(l => l.id === mistake.lessonId);
            const date = new Date(mistake.addedAt);
            const dateStr = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            
            const isTranslation = mistake.userAnswer === '需要查看答案' || mistake.userAnswer === '查看译文';
            const wrongCount = mistake.wrongCount || 1;
            const successCount = mistake.successCount || 0;
            const statusText = '错 ' + wrongCount + ' 次 · 已连续答对 ' + successCount + ' 次';
            const statusClass = successCount > 0 ? 'mistake-status warming' : 'mistake-status';
            return '<div class="mistake-item ' + (isTranslation ? 'mistake-translation' : 'mistake-dictation') + '">' +
                '<div class="mistake-header">' +
                    '<div>' +
                        '<div class="mistake-lesson">' + (lesson ? 'Lesson ' + lesson.lessonNumber : '随机练习') + '</div>' +
                        '<div class="' + statusClass + '">' + statusText + '</div>' +
                    '</div>' +
                    '<div class="mistake-date">' + dateStr + '</div>' +
                    '<button class="btn-delete" onclick="deleteMistake(\'' + mistake.id + '\')">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +
                '</div>' +
                '<div class="mistake-content">' +
                    (isTranslation ? 
                        '<div class="mistake-row">' +
                            '<span class="mistake-label">英文：</span>' +
                            '<span class="mistake-text">' + mistake.correctAnswer + '</span>' +
                        '</div>' +
                        '<div class="mistake-row">' +
                            '<span class="mistake-label">正确答案：</span>' +
                            '<span class="mistake-text mistake-correct">' + mistake.chinese + '</span>' +
                        '</div>' : 
                        '<div class="mistake-row">' +
                            '<span class="mistake-label">中文：</span>' +
                            '<span class="mistake-text">' + mistake.chinese + '</span>' +
                        '</div>' +
                        '<div class="mistake-row">' +
                            '<span class="mistake-label">您的答案：</span>' +
                            '<span class="mistake-text mistake-incorrect">' + mistake.userAnswer + '</span>' +
                        '</div>' +
                        '<div class="mistake-row">' +
                            '<span class="mistake-label">正确答案：</span>' +
                            '<span class="mistake-text mistake-correct">' + mistake.correctAnswer + '</span>' +
                        '</div>'
                    ) +
                '</div>' +
            '</div>';
        }).join('');
}

function deleteMistake(mistakeId) {
    removeMistake(mistakeId);
    initMistakesPage();
}

let mistakesChallengeQuestions = [];
let mistakesChallengeCorrectIds = [];

function startMistakesChallenge() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    
    const allMistakes = getMistakes();
    if (allMistakes.length === 0) {
        alert('暂无错题记录，继续加油！');
        return;
    }
    
    const shuffled = [...allMistakes];
    shuffleArray(shuffled);
    mistakesChallengeQuestions = shuffled.slice(0, Math.min(5, shuffled.length));
    mistakesChallengeCorrectIds = [];
    
    navigate('mistakes-challenge');
}

function initMistakesChallengePage() {
    const container = document.getElementById('mistakes-challenge-container');
    if (!container) {
        console.error('Container mistakes-challenge-container not found');
        return;
    }
    
    const resultDiv = document.getElementById('mistakes-challenge-result');
    
    if (resultDiv) {
        resultDiv.classList.add('hidden');
    }
    
    container.innerHTML = mistakesChallengeQuestions.map((mistake, index) => {
        const sentenceIndex = findLessonSentenceIndex(mistake.lessonId, mistake.correctAnswer);
        return '<div class="dictation-sentence-item" data-index="' + index + '">' +
            '<div class="dictation-sentence-header">' +
                '<div class="sentence-header-left">' +
                    '<span class="sentence-number">第 ' + (index + 1) + ' 题</span>' +
                    renderSentenceAudioButton(mistake.lessonId, sentenceIndex) +
                '</div>' +
            '</div>' +
            '<div class="dictation-chinese-text">' + mistake.chinese + '</div>' +
            '<div class="dictation-input-wrapper">' +
                renderEnglishAnswerInput('mistakes-challenge-' + index, '请输入英文翻译') +
            '</div>' +
        '</div>';
    }).join('') +
    '<div class="action-buttons" style="margin-top: 1.5rem;">' +
        '<button class="btn btn-primary" onclick="submitMistakesChallenge()">' +
            '<i class="fas fa-check"></i> 提交答案' +
        '</button>' +
    '</div>';
}

function submitMistakesChallenge() {
    const container = document.getElementById('mistakes-challenge-container');
    let correctCount = 0;
    const results = [];
    
    mistakesChallengeQuestions.forEach((mistake, index) => {
        const userAnswer = document.getElementById('mistakes-challenge-' + index).value.trim();
        const isCorrect = wordsMatch(userAnswer, mistake.correctAnswer);
        
        if (isCorrect) {
            correctCount++;
            mistakesChallengeCorrectIds.push(mistake.id);
        }
        
        results.push({
            userAnswer,
            correctAnswer: mistake.correctAnswer,
            isCorrect,
            index,
            mistakeId: mistake.id,
            mistake: mistake
        });
    });
    
    results.forEach(result => {
        const item = container.querySelector('[data-index="' + result.index + '"]');
        const input = item.querySelector('.dictation-input');
        input.disabled = true;
        
        if (result.isCorrect) {
            input.classList.add('correct');
        } else {
            input.classList.add('incorrect');
            
            if (result.userAnswer) {
                const userDiv = document.createElement('div');
                userDiv.className = 'dictation-user';
                userDiv.innerHTML = '<i class="fas fa-user"></i> 您的答案：' + highlightDifferences(result.userAnswer, result.correctAnswer, true);
                item.appendChild(userDiv);
            }
            
            const correctDiv = document.createElement('div');
            correctDiv.className = 'dictation-correct';
            correctDiv.innerHTML = '<i class="fas fa-lightbulb"></i> 正确答案：' + highlightCorrectAnswer(result.userAnswer, result.correctAnswer);
            item.appendChild(correctDiv);
        }
    });
    
    const score = Math.round((correctCount / mistakesChallengeQuestions.length) * 100);
    document.getElementById('mistakes-challenge-score').textContent = score + '分';
    
    let label = '继续努力';
    if (score >= 80) {
        label = '优秀！';
    } else if (score >= 60) {
        label = '不错！';
    }
    document.getElementById('mistakes-challenge-label').textContent = label;
    
    updateMistakesSuccessCount(mistakesChallengeCorrectIds);
    
    document.getElementById('mistakes-challenge-result').classList.remove('hidden');
    
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, document.body.scrollHeight);
    }, 100);
}

function updateMistakesSuccessCount(mistakeIds) {
    let mistakes = getMistakes();
    let removedCount = 0;
    
    mistakes = mistakes.filter(mistake => {
        if (mistakeIds.includes(mistake.id)) {
            mistake.successCount = (mistake.successCount || 0) + 1;
            if (mistake.successCount >= 2) {
                removedCount++;
                return false;
            }
        }
        return true;
    });
    
    saveMistakes(mistakes);
    
    if (removedCount > 0) {
        alert('太棒了！' + removedCount + ' 道错题已掌握，已从错题集中移除！');
    }
}

function initHistoryPage() {
    const historyList = document.getElementById('history-list');
    const history = getHistory();

    if (history.length === 0) {
        historyList.innerHTML = 
            '<div class="empty-history">' +
                '<i class="fas fa-history"></i>' +
                '<p>暂无学习记录，开始您的学习之旅吧！</p>' +
            '</div>';
        return;
    }

    historyList.innerHTML = history.map(record => {
        const lesson = lessons.find(l => l.id === record.lessonId);
        const book = lesson ? books.find(b => b.id === lesson.bookId) : null;

        let scoreClass = 'need-improve';
        if (record.score >= 80) {
            scoreClass = 'good';
        } else if (record.score >= 60) {
            scoreClass = 'medium';
        }

        const date = new Date(record.completedAt);
        const dateStr = date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        let lessonTitle;
        let typeIcon;
        let typeText;
        
        if (record.lessonId === 'random') {
            lessonTitle = '随机挑战';
            if (record.type === 'random-dictation') {
                typeIcon = 'fa-dice';
                typeText = '随机默写';
            } else {
                typeIcon = 'fa-dice';
                typeText = '随机翻译';
            }
        } else {
            lessonTitle = lesson ? 'Lesson ' + lesson.lessonNumber + ': ' + lesson.title : '未知课程';
            typeIcon = record.type === 'translation' ? 'fa-pen-fancy' : 'fa-keyboard';
            typeText = record.type === 'translation' ? '翻译挑战' : '默写挑战';
        }

        return '<div class="history-item">' +
            '<div class="history-info">' +
                '<div class="history-lesson-title">' + lessonTitle + '</div>' +
                '<div class="history-meta">' +
                    '<span class="history-type">' +
                        '<i class="fas ' + typeIcon + '"></i>' +
                        typeText +
                    '</span>' +
                    '<span><i class="fas fa-clock"></i> ' + dateStr + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="history-score ' + scoreClass + '">' +
                record.score + '分' +
            '</div>' +
        '</div>';
    }).join('');
}
