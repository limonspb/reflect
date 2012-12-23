/**
 * @author ProBigi
 */


function VacuumEnemy()
{
	VacuumEnemy.superclass.constructor.apply(this);
	
}

extend(VacuumEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
VacuumEnemy.prototype.initView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("#000000").drawRect ( -30 , -30 , 60 , 60 );
	
	this.width = 60;
	this.height = 60;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.view.cache(-30 , -30 , 60 , 60);
	this.addChild(this.view);
	this.addChild(this.center);
}

VacuumEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.VACUUM_ENEMY;
	
	this.speed = Math.random()*20 + 20;
	this.rotationSpeed = 50;
	this.health = 20;
	this.nearDamage = 20;
	this.minRange = 10;
	this.maxRange = 20;
	
	this.vacuum = 150;
}

VacuumEnemy.prototype.move = function (elapsedTime)
{
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

/*VacuumEnemy.prototype.shoot = function ()
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

VacuumEnemy.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.75)
	{
		this.bullet = null;
	}
}*/
