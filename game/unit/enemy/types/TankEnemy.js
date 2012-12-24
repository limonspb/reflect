/**
 * @author ProBigi
 */


function TankEnemy()
{
	TankEnemy.superclass.constructor.apply(this);
	
	this.tankMode = false;
}

extend(TankEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
TankEnemy.prototype.initView = function ()
{
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 2]},
		"images": [global.preloader.imgs.tank_anim],
		"frames": {
		"regX": global.preloader.imgs.tank_anim.height/2,
		"regY": global.preloader.imgs.tank_anim.height/2,
		"height": global.preloader.imgs.tank_anim.height,
		"width": global.preloader.imgs.tank_anim.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 4;
	
	this.body = new createjs.BitmapAnimation(this.ss);
	
	var scale = 1;
	
	this.body.gotoAndPlay("run");
	this.body.rotation = 90;
	this.body.scaleX = this.body.scaleY = scale;
	
	this.shadow = new createjs.Bitmap(global.preloader.imgs.tank_shadow);
	this.shadow.regX = global.preloader.imgs.tank_shadow.width/2;
	this.shadow.regY = global.preloader.imgs.tank_shadow.height/2;
	this.shadow.rotation = 90;
	
	this.width = global.preloader.imgs.tank_anim.width/2;
	this.height = global.preloader.imgs.tank_anim.height/2;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.view = new createjs.Container();
	this.view.addChild(this.shadow);
	this.view.addChild(this.body);
	
	this.addChild(this.view);
}

TankEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.TANK_ENEMY;
	
	this.speed = Math.random()*20 + 300;
	this.rotationSpeed = 250;
	this.health = 99999;
	this.nearDamage = 9999999999;
	this.minRange = 10;
	this.maxRange = 20;
}

TankEnemy.prototype.clearData = function ()
{
	this.view.removeChild(this.body);
	this.view.removeChild(this.shadow);
	this.removeChild(this.view);
	
	this.ss = null;
	this.body = null;
	this.shadow = null;
	this.view = null;
}

TankEnemy.prototype.move = function (elapsedTime)
{
	if (this.stopUnit == true) { return; }
	
	this.dist = getDistanceToObject(this, global.hero);
	
	if (this.dist >= this.size + 200)
	{
		if (!this.tankMode) 
		{
			this.view.rotation += this.getGunRotation(this.view, ShotType.CLEVER_SHOT)*elapsedTime/1000;
		}
	} else { this.tankMode = true; }
	
	this.angle = this.view.rotation/180 * Math.PI;
	dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
	dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
	
	
	this.x += dx;
	this.y += dy;
	
	this.nearDamage = global.hero.health*0.9;
	
	this.checkHitHero(elapsedTime);
	
	//this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	//this.respawnCount += elapsedTime;
	//this.shoot();
	
	//this.checkMyBullet();
	this.checkHitBullet();
	
	if (this.tankMode)
	{
		if (!checkOutOfStage(this))
		{
			global.EnemyManager.removeEnemy(this);
			//global.EnemyManager.blow(this);
		}
	}
}

/*TankEnemy.prototype.shoot = function ()
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

TankEnemy.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.75)
	{
		this.bullet = null;
	}
}
*/