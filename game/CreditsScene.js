function CreditsScene(){
	this.bBack = new MenuButton('< Back',"#DDD",150);
	this.bBack.x = 100;
	this.bBack.y = global.gameHeight - 15 - this.bBack.height;
	
	this.cCreditsContainer = new createjs.Container();
	
	this.cCreditsContainer.addChild(this.bBack);
	this.textString = 
		"This game made by http://hahaton.ru/ at the end of 2012 year, before the Big End. Our team is: Efimov Ivan, Belov Max, Davletshin Albert, Dmitriy Shihanov, Ivan Romanov, Vladislav Lobanov."+
		"Thanks to http://www.createjs.com for their HTML5 engine.";
	this.text = new createjs.Text(this.textString, "18px Arial");
	
	this.text.textBaseline = "top";
	this.text.textAlign = "center";
	this.text.lineWidth = global.gameWidth-200;
	
	
	this.text.x = global.gameWidth/2;
	this.text.y = 100;	
	
	this.cCreditsContainer.addChild(this.text);
	
	this.bBack.onClick = this.onBackCkick;	
}
extend(CreditsScene,BaseScene);

CreditsScene.prototype.show = function(){
	global.stage.addChild(this.cCreditsContainer);
}

CreditsScene.prototype.hide = function(){
	global.stage.removeChild(this.cCreditsContainer);
}

CreditsScene.prototype.onBackCkick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}
