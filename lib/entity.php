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
    $keys = array_keys($model['fields']);

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

    $conn = database::get($class::$database);
    database::vqueryf($conn, "INSERT INTO `{$class::$table}` $column_list VALUES $placeholders", $values);

    if ($model['primary_key']['auto_increment']) {
      $primary_key = mysql_insert_id($conn);
    } else {
      $primary_key = $params[$model['primary_key']['field']];
    }

    return true;
  }

  /**
   * Get entity record from database via primary_key
   */
  public static function get($primary_key) {
    $class = get_called_class();
    $model = \lib\conf\models::${$class::$database}[$class::$table];

    $field = $model['primary_key']['field']; // primary key field name

    $conn = database::get($class::$database);
    $res = database::queryf($conn, "SELECT * FROM `{$class::$table}` WHERE `$field` = " . $model['fields'][$field], $primary_key);
    $params = mysql_fetch_assoc($res);
    if (!empty($params)) {
      return $params;
    }
    return false;
  }

  public static function update(array $params) {
    
  }

  /**
   * Delete the entity
   */
  public static function delete($primary_key) {
    $class = get_called_class();
    $model = \lib\conf\models::${$class::$database}[$class::$table];

    $conn = database::get($class::$database);
    database::queryf($conn, "DELETE FROM `{$class::$table}` WHERE `" . $model['primary_key']['field'] . '` = %s LIMIT 1', $primary_key);
    return true;
  }




  /**
   * Helper function to update into database
   */
  /* private function __update() { */
  /*   $class = $this->class; */

  /*   $attributes = $this->get_attributes(); */
  /*   // do not update the primary key */
  /*   $primary_key = $attributes[$this->model['primary_key']['field']]; */
  /*   unset($attributes['date_added'], $attributes[$this->model['primary_key']['field']]); */

  /*   $keys = array_keys($attributes); */
  /*   $set_columns = array(); */
  /*   foreach ($keys as $key) { */
  /*     $set_columns[] = "`$key` = " . $this->model['fields'][$key]; */
  /*   } */
  /*   $set_columns = 'SET ' . implode(', ', $set_columns); */

  /*   $attributes[] = $primary_key; */

  /*   $database = new database($class::$database); */
  /*   $database->query("UPDATE `{$class::$table}` $set_columns WHERE `" . $this->model['primary_key']['field'] . '` = ' . $this->model['fields'][$this->model['primary_key']['field']], $attributes); */
  /*   return $this->__fetch($primary_key); */
  /* } */

  /**
   * Helper function to fetch from database
   */
  private function __fetch($search_key, $field = false, array $where = array()) {
    $class = $this->class;
    $search_keys = array($search_key);

    if (!$field) {
      $field = $this->model['primary_key']['field']; // actual default field
    }

    $placeholders = array();
    foreach ($where as $key => $value) {
      $placeholders[] = "`$key` = " . $this->model['fields'][$key];
      $search_keys[] = $value;
    }
    $where = '';
    if (!empty($placeholders)) {
      $where = ' AND ' . implode(' AND ', $placeholders);
    }

    $attributes = $this->get_attributes();
    $database = new database($class::$database);
    $res = $database->query("SELECT * FROM `{$class::$table}` WHERE `$field` = " . $this->model['fields'][$this->model['primary_key']['field']] . " $where", $search_keys);
    $params = mysql_fetch_assoc($res);
    if (!empty($params)) {
      $this->reset($params);
      return true;
    }
    return false;
  }

}
