<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// دریافت داده‌ها
$input = json_decode(file_get_contents('php://input'), true);

// اگر داده‌ها از طریق POST ارسال شده‌اند
if (!$input) {
    $input = $_POST;
}

$classId = $input['classId'] ?? null;
$classStatus = $input['class_status'] ?? null;

// لاگ برای دیباگ
error_log("update-class-status: classId=$classId, status=$classStatus");

if (!$classId || !$classStatus) {
    echo json_encode(['success' => false, 'message' => 'اطلاعات کامل نیست']);
    exit;
}

// فقط وضعیت‌های معتبر
$validStatuses = ['waiting', 'live', 'ended'];
if (!in_array($classStatus, $validStatuses)) {
    echo json_encode(['success' => false, 'message' => 'وضعیت نامعتبر است']);
    exit;
}

$dataFile = 'data/classes.json';

if (!file_exists($dataFile)) {
    echo json_encode(['success' => false, 'message' => 'فایل کلاس‌ها وجود ندارد']);
    exit;
}

$classes = json_decode(file_get_contents($dataFile), true);
if (!is_array($classes)) {
    $classes = [];
}

$found = false;
foreach ($classes as &$cls) {
    if ($cls['id'] == $classId) {
        $cls['class_status'] = $classStatus;
        $found = true;
        break;
    }
}

if (!$found) {
    echo json_encode(['success' => false, 'message' => 'کلاس پیدا نشد']);
    exit;
}

file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// پیام وضعیت به فارسی
$statusMessages = [
    'waiting' => '⏳ در انتظار شروع',
    'live' => '🟢 در حال برگزاری',
    'ended' => '🔴 به پایان رسیده'
];

echo json_encode([
    'success' => true, 
    'message' => 'وضعیت کلاس تغییر کرد',
    'status_text' => $statusMessages[$classStatus] ?? $classStatus
]);
?>
