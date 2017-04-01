<?php

if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {

    // uploads image in the folder images
    $temp = explode(".", $_FILES["file"]["name"]);
    $newfilename = $temp[0];
    move_uploaded_file($_FILES['file']['tmp_name'], 'img/' . $newfilename);

    // give callback to your angular code with the image src name
    echo json_encode('img/' . $newfilename);
}
?>