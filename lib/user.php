<?php
namespace lib;

/**
 * User data object
 */

abstract class user extends entity {

  protected static $database = 'dating';
  protected static $table = 'users';

  public static function create(array $params = array()) {
    $password = $params['password'];
    $params['password'] = '';

    $user_id = parent::create($params);
    $password_hash = \lib\token::generate($password, $user_id, 0, 0);
    parent::update(array('id' => $user_id, 'password' => $password_hash));

    // send out email to user
    $time = time();
    $token = \lib\token::generate('createuser', $params['email'], $time, 0);
    $domain = \lib\conf\constants::$domain;
    $url = "http://$domain/#/confirmuser/$token/$time/{$params['email']}";
    \lib\mail::send('bounce@nopuku.com', 'nobody', array($params['email']), 'Please confirm your email', $url);
  }

  public static function confirm($email) {
    $conn = self::get_database();
    database::queryf($conn, 'UPDATE `users` SET `confirmed` = 1, `date_updated` = UNIX_TIMESTAMP() WHERE email = %s LIMIT 1', $email);
    return true;
  }

  public static function list_users($page_number, $per_page, $query_string) {
    parse_str($query_string, $parsed_query_string);

    $where = $values = array();
    foreach ($parsed_query_string as $column => $query) {
      if (strpos($query, '[') === 0) {
        // range
        $range = explode(',', str_replace(array('[', ']'), '', $query));
        if (count($range) != 2) {
          \lib\log::error("range formatted incorrectly: $query");
          return false;
        }
        $where[] = "`$column` >= %s AND `$column` <= %s";
        $values[] = $range[0];
        $values[] = $range[1];
      } else {
        // checkbox
        $where[] = "`$column` IN (%s)";
        $values[] = explode(',', $query);
      }
    }

    $limit_array = array(($page_number-1) * $per_page, $per_page);
    $values = array_merge($values, $limit_array);
    $where = implode(' AND ', $where);

    $conn = self::get_database();
    $res = database::vqueryf($conn, "SELECT SQL_CALC_FOUND_ROWS * FROM `users` WHERE $where LIMIT %d, %d", $values);

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

    if (\lib\token::match($user['password'], $password, $user['id'], 0, 0) && $user['confirmed']) {
      return $user;
    }
    return false;
  }
  

}
