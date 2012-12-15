

function GameScene(){
	
	this.keys = [];
				
	//this.circle.shadow = new createjs.Shadow("#454", 5, 5, 14);
	
	this.hero = new HeroUnit();
	
	this.back = new createjs.Bitmap( global.preloader.imgs.back );
}

extend(GameScene,BaseScene);

GameScene.prototype.show = function(){
	$('body').keydown(this.onBodyKeyDown);
	$('body').keyup(this.onBodyKeyUp);
	global.stage.addChildAt(this.back,0);	
	global.stage.addChild(this.hero);
	
	createjs.Ticker.addListener(this);	
}

GameScene.prototype.hide = function(){
	$('body').unbind();
	global.stage.removeChild(this.hero);
	global.stage.removeChild(this.back);
	
	createjs.Ticker.removeListener(this);
	global.camera.setLookAt(0,0);
	global.camera.applyTransform();
	
}

GameScene.prototype.onBodyKeyDown = function(event){
	keys[event.keyCode] = true;
	//console.log(event.keyCode);
}
GameScene.prototype.onBodyKeyUp = function(event){
	keys[event.keyCode] = false;
	if (event.keyCode == global.keyboard.ESC || event.keyCode == global.keyboard.P){
		global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
	}
}



GameScene.prototype.tick = function(elapsedTime){	
	//this.circle.vy+=400*elapsedTime/1000;

	

	if (keys[global.keyboard.W] || keys[global.keyboard.ARROW_UP]){
		this.hero.y-=6;
	}
	if (keys[global.keyboard.S] || keys[global.keyboard.ARROW_DOWN]){
		this.hero.y+=6;
	}
	if (keys[global.keyboard.A] || keys[global.keyboard.ARROW_LEFT]){
		this.hero.x-=6;
	}
	if (keys[global.keyboard.D] || keys[global.keyboard.ARROW_RIGHT]){
		this.hero.x+=6;
	}				
	
	global.camera.setLookAt(this.hero.x,this.hero.y);
	global.camera.applyTransform();
	
	
	global.stage.update(elapsedTime);
	
}
