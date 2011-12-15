<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class login extends \lib\actions {

  public static function post() {
    if ($user = \lib\user::authenticate($_POST['username'], $_POST['password'])) {
      $_SESSION['user_id'] = $user['id'];
      return true;
    } else {
      return false;
    }
  }

}

login::run();
