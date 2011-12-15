<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class userprofile extends \lib\actions {

  public static function get() {
    $vars = self::get_path_variables();
    if (count($vars) == 1) {
      $user_profile = \lib\user_profile::get(reset($vars));

      // data massaging for frontend
      $user_profile['birthday_year'] = $user_profile['birthday_month'] = $user_profile['birthday_day'] = '';
      if (isset($user_profile['birthday'])) {
        $birthday_parsed = date_parse($user_profile['birthday']);
        $user_profile['birthday_year'] = $birthday_parsed['year'] ? $birthday_parsed['year'] : '';
        $user_profile['birthday_month'] = $birthday_parsed['month'] ? $birthday_parsed['month'] : '';
        $user_profile['birthday_day'] = $birthday_parsed['day'] ? $birthday_parsed['day'] : '';
        unset($user_profile['birthday']);
      }

      return $user_profile;
    }
  }

  public static function put() {
    $data = self::get_data();

    // data massaging from frontend
    $data['birthday'] = sprintf('%4d-%02d-%02d', $data['birthday_year'], $data['birthday_month'], $data['birthday_day']);
    unset($data['birthday_year'], $data['birthday_month'], $data['birthday_day']);

    \lib\user_profile::set($data);
  }

}

userprofile::run();
