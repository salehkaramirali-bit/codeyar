<?php
// ===== تنظیمات خطا =====
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ===== دریافت داده‌ها =====
$input = json_decode(file_get_contents('php://input'), true);

// اگر داده‌ها از طریق POST معمولی آمده‌اند
if (!$input) {
    $input = $_POST;
}

// ===== بررسی داده‌ها =====
$name = $input['name'] ?? '';
$level = $input['level'] ?? '';
$time = $input['time'] ?? '';
$date = $input['date'] ?? '';
$meetLink = $input['meet_link'] ?? '';
$icon = $input['icon'] ?? '📚';

// ===== اعتبارسنجی =====
if (empty($name) || empty($level) || empty($time) || empty($date) || empty($meetLink)) {
    echo json_encode([
        'success' => false, 
        'message' => 'همه فیلدها الزامی هستند',
        'debug' => [
            'name' => $name,
            'level' => $level,
            'time' => $time,
            'date' => $date,
            'meetLink' => $meetLink
        ]
    ]);
    exit;
}

// ===== ایجاد پوشه data اگر وجود ندارد =====
if (!file_exists('data')) {
    if (!mkdir('data', 0777, true)) {
        echo json_encode([
            'success' => false, 
            'message' => 'خطا در ایجاد پوشه data'
        ]);
        exit;
    }
}

// ===== فایل کلاس‌ها =====
$dataFile = 'data/classes.json';

// ===== بارگذاری کلاس‌های موجود =====
$classes = [];
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    if (!empty($content)) {
        $classes = json_decode($content, true);
        if (!is_array($classes)) {
            $classes = [];
        }
    }
}

// ===== پیدا کردن آخرین ID =====
$lastId = 0;
foreach ($classes as $cls) {
    if (isset($cls['id']) && $cls['id'] > $lastId) {
        $lastId = $cls['id'];
    }
}

// ===== ایجاد کلاس جدید =====
$newClass = [
    'id' => $lastId + 1,
    'name' => $name,
    'level' => $level,
    'icon' => $icon,
    'time' => $time,
    'date' => $date,
    'students' => 0,
    'status' => 'open',
    'class_status' => 'waiting',
    'registered' => false,
    'meet_link' => $meetLink
];

$classes[] = $newClass;

// ===== ذخیره در فایل =====
$result = file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    echo json_encode([
        'success' => false, 
        'message' => 'خطا در ذخیره فایل. لطفاً دسترسی پوشه data را بررسی کنید.'
    ]);
    exit;
}

// ===== پاسخ موفق =====
echo json_encode([
    'success' => true, 
    'message' => 'کلاس با موفقیت اضافه شد!',
    'class' => $newClass
]);
?>
