<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = 'data/classes.json';

// داده‌های پیش‌فرض با وضعیت کلاس
$defaultClasses = [
    [
        'id' => 1,
        'name' => 'اسکرچ جادویی',
        'level' => 'مبتدی',
        'icon' => '🧩',
        'time' => '۱۶:۰۰ - ۱۷:۳۰',
        'date' => date('Y/m/d'),
        'students' => 12,
        'status' => 'open', // open, full, cancelled
        'class_status' => 'waiting', // waiting, live, ended
        'registered' => false,
        'meet_link' => 'https://meet.google.com/abc-defg-hij'
    ],
    [
        'id' => 2,
        'name' => 'پایتون بازیگوش',
        'level' => 'متوسط',
        'icon' => '🐍',
        'time' => '۱۷:۳۰ - ۱۹:۰۰',
        'date' => date('Y/m/d'),
        'students' => 8,
        'status' => 'open',
        'class_status' => 'live', // در حال برگزاری
        'registered' => false,
        'meet_link' => 'https://meet.google.com/klm-nopq-rst'
    ],
    [
        'id' => 3,
        'name' => 'ساخت وب‌سایت',
        'level' => 'متوسط',
        'icon' => '🌐',
        'time' => '۱۹:۰۰ - ۲۰:۳۰',
        'date' => date('Y/m/d', strtotime('+1 day')),
        'students' => 5,
        'status' => 'open',
        'class_status' => 'waiting',
        'registered' => false,
        'meet_link' => 'https://meet.google.com/uvw-xyz-a12'
    ],
    [
        'id' => 4,
        'name' => 'هوش مصنوعی',
        'level' => 'حرفه‌ای',
        'icon' => '💡',
        'time' => '۲۰:۳۰ - ۲۲:۰۰',
        'date' => date('Y/m/d', strtotime('+2 day')),
        'students' => 3,
        'status' => 'open',
        'class_status' => 'ended', // به پایان رسیده
        'registered' => false,
        'meet_link' => 'https://meet.google.com/b34-cde-f56'
    ],
    [
        'id' => 5,
        'name' => 'بازی‌سازی با اسکرچ',
        'level' => 'متوسط',
        'icon' => '🎮',
        'time' => '۱۴:۰۰ - ۱۵:۳۰',
        'date' => date('Y/m/d'),
        'students' => 6,
        'status' => 'open',
        'class_status' => 'waiting',
        'registered' => false,
        'meet_link' => 'https://meet.google.com/g78-hij-k90'
    ],
    [
        'id' => 6,
        'name' => 'الگوریتم و ربات',
        'level' => 'پیشرفته',
        'icon' => '🤖',
        'time' => '۱۸:۰۰ - ۱۹:۳۰',
        'date' => date('Y/m/d', strtotime('+1 day')),
        'students' => 4,
        'status' => 'open',
        'class_status' => 'waiting',
        'registered' => false,
        'meet_link' => 'https://meet.google.com/l12-mno-p34'
    ]
];

// ایجاد فایل اگر وجود ندارد
if (!file_exists($dataFile)) {
    if (!file_exists('data')) {
        mkdir('data', 0777, true);
    }
    file_put_contents($dataFile, json_encode($defaultClasses, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$classes = json_decode(file_get_contents($dataFile), true);
if (!is_array($classes)) {
    $classes = $defaultClasses;
}

echo json_encode([
    'success' => true,
    'classes' => $classes,
    'total' => count($classes),
    'students' => array_sum(array_column($classes, 'students'))
]);
?>
