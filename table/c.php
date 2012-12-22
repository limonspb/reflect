<?php


  function dbconnect(){ //СОЕДИНЯЕМСЯ С БД
	$user="XXXXX";
	$pass="XXXXX";
	$connection=0;
	$connection = mysql_connect('localhost', $user, $pass);
	if (!mysql_select_db($user, $connection)){
	  echo "NOT CONNECTED<br>";
	}	
	mysql_query("SET NAMES 'utf8'");
	mysql_query("SET CHARACTER SET 'utf8'");
	mysql_query("SET SESSION collation_connection = 'utf8_unicode_ci'");
	return 	$connection;
//Данные в таблице MySQL храним в UTF-8, чтобы небыло проблем при просмотре из phpMyAdmin
//mysql_query("set character_set_connection=cp1251;",$connection);

//Данные которые поступают из WEB формы получаю в кодировке cp1251
//mysql_query("set character_set_client=cp1251;",$connection);

//Данные которые поступают в WEB форму для пользователя отдаю в кодировке cp1251
//mysql_query("set character_set_results=cp1251",$connection);

//mysql_query("set names cp1251",$connection);
  }
  
	function dbdisconnect($c){ //РАЗЪЕДИНЯЕМСЯ С БД
		mysql_close($c);		
	}
?>