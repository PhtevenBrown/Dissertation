<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<style>../css/style.css</style>
	<title>The Overbridge</title>
</head>
<body>
	<div>
		<form method="post">
			<input type="submit" name="reset" value="Reset Database" /><br/>
		</form>
	</div>
</body>

<?php
include("../include/db_config.php");
include("../include/db_connect.php");

function resetDatabase($db) {
	$sql = "DELETE FROM `Runner`";
	$db->query($sql);
	$sql = "ALTER TABLE Runner AUTO_INCREMENT = 1";
	$db->query($sql);
	$db->close();
	echo "Database has been cleared.";
}

if(array_key_exists('reset',$_POST)){
	resetDatabase($db);
}
?>