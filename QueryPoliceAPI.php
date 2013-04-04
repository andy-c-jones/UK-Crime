<?php
	$input = $_GET["location"];

	$url = "http://data.police.uk/api/crimes-at-location?date=2013-02&lat=52.629729&lng=-1.131592";

	$curl = curl_init();
    curl_setopt($curl, CURLOPT_HTTPGET, 1);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    echo $returnedJson = curl_exec($curl);
?>