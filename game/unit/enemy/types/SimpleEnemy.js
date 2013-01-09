/**
 * @author ProBigi
 */


function SimpleEnemy()
{
	SimpleEnemy.superclass.constructor.apply(this);	
}

extend(SimpleEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
SimpleEnemy.prototype.initView = function ()
{
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 0]},
		"images": [global.preloader.imgs.simple_anim],
		"frames": {
		"regX": global.preloader.imgs.simple_anim.height/2,
		"regY": global.preloader.imgs.simple_anim.height/2,
		"height": global.preloader.imgs.simple_anim.height,
		"width": global.preloader.imgs.simple_anim.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 4;
	
	this.body = new createjs.BitmapAnimation(this.ss);
	
	var scale = 0.6;
				
	this.body.gotoAndPlay("run");
	this.body.rotation = 90;
	this.body.scaleX = this.body.scaleY = scale;
	
	this.gun = new createjs.Container();
	this.gunView = new createjs.Bitmap(global.preloader.imgs.simple_gun);
	this.gunView.regX = global.preloader.imgs.simple_gun.width/2;
	this.gunView.regY = global.preloader.imgs.simple_gun.height/2;
	this.gunView.rotation = 90;
	this.gunView.scaleX = this.gunView.scaleY = scale;
	this.gun.addChild(this.gunView);
	
	this.width = global.preloader.imgs.simple_anim.width*scale;
	this.height = global.preloader.imgs.simple_anim.height*scale;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.view = new createjs.Container();
	this.view.addChild(this.body);
	
	this.addChild(this.view);
	this.addChild(this.gun);
}

SimpleEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.SIMPLE_ENEMY;
	var skill = global.EnemyManager.skillKoeff;
	
	this.speed = Math.random()*30*skill + 50;
	this.rotationSpeed = 40*skill;
	this.health = 10*skill;
	this.damage = 5;
	this.bulletRespawn = 2000 + Math.random()*2000;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 100;
	this.maxRange = 600;
	
	this.points = 10*skill;
}

SimpleEnemy.prototype.move = function (elapsedTime)
{
	if (this.stopUnit == true) { return; }
	
	this.dist = getDistanceToObject(this, global.hero);
	
	var dx = 0;
	var dy = 0;
	
	if (!this.pauseMove(elapsedTime))
	{
		this.view.rotation = this.getAngleToObject(global.hero);
		
		this.angle = this.view.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		if (this.dist <= this.minRange+5)
		{
			dx = 0;
			dy = 0;
		} 
		
		this.x += dx;
		this.y += dy;
	}
	
	this.checkHitHero(elapsedTime);
	
	this.gun.rotation += this.getGunRotation(this.gun, ShotType.FORWARD_SHOT)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	this.shoot();
	
	this.checkMyBullet();
	this.checkHitBullet();
}

SimpleEnemy.prototype.shoot = function (){
	
	if (this.respawnCount >= this.bulletRespawn)
	{
		if (this.dist <= this.maxRange/* && this.dist >= this.minRange*/)
		{
			//var angle = this.getAngleToObject(global.hero);
			this.fireSound();
			this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
			this.bullet.damage = this.damage;
			
			this.respawnCount = 0;
		}
	}
}

