<?php
//Sohan Patel
//CS490 Summer
//Alpha | Front
$data = intval($_POST["examID"]);
$curl = curl_init();
$holder = array("testID"=>$data);
//$curl = curl_init("https://web.njit.edu/~sp2492/front/alpha/loginman.php");
//$njitrec=cul_init("https://aevitepr2.njit.edu/myhousing/login.cfm"
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanBack/getTest.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($holder));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
//$response = JSON_encode($response);
curl_close($curl);
echo $response;
//print $response;
?>
