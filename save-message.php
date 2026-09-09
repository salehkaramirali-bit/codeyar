<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);
$user = $input['user'] ?? 'ناشناس';
$message = $input['message'] ?? '';
$time = $input['time'] ?? date('H:i');

if (empty($message)) {
    echo json_encode(['success' => false, 'message' => 'پیام خالی است']);
    exit;
}

$dataFile = 'data/messages.json';

if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

$messages = [];
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    if (!empty($content)) {
        $messages = json_decode($content, true);
        if (!is_array($messages)) {
            $messages = [];
        }
    }
}

// حذف پیام‌های قدیمی (حداکثر ۱۰۰ پیام)
if (count($messages) >= 100) {
    $messages = array_slice($messages, -50);
}

$messages[] = [
    'user' => $user,
    'message' => htmlspecialchars($message),
    'time' => $time,
    'timestamp' => time()
];

file_put_contents($dataFile, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'message' => 'پیام ذخیره شد']);
?>
