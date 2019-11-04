<?php
$user = $_POST['User'];
$testID = $_POST['testID'];
$answers = array();
for($i = 0; $i < sizeof($_POST['Responses']); $i++){
	array_push($answers, $_POST['Responses'][$i]['response']);
}

$data = array("User" => $user, "testID" => $testID, "Answers" => $answers);
//echo json_encode($data);

$curl = curl_init();
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanMiddle/grade.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
//$response = JSON_encode($response);
curl_close($curl);
echo $response;
//print $response;
?>