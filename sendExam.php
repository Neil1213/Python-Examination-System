<?php
//Sohan Patel
//CS490 Summer
//Alpha | Front



//
$data = $_POST;
$examData = array();
//echo json_encode($_POST);
for($i=1; $i < sizeof($_POST)+1; $i++){
	$buf = array();
	array_push($buf, intval($_POST[strval($i)][0]));
	array_push($buf, intval($_POST[strval($i)][1]));

	array_push($examData, $buf);
	unset($buf);

}

//echo json_encode($examData);

//echo json_encode($examData);
//echo json_encode($data);
//echo json_encode($_POST);
$curl = curl_init();
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanBack/createTest.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($examData));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
$response = JSON_encode($response);
curl_close($curl);
echo $response;
//print $response;
?>
