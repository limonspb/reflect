

function GameScene(){
	
	this.keys = [];
				
	//this.circle.shadow = new createjs.Shadow("#454", 5, 5, 14);
	
	this.hero = new HeroUnit();
	this.hero.x = 300;
	this.hero.y = 300;
	
	this.backGround = new BackGround();
	
	this.back = new createjs.Bitmap( global.preloader.imgs.back );
}

extend(GameScene,BaseScene);

GameScene.prototype.show = function(){
	$('body').keydown(this.onBodyKeyDown);
	$('body').keyup(this.onBodyKeyUp);
	
	global.stage.addChild(this.hero);
	global.stage.addChildAt(this.backGround,0);
	
	createjs.Ticker.addListener(this);	
}

GameScene.prototype.hide = function(){
	$('body').unbind();
	global.stage.removeChild(this.hero);
	
	global.stage.removeChild(this.backGround);
	
	createjs.Ticker.removeListener(this);
	global.camera.setLookAt(0,0);
	global.camera.applyTransform();
	
}

GameScene.prototype.onBodyKeyDown = function(event){
	keys[event.keyCode] = true;
	
	hero = global.sceneController.gameScene.hero;
	
	if (event.keyCode == global.keyboard.W || event.keyCode == global.keyboard.ARROW_UP){
		hero.FORWARD = true;
	}
	if (event.keyCode == global.keyboard.S || event.keyCode == global.keyboard.ARROW_DOWN){
		hero.BACK = true;
	}
	if (event.keyCode == global.keyboard.A || event.keyCode == global.keyboard.ARROW_LEFT){
		hero.LEFT = true;
	}
	if (event.keyCode == global.keyboard.D || event.keyCode == global.keyboard.ARROW_RIGHT){
		hero.RIGHT = true;
	}		
	
}
GameScene.prototype.onBodyKeyUp = function(event){
	keys[event.keyCode] = false;
	if (event.keyCode == global.keyboard.ESC || event.keyCode == global.keyboard.P){
		global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
	}
	
	hero = global.sceneController.gameScene.hero;
	
	if (event.keyCode == global.keyboard.W || event.keyCode == global.keyboard.ARROW_UP){
		hero.FORWARD = false;
	}
	if (event.keyCode == global.keyboard.S || event.keyCode == global.keyboard.ARROW_DOWN){
		hero.BACK = false;
	}
	if (event.keyCode == global.keyboard.A || event.keyCode == global.keyboard.ARROW_LEFT){
		hero.LEFT = false;
	}
	if (event.keyCode == global.keyboard.D || event.keyCode == global.keyboard.ARROW_RIGHT){
		hero.RIGHT = false;
	}	
}



GameScene.prototype.tick = function(elapsedTime){	
	//this.circle.vy+=400*elapsedTime/1000;

	this.hero.move(elapsedTime);

	
	global.camera.setLookAt(this.hero.x,this.hero.y);
	global.camera.applyTransform();
	
	
	global.stage.update(elapsedTime);
	
}
