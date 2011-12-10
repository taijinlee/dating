<?php
namespace build;

class constants extends build {

  protected static function _build($is_prod) {

    $params = array();

    // base hostname
    if ($is_prod) {
      $params['domain'] = 'dating.nopuku.com';
    } else {
      $user = trim(`whoami`);
      $params['domain'] = "{$user}.dating.nopuku.com";
    }

    // twig configs
    if ($is_prod) {
      $params['twig_cache_on'] = true;
      $params['twig_debug_on'] = false;
    } else {
      $params['twig_cache_on'] = false;
      $params['twig_debug_on'] = true;
    }

    // database login
    if ($is_prod) {
      $params['dating'] = array('host' => 'localhost', 'user' => 'root', 'password' => '');
    } else {
      $params['dating'] = array('host' => 'localhost', 'user' => 'root', 'password' => '');
    }

    foreach ($params as $key => $value) {
      self::add_param($key, $value);
    }
  }

}
