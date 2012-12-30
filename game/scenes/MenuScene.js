function MenuScene(){
	$("#playButton").bind('click',this.onNewGameClick);
	$("#creditsButton").bind('click',this.onCreditsClick);
	$("#infoButton").bind('click',this.onInfoClick);
	$("#settingsButton").bind('click',this.onSettingsClick);
	$("#recordsButton").bind('click',this.onRecordsClick);
	
	$('#playButton').mouseover(this.hover);
	$('#creditsButton').mouseover(this.hover);
	$('#infoButton').mouseover(this.hover);
	$('#settingsButton').mouseover(this.hover);
	$('#recordsButton').mouseover(this.hover);
}
extend(MenuScene,BaseScene);

MenuScene.prototype.hover = function(){
	playSound("hover");	
}

MenuScene.prototype.show = function(){
	$("#mainMenu").fadeIn();
}

MenuScene.prototype.hide = function(){
	$("#mainMenu").fadeOut();
}

MenuScene.prototype.onCreditsClick = function(){
	playSound("menu_forward");
	global.sceneController.switchScene(SceneController.eventTypes.CREDITS);
}

MenuScene.prototype.onInfoClick = function(){
	playSound("menu_forward");
	global.sceneController.switchScene(SceneController.eventTypes.INFO);
}

MenuScene.prototype.onNewGameClick = function(){
	playSound("menu_forward");
	global.sceneController.switchScene(SceneController.eventTypes.NEW_GAME);	
}
MenuScene.prototype.onSettingsClick = function(){
	
	//var i = createjs.SoundJS.play("phh", createjs.SoundJS.INTERRUPT_NONE, 0, 0, false, 1);
	playSound("menu_forward");
	global.sceneController.switchScene(SceneController.eventTypes.SETTINGS);
}
MenuScene.prototype.onRecordsClick = function(){
	playSound("menu_forward");
	global.sceneController.switchScene(SceneController.eventTypes.RECORDS);
}

