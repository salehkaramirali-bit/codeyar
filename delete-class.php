<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);
$classId = $input['classId'] ?? null;

if (!$classId) {
    echo json_encode(['success' => false, 'message' => 'شناسه کلاس مشخص نشده است']);
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
foreach ($classes as $key => $cls) {
    if ($cls['id'] == $classId) {
        unset($classes[$key]);
        $found = true;
        break;
    }
}

if (!$found) {
    echo json_encode(['success' => false, 'message' => 'کلاس پیدا نشد']);
    exit;
}

// بازسازی ایندکس
$classes = array_values($classes);

file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'message' => 'کلاس با موفقیت حذف شد']);
?>
