<?php
namespace lib;

class mail {

  // public static function __construct() {
    // Set to use PHP's mail()

    // Set Content-Type and charset
    // if ('text/html' == $content_type)


    // Set custom headers
    // if (!empty($headers)) {
    //   foreach((array) $headers as $name => $content) {
    //     $phpmailer->AddCustomHeader(sprintf('%1$s: %2$s', $name, $content));
    //   }

    //   if (false !== stripos($content_type, 'multipart') && ! empty($boundary)) {
    //     $phpmailer->AddCustomHeader(sprintf("Content-Type: %s;\n\t boundary=\"%s\"", $content_type, $boundary));
    //   }
    // }

  // }

  /**
   * Send mail, similar to PHP's mail
   *
   * A true return value does not automatically mean that the user received the
   * email successfully. It just only means that the method used was able to
   * process the request without any errors.
   *
   * The default content type is 'text/plain' which does not allow using HTML.
   */
  public static function send($from_email, $from_name, array $to, $subject, $message, array $cc = array(), array $bcc = array(), array $attachments = array()) {
    $mailer = new phpmailer();

    $content_type = 'text/plain';
    $mailer->ContentType = $content_type;
    $mailer->Hostname = \lib\conf\constants::$domain;


    $mailer->IsMail();
    $mailer->IsHTML(false);

    $mailer->From     = $from_email;
    $mailer->FromName = $from_name;

    // add recipients
    foreach ((array) $to as $recipient_name => $recipient_email) {
      $mailer->AddAddress(trim($recipient_email), trim($recipient_name));
    }
    // Add any CC and BCC recipients
    foreach ($cc as $recipient_name => $recipient_email) {
      $mailer->AddCc(trim($recipient_email), trim($recipient_name));
    }
    foreach ($bcc as $recipient_name => $recipient_email) {
      $mailer->AddBcc(trim($recipient_email), trim($recipient_name));
    }

    // Set mail's subject and body
    $mailer->Subject = $subject;
    $mailer->Body    = $message;

    foreach ($attachments as $attachment) {
      $mailer->AddAttachment($attachment);
    }

    // Send!
    $result = $mailer->Send();

    return $result;  
  }

}
