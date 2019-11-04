<?php

$Question = $_POST["Question"];
$Difficulty = $_POST["Difficulty"];
$Category = $_POST["Category"];
$Constraint = $_POST["Constraint"];

$data = array("Question" => $Question, "Difficulty" => $Difficulty, "Category" => $Category, "Constraint" => $Constraint);

$curl = curl_init();
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanBack/filter.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>