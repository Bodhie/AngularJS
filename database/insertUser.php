<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include "connect.php";
$data = json_decode(file_get_contents("php://input"));

$username    = $dbhandle->real_escape_string($data->username);
$password    = hash('sha256', $dbhandle->real_escape_string($data->password));
$email       = $dbhandle->real_escape_string($data->email);

$query       = "INSERT INTO user(username, password, email) VALUES('".$username."','".$password."','".$email."')";

$dbhandle->query($query);
