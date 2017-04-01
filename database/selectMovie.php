<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//database settings
include "connect.php";

if(isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    $query = "select * from movie WHERE user_id = $user_id ORDER BY seen ASC, id DESC";
    $rs     = $dbhandle->query($query);

    if($rs->num_rows > 0) {
        while ($row = $rs->fetch_array()) {
            $data[] = $row;
        }
        print json_encode($data);
    }
}else if(isset($_GET['movie_id'])){
    $movie_id = $_GET['movie_id'];

    $query = "select * from movie WHERE id = $movie_id";
    $rs     = $dbhandle->query($query);

    if($rs->num_rows == 1) {
        while ($row = $rs->fetch_array()) {
            $data = $row;
        }
        print json_encode($data);
    }
}else if(isset($_GET['movie_id_for_actor'])){
    $movie_id = $_GET['movie_id_for_actor'];

    $query  = "SELECT * FROM `actor` INNER JOIN plays on(actor.id = plays.actor_id) WHERE plays.movie_id = $movie_id";

    $rs     = $dbhandle->query($query);

    if($rs->num_rows > 0) {
        while ($row = $rs->fetch_array()) {
            $data[] = $row;
        }
        print json_encode($data);
    }
}

?>