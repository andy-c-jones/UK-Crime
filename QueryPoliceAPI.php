<?php
	$input = $_GET["location"];
	$url = "http://uk-postcodes.com/postcode/$input.json";
	
	$curl = curl_init();
    curl_setopt($curl, CURLOPT_HTTPGET, 1);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $returnedPostCode = curl_exec($curl);
    $arrayPost = json_decode($returnedPostCode);

    $geo = $arrayPost->{'geo'};
    $lat = $geo->{'lat'};
    $lng = $geo->{'lng'};

	$url = "http://data.police.uk/api/crimes-street/all-crime?lat=$lat&lng=$lng";
    curl_setopt($curl, CURLOPT_URL, $url);

    echo $returnedJson = curl_exec($curl);
?>