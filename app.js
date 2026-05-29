let currentBookId = null;
let currentLessonId = null;
let lastPage = 'home';
let selectedLessons = [];
let randomChallengeQuestions = [];
let practiceSource = null;

function saveMistakes(newMistakes) {
    mistakes = newMistakes;
    saveUserData();
}

document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
});

function checkLogin() {
    loadUserData();
    if (currentUserId && currentUser) {
        updateNavUser();
        initHomePage();
        navigate('home');
    } else {
        navigate('login');
    }
}

function updateNavUser() {
    const navUser = document.getElementById('navUser');
    const userName = document.getElementById('userName');
    if (!navUser || !userName) return;
    if (currentUser) {
        navUser.style.display = 'flex';
        userName.textContent = currentUser.username;
    } else {
        navUser.style.display = 'none';
    }
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
    navigate('login');
}

let pageHistory = [];

function navigate(page, data = null) {
    if (page !== 'login' && !currentUser) {
        navigate('login');
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

function initHomePage() {
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

function initCoursePage(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById('course-title').textContent = book.title;

    const lessonList = document.getElementById('lesson-list');
    lessonList.innerHTML = '';

    const bookLessons = lessons.filter(l => l.bookId === bookId);

    for (let i = 1; i <= book.lessons; i++) {
        const lesson = bookLessons.find(l => l.lessonNumber === i);
        const item = document.createElement('div');
        item.className = 'lesson-item ' + (i % 2 === 1 ? 'lesson-odd' : 'lesson-even');
        if (lesson) {
            item.textContent = 'Lesson ' + i + ': ' + lesson.title;
            item.onclick = () => showLessonDetail(lesson.id);
        } else {
            item.textContent = 'Lesson ' + i;
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
    
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
    
    const englishText = englishTexts.join(' ');
    const chineseText = chineseTexts.join(' ');

    const lessonDetail = document.getElementById('lesson-detail');
    lessonDetail.innerHTML = 
        '<div class="lesson-detail-header">' +
            '<div class="lesson-detail-title">Lesson ' + lesson.lessonNumber + ': ' + lesson.title + '</div>' +
            '<div class="lesson-detail-meta">' +
                '<i class="fas fa-book"></i> ' + (book ? book.title : '') +
            '</div>' +
        '</div>' +
        '<div class="text-block">' +
            '<h3><i class="fas fa-language"></i> 英文原文</h3>' +
            '<div class="text-content en">' + englishText + '</div>' +
        '</div>' +
        '<div class="text-block">' +
            '<h3><i class="fas fa-globe"></i> 中文翻译</h3>' +
            '<div class="text-content">' + chineseText + '</div>' +
        '</div>' +
        '<div class="practice-actions">' +
            '<button class="btn btn-primary" onclick="navigate(\'translation\', { lessonId: \'' + lesson.id + '\' })">' +
                '<i class="fas fa-pen-fancy"></i> 翻译挑战' +
            '</button>' +
            '<button class="btn btn-primary" onclick="navigate(\'dictation\', { lessonId: \'' + lesson.id + '\' })">' +
                '<i class="fas fa-keyboard"></i> 默写挑战' +
            '</button>' +
        '</div>';
}

function initTranslationPage(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    const container = document.getElementById('translation-sentences-container');
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];

    container.innerHTML = englishTexts.map((english, index) => {
        return '<div class="translation-sentence-item" data-index="' + index + '">' +
            '<div class="translation-sentence-header">' +
                '<span class="sentence-number">第 ' + (index + 1) + ' 句</span>' +
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
        const userAnswer = document.getElementById('translation-' + i).value.trim();
        const correctAnswer = chineseTexts[i];
        const isCorrect = userAnswer === correctAnswer;
        
        if (!isCorrect) {
            addMistake({
                lessonId: currentLessonId,
                chinese: correctAnswer,
                userAnswer: userAnswer,
                correctAnswer: englishTexts[i]
            });
        } else {
            correctCount++;
        }
        
        translationAnswers.push({
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
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
}

function showTranslationResult(translationAnswers, correctCount, totalCount, score) {
    const container = document.getElementById('translation-sentences-container');
    
    translationAnswers.forEach(answer => {
        const item = container.querySelector('[data-index="' + answer.index + '"]');
        const input = item.querySelector('.translation-input');
        input.disabled = true;
        
        if (answer.isCorrect) {
            input.classList.add('correct');
        } else {
            input.classList.add('incorrect');
            
            const correctDiv = document.createElement('div');
            correctDiv.className = 'dictation-correct';
            correctDiv.innerHTML = '<i class="fas fa-lightbulb"></i> 正确答案：' + answer.correctAnswer;
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

    const resultDiv = document.getElementById('translation-result');
    resultDiv.classList.remove('hidden');
    
    resultDiv.innerHTML = 
        '<div class="result-header">' +
            '<div class="score-display ' + scoreClass + '">' + score + '分</div>' +
            '<div class="score-label">' + scoreLabel + '</div>' +
            '<div style="margin-top: 1rem; font-size: 0.95rem; color: #64748b;">' +
                '正确: ' + correctCount + ' / ' + totalCount + ' 句' +
            '</div>' +
        '</div>';
}

function initDictationPage(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    const container = document.getElementById('dictation-container');
    const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
    const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];

    container.innerHTML = chineseTexts.map((chinese, index) => {
        return '<div class="dictation-sentence-item" data-index="' + index + '">' +
            '<div class="dictation-sentence-header">' +
                '<span class="sentence-number">第 ' + (index + 1) + ' 句</span>' +
            '</div>' +
            '<div class="dictation-chinese-text">' + chinese + '</div>' +
            '<div class="dictation-input-wrapper">' +
                '<input type="text" class="dictation-input" id="dictation-' + index + '" placeholder="请输入对应的英文句子...">' +
            '</div>' +
        '</div>';
    }).join('');

    document.getElementById('dictation-result').classList.add('hidden');
}

function removeIgnoredPunctuation(str) {
    return str.replace(/[^a-zA-Z0-9\s']/g, '').trim();
}

const CONTRACTION_MAP = {
    "here's": "here is", "there's": "there is", "it's": "it is",
    "that's": "that is", "what's": "what is", "he's": "he is",
    "she's": "she is", "who's": "who is", "where's": "where is",
    "how's": "how is", "i'm": "i am", "you're": "you are",
    "we're": "we are", "they're": "they are", "isn't": "is not",
    "aren't": "are not", "don't": "do not", "doesn't": "does not",
    "can't": "can not", "won't": "will not", "didn't": "did not",
    "wasn't": "was not", "weren't": "were not", "haven't": "have not",
    "hasn't": "has not", "hadn't": "had not", "couldn't": "could not",
    "wouldn't": "would not", "shouldn't": "should not", "mustn't": "must not",
    "let's": "let us", "i'll": "i will", "you'll": "you will",
    "he'll": "he will", "she'll": "she will", "we'll": "we will",
    "they'll": "they will", "i'd": "i would", "i've": "i have",
    "you've": "you have", "we've": "we have", "they've": "they have"
};

const CONTRACTION_KEYS_SORTED = Object.keys(CONTRACTION_MAP).sort((a, b) => b.length - a.length);
const CONTRACTION_REGEX = new RegExp('\\b(' + CONTRACTION_KEYS_SORTED.join('|') + ')\\b', 'g');

function normalizeText(str) {
    let text = removeIgnoredPunctuation(str).toLowerCase();
    return text.replace(CONTRACTION_REGEX, match => CONTRACTION_MAP[match]);
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

    const resultDiv = document.getElementById('dictation-result');
    resultDiv.classList.remove('hidden');
    
    resultDiv.innerHTML = 
        '<div class="result-header">' +
            '<div class="score-display ' + scoreClass + '">' + score + '分</div>' +
            '<div class="score-label">' + scoreLabel + '</div>' +
            '<div style="margin-top: 1rem; font-size: 0.95rem; color: #64748b;">' +
                '正确: ' + correctCount + ' / ' + totalCount + ' 句' +
            '</div>' +
            '<div style="margin-top: 1.5rem;">' +
                '<button class="btn btn-primary" onclick="initDictationPage(\'' + currentLessonId + '\')">' +
                    '<i class="fas fa-redo"></i> 再来一次' +
                '</button>' +
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
    const selectGrid = document.getElementById('random-lesson-select');
    selectGrid.innerHTML = '';
    
    const book = books[0];
    const bookLessons = lessons.filter(l => l.bookId === book.id);
    
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
    
    if (isNaN(start) || isNaN(end)) {
        alert('请输入有效的数字范围');
        return;
    }
    
    if (start > end) {
        alert('起始数字不能大于结束数字');
        return;
    }
    
    if (start < 1 || end > 50) {
        alert('范围必须在 1-50 之间');
        return;
    }
    
    deselectAllLessons();
    
    const book = books[0];
    const bookLessons = lessons.filter(l => l.bookId === book.id);
    
    bookLessons.forEach((lesson, index) => {
        const lessonNum = index + 1;
        if (lessonNum >= start && lessonNum <= end) {
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
        const shuffled = [...bookLessons].sort(() => Math.random() - 0.5);
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
    const challengeType = document.getElementById('random-challenge-type').value;
    
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
                    '<span class="sentence-number">第 ' + (index + 1) + ' 题</span>' +
                    '<span class="sentence-source">（Lesson ' + q.lessonNumber + '）</span>' +
                '</div>' +
                '<div class="dictation-chinese-text">' + q.chinese + '</div>' +
                '<div class="dictation-input-wrapper">' +
                    '<input type="text" class="dictation-input" id="random-' + index + '" placeholder="请输入对应的英文句子...">' +
                '</div>' +
            '</div>';
        }).join('');
    } else {
        container.innerHTML = '<div class="translation-sentences-container">' + randomChallengeQuestions.map((q, index) => {
            return '<div class="translation-sentence-item" data-index="' + index + '">' +
                '<div class="translation-sentence-header">' +
                    '<div>' +
                        '<span class="sentence-number">第 ' + (index + 1) + ' 题</span>' +
                        '<span class="sentence-source">（Lesson ' + q.lessonNumber + '）</span>' +
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
        randomChallengeQuestions.forEach((q, index) => {
            const answerDiv = document.getElementById('random-answer-' + index);
            if (answerDiv) {
                answerDiv.style.display = 'block';
            }
        });
        
        addHistoryRecord({
            lessonId: 'random',
            type: 'random-translation',
            userAnswer: 'viewed',
            score: 0
        });
        
        const resultDiv = document.getElementById('random-result');
        resultDiv.classList.remove('hidden');
        
        resultDiv.innerHTML = 
            '<div class="result-header">' +
                '<div style="margin-top: 1.5rem;">' +
                    '<button class="btn btn-primary" onclick="initRandomPage()">' +
                        '<i class="fas fa-redo"></i> 再来一次' +
                    '</button>' +
                '</div>' +
            '</div>';
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
                '<button class="btn btn-primary" onclick="initRandomPage()">' +
                    '<i class="fas fa-redo"></i> 再来一次' +
                '</button>' +
            '</div>' +
        '</div>';
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
            
            return '<div class="mistake-item">' +
                '<div class="mistake-header">' +
                    '<div class="mistake-lesson">' + (lesson ? 'Lesson ' + lesson.lessonNumber : '随机练习') + '</div>' +
                    '<div class="mistake-date">' + dateStr + '</div>' +
                    '<button class="btn-delete" onclick="deleteMistake(\'' + mistake.id + '\')">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +
                '</div>' +
                '<div class="mistake-content">' +
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
                    '</div>' +
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
    const allMistakes = getMistakes();
    if (allMistakes.length === 0) {
        alert('暂无错题记录，继续加油！');
        return;
    }
    
    const shuffled = [...allMistakes].sort(() => Math.random() - 0.5);
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
        return '<div class="dictation-sentence-item" data-index="' + index + '">' +
            '<div class="dictation-sentence-header">' +
                '<span class="sentence-number">第 ' + (index + 1) + ' 题</span>' +
            '</div>' +
            '<div class="dictation-chinese-text">' + mistake.chinese + '</div>' +
            '<div class="dictation-input-wrapper">' +
                '<input type="text" class="dictation-input" id="mistakes-challenge-' + index + '" placeholder="请输入英文翻译">' +
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
