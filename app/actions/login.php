<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_SESSION['user_id'])) {
      echo json_encode(true);
    } else {
      echo json_encode(false);
    }
    break;

  case 'POST':
    // attempt to log user in
    if ($user = \lib\user::authenticate($_POST['username'], $_POST['password'])) {
      $_SESSION['user_id'] = $user['id'];
      echo json_encode(true);
    } else {
      echo json_encode(false);
    }
    break;

  default:
    \lib\log::error('REQUEST METHOD INVALID: ' . $_SERVER['REQUEST_METHOD']);

}
