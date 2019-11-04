<?php


$data = intval($_POST["examID"]);
$curl = curl_init();
$holder = array("examID"=>$data);

curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanBack/getStudentGradeProf.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($holder));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);

curl_close($curl);
echo $response;

?>


 