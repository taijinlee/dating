<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class users extends \lib\actions {

  public static function post() {
    $data = self::get_data();
    return \lib\user::create($data) ? true : false;
  }


  public static function get() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      return self::sanitize(\lib\user::get(reset($vars)));
    } else {
      $users = \lib\user::list_users($vars[0], $vars[1], $vars[2]);
      foreach ($users['models'] as &$user) {
        $user = self::sanitize($user);
      }
      unset($user);
      return $users;
    }
  }

  public static function put() {
    $data = self::transform(self::get_data());
    \lib\user::update($data);
  }

  public static function delete() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      \lib\user::delete(reset($vars));
    }
    return true;
  }

  // when receiving information back
  private static function transform($params) {
    unset($params['age']);
    $params['id'] = $_SESSION['user_id'];
    return $params;
  }


  // when sending user information out
  private static function sanitize($user) {
    $user['is_owner'] = ($_SESSION['user_id'] == $user['id']) ? 1 : 0;

    if (!$user['is_owner']) {
      unset($user['birthday'], $user['email']);
    }

    $user['age'] = 0;
    if ($user['birthday'] != '0000-00-00') {
      $today = new DateTime();
      $birthday = new DateTime($user['birthday']);
      $interval = $today->diff($birthday);
      $user['age'] = $interval->y;
    }

    unset($user['password'], $user['confirmed'], $user['date_added'], $user['date_updated']);
    return $user;
  }


}

users::run();
