<?php
include("../include/db_config.php");
include("../include/db_connect.php");

$value = $_POST['value'];
$sql = "SELECT * FROM `Runner` WHERE indexNo = '$value'";
$result = $db->query($sql);

if ($result->num_rows > 0) {
	while ($row = $result->fetch_assoc()) {
		$coords = $row;
	}
	echo json_encode($coords);
}

$db->close();