<?php
$postData = $_POST["updatedGrade"];
$data = array();

for($x = 0; $x < sizeof($postData); $x++){
	$buf = array(
		"Id" => $postData[$x]["Id"],
		"Feedback" => $postData[$x]["FeedBack"],
		"Points" => $postData[$x]["Points"]
	);
	array_push($data, $buf);
	unset($buf);
}

//echo json_encode($data);


$curl = curl_init();

curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanBack/updateGrade.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
//$response = JSON_encode($response);
curl_close($curl);
echo $response;
//print $response;
?>