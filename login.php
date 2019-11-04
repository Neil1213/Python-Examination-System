<?php
//Sohan Patel
//CS490 Summer
//Alpha | Front

$rawData = file_get_contents('php://input');
$decodeData = json_decode($rawData);
//echo $rawData;

//$userID=$decodeData["ucid"];
//$pass=$decodeData["pass"];
$userID = $decodeData -> {
	"ucid"
}
;
$pass = $decodeData ->{
	"pass"
}
;
//
$data = array("ucid" => $userID,"pass" => md5($pass));
//echo json_encode($data);
print_r($data);
$curl = curl_init();
//$curl = curl_init("https://web.njit.edu/~sp2492/front/alpha/loginman.php");
//$njitrec=cul_init("https://aevitepr2.njit.edu/myhousing/login.cfm"
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~pm369/back/beta/dblogin.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
//$response = JSON_encode($response);
curl_close($curl);
echo $response;
//print $response;
?>
