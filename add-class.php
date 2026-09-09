<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? '';
$level = $input['level'] ?? '';
$time = $input['time'] ?? '';
$date = $input['date'] ?? '';
$meetLink = $input['meet_link'] ?? '';
$icon = $input['icon'] ?? '📚';

if (empty($name) || empty($level) || empty($time) || empty($date) || empty($meetLink)) {
    echo json_encode(['success' => false, 'message' => 'همه فیلدها الزامی هستند']);
    exit;
}

$dataFile = 'data/classes.json';
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

// پیدا کردن آخرین ID
$lastId = 0;
foreach ($classes as $cls) {
    if ($cls['id'] > $lastId) {
        $lastId = $cls['id'];
    }
}

$newClass = [
    'id' => $lastId + 1,
    'name' => $name,
    'level' => $level,
    'icon' => $icon,
    'time' => $time,
    'date' => $date,
    'students' => 0,
    'status' => 'open',
    'registered' => false,
    'meet_link' => $meetLink
];

$classes[] = $newClass;

file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'message' => 'کلاس با موفقیت اضافه شد']);
?>
