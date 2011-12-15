<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class users extends \lib\actions {

  public static function post() {
    $data = self::get_data();
    return \lib\user::create($data);
  }


  public static function get() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      return \lib\user::get(reset($vars));
    } else if (count($vars) == 2) {
      return \lib\user::list_users($vars[0], $vars[1]);
    }
  }

  public static function put() {

  }

  public static function delete() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      \lib\user::delete(reset($vars));
    }
    return true;
  }

}

users::run();
