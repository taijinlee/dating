<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

switch($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    // retrieve single session
    \lib\log::debug($_SESSION);
    echo json_encode($_SESSION);
    break;

  case 'PUT':
    // update
    break;

  default:
    \lib\log::error('REQUEST METHOD INVALID: ' . $_SERVER['REQUEST_METHOD']);

}
