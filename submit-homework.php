<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$name = $_POST['hwName'] ?? '';
$email = $_POST['hwEmail'] ?? '';
$course = $_POST['hwCourse'] ?? '';
$description = $_POST['hwDescription'] ?? '';

if (empty($name) || empty($description)) {
    echo json_encode(['success' => false, 'message' => 'نام و توضیحات الزامی است']);
    exit;
}

$dataFile = 'data/homework.json';

if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

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

$homeworks[] = [
    'id' => time(),
    'name' => $name,
    'email' => $email,
    'course' => $course,
    'description' => $description,
    'date' => date('Y/m/d H:i:s'),
    'status' => 'new'
];

file_put_contents($dataFile, json_encode($homeworks, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ارسال ایمیل
$to = 'salehkaramirali@gmail.com';
$subject = 'تکلیف جدید از کدیار - ' . $course;
$message = "📋 تکلیف جدید از کدیار\n\n";
$message .= "👤 نام: $name\n";
$message .= "📧 ایمیل: $email\n";
$message .= "📚 دوره: $course\n";
$message .= "📝 توضیحات:\n$description\n\n";
$message .= "---\nارسال شده از کدیار 🧙‍♂️\n";

mail($to, $subject, $message, "Content-Type: text/plain; charset=UTF-8");

echo json_encode(['success' => true, 'message' => 'تکلیف با موفقیت ارسال شد! 📤']);
?>
