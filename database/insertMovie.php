<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include "connect.php";
$data = json_decode(file_get_contents("php://input"));

$btnName = $dbhandle->real_escape_string($data->btnName);
$user_id = $dbhandle->real_escape_string($data->user_id);
if($btnName == 'Insert'){

    $name       = $dbhandle->real_escape_string($data->name);
    $caption    = $dbhandle->real_escape_string($data->caption);
    $url        = $dbhandle->real_escape_string($data->url);

    $query       = "INSERT INTO movie(name, caption, url, user_id) VALUES('".$name."','".$caption."','".$url."','".$user_id."')";

    $dbhandle->query($query);

    echo mysqli_insert_id($dbhandle);
}
else if ($btnName == 'Update'){
    $id          = $dbhandle->real_escape_string($data->id);
    $name        = $dbhandle->real_escape_string($data->name);
    $caption     = $dbhandle->real_escape_string($data->caption);
    $url         = $dbhandle->real_escape_string($data->url);

    if($url != null){
        $query       = "UPDATE movie SET name = '".$name."', caption = '".$caption."', url = '".$url."' WHERE id = $id AND user_id = $user_id";
    } else {
        $query       = "UPDATE movie SET name = '".$name."', caption = '".$caption."' WHERE id = $id AND user_id = $user_id";
    }

    $dbhandle->query($query);
} else if ($btnName == 'setSeen'){
    $id          = $dbhandle->real_escape_string($data->id);
    $seen        = $dbhandle->real_escape_string($data->seen);

    $query       = "UPDATE movie SET seen = '".$seen."' WHERE id = $id AND user_id = $user_id";

    $dbhandle->query($query);
}
?>