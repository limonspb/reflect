<?php
	require_once('c.php');
	$c = dbconnect();
	
	$mode = $_REQUEST['mode'];
		
	if ($mode == 'showall'){
		$request = "SELECT * FROM `refl_records` WHERE 1=1 ORDER BY -count LIMIT 0, 10";
		$res = mysql_query($request);
		
		$dom = new DOMDocument('1.0', 'utf-8');
		$reply = $dom->createElement('reply');
		$dom->appendChild($reply);
		
		$reply->setAttribute('status',"OK");

		$names = $dom->createElement('names');
		$reply->appendChild($names);
		
		
		while($row = mysql_fetch_array($res)){
			$name = $dom->createElement('name');
			$names->appendChild($name);
			$name->setAttribute('name',htmlspecialchars($row['name']));
			$name->setAttribute('count',htmlspecialchars($row['count']));
			//echo $row['name']." :".$row['count']."<br>";
		}
		
		$xml->formatOutput = true;
		echo $dom->saveXML();
	}else
	if (($mode == 'sdaoOIJASDLknasd0O0OOO000OO00Llll111ll1l1l1l111l1l0o0o0oOooolaJASNDinasid')){
		$name = mysql_real_escape_string($_REQUEST['name']);
		$count = mysql_real_escape_string($_REQUEST['count']);
		$gameid = mysql_real_escape_string($_REQUEST['gameid']);
		$gameTime = mysql_real_escape_string($_REQUEST['gameTime']);
		
		$request = "SELECT * FROM `refl_games` WHERE gameid = '$gameid' AND finished = '0'";
		$res = mysql_query($request);
		$NN = mysql_num_rows($res);
		if ($NN == 1){
			$row = mysql_fetch_array($res);
			$gamestart = $row['gamestart'];
			$iddd = $row['id'];
		
			$dt = time() - strtotime($gamestart);
			if (abs($dt-$gameTime/1000) < 60){
				if (($count < 10000) or ($dt > 250)){
					$gameTime = $gameTime/1000;
					$request = "INSERT INTO `refl_records` SET name = '$name', count = '$count', gametime = '$gameTime', gameid='$iddd'";
					$res = mysql_query($request);
					
					$request = "SELECT COUNT(*) FROM `refl_records` WHERE count > '$count'";
					$res = mysql_query($request);
					$N = mysql_fetch_array($res);
					$N = $N[0]+1;
					
					$request = "UPDATE `refl_games` SET finished='1', gamelength='$dt' WHERE id='$iddd'";
					mysql_query($request);
					//echo $N;
					
					$dom = new DOMDocument('1.0', 'utf-8');
					$reply = $dom->createElement('reply');
					$dom->appendChild($reply);
					$reply->setAttribute('place',htmlspecialchars($N));
					$reply->setAttribute('nnnn',abs($dt-$gameTime/1000));
					$xml->formatOutput = true;
					echo $dom->saveXML();
				}
			}
		}
	}
	
	dbdisconnect($c);
?>