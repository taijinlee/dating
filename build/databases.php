<?php
namespace build;

class databases extends build {

  public static function get_databases($is_prod) {
    $databases = array();
    if ($is_prod) {
      $databases['dating'] = array('host' => 'localhost', 'user' => 'root', 'password' => '');
      // $databases['taijinlee']         = array('host' => 'localhost', 'user' => 'root', 'password' => '');
      /* $databases['wine']       = array('host' => 'localhost', 'user' => 'nopuku', 'password' => 'nopuku'); */
      /* $databases['logs']       = array('host' => 'localhost', 'user' => 'nopuku', 'password' => 'nopuku'); */
      /* $databases['sessions']   = array('host' => 'localhost', 'user' => 'nopuku', 'password' => 'nopuku'); */
    } else {
      $databases['dating'] = array('host' => 'localhost', 'user' => 'root', 'password' => '');
      // $databases['taijinlee']         = array('host' => 'localhost', 'user' => 'root', 'password' => '');
      /* $databases['logs']       = array('host' => 'localhost', 'user' => 'nopuku', 'password' => 'nopuku'); */
      /* $databases['sessions']   = array('host' => 'localhost', 'user' => 'nopuku', 'password' => 'nopuku'); */
      // $databases['unit_test_bad_database'] = array('host' => 'nowhere', 'user' => 'noone', 'password' => 'nothing');
    }
    return $databases;
  }

  protected static function _build($is_prod) {
    foreach (self::get_databases($is_prod) as $key => $value) {
      self::add_param($key, $value);
    }
  }

}
