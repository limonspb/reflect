<?php
	$life = $_REQUEST['life'];
//	if ($life == "250")
		{
		require_once('c.php');
		$c = dbconnect();
		
		$gameid = uniqid("refl_",true);
		//echo $gameid;
		
		$request = "INSERT INTO `refl_games` SET gameid = '$gameid'";
		$res = mysql_query($request);

		$dom = new DOMDocument('1.0', 'utf-8');
		$reply = $dom->createElement('reply');
		$dom->appendChild($reply);
		
		$reply->setAttribute('status',"OK");
		$reply->setAttribute('gameid',$gameid);
		
		$xml->formatOutput = true;
		echo $dom->saveXML();
		
		dbdisconnect($c);
	}
?>