let currentBookId = null;
let currentLessonId = null;
let lastPage = 'home';
let selectedLessons = [];
let randomChallengeQuestions = [];

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

function navigate(page, data = null) {
    if (page !== 'login' && !currentUser) {
        navigate('login');
        return;
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
            if (data && data.lessonId) {
                currentLessonId = data.lessonId;
                initTranslationPage(data.lessonId);
            }
            break;
        case 'dictation':
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
        case 'history':
            initHistoryPage();
            break;
    }

    if (page !== 'login') {
        lastPage = page;
    }
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
        item.className = 'lesson-item';
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
        const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        
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
            
            const correctDiv = document.createElement('div');
            correctDiv.className = 'dictation-correct';
            correctDiv.innerHTML = '<i class="fas fa-lightbulb"></i> 正确答案：' + highlightDifferences(answer.userAnswer, answer.correctAnswer);
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
        '</div>';
}

function highlightDifferences(userInput, correctAnswer, isEnglish = true) {
    const userWords = userInput.toLowerCase().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().split(/\s+/);
    const correctWordsOriginal = correctAnswer.split(/\s+/);
    
    if (isEnglish) {
        let result = [];
        const userWordsOriginal = userInput.split(/\s+/);
        for (let i = 0; i < userWordsOriginal.length; i++) {
            if (i < correctWords.length && userWords[i] === correctWords[i]) {
                result.push(userWordsOriginal[i]);
            } else {
                result.push('<span class="highlight-incorrect">' + userWordsOriginal[i] + '</span>');
            }
        }
        return result.join(' ');
    } else {
        let result = [];
        const userWordsOriginal = userInput.split('');
        for (let i = 0; i < correctWordsOriginal.length; i++) {
            if (i < userWordsOriginal.length && userWordsOriginal[i] === correctWordsOriginal[i]) {
                result.push(correctWordsOriginal[i]);
            } else {
                result.push('<span class="highlight-correct">' + correctWordsOriginal[i] + '</span>');
            }
        }
        return result.join('');
    }
}

function initRandomPage() {
    const selectGrid = document.getElementById('random-lesson-select');
    selectGrid.innerHTML = '';
    
    const book = books[0];
    const bookLessons = lessons.filter(l => l.bookId === book.id);
    
    bookLessons.forEach(lesson => {
        const item = document.createElement('div');
        item.className = 'lesson-select-item';
        item.dataset.lessonId = lesson.id;
        item.innerHTML = '<input type="checkbox" id="select-' + lesson.id + '" checked>' +
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

function startRandomChallenge() {
    const checkboxes = document.querySelectorAll('#random-lesson-select input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('请至少选择一篇课文！');
        return;
    }
    
    const selectedLessonIds = Array.from(checkboxes).map(cb => cb.id.replace('select-', ''));
    const sentenceCount = parseInt(document.getElementById('random-sentence-count').value);
    const challengeType = document.getElementById('random-challenge-type').value;
    
    let allSentences = [];
    selectedLessonIds.forEach(lessonId => {
        const lesson = lessons.find(l => l.id === lessonId);
        if (lesson) {
            const chineseTexts = Array.isArray(lesson.chineseText) ? lesson.chineseText : [lesson.chineseText];
            const englishTexts = Array.isArray(lesson.englishText) ? lesson.englishText : [lesson.englishText];
            chineseTexts.forEach((chinese, index) => {
                allSentences.push({
                    lessonId: lesson.id,
                    lessonNumber: lesson.lessonNumber,
                    lessonTitle: lesson.title,
                    chinese: chinese,
                    english: englishTexts[index]
                });
            });
        }
    });
    
    shuffleArray(allSentences);
    randomChallengeQuestions = allSentences.slice(0, sentenceCount);
    
    document.getElementById('random-setup').classList.add('hidden');
    document.getElementById('random-challenge').classList.remove('hidden');
    
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
    const challengeType = document.getElementById('random-challenge-type').value;
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
        const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        
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
            const correctDiv = document.createElement('div');
            correctDiv.className = 'dictation-correct';
            correctDiv.innerHTML = '<i class="fas fa-lightbulb"></i> 正确答案：' + highlightDifferences(result.userAnswer, result.correctAnswer, true);
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
    const mistakes = getMistakes();
    
    if (mistakes.length === 0) {
        mistakesList.innerHTML = 
            '<div class="empty-history">' +
                '<i class="fas fa-check-circle"></i>' +
                '<p>暂无错题记录，继续加油！</p>' +
            '</div>';
        return;
    }
    
    mistakesList.innerHTML = mistakes.map(mistake => {
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
    if (confirm('确定要删除这条错题记录吗？')) {
        removeMistake(mistakeId);
        initMistakesPage();
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
