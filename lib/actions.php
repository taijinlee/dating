<?php
namespace lib;

abstract class actions {

  protected static $return_json = true;

  public static function run() {
    $request_method = strtolower($_SERVER['REQUEST_METHOD']);
    $class = get_called_class();

    $return_value = '';
    if (method_exists($class, $request_method)) {
      $path_info = !empty($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
      $return_value = $class::$request_method($path_info);
    } else {
      \lib\log::error("request method invalid: class: $class, request_method: $request_method");
    }

    if (self::$return_json) {
      echo json_encode($return_value);
    } else {
      echo $return_value;
    }
  }

  protected static function get_data() {
    $handle = fopen('php://input','r');
    $jsonInput = fgets($handle);
    $decoded = json_decode($jsonInput, true);
    return $decoded;
  }

  protected static function get_path_variables() {
    $path = explode('/', substr($_SERVER['PATH_INFO'], 1));
    return $path;
  }


}
