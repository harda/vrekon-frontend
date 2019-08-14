<?php
 

 header("Access-Control-Allow-Origin: *",false);
 header("Access-Control-Allow-Headers: *");
 $ret = [
    "response"=>"wawa",
    "log"=>[
        "message"=>"success",
        "status"=>"ok"
    ]
 ];

 echo json_encode($ret);

 
?>

