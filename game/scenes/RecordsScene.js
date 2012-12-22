function RecordsScene(){
	$("#backButton_records").bind('click',this.onBackCkick);
	this.place = -1;		
}
extend(RecordsScene,BaseScene);

RecordsScene.prototype.show = function(){
	$("#records").fadeIn();
	 jQuery.ajax({
	            type: "GET", // метод передачи данных, можно пропустить - по умолчанию и так get
	            url: "http://hahaton.ru/html5games/reflect/table/index.php", // путь к файлу, который будем читать
	            dataType: "xml", // тип данных, с которыми работаем
	            success: this.onRecordsCome,
	            data: {mode: 'showall'}
            });
            

	this.sendRecord('test', 111);	
}

RecordsScene.prototype.hide = function(){
	global.stage.removeChild(this.cCreditsContainer);
	$("#records").fadeOut();
}

RecordsScene.prototype.onBackCkick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}

RecordsScene.prototype.onRecordsCome = function(xml){
	$('#recordTable').html('');
	jQuery(xml).find('name').each(function(){
		var name = jQuery(this).attr('name');
		var count = jQuery(this).attr('count');
		$('#recordTable').append('<tr><td>' + htmlEntities(name) + '</td><td>' + htmlEntities(count) + '</td></tr>');
		//console.log(name, count);
	});
}

RecordsScene.prototype.sendRecord = function(name,count){
	jQuery.ajax({
		type: "GET", // метод передачи данных, можно пропустить - по умолчанию и так get
		url: "http://hahaton.ru/html5games/reflect/table/index.php", // путь к файлу, который будем читать
		dataType: "xml", // тип данных, с которыми работаем
		success: this.onMyPlaceCome,
		data:   {
					mode : 'sdaoOIJASDLknasd0O0OOO000OO00Llll111ll1l1l1l111l1l0o0o0oOooolaJASNDinasid',
					name : name,
					count : count
			}
	});
}

RecordsScene.prototype.onMyPlaceCome = function(xml){
	this.place = jQuery(xml).find('reply').attr('place');
}
