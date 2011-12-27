<?php
namespace lib;

abstract class messages extends \lib\entity {

  protected static $database = 'dating';
  protected static $table = 'messages';

  public static function list_messages($page, $per_page) {
    $user_id = $_SESSION['user_id'];

    $conn = self::get_database();
    $res = database::queryf($conn, 'SELECT SQL_CALC_FOUND_ROWS * FROM messages WHERE to_user_id = %d LIMIT %d, %d', $user_id, ($page-1) * $per_page, $per_page);

    $messages = array();
    while ($row = mysql_fetch_assoc($res)) {
      $messages[] = $row;
    }

    $total_rows = mysql_fetch_row(database::queryf($conn, 'SELECT FOUND_ROWS()'));
    $total_rows = reset($total_rows);

    return array('page' => $page, 'perPage' => $per_page, 'total' => $total_rows, 'models' => $messages);
  }

}
