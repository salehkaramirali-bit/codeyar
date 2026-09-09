// ===== STATE =====
let currentUser = localStorage.getItem('codeyar_user') || 'کاربر';
let score = parseInt(localStorage.getItem('codeyar_score')) || 0;
let isAdmin = localStorage.getItem('codeyar_admin') === 'true';

// ============================================================
// ===== DOM READY =====
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // نمایش نام کاربر
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) userNameDisplay.textContent = currentUser;
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (scoreDisplay) scoreDisplay.textContent = score;
    
    const statScore = document.getElementById('statScore');
    if (statScore) statScore.textContent = score;

    // اگر مدیر هستیم
    if (isAdmin) {
        const logoSub = document.querySelector('.header .logo-sub');
        if (logoSub) logoSub.textContent = '👑 مدیر';
        
        const adminBtn = document.getElementById('adminClassBtn');
        if (adminBtn) adminBtn.style.display = 'block';
        
        // نمایش وضعیت مدیر در کنسول
        console.log('✅ مدیر وارد شده است');
    } else {
        console.log('👤 کاربر عادی');
    }

    // بارگذاری داده‌ها
    loadStats();
    loadTodayClasses();

    // اگر در صفحه کلاس‌ها هستیم
    if (document.getElementById('allClassesList')) {
        loadAllClasses();
    }

    // اگر در صفحه پروفایل هستیم
    if (document.querySelector('.profile-container')) {
        loadProfile();
    }

    // اضافه کردن رویداد برای بستن مودال‌ها با کلیک خارج از آنها
    document.addEventListener('click', function(e) {
        const modals = ['loginModal', 'joinModal', 'adminLoginModal', 'addClassModal', 'adminPanelModal'];
        modals.forEach(id => {
            const modal = document.getElementById(id);
            if (modal && e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
});

// ============================================================
// ===== USER FUNCTIONS =====
// ============================================================

function toggleLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.toggle('show');
}

function loginUser(e) {
    e.preventDefault();
    const nameInput = document.getElementById('loginName');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    if (name) {
        currentUser = name;
        localStorage.setItem('codeyar_user', name);
        
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay) userNameDisplay.textContent = name;
        
        toggleLogin();
        showToast('👋 خوش آمدی ' + name + '!');
        
        // بروزرسانی صفحه
        loadTodayClasses();
        if (document.getElementById('allClassesList')) {
            loadAllClasses();
        }
        if (document.querySelector('.profile-container')) {
            loadProfile();
        }
    }
}

// ============================================================
// ===== ADMIN FUNCTIONS =====
// ============================================================

const ADMIN_PASSWORD = 'admin-amirali';

function showAdminLogin() {
    console.log('✅ نمایش مودال مدیریت');
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.classList.add('show');
    } else {
        console.error('❌ مودال adminLoginModal پیدا نشد');
        showToast('❌ خطا: مودال مدیریت پیدا نشد');
    }
}

function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) modal.classList.remove('show');
}

