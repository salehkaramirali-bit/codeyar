<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = 'data/messages.json';

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

// فقط ۵۰ پیام آخر
if (count($messages) > 50) {
    $messages = array_slice($messages, -50);
}

echo json_encode([
    'success' => true,
    'messages' => $messages
]);
?>
