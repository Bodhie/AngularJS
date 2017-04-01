<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//database settings
include "connect.php";
$data = json_decode(file_get_contents("php://input"));

$username = $dbhandle->real_escape_string($data->username);
$password    = hash('sha256', $dbhandle->real_escape_string($data->password));

$query  = "SELECT * FROM user WHERE username = '".$username."' AND password = '".$password."'";
$rs     = $dbhandle->query($query);


if($rs->num_rows == 1) {
    while ($row = $rs->fetch_array()) {
        $value[] = $row;
    }
    print json_encode($value);
}
