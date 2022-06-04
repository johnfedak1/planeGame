<?php  

// Create connection
$conn = new mysqli($local_host, $db_username, $db_psw, $db);

// Check connection
if ($conn->connect_error) {
  echo "0";
  exit();
}

// prepare and bind
$stmt = $conn->prepare("SELECT * FROM $tableName LIMIT 1;");

if ($stmt === false) {
	echo "0";
	exit();
}

$returnVal = $stmt->execute();

if ($returnVal === false) {
	echo "0";
	exit();
}

$stmt->bind_result($highScore);

$stmt->fetch();

echo $highScore;

$stmt->close();
$conn->close();

?>
