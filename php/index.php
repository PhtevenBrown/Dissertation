<style><?php include("../css/style.css") ?></style>
<?php
include("../include/db_config.php");
include("../include/db_connect.php");
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<script src="../js/jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css" type="text/css">
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js"></script>
</head>
<title>Tracker</title>
<body>
	<div id="map" class="map"></div>
	<script type="text/javascript" src = ../js/map.js></script>
	<div>
		<script type="text/javascript" src=../js/update.js></script>
	</div>
</body>
</html>
