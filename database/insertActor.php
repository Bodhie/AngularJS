<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include "connect.php";
$data        = json_decode(file_get_contents("php://input"));

$movie_id    = $dbhandle->real_escape_string($data->movie_id);
$actor_name  = $dbhandle->real_escape_string($data->actor_name);

$query1       = "INSERT INTO actor(name) VALUES('".$actor_name."')";
$dbhandle->query($query1);
$actor_id   = mysqli_insert_id($dbhandle);


$query2       = "INSERT INTO plays(movie_id, actor_id) VALUES('".$movie_id."', '".$actor_id."')";
$dbhandle->query($query2);
?>