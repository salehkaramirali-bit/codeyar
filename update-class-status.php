<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);
$classId = $input['classId'] ?? null;
$classStatus = $input['class_status'] ?? null;

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
    'status_text' => $statusMessages[$classStatus]
]);
?>
