<?php
namespace lib\conf;

class models {

  public static $dating = array('user_profiles' => array('primary_key' => array('field' => 'attribute', 'auto_increment' => ''), 'fields' => array('user_id' => '%d', 'attribute' => '%s', 'value' => '%s', 'date_added' => '%S', 'date_updated' => '%S'), 'defaults' => array('user_id' => '0', 'attribute' => '', 'value' => '', 'date_added' => '0', 'date_updated' => '0')), 'users' => array('primary_key' => array('field' => 'id', 'auto_increment' => '1'), 'fields' => array('id' => '%d', 'handle' => '%s', 'email' => '%s', 'date_added' => '%S', 'date_updated' => '%S'), 'defaults' => array('id' => '', 'handle' => '', 'email' => '', 'date_added' => '0', 'date_updated' => '0')));

}
