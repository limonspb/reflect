/**
 * Убегающий враг
 * @author ProBigi
 */


function EscapeEnemy()
{
	EscapeEnemy.superclass.constructor.apply(this);
	
	
	this.moveBackState;
	this.dist;
}

extend(EscapeEnemy,EnemyUnit);


/**
 * Создание отображения
 */
EscapeEnemy.prototype.initView = function ()
{
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 2]},
		"images": [global.preloader.imgs.escape_anim],
		"frames": {
		"regX": global.preloader.imgs.escape_anim.height/2,
		"regY": global.preloader.imgs.escape_anim.height/2,
		"height": global.preloader.imgs.escape_anim.height,
		"width": global.preloader.imgs.escape_anim.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 4;
	
	this.body = new createjs.BitmapAnimation(this.ss);
	
	var scale = 0.6;
				
	this.body.gotoAndPlay("run");
	this.body.rotation = 90;
	this.body.scaleX = this.body.scaleY = scale;
	
	this.gun = new createjs.Container();
	this.gunView = new createjs.Bitmap(global.preloader.imgs.escape_gun);
	this.gunView.regX = 41;
	this.gunView.regY = 29;
	this.gunView.rotation = 90;
	this.gunView.scaleX = this.gunView.scaleY = scale;
	this.gun.addChild(this.gunView);
	
	this.width = global.preloader.imgs.escape_anim.width;
	this.height = global.preloader.imgs.escape_anim.height;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.view = new createjs.Container();
	this.view.addChild(this.body);
	
	this.addChild(this.view);
	this.addChild(this.gun);
}

/**
 * Задание параметров
 */
EscapeEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.ESCAPE_ENEMY;
	var skill = global.EnemyManager.skillKoeff;
	
	this.speed = Math.random()*30*skill + 50;
	this.rotationSpeed = 70*skill;
	this.health = 50*skill;
	this.damage = 12;
	this.bulletRespawn = (2500 + Math.random()*1000)/skill;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 150;
	this.maxRange = 700;
	
	this.points = 18*skill;
}

/*EscapeEnemy.prototype.clearData = function ()
{
	this.view.removeChild(this.body);
	this.gun.removeChild(this.gunView);
	this.removeChild(this.gun);
	this.removeChild(this.view);
	
	this.ss = null;
	this.body = null;
	this.gunView = null;
	this.gun = null;
	this.view = null;
}*/

EscapeEnemy.prototype.move = function (elapsedTime)
{
	if (this.stopUnit == true) { return; }
	
	this.dist = getDistanceToObject(this, global.hero);
	
	var dx = 0;
	var dy = 0;
	
	this.speed = Math.abs(this.speed);
		
	if (this.dist <= this.minRange)
	{
		this.speed = -Math.abs(this.speed);
	}
	
	if (!this.pauseMove(elapsedTime))
	{
		this.view.rotation = this.getAngleToObject(global.hero);
		
		this.angle = this.view.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		if (getDistanceToObject(this, global.hero) <= this.minRange+5 && getDistanceToObject(this, global.hero) > this.minRange)
		{
			dx = 0;
			dy = 0;
		}
		
		
		this.x += dx;
		this.y += dy;
	}
	
	this.checkHitHero(elapsedTime);
	
	this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	
	this.shoot();
	
	this.checkMyBullet();
	this.checkHitBullet();
}

EscapeEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		if (this.dist <= this.maxRange && this.dist >= this.minRange)
		{
			//var angle = this.getAngleToObject(global.hero);
			this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
			this.bullet.damage = this.damage;
			
			this.respawnCount = 0;
		}
	}
}

EscapeEnemy.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.75)
	{
		this.bullet = null;
	}
}
