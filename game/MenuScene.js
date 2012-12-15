function MenuScene(){
	this.backGround = new BackGround();
	
	this.bNewGame = new MenuButton('New game',"#DDD",150);
	this.bSettings = new MenuButton('Settings',"#DDD",150);
	this.bCredits = new MenuButton('Credits',"#DDD",150);
	
	this.cMainMenu = new createjs.Container();
	
	this.cMainMenu.addChild(this.bNewGame);
	this.cMainMenu.addChild(this.bSettings);
	this.cMainMenu.addChild(this.bCredits);
	
	this.bNewGame.x = (global.gameWidth)/2;
	this.bSettings.x = (global.gameWidth)/2;
	this.bCredits.x = (global.gameWidth)/2;
	
	this.bNewGame.y = (global.gameHeight - this.bNewGame.height*3 - 15*2)/2;
	this.bSettings.y = this.bNewGame.y + this.bNewGame.height + 15;
	this.bCredits.y = this.bSettings.y + this.bSettings.height + 15;
	
	this.bCredits.onClick = this.onCreditsClick;
	this.bNewGame.onClick = this.onNewGameClick;
}
extend(MenuScene,BaseScene);

MenuScene.prototype.show = function(){
	global.stage.addChild(this.cMainMenu);
}

MenuScene.prototype.hide = function(){
	global.stage.removeChild(this.cMainMenu);
}

MenuScene.prototype.onCreditsClick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.CREDITS);
}

MenuScene.prototype.onNewGameClick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.NEW_GAME);
}
