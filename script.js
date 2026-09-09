// ===== LESSON DATA =====
const lessonsData = {
    scratch: {
        icon: '🧩',
        title: 'اسکرچ جادویی',
        level: 'مبتدی',
        levelColor: '#FF6B6B',
        duration: '۴ جلسه',
        exercises: '۸ تمرین',
        output: 'ساخت انیمیشن گربه راه‌رونده با بلوک‌های اسکرچ',
        code: 'وقتی پرچم سبز کلیک شد → برای همیشه → ۱۰ قدم حرکت کن → اگر لبه رسید برگرد',
        content: `
            <h3>🎯 اسکرچ چیه؟</h3>
            <p>اسکرچ یه زبان برنامه‌نویسی <strong>تصویری</strong> و <strong>بلوکی</strong> هست که توسط <strong>MIT</strong> ساخته شده.</p>
            <div class="example-box">
                <strong>✨ خروجی این دوره:</strong> ساخت انیمیشن گربه راه‌رونده 🐱
            </div>
            <h3>🧱 بلوک‌های اصلی اسکرچ</h3>
            <ul>
                <li><strong>🔵 حرکت (Motion):</strong> برای حرکت دادن شخصیت‌ها</li>
                <li><strong>🟣 ظاهر (Looks):</strong> برای تغییر شکل یا گفتن جمله</li>
                <li><strong>🟡 صدا (Sound):</strong> برای پخش موسیقی و صدا</li>
                <li><strong>🟠 کنترل (Control):</strong> برای تکرار و شرط‌ها</li>
            </ul>
            <div class="output-box">📤 <strong>خروجی:</strong> ساخت انیمیشن گربه راه‌رونده با بلوک‌های اسکرچ</div>
            <div class="code-box">
                <span class="comment">// ساختار کد اسکرچ</span>
                <span class="keyword">وقتی پرچم سبز کلیک شد</span>
                <span class="keyword">برای همیشه</span> {
                    ۱۰ قدم حرکت کن
                    <span class="keyword">اگر</span> (لبه رسید) {
                        برگرد
                    }
                }
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    scratch2: {
        icon: '🎮',
        title: 'ساخت بازی با اسکرچ',
        level: 'متوسط',
        levelColor: '#4ECDC4',
        duration: '۶ جلسه',
        exercises: '۱۰ تمرین',
        output: 'بازی مار (Snake) کامل با امتیازدهی',
        code: 'وقتی پرچم سبز کلیک شد → متغیر امتیاز = ۰ → برای همیشه → اگر کلید ← فشار داده شد به چپ بچرخ → ۵ قدم حرکت کن',
        content: `
            <h3>🎮 بازی‌سازی با اسکرچ</h3>
            <p>توی این دوره ۳ تا بازی معروف رو می‌سازیم: مار، مسابقه و ماز.</p>
            <div class="example-box">
                <strong>🎮 خروجی این دوره:</strong> بازی مار (Snake) کامل با امتیازدهی 🐍
            </div>
            <h3>🐍 بازی مار</h3>
            <ul>
                <li>یک مار با چند تا بخش درست کن</li>
                <li>با کلیدهای جهت‌دار مار رو حرکت بده</li>
                <li>هر وقت مار سیب خورد، بزرگتر بشه</li>
            </ul>
            <div class="output-box">📤 <strong>خروجی:</strong> بازی مار (Snake) کامل با امتیازدهی</div>
            <div class="code-box">
                <span class="comment">// ایده کد برای بازی مار</span>
                <span class="keyword">وقتی پرچم سبز کلیک شد</span>
                <span class="keyword">متغیر</span> <span class="function">امتیاز</span> = ۰
                <span class="keyword">برای همیشه</span> {
                    <span class="keyword">اگر</span> (کلید ← فشار داده شد) { به چپ بچرخ }
                    <span class="keyword">اگر</span> (کلید → فشار داده شد) { به راست بچرخ }
                    ۵ قدم حرکت کن
                }
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    python: {
        icon: '🐍',
        title: 'پایتون بازیگوش',
        level: 'متوسط',
        levelColor: '#FFA94D',
        duration: '۸ جلسه',
        exercises: '۱۲ تمرین',
        output: 'برنامه ماشین حساب با چهار عمل اصلی',
        code: 'def calc(a, b, op): if op == "+": return a + b elif op == "-": return a - b',
        content: `
            <h3>🐍 پایتون چیه؟</h3>
            <p>پایتون یه زبان برنامه‌نویسی <strong>متنی</strong> و <strong>ساده</strong> هست.</p>
            <div class="example-box">
                <strong>📝 خروجی این دوره:</strong> برنامه ماشین حساب با چهار عمل اصلی 🧮
            </div>
            <h3>📝 اولین کد پایتون</h3>
            <div class="code-box">
                <span class="comment"># اولین برنامه</span>
                <span class="keyword">print</span>(<span class="string">"سلام کدیار!"</span>)
            </div>
            <div class="output-box">📤 <strong>خروجی:</strong> برنامه ماشین حساب با چهار عمل اصلی</div>
            <div class="code-box">
                <span class="keyword">def</span> <span class="function">calc</span>(a, b, op):
                    <span class="keyword">if</span> op == <span class="string">"+"</span>:
                        <span class="keyword">return</span> a + b
                    <span class="keyword">elif</span> op == <span class="string">"-"</span>:
                        <span class="keyword">return</span> a - b
                    <span class="keyword">elif</span> op == <span class="string">"*"</span>:
                        <span class="keyword">return</span> a * b
                    <span class="keyword">elif</span> op == <span class="string">"/"</span>:
                        <span class="keyword">return</span> a / b
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    web: {
        icon: '🌐',
        title: 'ساخت وب‌سایت',
        level: 'متوسط',
        levelColor: '#2ECC71',
        duration: '۶ جلسه',
        exercises: '۱۰ تمرین',
        output: 'وب‌سایت شخصی با HTML, CSS و JS',
        code: '<!DOCTYPE html><html><head><title>کدیار</title></head><body><h1>سلام</h1></body></html>',
        content: `
            <h3>🌐 وب‌سایت چیه؟</h3>
            <p>وب‌سایت‌ها از سه تا زبون اصلی ساخته میشن: <strong>HTML</strong>، <strong>CSS</strong> و <strong>JavaScript</strong>.</p>
            <div class="example-box">
                <strong>🌐 خروجی این دوره:</strong> وب‌سایت شخصی کامل 🌟
            </div>
            <h3>📄 HTML — اسکلت وب‌سایت</h3>
            <div class="code-box">
                &lt;!DOCTYPE html&gt;
                &lt;html&gt;
                &lt;head&gt;&lt;title&gt;کدیار&lt;/title&gt;&lt;/head&gt;
                &lt;body&gt;
                    &lt;h1&gt;سلام کدیار! 🧙‍♂️&lt;/h1&gt;
                &lt;/body&gt;
                &lt;/html&gt;
            </div>
            <div class="output-box">📤 <strong>خروجی:</strong> وب‌سایت شخصی با HTML, CSS و JS</div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    algorithm: {
        icon: '🤖',
        title: 'الگوریتم و ربات‌سازی',
        level: 'پیشرفته',
        levelColor: '#FF8A5C',
        duration: '۵ جلسه',
        exercises: '۸ تمرین',
        output: 'الگوریتم مرتب‌سازی اعداد (بابل سورت)',
        code: 'for i in range(n): for j in range(0, n-i-1): if arr[j] > arr[j+1]: swap',
        content: `
            <h3>🤖 الگوریتم چیه؟</h3>
            <p>الگوریتم یعنی یه <strong>دستورالعمل گام‌به‌گام</strong> برای حل یه مسئله.</p>
            <div class="example-box">
                <strong>🤖 خروجی این دوره:</strong> الگوریتم مرتب‌سازی اعداد 📊
            </div>
            <div class="output-box">📤 <strong>خروجی:</strong> الگوریتم مرتب‌سازی اعداد (بابل سورت)</div>
            <div class="code-box">
                <span class="keyword">for</span> i <span class="keyword">in</span> range(n):
                    <span class="keyword">for</span> j <span class="keyword">in</span> range(<span class="number">0</span>, n-i-<span class="number">1</span>):
                        <span class="keyword">if</span> arr[j] > arr[j+<span class="number">1</span>]:
                            arr[j], arr[j+<span class="number">1</span>] = arr[j+<span class="number">1</span>], arr[j]
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    gamejs: {
        icon: '🕹️',
        title: 'بازی‌سازی با جاوااسکریپت',
        level: 'پیشرفته',
        levelColor: '#6C5CE7',
        duration: '۷ جلسه',
        exercises: '۱۲ تمرین',
        output: 'بازی حدس عدد کامل با جاوااسکریپت',
        code: 'let secret = Math.floor(Math.random() * 100) + 1; function checkGuess() { ... }',
        content: `
            <h3>🕹️ بازی‌سازی با جاوااسکریپت</h3>
            <p>با جاوااسکریپت و HTML می‌تونی بازی‌های تعاملی بسازی!</p>
            <div class="example-box">
                <strong>🎮 خروجی این دوره:</strong> بازی حدس عدد کامل 🎯
            </div>
            <div class="output-box">📤 <strong>خروجی:</strong> بازی حدس عدد کامل با جاوااسکریپت</div>
            <div class="code-box">
                <span class="keyword">let</span> secret = Math.<span class="function">floor</span>(Math.<span class="function">random</span>() * <span class="number">100</span>) + <span class="number">1</span>;
                <span class="keyword">function</span> <span class="function">checkGuess</span>() {
                    <span class="keyword">let</span> guess = <span class="function">parseInt</span>(<span class="function">document</span>.<span class="function">getElementById</span>(<span class="string">'guess'</span>).value);
                    <span class="keyword">if</span> (guess === secret) <span class="function">alert</span>(<span class="string">'🎉 درست!'</span>);
                    <span class="keyword">else if</span> (guess < secret) <span class="function">alert</span>(<span class="string">'📈 بالاتر!'</span>);
                    <span class="keyword">else</span> <span class="function">alert</span>(<span class="string">'📉 پایین‌تر!'</span>);
                }
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    ai: {
        icon: '💡',
        title: 'هوش مصنوعی',
        level: 'حرفه‌ای',
        levelColor: '#FD79A8',
        duration: '۸ جلسه',
        exercises: '۱۰ تمرین',
        output: 'چت‌بات ساده با پاسخ‌های شرطی',
        code: 'function getReply(msg) { if(msg.includes("سلام")) return "سلام!"; else return "چیزی یادم نیست"; }',
        content: `
            <h3>💡 هوش مصنوعی چیه؟</h3>
            <p>هوش مصنوعی یعنی ماشین‌ها رو <strong>باهوش</strong> کنیم!</p>
            <div class="example-box">
                <strong>🤖 خروجی این دوره:</strong> چت‌بات ساده با پاسخ‌های شرطی 💬
            </div>
            <div class="output-box">📤 <strong>خروجی:</strong> چت‌بات ساده با پاسخ‌های شرطی</div>
            <div class="code-box">
                <span class="keyword">function</span> <span class="function">getReply</span>(msg) {
                    <span class="keyword">if</span> (msg.<span class="function">includes</span>(<span class="string">"سلام"</span>)) <span class="keyword">return</span> <span class="string">"سلام! 😊"</span>;
                    <span class="keyword">else if</span> (msg.<span class="function">includes</span>(<span class="string">"اسمت"</span>)) <span class="keyword">return</span> <span class="string">"کدیار! 🧙‍♂️"</span>;
                    <span class="keyword">else</span> <span class="keyword">return</span> <span class="string">"چیزی یادم نیست 😅"</span>;
                }
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    },
    app: {
        icon: '📱',
        title: 'ساخت اپلیکیشن موبایل',
        level: 'حرفه‌ای',
        levelColor: '#00CEC9',
        duration: '۶ جلسه',
        exercises: '۸ تمرین',
        output: 'اپلیکیشن یادداشت‌ها با ذخیره‌سازی',
        code: 'let notes = []; function addNote() { notes.push({text: input, date: new Date()}); }',
        content: `
            <h3>📱 اپلیکیشن موبایل چیه؟</h3>
            <p>با جاوااسکریپت می‌تونی برای گوشی اپلیکیشن بسازی!</p>
            <div class="example-box">
                <strong>📱 خروجی این دوره:</strong> اپلیکیشن یادداشت‌ها 📝
            </div>
            <div class="output-box">📤 <strong>خروجی:</strong> اپلیکیشن یادداشت‌ها با ذخیره‌سازی</div>
            <div class="code-box">
                <span class="keyword">let</span> notes = [];
                <span class="keyword">function</span> <span class="function">addNote</span>() {
                    <span class="keyword">let</span> text = <span class="function">document</span>.<span class="function">getElementById</span>(<span class="string">'input'</span>).value;
                    notes.<span class="function">push</span>({text: text, date: <span class="keyword">new</span> <span class="function">Date</span>()});
                    <span class="function">render</span>();
                }
            </div>
            <button class="start-game-btn" onclick="scrollToGame()">🎯 برو به بازی کدیار</button>
        `
    }
};

// ===== OUTPUT DATA =====
const outputData = [
    { id: 1, course: 'اسکرچ جادویی', level: 'مبتدی', output: 'ساخت انیمیشن گربه راه‌رونده با بلوک‌های اسکرچ',
        code: 'وقتی پرچم سبز کلیک شد → برای همیشه → ۱۰ قدم حرکت کن → اگر لبه رسید برگرد', status: 'done' },
    { id: 2, course: 'ساخت بازی با اسکرچ', level: 'متوسط', output: 'بازی مار (Snake) کامل با امتیازدهی',
        code: 'وقتی پرچم سبز کلیک شد → متغیر امتیاز = ۰ → برای همیشه → اگر کلید ← فشار داده شد به چپ بچرخ → ۵ قدم حرکت کن',
        status: 'done' },
    { id: 3, course: 'پایتون بازیگوش', level: 'متوسط', output: 'برنامه ماشین حساب با چهار عمل اصلی',
        code: 'def calc(a, b, op): if op == "+": return a + b elif op == "-": return a - b', status: 'done' },
    { id: 4, course: 'ساخت وب‌سایت', level: 'متوسط', output: 'وب‌سایت شخصی با HTML, CSS و JS',
        code: '<!DOCTYPE html><html><head><title>کدیار</title></head><body><h1>سلام</h1></body></html>',
        status: 'pending' },
    { id: 5, course: 'الگوریتم و ربات', level: 'پیشرفته', output: 'الگوریتم مرتب‌سازی اعداد (بابل سورت)',
        code: 'for i in range(n): for j in range(0, n-i-1): if arr[j] > arr[j+1]: swap', status: 'pending' },
    { id: 6, course: 'بازی‌سازی با JS', level: 'پیشرفته', output: 'بازی حدس عدد کامل با جاوااسکریپت',
        code: 'let secret = Math.floor(Math.random() * 100) + 1; function checkGuess() { ... }', status: 'new' },
    { id: 7, course: 'هوش مصنوعی', level: 'حرفه‌ای', output: 'چت‌بات ساده با پاسخ‌های شرطی',
        code: 'function getReply(msg) { if(msg.includes("سلام")) return "سلام!"; else return "چیزی یادم نیست"; }',
        status: 'new' },
    { id: 8, course: 'ساخت اپلیکیشن', level: 'حرفه‌ای', output: 'اپلیکیشن یادداشت‌ها با ذخیره‌سازی',
        code: 'let notes = []; function addNote() { notes.push({text: input, date: new Date()}); }', status: 'new' }
];

// ===== GAME DATA =====
const questions = [
    { question: '۲ + ۳ = ؟', options: ['۵', '۶', '۴', '۷'], correct: 0, hint: '۲ تا سیب + ۳ تا سیب = ۵ تا سیب! 🍎' },
    { question: '۱۰ - ۴ = ؟', options: ['۵', '۶', '۷', '۴'], correct: 1, hint: '۱۰ تا آب نبات - ۴ تا = ۶ تا آب نبات! 🍬' },
    { question: '۵ × ۲ = ؟', options: ['۷', '۸', '۱۰', '۱۲'], correct: 2, hint: '۵ تا ۲ تا = ۱۰ تا! 🎯' },
    { question: 'کدوم یکی عدد اول هست؟', options: ['۴', '۶', '۷', '۹'], correct: 2, hint: '۷ فقط بر ۱ و خودش بخش‌پذیره! 🔢' },
    { question: '۱۲ ÷ ۳ = ؟', options: ['۳', '۴', '۵', '۶'], correct: 1, hint: '۱۲ تا مهره رو ۳ گروه کن، هر گروه ۴ تا میشه! 🧮' },
    { question: '۳ × ۳ = ؟', options: ['۶', '۸', '۹', '۱۲'], correct: 2, hint: '۳ تا ۳ تا = ۹ تا! ✨' },
    { question: '۲۵٪ از ۲۰۰ = ؟', options: ['۲۵', '۵۰', '۷۵', '۱۰۰'], correct: 1, hint: '۲۵٪ یعنی ۲۵ از ۱۰۰، پس ۲۰۰ تقسیم بر ۴ = ۵۰! 📊' },
    { question: '۴! (فاکتوریل) = ؟', options: ['۱۶', '۲۰', '۲۴', '۳۲'], correct: 2, hint: '۴! = ۴×۳×۲×۱ = ۲۴! 🎉' },
    { question: 'کدوم یکی عدد زوج نیست؟', options: ['۱۲', '۲۴', '۳۶', '۴۷'], correct: 3, hint: '۴۷ بر ۲ بخش‌پذیر نیست! 🔢' },
    { question: '۷ × ۸ = ؟', options: ['۴۸', '۵۶', '۶۴', '۷۲'], correct: 1, hint: '۷ تا ۸ تا = ۵۶ تا! 🌟' }
];

// ===== STATE =====
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;
let currentLesson = null;
let homeworkList = [];
let outputStatus = [];

// ===== DOM ELEMENTS =====
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const statScore = document.getElementById('statScore');
const hwCount = document.getElementById('hwCount');
const characterEmoji = document.getElementById('characterEmoji');
const characterMessage = document.getElementById('characterMessage');
const toast = document.getElementById('toast');
const homeSection = document.getElementById('homeSection');
const lessonDetail = document.getElementById('lessonDetail');
const backBtn = document.getElementById('backBtn');
const progressBar = document.getElementById('progressBar');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const outputTableBody = document.getElementById('outputTableBody');
const homeworkListContainer = document.getElementById('homeworkListContainer');

// ===== LOAD FROM localStorage =====
function loadFromStorage() {
    const savedHomework = localStorage.getItem('codeyar_homework');
    if (savedHomework) {
        try { homeworkList = JSON.parse(savedHomework); } catch (e) { homeworkList = []; }
    } else {
        homeworkList = [
            { id: 1, name: 'علی کریمی', email: 'ali@example.com', course: 'اسکرچ جادویی', description: 'بازی مار رو ساختم و سیب‌ها رو جمع می‌کنم.', date: new Date().toLocaleDateString('fa-IR'), status: 'done' },
            { id: 2, name: 'سارا حسینی', email: 'sara@example.com', course: 'پایتون بازیگوش', description: 'ماشین حساب کامل رو با توابع مختلف نوشتم.', date: new Date().toLocaleDateString('fa-IR'), status: 'pending' }
        ];
        saveToStorage();
    }

    const savedOutputs = localStorage.getItem('codeyar_outputs');
    if (savedOutputs) {
        try { outputStatus = JSON.parse(savedOutputs); } catch (e) { outputStatus = JSON.parse(JSON.stringify(outputData)); }
    } else {
        outputStatus = JSON.parse(JSON.stringify(outputData));
        saveOutputs();
    }

    const savedScore = localStorage.getItem('codeyar_score');
    if (savedScore) {
        score = parseInt(savedScore) || 0;
        scoreDisplay.textContent = score;
        statScore.textContent = score;
    }
}

function saveToStorage() {
    localStorage.setItem('codeyar_homework', JSON.stringify(homeworkList));
}

function saveOutputs() {
    localStorage.setItem('codeyar_outputs', JSON.stringify(outputStatus));
}

function saveScore() {
    localStorage.setItem('codeyar_score', String(score));
}

// ===== FUNCTIONS =====

function showLesson(id) {
    const data = lessonsData[id];
    if (!data) return;

    currentLesson = id;
    document.getElementById('detailIcon').textContent = data.icon;
    document.getElementById('detailTitle').textContent = data.title;
    const levelTag = document.getElementById('detailLevel');
    levelTag.textContent = data.level;
    levelTag.style.background = data.levelColor;
    document.getElementById('detailDuration').textContent = data.duration;
    document.getElementById('detailExercises').textContent = data.exercises;
    document.getElementById('detailContent').innerHTML = data.content;

    homeSection.style.display = 'none';
    lessonDetail.classList.add('show');
    backBtn.classList.add('show');
    document.querySelector('.header .logo-sub').textContent = '📖 در حال آموزش';

    lessonDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });

    showToast(`📚 ${data.icon} شروع آموزش ${data.title}!`);
    characterMessage.textContent = `📚 داریم ${data.title} رو یاد می‌گیریم!`;
}

function showHome() {
    homeSection.style.display = 'block';
    lessonDetail.classList.remove('show');
    backBtn.classList.remove('show');
    document.querySelector('.header .logo-sub').textContent = 'یار برنامه‌نویسی کودکان';
    currentLesson = null;
    characterMessage.textContent = 'سلام! بیا یاد بگیریم 🚀';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToGame() {
    document.getElementById('gameSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('🎯 بیا بازی کدیار رو شروع کنیم!');
}

// ===== OUTPUT TABLE =====
function renderOutputs() {
    let html = '';
    outputStatus.forEach((item, index) => {
        const statusMap = {
            'done': '<span class="status-done">✅ انجام شده</span>',
            'pending': '<span class="status-pending">⏳ در حال انجام</span>',
            'new': '<span class="status-new">🆕 شروع نشده</span>'
        };
        html += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${item.course}</strong></td>
                <td><span style="color:#6a11cb;font-weight:bold;">${item.level}</span></td>
                <td>${item.output}</td>
                <td><span class="code-preview">${item.code}</span></td>
                <td>${statusMap[item.status] || '🆕 جدید'}</td>
            </tr>
        `;
    });
    outputTableBody.innerHTML = html;
}

function resetOutputs() {
    outputStatus = JSON.parse(JSON.stringify(outputData));
    saveOutputs();
    renderOutputs();
    showToast('🔄 خروجی‌ها بازنشانی شدند');
}

function exportOutputs() {
    const data = JSON.stringify(outputStatus, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codeyar_outputs.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 خروجی‌ها با فرمت JSON ذخیره شدند');
}

// ===== HOMEWORK =====
async function submitHomework(e) {
    e.preventDefault();

    const form = document.getElementById('homeworkForm');
    const formData = new FormData(form);
    const submitBtn = document.getElementById('hwSubmitBtn');

    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ در حال ارسال...';

    try {
        const response = await fetch('submit-homework.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showToast('✅ ' + result.message);

            // اضافه کردن به لیست تکالیف
            const homework = {
                id: Date.now(),
                name: document.getElementById('hwName').value,
                email: document.getElementById('hwEmail').value,
                course: document.getElementById('hwCourse').value,
                description: document.getElementById('hwDescription').value,
                date: new Date().toLocaleDateString('fa-IR'),
                status: 'new'
            };
            homeworkList.push(homework);
            saveToStorage();
            renderHomework();

            // بروزرسانی وضعیت خروجی
            const courseMap = {
                'اسکرچ جادویی': 0, 'ساخت بازی با اسکرچ': 1, 'پایتون بازیگوش': 2,
                'ساخت وب‌سایت': 3, 'الگوریتم و ربات': 4, 'بازی‌سازی با JS': 5,
                'هوش مصنوعی': 6, 'ساخت اپلیکیشن': 7
            };
            const idx = courseMap[document.getElementById('hwCourse').value];
            if (idx !== undefined && outputStatus[idx]) {
                outputStatus[idx].status = 'pending';
                saveOutputs();
                renderOutputs();
            }

            form.reset();
            characterMessage.textContent = `📤 تکلیف ${document.getElementById('hwName').value} ارسال شد! 🎉`;
        } else {
            showToast('❌ ' + result.message);
        }
    } catch (error) {
        showToast('❌ خطا در ارسال. لطفاً دوباره تلاش کنید.');
        console.error('Error:', error);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = '📤 ارسال تکلیف';
}

function renderHomework() {
    if (homeworkList.length === 0) {
        homeworkListContainer.innerHTML = `<div class="empty-msg">📭 هنوز تکلیفی ارسال نشده است</div>`;
        hwCount.textContent = '۰';
        return;
    }

    let html = '';
    const sorted = [...homeworkList].reverse();
    sorted.forEach((hw) => {
        const statusMap = {
            'new': '<span class="hw-status new">🆕 جدید</span>',
            'pending': '<span class="hw-status pending">⏳ در حال بررسی</span>',
            'done': '<span class="hw-status done">✅ تأیید شد</span>'
        };
        html += `
            <div class="hw-item">
                <div class="hw-name">${hw.name}</div>
                <div class="hw-detail">📚 ${hw.course} — ${hw.date}</div>
                <div class="hw-detail" style="font-size:0.8rem;color:#666;">${hw.description.substring(0, 80)}${hw.description.length > 80 ? '...' : ''}</div>
                <div>${statusMap[hw.status] || statusMap['new']}</div>
                <button onclick="deleteHomework(${hw.id})" style="border:none;background:none;color:#FF6B6B;cursor:pointer;font-size:0.75rem;margin-top:5px;">🗑️ حذف</button>
            </div>
        `;
    });
    homeworkListContainer.innerHTML = html;
    hwCount.textContent = homeworkList.length;
}

function deleteHomework(id) {
    homeworkList = homeworkList.filter(h => h.id !== id);
    saveToStorage();
    renderHomework();
    showToast('🗑️ تکلیف حذف شد');
}

function clearHomework() {
    if (confirm('آیا مطمئنی می‌خوای همه تکالیف رو پاک کنی؟')) {
        homeworkList = [];
        saveToStorage();
        renderHomework();
        showToast('🗑️ همه تکالیف پاک شدند');
    }
}

// ===== GAME FUNCTIONS =====
function loadQuestion(index) {
    const q = questions[index];
    if (!q) return;

    questionText.textContent = q.question;
    questionText.style.borderColor = '#6C5CE7';

    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach((btn, i) => {
        btn.textContent = q.options[i] || '?';
        btn.className = '';
        btn.disabled = false;
    });

    feedback.innerHTML = '';
    nextBtn.style.display = 'none';
    isAnswered = false;

    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    questionNumber.textContent = index + 1;
    totalQuestions.textContent = questions.length;

    characterEmoji.textContent = '🧙‍♂️';
    characterEmoji.style.animation = 'none';
    setTimeout(() => {
        characterEmoji.style.animation = 'float 3s ease-in-out infinite';
    }, 10);
    characterMessage.textContent = '🤔 فکر کن... جواب چیه؟';
}

function checkAnswer(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;

    const q = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('button');
    const isCorrect = selectedIndex === q.correct;

    buttons.forEach(btn => btn.disabled = true);

    buttons.forEach((btn, i) => {
        if (i === q.correct) {
            btn.classList.add('correct');
        } else if (i === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        score += 10;
        feedback.innerHTML = `<span class="correct-text">✅ درست! 🎉 ${q.hint}</span>`;
        characterEmoji.textContent = '😃';
        characterMessage.textContent = '🎉 آفرین! عالی بود!';
        questionText.style.borderColor = '#4CAF50';
        showToast('🎉 آفرین! پاسخ درست بود!');
    } else {
        feedback.innerHTML = `<span class="wrong-text">❌ نه! پاسخ درست: ${q.options[q.correct]} — ${q.hint}</span>`;
        characterEmoji.textContent = '😅';
        characterMessage.textContent = `😊 پاسخ درست: ${q.options[q.correct]}`;
        questionText.style.borderColor = '#FF6B6B';
        showToast(`😊 دفعه بعد بهتر! پاسخ درست: ${q.options[q.correct]}`);
    }

    scoreDisplay.textContent = score;
    statScore.textContent = score;
    saveScore();
    nextBtn.style.display = 'inline-block';

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = '🏆 پایان بازی';
    }
}

function nextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
        const perfect = score === questions.length * 10 ? '🌟 عالی! کامل! 🌟' : '';
        feedback.innerHTML =
            `<span style="color:#6C5CE7;font-size:1.6rem;">🎊 آفرین کدیار! بازی رو تموم کردی! امتیازت: ${score} ${perfect}</span>`;
        nextBtn.style.display = 'none';
        characterEmoji.textContent = '🏆';
        characterMessage.textContent = `🏆 بازی تموم! امتیاز: ${score}`;
        questionText.textContent = '🎉 تبریک!';
        questionText.style.borderColor = '#FFD700';
        progressBar.style.width = '100%';
        optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
        showToast(`🏆 بازی تموم شد! امتیاز نهایی: ${score}`);
        return;
    }

    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;
    scoreDisplay.textContent = '۰';
    statScore.textContent = '۰';
    saveScore();
    loadQuestion(0);
    feedback.innerHTML = '';
    showToast('🔄 بازی دوباره شروع شد! موفق باشی!');
    characterMessage.textContent = '🔄 بیا دوباره!';
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== FORM HANDLING =====
document.getElementById('homeworkForm').addEventListener('submit', submitHomework);

// ===== INIT =====
loadFromStorage();
totalQuestions.textContent = questions.length;
loadQuestion(0);
renderOutputs();
renderHomework();