function adminLogin(e) {
    e.preventDefault();
    console.log('🔐 تلاش برای ورود به مدیریت');
    
    const passwordInput = document.getElementById('adminPassword');
    if (!passwordInput) {
        console.error('❌ فیلد رمز عبور پیدا نشد');
        showToast('❌ خطا در ورود');
        return;
    }
    
    const password = passwordInput.value;
    console.log('رمز وارد شده:', password);

    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('codeyar_admin', 'true');
        closeAdminLogin();
        showToast('👑 به پنل مدیریت خوش آمدید!');
        console.log('✅ ورود موفق به مدیریت');
        
        const logoSub = document.querySelector('.header .logo-sub');
        if (logoSub) logoSub.textContent = '👑 مدیر';
        
        const adminBtn = document.getElementById('adminClassBtn');
        if (adminBtn) adminBtn.style.display = 'block';
        
        // نمایش پنل مدیریت
        const panelModal = document.getElementById('adminPanelModal');
        if (panelModal) {
            panelModal.classList.add('show');
            console.log('✅ پنل مدیریت نمایش داده شد');
        } else {
            console.error('❌ پنل مدیریت پیدا نشد');
            showToast('❌ خطا: پنل مدیریت پیدا نشد');
        }
        
        // بروزرسانی کلاس‌ها
        loadAllClasses();
        loadTodayClasses();
    } else {
        console.warn('❌ رمز عبور اشتباه:', password);
        showToast('❌ رمز عبور اشتباه است!');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function closeAdminPanel() {
    const modal = document.getElementById('adminPanelModal');
    if (modal) modal.classList.remove('show');
}

function adminLogout() {
    isAdmin = false;
    localStorage.setItem('codeyar_admin', 'false');
    closeAdminPanel();
    
    const logoSub = document.querySelector('.header .logo-sub');
    if (logoSub) logoSub.textContent = 'آموزش آنلاین با Google Meet';
    
    const adminBtn = document.getElementById('adminClassBtn');
    if (adminBtn) adminBtn.style.display = 'none';
    
    showToast('🚪 از مدیریت خارج شدید');
    console.log('🚪 خروج از مدیریت');
    loadAllClasses();
    loadTodayClasses();
}

// ===== ADMIN PANEL FUNCTIONS =====

function openAdminClasses() {
    console.log('📚 باز کردن مدیریت کلاس‌ها');
    closeAdminPanel();
    window.location.href = 'classes.html';
}

function openAdminHomework() {
    console.log('📝 باز کردن تکالیف');
    closeAdminPanel();
    window.location.href = 'profile.html';
    setTimeout(() => {
        showToast('📝 تکالیف در بخش پروفایل قابل مشاهده است');
    }, 500);
}

function openAdminStudents() {
    console.log('👨‍🎓 باز کردن لیست دانش‌آموزان');
    closeAdminPanel();
    showToast('👨‍🎓 لیست دانش‌آموزان');
}

function openAdminSettings() {
    console.log('⚙️ باز کردن تنظیمات');
    closeAdminPanel();
    showToast('⚙️ تنظیمات سایت');
}

// ============================================================
// ===== ADD CLASS =====
// ============================================================

function showAddClassForm() {
    if (!isAdmin) {
        showToast('⚠️ فقط مدیر می‌تواند کلاس اضافه کند');
        return;
    }
    console.log('➕ باز کردن فرم افزودن کلاس');
    const modal = document.getElementById('addClassModal');
    if (modal) modal.classList.add('show');
}

function closeAddClass() {
    const modal = document.getElementById('addClassModal');
    if (modal) modal.classList.remove('show');
}

async function addClass(e) {
    e.preventDefault();
    console.log('📝 تلاش برای افزودن کلاس جدید');
    
    if (!isAdmin) {
        showToast('⚠️ فقط مدیر می‌تواند کلاس اضافه کند');
        return;
    }

    const name = document.getElementById('newClassName');
    const level = document.getElementById('newClassLevel');
    const time = document.getElementById('newClassTime');
    const date = document.getElementById('newClassDate');
    const meetLink = document.getElementById('newClassMeet');
    const icon = document.getElementById('newClassIcon');

    if (!name || !level || !time || !date || !meetLink || !icon) {
        showToast('❌ خطا: همه فیلدها پیدا نشدند');
        return;
    }

    const nameVal = name.value.trim();
    const levelVal = level.value;
    const timeVal = time.value.trim();
    const dateVal = date.value;
    const meetLinkVal = meetLink.value.trim();
    const iconVal = icon.value;

    if (!nameVal || !timeVal || !dateVal || !meetLinkVal) {
        showToast('⚠️ لطفاً همه فیلدها را پر کنید');
        return;
    }

    try {
        const response = await fetch('add-class.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameVal,
                level: levelVal,
                time: timeVal,
                date: dateVal,
                meet_link: meetLinkVal,
                icon: iconVal
            })
        });
        const data = await response.json();
        console.log('پاسخ افزودن کلاس:', data);
        
        if (data.success) {
            showToast('✅ کلاس با موفقیت اضافه شد!');
            closeAddClass();
            document.getElementById('addClassForm').reset();
            loadAllClasses();
            loadTodayClasses();
            loadStats();
        } else {
            showToast('❌ ' + data.message);
        }
    } catch (e) {
        showToast('❌ خطا در افزودن کلاس');
        console.error('❌ خطا:', e);
    }
}

// ============================================================
// ===== CLASS STATUS FUNCTIONS =====
// ============================================================

function getStatusBadge(status) {
    const badgeMap = {
        'waiting': '<span class="status-badge waiting">⏳ در انتظار شروع</span>',
        'live': '<span class="status-badge live">🟢 در حال برگزاری</span>',
        'ended': '<span class="status-badge ended">🔴 به پایان رسیده</span>'
    };
    return badgeMap[status] || badgeMap['waiting'];
}

