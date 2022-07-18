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
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('contact@cashmoneycoin.io', 'Cash Money Coin');
    $mail->addAddress('jonathan@designersimage.io', 'Joe User');     //Add a recipient
    //$mail->addAddress('ellen@example.com');                         //Name is optional
    

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
    $mail->send();
    die(json_encode([
        'status' => 'Success',
        'message' => 'Message Successfully submitted, thank you! We will be in contact with you shortly.'
    ]));
} catch (Exception $e) {
    die(json_encode([
        'status' => 'error',
        'message' => $mail->ErrorInfo
    ]));
}

// if (isset($_POST['email']) && isset($_POST['message'])) {
//     $name = isset($_POST['name']) ? $_POST['name'] : '';
//     $email = $_POST['email'];
//     $message = $_POST['message'];


//     $mail->setFrom('contact@cashmoneycoin.io', 'Cash Money Coin');
//     $mail->addAddress('jonathan@designersimage.io', 'Me');
//     $mail->Subject = 'Contact Message Received';

//     // Set HTML
//     $mail->isHTML(TRUE);
//     $mail->Body = '<html>Hi there, we are happy to <br>confirm your booking.</br> Please check the document in the attachment.</html>';
//     $mail->AltBody = 'Hi there, we are happy to confirm your booking. Please check the document in the attachment.';
    
//     // send the message
//     if(!$mail->send()){
//         die(json_encode([
//             'status' => 'error',
//             'message' => $mail->ErrorInfo
//         ]));
//     } else {
//         die(json_encode([
//             'status' => 'Success',
//             'message' => 'Message Successfully submitted, thank you! We will be in contact with you shortly.'
//         ]));
//     }

    
// }





// if(isset($_GET['email']) && isset($_GET['message']))
// {
//     $to = "jonathan.wheeler87@gmail.com";
//     $subject = "Contact Message Received";
//     $headers = "From: contact@cashmoneycoin.io";

//     $retval = mail($to,$subject,$message,$headers);

//     if ($retval == true) {
//         die(json_encode([
//             'value' => 1,
//             'error' => null,
//             'data' => $data
//         ]));
//     }
    
// }