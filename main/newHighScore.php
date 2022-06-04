<?php  

// Create connection
$conn = new mysqli($local_host, $db_username, $db_psw, $db);

// Check connection
if ($conn->connect_error) {
  echo "0";
  exit();
}

// prepare and bind
$stmt = $conn->prepare("UPDATE $tableName SET $column = ?;");

if ($stmt === false) {
	echo "0";
	exit();
}

$stmt->bind_param("s", $score);

// set parameters and execute
$score = $_POST["score"];

$returnVal = $stmt->execute();

if ($returnVal === false) {
	echo "0";
	exit();
}

$stmt->close();
$conn->close();

?>