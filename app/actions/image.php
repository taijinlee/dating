<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

if (!isset($_SESSION['user_id'])) {
  \lib\log::error('image upload attempted by user not logged in');
  echo '';
  exit;
}

abstract class image extends \lib\actions {

  public static function get() {
    $vars = self::get_path_variables();

    if (count($vars) == 1) {
      $image = \lib\image::get(reset($vars));
      header("Content-type: image/{$image['type']}");
      self::$return_json = false;
      return $image['image'];
    } else if (count($vars) == 2 && $vars[0] == 'user') {
      $images = \lib\image::get_user_images($vars[1]);
      return $images;
    }
  }

  public static function post() {
    $user_id = $_SESSION['user_id'];
    $image_data = $_FILES['image'];

    // bad image
    if (strpos($image_data['type'], 'image/') === false) {
      return '';
    }

    // error reading image
    if (!($image = file_get_contents($image_data['tmp_name']))) {
      return '';
    }

    $image_id = \lib\image::create($user_id, $image, $image_data['type']);

    return array('id' => $image_id);
  }

}

image::run();
