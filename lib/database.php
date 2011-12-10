<?php
namespace lib;

/**
 * Handles all connections with database
 */

class database {

  private static $log = 0;

  private static $connections = array();

  public static function get($database) {
    if (!isset(self::$connections[$database])) {
      $host = \lib\conf\constants::${$database}['host'];
      $user = \lib\conf\constants::${$database}['user'];
      $pass = \lib\conf\constants::${$database}['password'];

      $conn = mysql_connect($host, $user, $pass, $new_link = true);
      if (!$conn) {
        log::error('Database connection cannot be established: ' . $database);
        return false;
      }
      mysql_select_db($database, $conn);
      self::$connections[$database] = $conn;
    }

    return self::$connections[$database];
  }

  public static function queryf($conn, $sql, $args) {
    $args = array_slice(func_get_args(), 2);
    return self::vqueryf($conn, $sql, $args);
  }


  public static function vqueryf($conn, $sql, $args = array()) {
    $sql = self::generate_sql($conn, $sql, $args);

    if (self::$log > 0) {
      self::$log--;
      log::debug($sql);
    }

    $result = mysql_query($sql, $conn);
    if ($error = mysql_error()) {
      log::error($error);
      return false;
    }
    return $result;
  }

  public static function enable_log($num_logs = 1) {
    self::$log = $num_logs;
  }


  private static function generate_sql($conn, $sql, $args) {
    $offset = 0;
    foreach ($args as $key => &$arg) {
      $offset = strpos($sql, '%', $offset);
      if (is_array($arg)) {
        // recursively generate the sql if it is a nested array
        $placeholders = array_fill(0, count($arg), "%{$sql[$offset + 1]}");
        $arg = self::generate_sql(implode(', ', $placeholders), $arg);
        // using an unescaped string at this point
        $sql[$offset + 1] = 'S';
      } else {
        // otherwise just escape the argument
        $arg = mysql_real_escape_string($arg, $conn);
      }
      $offset++;
    }
    unset($arg);

    // adding ' to string arguments
    $sql = str_replace('%s', '\'%s\'', $sql);
    // %S does not auto add quotes
    $sql = str_replace('%S', '%s', $sql);

    return vsprintf($sql, $args);
  }

}
