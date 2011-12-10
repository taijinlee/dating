<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/log.php';
set_error_handler(array('\lib\log', 'error_handler'));

include_once $_SERVER['DATING_ROOT'] . '/lib/autoload.php';
\lib\autoload::register();

// Script::start();