async function updateClassStatus(classId, newStatus) {
    console.log('🔄 تغییر وضعیت کلاس:', classId, '->', newStatus);
    
    if (!isAdmin) {
        showToast('⚠️ فقط مدیر می‌تواند وضعیت کلاس را تغییر دهد');
        return;
    }

    try {
        const response = await fetch('update-class-status.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                classId: classId,
                class_status: newStatus
            })
        });
        const data = await response.json();
        console.log('پاسخ تغییر وضعیت:', data);
        
        if (data.success) {
            const statusMessages = {
                'waiting': '⏳ در انتظار شروع',
                'live': '🟢 کلاس شروع شد! دانش‌آموزان می‌توانند وارد شوند',
                'ended': '🔴 کلاس به پایان رسید'
            };
            showToast('✅ ' + statusMessages[newStatus] || 'وضعیت تغییر کرد');
            loadAllClasses();
            loadTodayClasses();
        } else {
            showToast('❌ ' + data.message);
        }
    } catch (e) {
        showToast('❌ خطا در تغییر وضعیت کلاس');
        console.error('❌ خطا:', e);
    }
}

// ============================================================
// ===== STATS =====
// ============================================================

async function loadStats() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();
        if (data.success) {
            const classCount = document.getElementById('classCount');
            if (classCount) classCount.textContent = data.total || 0;
            
            const studentCount = document.getElementById('studentCount');
            if (studentCount) studentCount.textContent = data.students || 0;
            
            const today = new Date().toDateString();
            const todayClasses = data.classes?.filter(c => c.date === today) || [];
            const todayClassesEl = document.getElementById('todayClasses');
            if (todayClassesEl) todayClassesEl.textContent = todayClasses.length;
            
            // کلاس‌های در حال برگزاری
            const liveClasses = data.classes?.filter(c => c.class_status === 'live') || [];
            const liveClassEl = document.getElementById('liveClassCount');
            if (liveClassEl) liveClassEl.textContent = liveClasses.length;
        }
    } catch (e) {
        console.log('Error loading stats:', e);
    }
}

// ============================================================
// ===== CLASSES =====
// ============================================================

