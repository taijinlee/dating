<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

switch ($_SERVER['REQUEST_METHOD']) {

  case 'GET':
    if (preg_match('|^/(\d+)|', $_SERVER['PATH_INFO'], $matches)) {
      // retrieve single user
      $user_profile = \lib\user_profile::get($matches[1]);

      $birthday_parsed = date_parse($user_profile['birthday']);
      $user_profile['birthday_year'] = $birthday_parsed['year'] ? $birthday_parsed['year'] : '';
      $user_profile['birthday_month'] = $birthday_parsed['month'] ? $birthday_parsed['month'] : '';
      $user_profile['birthday_day'] = $birthday_parsed['day'] ? $birthday_parsed['day'] : '';
      unset($user_profile['birthday']);
      
      echo json_encode($user_profile);
    }
    break;

  case 'PUT':
    $handle = fopen('php://input','r');
    $jsonInput = fgets($handle);
    $decoded = json_decode($jsonInput, true);

    $decoded['birthday'] = sprintf('%4d-%02d-%02d', $decoded['birthday_year'], $decoded['birthday_month'], $decoded['birthday_day']);
    // $decoded['birthday'] = "{$decoded['birthday_year']}-{$decoded['birthday_month']}-{$decoded['birthday_day']}";
    unset($decoded['birthday_year'], $decoded['birthday_month'], $decoded['birthday_day']);

    $user_profile = \lib\user_profile::get($decoded['id']);
    foreach ($decoded as $key => $value) {
      if (!isset($user_profile[$key])) {
        // add it
        \lib\user_profile::add($decoded['id'], $key, $value);
      } else if ($user_profile[$key] != $value) {
        // change it
        \lib\user_profile::update($decoded['id'], $key, $value);
      } else {
        // do nothing
      }
    }
    

    break;


  default:
    \lib\log::error('REQUEST METHOD INVALID: ' . $_SERVER['REQUEST_METHOD']);
    

}
