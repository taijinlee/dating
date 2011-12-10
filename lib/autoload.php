<?php
namespace lib;

/**
 * Autoloader
 * 
 * This class contains the autoloader for Lib classes and Apps classes
 *
 * To enable the autoloader:
 *  autoload::register($tier_name);
 */

class autoload {

  /**
   * Enables the AutoLoader
   * The autoloader is stacked. When looking for the class, it will call the registered functions sequentially
   */
  public static function register() {
    spl_autoload_register(array(new self, 'load'));
  }

  /**
   * Attempts to load a class
   */
  public static function load($class) {
    $path = $_SERVER['DATING_ROOT'] . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';

    if (file_exists($path)) {
      require $path;
      return true;
    }

    return false;
  }

}