async function loadTodayClasses() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();
        const container = document.getElementById('todayClassesList');

        if (!container) return;

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

            const isRegistered = cls.registered === true || cls.registered === 'true';
            const meetLink = cls.meet_link || '#';
            const classStatus = cls.class_status || 'waiting';
            const statusBadge = getStatusBadge(classStatus);
            const isLive = classStatus === 'live';

            html += `
                <div class="class-card">
                    <span class="class-icon">${cls.icon || '📚'}</span>
                    <h3>${cls.name}</h3>
                    <div class="class-meta">⏰ ${cls.time}</div>
                    <div class="class-meta">👥 ${cls.students || 0} دانش‌آموز</div>
                    <div style="margin:6px 0;">${statusBadge}</div>
                    <span class="class-badge ${levelBadge}">${cls.level}</span>
                    ${isRegistered && isLive
                        ? `<button class="class-btn meet-btn" onclick="openMeet('${meetLink}', '${cls.name}')">🎥 ورود به کلاس</button>`
                        : isRegistered && !isLive && classStatus !== 'ended'
                            ? `<button class="class-btn" style="background:#FFA94D;cursor:default;">⏳ منتظر شروع</button>`
                            : isRegistered && classStatus === 'ended'
                                ? `<button class="class-btn" style="background:#FF6B6B;cursor:default;">🔴 به پایان رسیده</button>`
                                : `<button class="class-btn" onclick="registerClass('${cls.id}')">📝 ثبت‌نام</button>`
                    }
                    ${isAdmin ? `
                        <div style="margin-top:8px;display:flex;gap:5px;flex-wrap:wrap;">
                            <button class="class-btn" onclick="updateClassStatus('${cls.id}', 'waiting')" style="background:#FFA94D;font-size:0.65rem;padding:3px 10px;">⏳ در انتظار</button>
                            <button class="class-btn" onclick="updateClassStatus('${cls.id}', 'live')" style="background:#4CAF50;font-size:0.65rem;padding:3px 10px;">🟢 شروع</button>
                            <button class="class-btn" onclick="updateClassStatus('${cls.id}', 'ended')" style="background:#FF6B6B;font-size:0.65rem;padding:3px 10px;">🔴 پایان</button>
                            <button class="class-btn" onclick="deleteClass('${cls.id}')" style="background:#6c5ce7;font-size:0.65rem;padding:3px 10px;">🗑️</button>
                        </div>
                    ` : ''}
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

        if (!container) return;

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
            const classStatus = cls.class_status || 'waiting';
            const statusBadge = getStatusBadge(classStatus);
            const isLive = classStatus === 'live';

            html += `
                <div class="class-card" data-level="${cls.level}" data-name="${cls.name}">
                    <span class="class-icon">${cls.icon || '📚'}</span>
                    <h3>${cls.name}</h3>
                    <div class="class-meta">⏰ ${cls.time}</div>
                    <div class="class-meta">📅 ${cls.date}</div>
                    <div class="class-meta">👥 ${cls.students || 0} دانش‌آموز</div>
                    <div style="margin:6px 0;">${statusBadge}</div>
                    <span class="class-badge ${levelBadge}">${cls.level}</span>
                    ${cls.status === 'full' 
                        ? '<span class="class-btn full">🔒 پر شده</span>'
                        : isRegistered && isLive
                            ? `<button class="class-btn meet-btn" onclick="openMeet('${meetLink}', '${cls.name}')">🎥 ورود به کلاس</button>`
                            : isRegistered && !isLive && classStatus !== 'ended'
                                ? `<button class="class-btn" style="background:#FFA94D;cursor:default;">⏳ منتظر شروع</button>`
                                : isRegistered && classStatus === 'ended'
                                    ? `<button class="class-btn" style="background:#FF6B6B;cursor:default;">🔴 به پایان رسیده</button>`
                                    : `<button class="class-btn" onclick="registerClass('${cls.id}')">📝 ثبت‌نام</button>`
                    }
                    ${isAdmin ? `
                        <div style="margin-top:8px;display:flex;gap:5px;flex-wrap:wrap;">
                            <button class="class-btn" onclick="updateClassStatus('${cls.id}', 'waiting')" style="background:#FFA94D;font-size:0.65rem;padding:3px 10px;">⏳ در انتظار</button>
                            <button class="class-btn" onclick="updateClassStatus('${cls.id}', 'live')" style="background:#4CAF50;font-size:0.65rem;padding:3px 10px;">🟢 شروع</button>
                            <button class="class-btn" onclick="updateClassStatus('${cls.id}', 'ended')" style="background:#FF6B6B;font-size:0.65rem;padding:3px 10px;">🔴 پایان</button>
                            <button class="class-btn" onclick="deleteClass('${cls.id}')" style="background:#6c5ce7;font-size:0.65rem;padding:3px 10px;">🗑️</button>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (e) {
        console.log('Error loading classes:', e);
    }
}

function filterClasses() {
    const searchInput = document.getElementById('classSearch');
    const levelFilter = document.getElementById('levelFilter');
    
    if (!searchInput || !levelFilter) return;
    
    const search = searchInput.value.toLowerCase();
    const level = levelFilter.value;
    const cards = document.querySelectorAll('#allClassesList .class-card');

    cards.forEach(card => {
        const name = card.dataset.name?.toLowerCase() || '';
        const cardLevel = card.dataset.level || '';
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
        console.error(e);
    }
}

async function deleteClass(classId) {
    if (!isAdmin) {
        showToast('⚠️ فقط مدیر می‌تواند کلاس را حذف کند');
        return;
    }
    if (!confirm('آیا مطمئن هستید که می‌خواهید این کلاس را حذف کنید؟')) return;

    try {
        const response = await fetch('delete-class.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ classId: classId })
        });
        const data = await response.json();
        if (data.success) {
            showToast('✅ کلاس با موفقیت حذف شد');
            loadAllClasses();
            loadTodayClasses();
            loadStats();
        } else {
            showToast('❌ ' + data.message);
        }
    } catch (e) {
        showToast('❌ خطا در حذف کلاس');
        console.error(e);
    }
}

// ============================================================
// ===== GOOGLE MEET =====
// ============================================================

function openMeet(meetLink, className) {
    if (!meetLink || meetLink === '#') {
        showToast('⚠️ لینک جلسه هنوز ثبت نشده است');
        return;
    }
    
    const joinClassName = document.getElementById('joinClassName');
    const joinClassLink = document.getElementById('joinClassLink');
    const joinClassBtn = document.getElementById('joinClassBtn');
    
    if (joinClassName) joinClassName.textContent = className || 'کلاس';
    if (joinClassLink) {
        joinClassLink.href = meetLink;
        joinClassLink.textContent = meetLink;
    }
    if (joinClassBtn) joinClassBtn.href = meetLink;
    
    const modal = document.getElementById('joinModal');
    if (modal) modal.classList.add('show');
}

function closeJoinModal() {
    const modal = document.getElementById('joinModal');
    if (modal) modal.classList.remove('show');
}

// ============================================================
// ===== PROFILE =====
// ============================================================

async function loadProfile() {
    try {
        const response = await fetch('get-classes.php');
        const data = await response.json();

        const profileName = document.getElementById('profileName');
        if (profileName) profileName.textContent = currentUser;

        const registered = data.classes?.filter(c => c.registered === true || c.registered === 'true') || [];
        
        const profileClasses = document.getElementById('profileClasses');
        if (profileClasses) profileClasses.textContent = registered.length;
        
        const profileScore = document.getElementById('profileScore');
        if (profileScore) profileScore.textContent = score;

        // نمایش کلاس‌های ثبت‌نام شده
        const myClassesContainer = document.getElementById('myClassesList');
        if (myClassesContainer) {
            if (registered.length > 0) {
                let html = '';
                registered.forEach(cls => {
                    const meetLink = cls.meet_link || '#';
                    const classStatus = cls.class_status || 'waiting';
                    const isLive = classStatus === 'live';
                    html += `
                        <div class="progress-item">
                            <span class="progress-icon">${cls.icon || '📚'}</span>
                            <div class="progress-info">
                                <div class="title">${cls.name}</div>
                                <div class="detail">${cls.level} — ${cls.time} — 📅 ${cls.date}</div>
                                <div class="detail">${getStatusBadge(classStatus)}</div>
                            </div>
                            ${meetLink !== '#' && isLive
                                ? `<button class="class-btn meet-btn" onclick="openMeet('${meetLink}', '${cls.name}')" style="font-size:0.7rem;padding:4px 12px;">🎥 ورود</button>`
                                : meetLink !== '#' && !isLive
                                    ? `<span style="color:#888;font-size:0.7rem;">⏳ در انتظار شروع</span>`
                                    : `<span style="color:#888;font-size:0.7rem;">⏳ در انتظار لینک</span>`
                            }
                        </div>
                    `;
                });
                myClassesContainer.innerHTML = html;
            } else {
                myClassesContainer.innerHTML = `<p style="color:#888;">هنوز در کلاسی ثبت‌نام نکرده‌اید</p>`;
            }
        }

        // تکالیف
        try {
            const hwResponse = await fetch('get-homework.php');
            const hwData = await hwResponse.json();
            const myHomework = hwData.homework?.filter(h => h.name === currentUser) || [];
            
            const profileHomework = document.getElementById('profileHomework');
            if (profileHomework) profileHomework.textContent = myHomework.length;

            const hwContainer = document.getElementById('myHomeworkList');
            if (hwContainer) {
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
            }
        } catch (e) {
            console.log('Error loading homework:', e);
        }

    } catch (e) {
        console.log('Error loading profile:', e);
    }
}

// ============================================================
// ===== TOAST =====
// ============================================================

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================================
// ===== SUBMIT HOMEWORK =====
// ============================================================

// اضافه کردن رویداد برای فرم ارسال تکلیف
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
                const textarea = form.querySelector('textarea');
                if (textarea) textarea.value = '';
                if (document.querySelector('.profile-container')) {
                    loadProfile();
                }
            } else {
                showToast('❌ ' + data.message);
            }
        })
        .catch(err => {
            showToast('❌ خطا در ارسال تکلیف');
            console.error(err);
        });
    }
});

// ============================================================
// ===== EXPORT FUNCTIONS (برای دسترسی در HTML) =====
// ============================================================

// توابعی که در HTML استفاده می‌شوند باید در scope global باشند
window.toggleLogin = toggleLogin;
window.loginUser = loginUser;
window.showAdminLogin = showAdminLogin;
window.closeAdminLogin = closeAdminLogin;
window.adminLogin = adminLogin;
window.closeAdminPanel = closeAdminPanel;
window.adminLogout = adminLogout;
window.openAdminClasses = openAdminClasses;
window.openAdminHomework = openAdminHomework;
window.openAdminStudents = openAdminStudents;
window.openAdminSettings = openAdminSettings;
window.showAddClassForm = showAddClassForm;
window.closeAddClass = closeAddClass;
window.addClass = addClass;
window.registerClass = registerClass;
window.deleteClass = deleteClass;
window.updateClassStatus = updateClassStatus;
window.openMeet = openMeet;
window.closeJoinModal = closeJoinModal;
window.filterClasses = filterClasses;
window.showToast = showToast;
window.loadAllClasses = loadAllClasses;
window.loadTodayClasses = loadTodayClasses;
window.loadStats = loadStats;
window.loadProfile = loadProfile;

// چاپ پیام در کنسول برای تأیید
console.log('✅ کدیار با موفقیت بارگذاری شد!');
console.log('🔑 رمز مدیریت: admin-amirali');
console.log('👤 وضعیت مدیر:', isAdmin ? 'فعال' : 'غیرفعال');
