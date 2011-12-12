<?php
namespace lib;

abstract class session extends entity {

  protected static $database = 'dating', $table = 'sessions';

  public static function init() {
    // Register this object as the session handler
    session_set_save_handler(array('\lib\session', "open"), array('\lib\session', "close"), array('\lib\session', "read"),
                             array('\lib\session', "write"), array('\lib\session', "destroy"), array('\lib\session', "gc"));
  }

  public static function open($save_path, $session_name) {
    return true;
  }

  public static function close() {
    return true;
  }

  public static function read($session_id) {
    $session = self::get($session_id);
    if (!$session) {
      return '';
    }
    return $session['data'];
  }

  public static function write($session_id, $data) {
    if (!($session = self::get($session_id))) {
      self::create(array('id' => $session_id, 'data' => $data));
    } else {
      self::update(array('id' => $session_id, 'data' => $data));
    }
    return true;
  }

  public static function destroy($session_id) {
    if ($session = self::get($session_id)) {
      self::delete($session_id);
      return true;
    }
    return false;
  }

  public static function gc($max_lifetime) {
    // do this manually via cron job instead
    return true;
  }

}
