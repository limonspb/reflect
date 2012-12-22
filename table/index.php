<?php
	require_once('c.php');
	$c = dbconnect();
	
	$mode = $_REQUEST['mode'];
		
	if ($mode == 'showall'){
		$request = "SELECT * FROM `refl_records` WHERE 1=1 ORDER BY -count LIMIT 0, 9";
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
//	if (($mode == 'sdaoOIJASDLknasd0O0OOO000OO00Llll111ll1l1l1l111l1l0o0o0oOooolaJASNDinasid')
//				&&
//				(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')){
	if (($mode == 'sdaoOIJASDLknasd0O0OOO000OO00Llll111ll1l1l1l111l1l0o0o0oOooolaJASNDinasid')){
		$name = mysql_real_escape_string($_REQUEST['name']);
		$count = mysql_real_escape_string($_REQUEST['count']);
		$request = "INSERT INTO `refl_records` SET name = '$name', count = '$count'";
		$res = mysql_query($request);		
		
		$request = "SELECT COUNT(*) FROM `refl_records` WHERE count > '$count'";
		$res = mysql_query($request);
		$N = mysql_fetch_array($res);
		$N = $N[0]+1;
		//echo $N;
		
		$dom = new DOMDocument('1.0', 'utf-8');
		$reply = $dom->createElement('reply');
		$dom->appendChild($reply);
		$reply->setAttribute('place',htmlspecialchars($N));
		$xml->formatOutput = true;
		echo $dom->saveXML();
		
	}
	
	dbdisconnect($c);
?>