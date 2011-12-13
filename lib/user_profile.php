<?php
namespace lib;

abstract class user_profile {

  public static function get($user_id) {
    $conn = database::get('dating');
    $res = database::queryf($conn, 'SELECT user_id, attribute, value FROM user_profiles WHERE user_id = %d', $user_id);

    $user_profile = array();
    while ($row = mysql_fetch_assoc($res)) {
      $user_profile[$row['attribute']] = $row['value'];
    }

    return $user_profile;
  }

  public static function add($user_id, $key, $value) {
    $conn = database::get('dating');
    database::queryf($conn, 'INSERT INTO user_profiles (user_id, attribute, value, date_added, date_updated) VALUES (%d, %s, %s, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())', $user_id, $key, $value);
    return true;
  }

  public static function update($user_id, $key, $value) {
    $conn = database::get('dating');
    database::queryf($conn, 'UPDATE user_profiles SET value = %s, date_updated = UNIX_TIMESTAMP() WHERE user_id = %d AND attribute = %s', $value, $user_id, $key);
    return true;
  }


}
