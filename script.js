// ===== STATE =====
let currentUser = localStorage.getItem('codeyar_user') || 'کاربر';
let score = parseInt(localStorage.getItem('codeyar_score')) || 0;
let chatInterval = null;

// ===== DOM =====
document.addEventListener('DOMContentLoaded', function() {
    // نمایش نام کاربر
    document.getElementById('userNameDisplay').textContent = currentUser;
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('statScore').textContent = score;

    // بارگذاری داده‌ها
    loadStats();
    loadTodayClasses();

    // اگر در صفحه کلاس زنده هستیم
    if (document.querySelector('.chat-container')) {
        loadMessages();
        chatInterval = setInterval(loadMessages, 3000);
        // مقدار پیش‌فرض برای تکلیف
        document.getElementById('hwName').value = currentUser;
    }

    // اگر در صفحه کلاس‌ها هستیم
    if (document.getElementById('allClassesList')) {
        loadAllClasses();
    }

    // اگر در صفحه پروفایل هستیم
    if (document.querySelector('.profile-container')) {
        loadProfile();
    }
});

// ===== USER =====
function toggleLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.toggle('show');
}

function loginUser(e) {
    e.preventDefault();
    const name = document.getElementById('loginName').value.trim();
    if (name) {
        currentUser = name;
        localStorage.setItem('codeyar_user', name);
        document.getElementById('userNameDisplay').textContent = name;
        toggleLogin();
        showToast('👋 خوش آمدی ' + name + '!');
        // بروزرسانی تکلیف
        if (document.getElementById('hwName')) {
            document.getElementById('hwName').value = name;
        }
    }
}

// ===== STATS =====
async function loadStats() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();
        if (data.success) {
            document.getElementById('classCount').textContent = data.total || 0;
            document.getElementById('studentCount').textContent = data.students || 0;

            // کلاس‌های امروز
            const today = new Date().toDateString();
            const todayClasses = data.classes?.filter(c => c.date === today) || [];
            document.getElementById('todayClasses').textContent = todayClasses.length;
        }
    } catch (e) {
        console.log('Error loading stats:', e);
    }
}

// ===== CLASSES =====
async function loadTodayClasses() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();
        const container = document.getElementById('todayClassesList');

        if (!data.success || !data.classes || data.classes.length === 0) {
            container.innerHTML = `<div class="loading">📭 امروز کلاسی نداریم</div>`;
            return;
        }

        const today = new Date().toDateString();
        const todayClasses = data.classes.filter(c => c.date === today);

        if (todayClasses.length === 0) {
            container.innerHTML = `<div class="loading">📭 امروز کلاسی نداریم</div>`;
            return;
        }

        let html = '';
        todayClasses.slice(0, 4).forEach(cls => {
            const levelBadge = {
                'مبتدی': 'beginner',
                'متوسط': 'intermediate',
                'پیشرفته': 'advanced',
                'حرفه‌ای': 'pro'
            }[cls.level] || 'beginner';

            html += `
                <div class="class-card">
                    <span class="class-icon">${cls.icon || '📚'}</span>
                    <h3>${cls.name}</h3>
                    <div class="class-meta">⏰ ${cls.time}</div>
                    <div class="class-meta">👥 ${cls.students || 0} دانش‌آموز</div>
                    <span class="class-badge ${levelBadge}">${cls.level}</span>
                    <a href="class-room.html" class="class-btn">💬 ورود به کلاس</a>
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (e) {
        console.log('Error loading classes:', e);
    }
}

async function loadAllClasses() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();
        const container = document.getElementById('allClassesList');

        if (!data.success || !data.classes || data.classes.length === 0) {
            container.innerHTML = `<div class="loading">📭 هنوز کلاسی ایجاد نشده است</div>`;
            return;
        }

        let html = '';
        data.classes.forEach(cls => {
            const levelBadge = {
                'مبتدی': 'beginner',
                'متوسط': 'intermediate',
                'پیشرفته': 'advanced',
                'حرفه‌ای': 'pro'
            }[cls.level] || 'beginner';

            html += `
                <div class="class-card" data-level="${cls.level}" data-name="${cls.name}">
                    <span class="class-icon">${cls.icon || '📚'}</span>
                    <h3>${cls.name}</h3>
                    <div class="class-meta">⏰ ${cls.time}</div>
                    <div class="class-meta">📅 ${cls.date}</div>
                    <div class="class-meta">👥 ${cls.students || 0} دانش‌آموز</div>
                    <span class="class-badge ${levelBadge}">${cls.level}</span>
                    ${cls.status === 'full' 
                        ? '<span class="class-btn full">🔒 پر شده</span>' 
                        : `<button class="class-btn" onclick="registerClass('${cls.id}')">📝 ثبت‌نام</button>`
                    }
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (e) {
        console.log('Error loading classes:', e);
    }
}

function filterClasses() {
    const search = document.getElementById('classSearch').value.toLowerCase();
    const level = document.getElementById('levelFilter').value;
    const cards = document.querySelectorAll('#allClassesList .class-card');

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cardLevel = card.dataset.level;
        const matchName = name.includes(search);
        const matchLevel = level === 'all' || cardLevel === level;
        card.style.display = matchName && matchLevel ? 'block' : 'none';
    });
}

