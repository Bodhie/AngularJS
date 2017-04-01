<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include "connect.php";

$data   = json_decode(file_get_contents("php://input"));
$id     = $data->id;

$query  = "DELETE FROM movie WHERE id=".$id;

$dbhandle->query($query)

?>