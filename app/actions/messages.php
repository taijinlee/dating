<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class messages extends \lib\actions {

  public static function post() {
    $data = self::get_data();
    $id = \lib\messages::create($data);
    return \lib\messages::get($id);
  }

  public static function get() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      return self::sanitize(\lib\messages::get(reset($vars)));
    } else {
      $messages = \lib\messages::list_messages($vars[0], $vars[1], $vars[2]);
      foreach ($messages['models'] as &$message) {
        $message = self::sanitize($message);
      }
      unset($message);
      return $messages;
    }
  }

  public static function put() {
    $data = self::transform(self::get_data());
    \lib\messages::update($data);
  }

  public static function delete() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      \lib\messages::delete(reset($vars));
    }
    return true;
  }


  // when receiving information back
  private static function transform($params) {
    return $params;
  }


  // when sending information out
  private static function sanitize($message) {
    return $message;
  }



}

messages::run();