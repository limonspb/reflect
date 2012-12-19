

function GameScene(){
	this.container = new createjs.Container();
	
	global.EnemyFactory = new EnemyFactory();
	global.BulletFactory = new BulletFactory();
	global.BonusManager = new BonusManager();
	
	this.keys = [];
	this.enemies = [];

	
	global.hero = new HeroUnit();
	global.hero.x = 300;
	global.hero.y = 300;
	this.container.addChild(global.hero);
	
	this.circles = [];
	for (i=0; i<4; i++){
		this.circles[i] = new createjs.Shape();
		this.circles[i].graphics.beginFill("red").drawCircle(0, 0, 4);
		this.circles[i].x = 100;
		this.circles[i].y = 100;
		this.container.addChild(this.circles[i]);		
	}

	for (var i = 0; i < 10; ++i)
	{
		var enemy = global.EnemyFactory.getEnemy(EnemyTypes.SIMPLE_ENEMY);
		enemy.x = Math.random()*global.gameWidth;
		enemy.y = Math.random()*global.gameHeight;
		this.enemies.push(enemy);
		this.container.addChildAt(enemy,0);
	}
	
	global.BulletFactory.addBullet(BulletTypes.SHOT_GUN, 0, 20,250);
	this.container.addChild(global.BulletFactory.bulletsCont);
	
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
	//this.circle.vy+=400*elapsedTime/1000;

	global.hero.move(elapsedTime);
	
	/*this.circles[0].x = global.hero.sh_TopLeft.x;
	this.circles[0].y = global.hero.sh_TopLeft.y;		
	this.circles[1].x = global.hero.sh_TopRight.x;
	this.circles[1].y = global.hero.sh_TopRight.y;		
	this.circles[2].x = global.hero.sh_BottomLeft.x;
	this.circles[2].y = global.hero.sh_BottomLeft.y;		
	this.circles[3].x = global.hero.sh_BottomRight.x;
	this.circles[3].y = global.hero.sh_BottomRight.y;*/	
	
		
	for (var i = 0; i < this.enemies.length; ++i)
	{
		this.enemies[i].move(elapsedTime);
	}

	global.BulletFactory.moveBullets(elapsedTime);
	
	
	global.BonusManager.update(elapsedTime);
	
	
	global.camera.setLookAt(global.hero.x,global.hero.y);
	global.camera.applyTransform();


	global.stage.update(elapsedTime);
}