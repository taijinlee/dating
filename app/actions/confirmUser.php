<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class confirmUser extends \lib\actions {

  public static function post() {
    if (\lib\token::match($_POST['token'], 'createuser', $_POST['email'], $_POST['time'], 0)) {
      // email confirmed
      \lib\user::confirm($_POST['email']);
      $user = \lib\user::get($_POST['email'], 'email');
      $_SESSION['user_id'] = $user['id'];

      return true;
    } else {
      // email not confirmed
      // $_POST[''];
      return false;
    }
  }


}

confirmUser::run();

