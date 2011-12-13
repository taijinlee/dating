<?php
namespace lib;

/**
 * User data object
 */

abstract class user extends entity {

  protected static $database = 'dating';
  protected static $table = 'users';

  public static function list_users($page_number, $per_page) {
    $conn = self::get_database();
    $res = database::queryf($conn, 'SELECT SQL_CALC_FOUND_ROWS * FROM `users` LIMIT %d, %d', ($page_number-1) * $per_page, $per_page);

    $users = array();
    while ($row = mysql_fetch_assoc($res)) {
      $users[] = $row;
    }

    $total_rows = mysql_fetch_row(database::queryf($conn, 'SELECT FOUND_ROWS()'));
    $total_rows = reset($total_rows);

    return array('page' => $page_number, 'perPage' => $per_page, 'total' => $total_rows, 'models' => $users);

  }

  public static function authenticate($username, $password) {
    $conn = self::get_database();
    $user = mysql_fetch_assoc(database::queryf($conn, 'SELECT * FROM `users` WHERE `username` = %s', $username));

    if ($user['password'] == $password) {
      return $user;
    }
    return false;
  }
  

}
