function GameScene(){
	this.container = new createjs.Container();
	
	global.EnemyManager = new EnemyManager();
	global.BulletFactory = new BulletFactory();
	global.BonusManager = new BonusManager();
	
	this.keys = [];
	
	global.hero = new HeroUnit();
	this.container.addChild(global.hero);
	
	//global.BulletFactory.addBullet(BulletTypes.SHOT_GUN, 0, 20,250);
	this.container.addChild(global.BulletFactory.bulletsCont);
	
	this.container.addChild(global.EnemyManager.enemiesCont);
	this.container.addChild(global.BonusManager.bonusesCont);
	
	this.backGround = new BackGround();
	this.container.addChildAt(this.backGround,0);
	
	this.lifePanel = new LifePanel();
	this.bonusPanel = new BonusPanel();
	this.pointsPanel = new PointsPanel();
	this.infinityBonusPanel = new InfinityBonusPanel();
	this.newGame();
	
	this.fps_value = $("#fps_value");
}

extend(GameScene,BaseScene);

GameScene.prototype.newGame = function(){
	global.gameTime = 0;
	global.points = 0;
	global.hero.health = 250;
	global.hero.MAX_HEALTH = 250;
	global.hero.teleportCount = 0;
	global.hero.regenerationCount = 0;
	global.hero.x = 1000;
	global.hero.y = 1000;
	global.hero.zeroAll();
	
	global.BonusManager.clearAll();
	global.BulletFactory.clearAll();
	global.EnemyManager.clearAll();	
}

GameScene.prototype.show = function(){
	this.lifePanel.show();
	this.bonusPanel.show();
	this.pointsPanel.show();
	this.infinityBonusPanel.show();
	$('body').keydown(this.onBodyKeyDown);
	$('body').keyup(this.onBodyKeyUp);
	global.stage.onMouseUp = this.onMouseUp;	
	global.stage.addChild(this.container);

	createjs.Ticker.addListener(this);	
	global.music.play(1);
}

GameScene.prototype.hide = function(){
	this.lifePanel.hide();
	this.bonusPanel.hide();
	this.pointsPanel.hide();
	this.infinityBonusPanel.hide();
	$('body').unbind();
	global.stage.removeChild(this.container);
	global.stage.onMouseUp = null;

	createjs.Ticker.removeListener(this);
	global.camera.setLookAt(0,0);
	global.camera.applyTransform();
	global.music.play(0);
}

GameScene.prototype.onBodyKeyDown = function(event){
	global.sceneController.gameScene.keys[event.keyCode] = true;


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
	global.sceneController.gameScene.keys[event.keyCode] = false;
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

GameScene.prototype.onMouseUp = function(event){
	global.hero.tryTeleport(event.stageX + global.camera.lookAtX, event.stageY + global.camera.lookAtY);
}



GameScene.prototype.tick = function(elapsedTime) {
	this.fps_value.text(createjs.Ticker.getMeasuredFPS());
	global.gameTime+=elapsedTime;

	global.hero.move(elapsedTime);
	
		
	global.EnemyManager.update(elapsedTime);
	
	global.BulletFactory.moveBullets(elapsedTime);
	
	global.BonusManager.update(elapsedTime);
	
	
	global.camera.setLookAt(global.hero.x,global.hero.y);
	global.camera.applyTransform();
	
	this.lifePanel.update();
	this.pointsPanel.update();
	this.bonusPanel.update();
	this.infinityBonusPanel.update();


	global.stage.update(elapsedTime);
	
	if (global.hero.health <=0){
		global.sceneController.switchScene(SceneController.eventTypes.GAME_OVER);
	}
}