function GameScene(){
	this.circle = new createjs.Shape();
	this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	this.circle.x = 181;
	this.circle.y = 100;
	this.circle.vx = 150;
	this.circle.vy = 0;	
	this.keys = [];
				
	this.circle.shadow = new createjs.Shadow("#454", 5, 5, 14);
	
	this.back = new createjs.Bitmap( global.preloader.imgs.back );
	
	

}

extend(GameScene,BaseScene);

GameScene.prototype.show = function(){
	$('body').keydown(this.onBodyKeyDown);
	$('body').keyup(this.onBodyKeyUp);
	global.stage.addChildAt(this.back,0);	
	global.stage.addChild(this.circle);
	
	createjs.Ticker.addListener(this);	
}

GameScene.prototype.hide = function(){
	$('body').unbind();
	global.stage.removeChild(this.circle);
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
	this.circle.vy+=400*elapsedTime/1000;

	

	if (keys[global.keyboard.W] || keys[global.keyboard.ARROW_UP]){
		this.circle.y-=6;
	}
	if (keys[global.keyboard.S] || keys[global.keyboard.ARROW_DOWN]){
		this.circle.y+=6;
	}
	if (keys[global.keyboard.A] || keys[global.keyboard.ARROW_LEFT]){
		this.circle.x-=6;
	}
	if (keys[global.keyboard.D] || keys[global.keyboard.ARROW_RIGHT]){
		this.circle.x+=6;
	}				
	
	global.camera.setLookAt(this.circle.x,this.circle.y);
	global.camera.applyTransform();
	
	
	global.stage.update(elapsedTime);
	
}
