<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//database settings
include "connect.php";


if(isset($_GET['actor_id'])) {
    $actor_id = $_GET['actor_id'];
    $query  = "select * from actor WHERE id = $actor_id";
    $rs     = $dbhandle->query($query);

    if($rs->num_rows == 1) {
        while ($row = $rs->fetch_array()) {
            $data = $row;
        }
        print json_encode($data);
    }

}
else {
    $query  = "select * from actor";
    $rs     = $dbhandle->query($query);

    if($rs->num_rows > 0) {
        while ($row = $rs->fetch_array()) {
            $data[] = $row;
        }
        print json_encode($data);
    }

}

?>