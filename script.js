// ===== STATE =====
let currentUser = localStorage.getItem('codeyar_user') || 'کاربر';
let score = parseInt(localStorage.getItem('codeyar_score')) || 0;

// ===== DOM =====
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userNameDisplay').textContent = currentUser;
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('statScore').textContent = score;

    loadStats();
    loadTodayClasses();

    if (document.getElementById('allClassesList')) {
        loadAllClasses();
    }

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
        loadTodayClasses();
        if (document.getElementById('allClassesList')) {
            loadAllClasses();
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

            // بررسی ثبت‌نام
            const isRegistered = cls.registered === true || cls.registered === 'true';
            const meetLink = cls.meet_link || '#';

            html += `
                <div class="class-card">
                    <span class="class-icon">${cls.icon || '📚'}</span>
                    <h3>${cls.name}</h3>
                    <div class="class-meta">⏰ ${cls.time}</div>
                    <div class="class-meta">👥 ${cls.students || 0} دانش‌آموز</div>
                    <span class="class-badge ${levelBadge}">${cls.level}</span>
                    ${isRegistered 
                        ? `<button class="class-btn" onclick="openMeet('${meetLink}', '${cls.name}')">🎥 ورود به کلاس</button>`
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

            const isRegistered = cls.registered === true || cls.registered === 'true';
            const meetLink = cls.meet_link || '#';

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
                        : isRegistered
                            ? `<button class="class-btn" onclick="openMeet('${meetLink}', '${cls.name}')">🎥 ورود به کلاس</button>`
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
    if (currentUser === 'کاربر') {
        showToast('⚠️ لطفاً ابتدا وارد شوید!');
        toggleLogin();
        return;
    }

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
            loadTodayClasses();
        } else {
            showToast('❌ ' + data.message);
        }
    } catch (e) {
        showToast('❌ خطا در ثبت‌نام');
    }
}

// ===== GOOGLE MEET =====
function openMeet(meetLink, className) {
    if (!meetLink || meetLink === '#') {
        showToast('⚠️ لینک جلسه هنوز ثبت نشده است');
        return;
    }
    // نمایش مودال یا باز کردن مستقیم
    document.getElementById('joinClassName').textContent = className;
    document.getElementById('joinClassLink').href = meetLink;
    document.getElementById('joinClassLink').textContent = meetLink;
    document.getElementById('joinClassBtn').href = meetLink;
    document.getElementById('joinModal').classList.add('show');
}

function closeJoinModal() {
    document.getElementById('joinModal').classList.remove('show');
}

// ===== PROFILE =====
async function loadProfile() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();

        document.getElementById('profileName').textContent = currentUser;

        const registered = data.classes?.filter(c => c.registered === true || c.registered === 'true') || [];
        document.getElementById('profileClasses').textContent = registered.length;
        document.getElementById('profileScore').textContent = score;

        // نمایش کلاس‌های ثبت‌نام شده
        const myClassesContainer = document.getElementById('myClassesList');
        if (registered.length > 0) {
            let html = '';
            registered.forEach(cls => {
                const meetLink = cls.meet_link || '#';
                html += `
                    <div class="progress-item">
                        <span class="progress-icon">${cls.icon || '📚'}</span>
                        <div class="progress-info">
                            <div class="title">${cls.name}</div>
                            <div class="detail">${cls.level} — ${cls.time} — 📅 ${cls.date}</div>
                        </div>
                        ${meetLink !== '#' 
                            ? `<button class="class-btn" onclick="openMeet('${meetLink}', '${cls.name}')" style="font-size:0.7rem;padding:4px 12px;">🎥 ورود</button>`
                            : `<span style="color:#888;font-size:0.7rem;">⏳ در انتظار لینک</span>`
                        }
                    </div>
                `;
            });
            myClassesContainer.innerHTML = html;
        } else {
            myClassesContainer.innerHTML = `<p style="color:#888;">هنوز در کلاسی ثبت‌نام نکرده‌اید</p>`;
        }

        // تکالیف
        try {
            const hwResponse = await fetch('get-homework.php');
            const hwData = await hwResponse.json();
            const myHomework = hwData.homework?.filter(h => h.name === currentUser) || [];
            document.getElementById('profileHomework').textContent = myHomework.length;

            const hwContainer = document.getElementById('myHomeworkList');
            if (myHomework.length > 0) {
                let html = '';
                myHomework.forEach(hw => {
                    html += `
                        <div class="progress-item">
                            <span class="progress-icon">📝</span>
                            <div class="progress-info">
                                <div class="title">${hw.course}</div>
                                <div class="detail">${hw.description.substring(0, 60)}${hw.description.length > 60 ? '...' : ''}</div>
                                <div class="detail" style="font-size:0.7rem;color:#aaa;">${hw.date}</div>
                            </div>
                            <span style="font-size:0.7rem;color:#4CAF50;">✅ ارسال شده</span>
                        </div>
                    `;
                });
                hwContainer.innerHTML = html;
            } else {
                hwContainer.innerHTML = `<p style="color:#888;">هنوز تکلیفی ارسال نکرده‌اید</p>`;
            }
        } catch (e) {
            console.log('Error loading homework:', e);
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

// ===== CLOSE MODAL ON CLICK OUTSIDE =====
document.addEventListener('click', function(e) {
    const modal = document.getElementById('loginModal');
    if (e.target === modal) {
        modal.classList.remove('show');
    }
    const joinModal = document.getElementById('joinModal');
    if (e.target === joinModal) {
        joinModal.classList.remove('show');
    }
});
