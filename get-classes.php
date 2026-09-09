<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = 'data/classes.json';

// داده‌های پیش‌فرض
$defaultClasses = [
    [
        'id' => 1,
        'name' => 'اسکرچ جادویی',
        'level' => 'مبتدی',
        'icon' => '🧩',
        'time' => '۱۶:۰۰ - ۱۷:۳۰',
        'date' => date('Y/m/d'),
        'students' => 12,
        'status' => 'open',
        'registered' => false
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
        'registered' => false
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
        'registered' => false
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
        'registered' => false
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
