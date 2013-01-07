function GameOverScene(){
	$('#cancelRecordButton').click(this.cancelClick);
	
	$('#sendRecordButton').click(this.sendRecordClick);
	
	$('#cancelRecordButton').mouseover(function(){playSound("hover")});
	$('#sendRecordButton').mouseover(function(){playSound("hover")});
	
	$('#divWithPlace').css('display','none');
	
}

GameOverScene.prototype.show = function(){
	$('#writeNamePanel').fadeIn();
	$('#sendRecordButton').fadeIn();	
	$('#divWithPlace').fadeIn();
	$('#scoreGO').text(global.points);	
	global.sceneController.recordsScene.show();
}

GameOverScene.prototype.hide = function(){
	$('#writeNamePanel').fadeOut();
	global.sceneController.gameScene.newGame();
	global.sceneController.recordsScene.hide();	
}

GameOverScene.prototype.cancelClick = function(){
	playSound("menu_back");
	$('#writeNamePanel').fadeOut();
}
GameOverScene.prototype.sendRecordClick = function(){
	playSound("menu_forward");	
	$('#sendRecordButton').fadeOut();
	global.sceneController.gameOverScene.sendRecord($('#playerName').val(),global.points,'sdaoOIJASDLknasd0O0OOO000OO00Llll111ll1l1l1l111l1l0o0o0oOooolaJASNDinasid');
}

GameOverScene.prototype.sendRecord = function(name,count,mode){
	jQuery.ajax({
		type: "GET", // метод передачи данных, можно пропустить - по умолчанию и так get
		url: "http://hahaton.ru/html5games/reflect/table/index.php", // путь к файлу, который будем читать
		dataType: "xml", // тип данных, с которыми работаем
		success: global.sceneController.gameOverScene.onMyPlaceCome,
		data:   {
					mode : mode,
					name : name,
					count : count
			}
	});
	
}

GameOverScene.prototype.onMyPlaceCome = function(xml){
	
	global.place = jQuery(xml).find('reply').attr('place');
	$('#divWithPlace').fadeIn();
	$('#placeGO').text(global.place.toString());

    Sharing.init();
}
