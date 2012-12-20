

function GameScene(){
	this.container = new createjs.Container();
	
	global.EnemyManager = new EnemyManager();
	global.BulletFactory = new BulletFactory();
	global.BonusManager = new BonusManager();
	
	this.keys = [];
	
	global.hero = new HeroUnit();
	global.hero.x = 1000;
	global.hero.y = 1000;
	this.container.addChild(global.hero);
	
	//global.BulletFactory.addBullet(BulletTypes.SHOT_GUN, 0, 20,250);
	this.container.addChild(global.BulletFactory.bulletsCont);
	
	this.container.addChild(global.EnemyFactory.enemiesCont);
	this.container.addChild(global.BonusFactory.bonusesCont);
	
	this.backGround = new BackGround();
	this.container.addChildAt(this.backGround,0);
}

extend(GameScene,BaseScene);

GameScene.prototype.show = function(){
	$('body').keydown(this.onBodyKeyDown);
	$('body').keyup(this.onBodyKeyUp);

	
	global.stage.addChild(this.container);

	createjs.Ticker.addListener(this);	
}

GameScene.prototype.hide = function(){
	$('body').unbind();
	global.stage.removeChild(this.container);

	createjs.Ticker.removeListener(this);
	global.camera.setLookAt(0,0);
	global.camera.applyTransform();

}

GameScene.prototype.onBodyKeyDown = function(event){
	keys[event.keyCode] = true;


	if (event.keyCode == global.keyboard.W || event.keyCode == global.keyboard.ARROW_UP){
		global.hero.FORWARD = true;
	}
	if (event.keyCode == global.keyboard.S || event.keyCode == global.keyboard.ARROW_DOWN){
		global.hero.BACK = true;
	}
	if (event.keyCode == global.keyboard.A || event.keyCode == global.keyboard.ARROW_LEFT){
		global.hero.LEFT = true;
	}
	if (event.keyCode == global.keyboard.D || event.keyCode == global.keyboard.ARROW_RIGHT){
		global.hero.RIGHT = true;
	}		

}
GameScene.prototype.onBodyKeyUp = function(event){
	keys[event.keyCode] = false;
	if (event.keyCode == global.keyboard.ESC || event.keyCode == global.keyboard.P){
		global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
	}


	if (event.keyCode == global.keyboard.W || event.keyCode == global.keyboard.ARROW_UP){
		global.hero.FORWARD = false;
	}
	if (event.keyCode == global.keyboard.S || event.keyCode == global.keyboard.ARROW_DOWN){
		global.hero.BACK = false;
	}
	if (event.keyCode == global.keyboard.A || event.keyCode == global.keyboard.ARROW_LEFT){
		global.hero.LEFT = false;
	}
	if (event.keyCode == global.keyboard.D || event.keyCode == global.keyboard.ARROW_RIGHT){
		global.hero.RIGHT = false;
	}	
}



GameScene.prototype.tick = function(elapsedTime) {	

	global.hero.move(elapsedTime);
	
		
	global.EnemyManager.update(elapsedTime);
	
	global.BulletFactory.moveBullets(elapsedTime);
	
	global.BonusManager.update(elapsedTime);
	
	
	global.camera.setLookAt(global.hero.x,global.hero.y);
	global.camera.applyTransform();


	global.stage.update(elapsedTime);
}