<?php
namespace lib;

abstract class image {

  public static function create($user_id, $image_data, $type) {
    $conn = \lib\database::get('dating');
    \lib\database::queryf($conn, 'INSERT INTO user_images (user_id, image, type, date_added, date_updated) VALUES (%d, %s, %s, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())', $user_id, $image_data, $type);
    return mysql_insert_id($conn);
  }

  public static function get($image_id) {
    $conn = \lib\database::get('dating');
    return mysql_fetch_assoc(\lib\database::queryf($conn, 'SELECT * FROM user_images WHERE id = %d', $image_id));
  }

  public static function delete($image_id) {
    $conn = \lib\database::get('dating');
    \lib\database::queryf($conn, 'DELETE FROM user_images WHERE id = %d', $image_id);
    return true;

  }

  public static function get_user_images($user_id) {
    $conn = \lib\database::get('dating');
    $res = \lib\database::queryf($conn, 'SELECT id FROM user_images WHERE user_id = %d', $user_id);

    $images = array();
    while ($row = mysql_fetch_assoc($res)) {
      $images[] = $row;
    }

    return $images;
  }



}
