<?php
namespace lib;

/**
 * Base class for ORM
 * Child class needs to specify:
 *   protected static $database
 *   protected static $table
 *
 * No functions need to be overridden
 */

abstract class entity {

  /**
   * Create new entity with parameters
   */
  public static function create(array $params = array()) {
    $class = get_called_class();
    $model = \lib\conf\models::${$class::$database}[$class::$table];

    $params['date_added'] = $params['date_updated'] = 'UNIX_TIMESTAMP()';
    $keys = array_keys($params);

    // check primary key possibilities
    if ($model['primary_key']['auto_increment']) {
      // primary key cannot be set if it is auto_increment
      if (!empty($params[$model['primary_key']['field']])) {
        log::error('cannot create with auto_increment key filled in: table: ' . $class::$table . ' field: ' . $model['primary_key']['field']);
        return false;
      }
    } else {
      // primary key must be filled in if not auto_increment
      if (empty($params[$model['primary_key']['field']])) {
        log::error('primary key unspecified: table: ' . $class::$table . ' field: ' . $model['primary_key']['field']);
        return false;
      }
    }

    $placeholders = $values = array();
    foreach ($keys as $key) {
      // if primary is auto_increment, then skip it
      if ($model['primary_key']['auto_increment'] && $model['primary_key']['field'] == $key) {
        continue;
      }

      if (!isset($model['fields'][$key])) {
        continue;
      }

      $column_list[] = $key;
      $placeholders[] = $model['fields'][$key];
      $values[] = $params[$key];
    }

    $column_list = '(`' . implode('`, `', $column_list) . '`)';
    $placeholders = '(' . implode(', ', $placeholders) . ')';

    $conn = self::get_database();
    database::vqueryf($conn, "INSERT INTO `{$class::$table}` $column_list VALUES $placeholders", $values);

    if ($model['primary_key']['auto_increment']) {
      $primary_key = mysql_insert_id($conn);
    } else {
      $primary_key = $params[$model['primary_key']['field']];
    }

    return $primary_key;
  }

  /**
   * Get entity record from database via primary_key
   */
  public static function get($primary_key, $key_field = false) {
    $class = get_called_class();
    $model = \lib\conf\models::${$class::$database}[$class::$table];

    if (!$key_field) {
      $field = $model['primary_key']['field']; // primary key field name
    } else {
      $field = $key_field;
    }

    $conn = self::get_database();
    $res = database::queryf($conn, "SELECT * FROM `{$class::$table}` WHERE `$field` = " . $model['fields'][$field], $primary_key);
    $params = mysql_fetch_assoc($res);
    if (!empty($params)) {
      return $params;
    }
    return false;
  }

  public static function update(array $params) {
    $class = get_called_class();
    $model = \lib\conf\models::${$class::$database}[$class::$table];

    // do not update the primary key
    $primary_key = $params[$model['primary_key']['field']];
    unset($params['date_added'], $params[$model['primary_key']['field']]);
    $params['date_updated'] = 'UNIX_TIMESTAMP()';

    $keys = array_keys($params);
    $set_columns = array();
    foreach ($keys as $key) {
      $set_columns[] = "`$key` = " . $model['fields'][$key];
    }
    $set_columns = 'SET ' . implode(', ', $set_columns);

    $params[] = $primary_key;

    $conn = self::get_database();
    database::vqueryf($conn, "UPDATE `{$class::$table}` $set_columns WHERE `" . $model['primary_key']['field'] . '` = ' . $model['fields'][$model['primary_key']['field']], $params);
    return true;
  }

  /**
   * Delete the entity
   */
  public static function delete($primary_key) {
    $class = get_called_class();
    $model = \lib\conf\models::${$class::$database}[$class::$table];

    $conn = self::get_database();
    database::queryf($conn, "DELETE FROM `{$class::$table}` WHERE `" . $model['primary_key']['field'] . '` = %s LIMIT 1', $primary_key);
    return true;
  }




  /**
   * Helper function to update into database
   */


  protected static function get_database() {
    $class = get_called_class();
    return database::get($class::$database);
  }

}
