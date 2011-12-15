<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

abstract class session extends \lib\actions {

  public static function get() {
    return $_SESSION;
  }

}

session::run();
