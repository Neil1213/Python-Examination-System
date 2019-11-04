<?php
//Manjot Singh
//CS 490 Summer
//Beta | Middle


$userID=$_POST["ucid"];
//username
$pass=$_POST["pass"];
$examnames=$_POST["examnames"];
$topic=$_POST["topic"];
$testID=$_POST["testID"];
$answers=$_POST["answers"];
$comments="NULL";
$grades=0;


//grading part
$questionsMid= str_replace(" ", "",$_POST["questions"]);
$inputMid= str_replace(" ", "",$_POST["input"]);
$outputMid= str_replace(" ", "",$_POST["output"]);
$questions=explode(",",$questionsMid);
$input=explode(":",$inputMid);
$output=explode(":",$outputMid);

//db array 
$Databasearray = array(
  "ucid" => $userID,
  "pass" => md5($pass)
);
//print_r("<br>");
print_r($Databasearray);

// cURL to back and json it
$curl="https://web.njit.edu/~pm369/back/beta/dblogin.php";
//store student exam link
$databaserec=curl_init();
curl_setopt($databaserec, CURLOPT_URL, $curl);
curl_setopt($databaserec, CURLOPT_POST, true);
curl_setopt($databaserec, CURLOPT_POSTFIELDS, $Databasearray);
curl_setopt($databaserec, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($databaserec, CURLOPT_RETURNTRANSFER, 1);
$databasesubmit = curl_exec($databaserec);
curl_close($databaserec);

$wer = $databasesubmit;
//$responsejson3 = array($wer);
$responsejson4= json_encode($wer);
echo $responsejson4;
?>