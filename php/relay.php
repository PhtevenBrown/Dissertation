<?php
include("../include/db_config.php");
include("../include/db_connect.php");

if(isset($_GET["lat"]) & isset($_GET["lon"]) & isset($_GET["id"])) {
	if($_GET["id"] === USER_ID) {
		$latitude = $_GET["lat"];
		$longitude = $_GET["lon"];
		$sql = "INSERT INTO Runner (latitude, longitude) VALUES ('$latitude', '$longitude')";
		$db->query($sql);
	}
}