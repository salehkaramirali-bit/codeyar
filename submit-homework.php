<?php
// ===== تنظیمات =====
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ===== دریافت داده‌ها =====
$name = isset($_POST['hwName']) ? trim($_POST['hwName']) : '';
$email = isset($_POST['hwEmail']) ? trim($_POST['hwEmail']) : '';
$course = isset($_POST['hwCourse']) ? trim($_POST['hwCourse']) : '';
$description = isset($_POST['hwDescription']) ? trim($_POST['hwDescription']) : '';

// ===== اعتبارسنجی =====
$errors = [];

if (empty($name)) {
    $errors[] = 'نام و نام خانوادگی الزامی است';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'ایمیل معتبر وارد کنید';
}

if (empty($course)) {
    $errors[] = 'دوره را انتخاب کنید';
}

if (empty($description)) {
    $errors[] = 'توضیحات پروژه الزامی است';
}

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode(' — ', $errors)
    ]);
    exit;
}

// ===== ذخیره در فایل (به عنوان دیتابیس ساده) =====
$dataFile = 'homework_data.json';
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

// اضافه کردن تکلیف جدید
$newHomework = [
    'id' => time(),
    'name' => $name,
    'email' => $email,
    'course' => $course,
    'description' => $description,
    'date' => date('Y/m/d H:i:s'),
    'status' => 'new'
];

array_push($homeworks, $newHomework);

// ذخیره در فایل
file_put_contents($dataFile, json_encode($homeworks, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ===== ارسال ایمیل =====
$to = 'salehkaramirali@gmail.com';
$subject = 'تکلیف جدید از کدیار - ' . $course;

$message = "📋 تکلیف جدید از کدیار\n\n";
$message .= "👤 نام: $name\n";
$message .= "📧 ایمیل: $email\n";
$message .= "📚 دوره: $course\n";
$message .= "📝 توضیحات:\n$description\n\n";
$message .= "---\nارسال شده از کدیار 🧙‍♂️\n";
$message .= "تاریخ: " . date('Y/m/d H:i:s') . "\n";

$headers = [
    'From: noreply@codeyar.com',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// تلاش برای ارسال ایمیل
$emailSent = mail($to, $subject, $message, implode("\r\n", $headers));

// ===== پاسخ =====
if ($emailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'تکلیف با موفقیت ارسال شد! 📤'
    ]);
} else {
    // حتی اگر ایمیل ارسال نشد، داده ذخیره شده
    echo json_encode([
        'success' => true,
        'message' => 'تکلیف ذخیره شد اما ارسال ایمیل با مشکل مواجه شد. (داده‌ها ذخیره شده‌اند)'
    ]);
}
?>
