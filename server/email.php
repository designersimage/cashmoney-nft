<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'cashmoneycoin.io';                //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'contact@cashmoneycoin.io';             //SMTP username
    $mail->Password   = 'CashMoneyCoin';                        //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                 //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->setFrom('contact@cashmoneycoin.io', 'Cash Money Coin');

    if (isset($_POST['email']) && isset($_POST['message'])) {
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $email = $_POST['email'];
        $message = $_POST['message'];

        //Recipients
        $mail->addAddress('jonathan@designersimage.io');    //Add a recipient, Name is optional
        $contentHTML = 'Message received from ';
        $contentHTML .= isset($_POST['name']) ? $name . ' (' . $email . ')<br><br>' : $email . '<br><br>';
        $contentHTML .= 'Message:<br>';
        $contentHTML .= $message;

        $content = 'Message received from ';
        $content .= isset($_POST['name']) ? $name . ' (' . $email . ')\r\n\r\n' : $email . '\r\n\r\n';
        $content .= 'Message:\r\n';
        $content .= $message;
    
        //Content
        $mail->isHTML(true);                                            //Set email format to HTML
        $mail->Subject = 'Contact Message Received';
        $mail->Body    = $contentHTML;
        $mail->AltBody = nl2br($content);
        
        if (!$mail->send()) {
            die(json_encode([
                'status' => 'error',
                'message' => $mail->ErrorInfo
            ]));
        } else {
            die(json_encode([
                'status' => 'success',
                'message' => 'Message Successfully submitted, thank you! We will be in contact with you shortly.'
            ]));
        }
        
    }

} catch (Exception $e) {
    die(json_encode([
        'status' => 'error',
        'message' => $mail->ErrorInfo
    ]));
}