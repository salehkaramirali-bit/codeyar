<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = 'data/homework.json';

$homeworks = [];
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    if (!empty($content)) {
        $homeworks = json_decode($content, true);
        if (!is_array($homeworks)) {
            $homeworks = [];
        }
    }
}

echo json_encode([
    'success' => true,
    'homework' => $homeworks
]);
?>
