/**
 * @author ProBigi
 */


function MediumEnemy()
{
	MediumEnemy.superclass.constructor.apply(this);
	
	
	this.backTime = 0;
	this.moveBackState;
	this.bulletAngle;
}

extend(MediumEnemy,EnemyUnit);


/**
 * Создание отображения
 */
MediumEnemy.prototype.initView = function ()
{
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 2]},
		"images": [global.preloader.imgs.medium_anim],
		"frames": {
		"regX": global.preloader.imgs.medium_anim.height/2,
		"regY": global.preloader.imgs.medium_anim.height/2,
		"height": global.preloader.imgs.medium_anim.height,
		"width": global.preloader.imgs.medium_anim.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 4;
	
	this.body = new createjs.BitmapAnimation(this.ss);
	
	var scale = 1;
				
	this.body.gotoAndPlay("run");
	this.body.rotation = 90;
	this.body.scaleX = this.body.scaleY = scale;
	
	this.gun = new createjs.Container();
	this.gunView = new createjs.Bitmap(global.preloader.imgs.medium_gun);
	this.gunView.regX = global.preloader.imgs.medium_gun.width/2;
	this.gunView.regY = global.preloader.imgs.medium_gun.height/2;
	this.gunView.rotation = 90;
	this.gunView.scaleX = this.gunView.scaleY = scale;
	this.gun.addChild(this.gunView);
	
	this.width = global.preloader.imgs.medium_anim.width;
	this.height = global.preloader.imgs.medium_anim.height;
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
MediumEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.MEDIUM_ENEMY;
	
	this.speed = Math.random()*30 + 40;
	this.rotationSpeed = 120;
	this.health = 30;
	this.damage = 10;
	this.bulletRespawn = 3500 + Math.random()*1500;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 150;
	this.maxRange = 500;
	
	this.points = 13;
}

/*MediumEnemy.prototype.clearData = function ()
{
	this.body.stop();
	
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

MediumEnemy.prototype.move = function (elapsedTime)
{
	if (this.stopUnit == true) { return; }
	
	var dx = 0;
	var dy = 0;
	
	var dt = 1;
	
	this.backTime -= elapsedTime;
	if (this.backTime > 0)
	{
		this.view.rotation = this.bulletAngle;
		
		this.angle = this.view.rotation/180 * Math.PI;
		
		dt = -7;
	}
	else
	{
		this.view.rotation = this.getAngleToObject(global.hero);
		
		this.angle = this.view.rotation/180 * Math.PI;
		
		this.backTime = 0;
	}
	
	dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
	dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
	
	if (this.pauseMove(elapsedTime) || getDistanceToObject(this, global.hero) <= this.minRange+5)
	{
		if (dt > 0)
		{
			dx = 0;
			dy = 0;
		}
	}
	
	if (getDistanceToObject(this, global.hero) <= this.minRange+5)
	{
		if (dt > 0)
		{
			dx = 0;
			dy = 0;
		}
	}
		
	
	this.x += dx*dt; 
	this.y += dy*dt;
	
	this.checkHitHero(elapsedTime);
	
	this.gun.rotation += this.getGunRotation(this.gun, ShotType.FORWARD_SHOT)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	
	this.shoot();
	
	this.checkMyBullet();
	this.checkHitBullet();
}

MediumEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		//var angle = this.getAngleToObject(global.hero);
		
		var vec1 = rotateVec( {x:-3,y:25}, this.gun.rotation);
		this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x + vec1.x, this.y + vec1.y);
		this.bullet.damage = this.damage;
		
		var vec2 = rotateVec( {x:-3,y:-25}, this.gun.rotation);
		this.bullet2 = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x + vec2.x, this.y + vec2.y);
		this.bullet2.damage = this.damage;
		
		this.respawnCount = 0;
		
		this.bulletAngle = this.gun.rotation;
		this.backTime = 200;
	}
}

MediumEnemy.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.75)
	{
		this.bullet = null;
	}
}
