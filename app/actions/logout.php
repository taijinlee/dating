<?php

include_once $_SERVER['DATING_ROOT'] . '/lib/init-global.php';

unset($_SESSION['user_id']);
echo json_encode(true);
