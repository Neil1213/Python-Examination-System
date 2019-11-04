<?php
//Sohan Patel
//CS490 Summer
//Alpha | Front
$rawData = file_get_contents('php://input');
$decodeData = json_decode($rawData);
$Signature = $decodeData -> {
	"Signature"
}
;
$Question = $decodeData ->{
	"Question"
}
;
$Difficulty = $decodeData -> {
	"Difficulty"
}
;
$Category = $decodeData ->{
	"Category"
}
;
$TestCases = $decodeData ->{
	"TestCases"
}
;
$Constraints = implode(",", $decodeData ->{"Constraints"});
//echo(json_encode($TestCases));
//
$data = array("Signature" => $Signature,"Question" => $Question, "Difficulty"=>$Difficulty, "Category"=>$Category, "Cases"=>$TestCases, "Constraints"=>$Constraints);
//echo json_encode($data);
//echo json_encode($data);
$curl = curl_init();
//$curl = curl_init("https://web.njit.edu/~sp2492/front/alpha/loginman.php");
//$njitrec=cul_init("https://aevitepr2.njit.edu/myhousing/login.cfm"
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ns642/sohanBack/insertQuestions.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
//$response = JSON_encode($response);
curl_close($curl);
echo $response;
//print $response;
?>
