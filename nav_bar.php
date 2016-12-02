<?php 
$request = json_decode(file_get_contents("php://input"), true);
$array = [
    "msg" => "Home" . $request[name] . "."
];
echo json_encode($array); 
?>
