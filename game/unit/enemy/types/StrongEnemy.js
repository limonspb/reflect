/**
 * @author ProBigi
 */


function StrongEnemy()
{
	StrongEnemy.superclass.constructor.apply(this);
	
}

extend(StrongEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
StrongEnemy.prototype.initView = function ()
{
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 2]},
		"images": [global.preloader.imgs.strong_anim],
		"frames": {
		"regX": global.preloader.imgs.strong_anim.height/2,
		"regY": global.preloader.imgs.strong_anim.height/2,
		"height": global.preloader.imgs.strong_anim.height,
		"width": global.preloader.imgs.strong_anim.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 4;
	
	this.body = new createjs.BitmapAnimation(this.ss);
	
	var scale = 0.6;
				
	this.body.gotoAndPlay("run");
	this.body.rotation = 90;
	this.body.scaleX = this.body.scaleY = scale;
	
	this.gun = new createjs.Container();
	this.gunView = new createjs.Bitmap(global.preloader.imgs.strong_gun);
	this.gunView.regX = 49;
	this.gunView.regY = 54;
	this.gunView.rotation = 90;
	this.gunView.scaleX = this.gunView.scaleY = scale;
	this.gun.addChild(this.gunView);
	
	this.width = global.preloader.imgs.strong_anim.width;
	this.height = global.preloader.imgs.strong_anim.height;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.view = new createjs.Container();
	this.view.addChild(this.body);
	
	this.addChild(this.view);
	this.addChild(this.gun);
}

StrongEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.STRONG_ENEMY;
	
	this.speed = Math.random()*30 + 80;
	this.rotationSpeed = 200;
	this.health = 20;
	this.damage = 10;
	this.bulletRespawn = 4000 + Math.random()*3000;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 100;
	this.maxRange = 700;
	
	
	this.velocity = new Vec2(-1,-2);
	this.disared = new Vec2(0,0);
	this.position = new Vec2(this.x, this.y);
	this.steering = new Vec2(0, 0);
	this.MAX_FORCE = 0.3;
	this.MAX_VELOCITY = 4;
	this.mass = 40 +  Math.random() * 20;
	
	this.truncate(this.velocity, this.MAX_VELOCITY);
}

StrongEnemy.prototype.clearData = function ()
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
}

StrongEnemy.prototype.move = function (elapsedTime)
{
	this.dist = getDistanceToObject(this, global.hero);
	
	if (!this.pauseMove(elapsedTime))
	{
		this.update(global.hero)
	}
	
	this.checkHitHero(elapsedTime);
	
	this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	this.shoot();
	
	this.checkMyBullet();
	this.checkHitBullet();
}

StrongEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		if (this.dist <= this.maxRange && this.dist >= this.minRange)
		{
			this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
			this.bullet.damage = this.damage;
			
			this.respawnCount = 0;
		}
	}
}

StrongEnemy.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.75)
	{
		this.bullet = null;
	}
}
