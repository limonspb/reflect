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
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("#800000").drawRect ( -40 , -20 , 80 , 40 );
	
	this.width = 80;
	this.height = 40;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.addChild(this.view);
	this.addChild(this.center);
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

TankEnemy.prototype.move = function (elapsedTime)
{
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