/**
 * @author ProBigi
 */


function ChaseEnemy()
{
	ChaseEnemy.superclass.constructor.apply(this);
	
}

extend(ChaseEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
ChaseEnemy.prototype.initView = function ()
{
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 1]},
		"images": [global.preloader.imgs.chase_anim],
		"frames": {
		"regX": global.preloader.imgs.chase_anim.height/2,
		"regY": global.preloader.imgs.chase_anim.height/2,
		"height": global.preloader.imgs.chase_anim.height,
		"width": global.preloader.imgs.chase_anim.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 2;
	
	this.body = new createjs.BitmapAnimation(this.ss);
				
	this.body.gotoAndPlay("run");
	this.body.rotation = 90;
	
	this.shadow = new createjs.Bitmap(global.preloader.imgs.chase_shadow);
	this.shadow.regX = global.preloader.imgs.chase_shadow.width/2;
	this.shadow.regY = global.preloader.imgs.chase_shadow.height/2;
	this.shadow.rotation = 90;
	
	this.view = new createjs.Container();
	this.view.addChild(this.shadow);
	this.view.addChild(this.body);
	
	this.width = global.preloader.imgs.chase_anim.width;
	this.height = global.preloader.imgs.chase_anim.height;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.addChild(this.view);
}

ChaseEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.CHASE_ENEMY
	
	this.speed = Math.random()*30 + 140;
	this.rotationSpeed = 120;
	this.health = 20;
	this.nearDamage = 20;
	this.minRange = 10;
	this.maxRange = 20;
	
	this.points = 20;
}

/*ChaseEnemy.prototype.clearData = function ()
{
	this.view.removeChild(this.shadow);
	this.view.removeChild(this.body);
	this.removeChild(this.view);
	
	this.shadow = null;
	this.ss = null;
	this.body = null;
	this.view = null;
}*/

ChaseEnemy.prototype.move = function (elapsedTime)
{
	if (this.stopUnit == true) { return; }
	
	this.dist = getDistanceToObject(this, global.hero);
	
	if (!this.pauseMove(elapsedTime))
	{
		//this.view.rotation = this.getAngleToObject(global.hero);
		
		this.view.rotation += this.getGunRotation(this.view, ShotType.CLEVER_SHOT)*elapsedTime/1000;
		
		this.angle = this.view.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		if (getDistanceToObject(this, global.hero) <= this.minRange+5)
		{
			dx = 0;
			dy = 0;
		}
		
		this.x += dx;
		this.y += dy;
	}
	
	this.checkHitHero(elapsedTime);
	
	//this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	//this.respawnCount += elapsedTime;
	//this.shoot();
	
	//this.checkMyBullet();
	this.checkHitBullet();
}

/*ChaseEnemy.prototype.shoot = function ()
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

ChaseEnemy.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.75)
	{
		this.bullet = null;
	}
}
*/