async function registerClass(classId) {
    try {
        const response = await fetch('register-class.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                classId: classId,
                user: currentUser
            })
        });
        const data = await response.json();
        if (data.success) {
            showToast('✅ ثبت‌نام با موفقیت انجام شد!');
            loadAllClasses();
        } else {
            showToast('❌ ' + data.message);
        }
    } catch (e) {
        showToast('❌ خطا در ثبت‌نام');
    }
}

// ===== CHAT =====
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    if (currentUser === 'کاربر') {
        showToast('⚠️ لطفاً ابتدا وارد شوید!');
        toggleLogin();
        return;
    }

    try {
        const response = await fetch('save-message.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: currentUser,
                message: message,
                time: new Date().toLocaleTimeString('fa-IR')
            })
        });
        const data = await response.json();
        if (data.success) {
            input.value = '';
            loadMessages();
        }
    } catch (e) {
        console.log('Error sending message:', e);
    }
}

async function loadMessages() {
    try {
        const response = await fetch('get-messages.php');
        const data = await response.json();
        const container = document.getElementById('chatMessages');

        if (!data.success || !data.messages || data.messages.length === 0) {
            container.innerHTML = `<div class="chat-welcome">💬 هیچ پیامی تا الان نیست. اولین نفر باش!</div>`;
            return;
        }

        let html = '';
        data.messages.forEach(msg => {
            const isOwn = msg.user === currentUser;
            html += `
                <div class="chat-message ${isOwn ? 'own' : 'other'}">
                    <div class="msg-user">${isOwn ? '👤 شما' : '👤 ' + msg.user}</div>
                    ${msg.message}
                    <span class="msg-time">${msg.time || ''}</span>
                </div>
            `;
        });

        container.innerHTML = html;
        container.scrollTop = container.scrollHeight;
    } catch (e) {
        console.log('Error loading messages:', e);
    }
}

function addEmoji(emoji) {
    const input = document.getElementById('chatInput');
    input.value += emoji;
    input.focus();
}

// ===== HOMEWORK =====
document.addEventListener('submit', function(e) {
    if (e.target.id === 'homeworkForm') {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch('submit-homework.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('✅ ' + data.message);
                form.querySelector('textarea').value = '';
            } else {
                showToast('❌ ' + data.message);
            }
        })
        .catch(err => {
            showToast('❌ خطا در ارسال تکلیف');
        });
    }
});

// ===== PROFILE =====
async function loadProfile() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();

        document.getElementById('profileName').textContent = currentUser;

        // کلاس‌های ثبت‌نام شده
        const registered = data.classes?.filter(c => c.registered) || [];
        document.getElementById('profileClasses').textContent = registered.length;

        // امتیاز
        document.getElementById('profileScore').textContent = score;

        // تکالیف
        const hwResponse = await fetch('get-messages.php');
        const hwData = await hwResponse.json();
        const myHomework = hwData.homework?.filter(h => h.user === currentUser) || [];
        document.getElementById('profileHomework').textContent = myHomework.length;

        // پیشرفت دوره‌ها
        const progressContainer = document.getElementById('progressList');
        if (data.classes && data.classes.length > 0) {
            let html = '';
            data.classes.forEach(cls => {
                const progress = Math.floor(Math.random() * 100);
                html += `
                    <div class="progress-item">
                        <span class="progress-icon">${cls.icon || '📚'}</span>
                        <div class="progress-info">
                            <div class="title">${cls.name}</div>
                            <div class="detail">${cls.level} — ${cls.time}</div>
                        </div>
                        <div class="progress-bar-custom">
                            <div class="fill" style="width:${progress}%;"></div>
                        </div>
                        <span style="font-size:0.8rem;color:#888;">${progress}%</span>
                    </div>
                `;
            });
            progressContainer.innerHTML = html;
        } else {
            progressContainer.innerHTML = `<p style="color:#888;">هنوز دوره‌ای ثبت‌نام نکرده‌اید</p>`;
        }
    } catch (e) {
        console.log('Error loading profile:', e);
    }
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
