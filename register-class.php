<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);
$classId = $input['classId'] ?? null;
$user = $input['user'] ?? '';

if (!$classId || !$user) {
    echo json_encode(['success' => false, 'message' => 'اطلاعات کامل نیست']);
    exit;
}

$dataFile = 'data/classes.json';
$classes = json_decode(file_get_contents($dataFile), true);

$found = false;
foreach ($classes as &$cls) {
    if ($cls['id'] == $classId) {
        if ($cls['status'] === 'full') {
            echo json_encode(['success' => false, 'message' => 'کلاس پر شده است']);
            exit;
        }
        $cls['students'] = ($cls['students'] ?? 0) + 1;
        $cls['registered'] = true;
        if ($cls['students'] >= 20) {
            $cls['status'] = 'full';
        }
        $found = true;
        break;
    }
}

if (!$found) {
    echo json_encode(['success' => false, 'message' => 'کلاس پیدا نشد']);
    exit;
}

file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'message' => 'ثبت‌نام با موفقیت انجام شد']);
?>
