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
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("#800000").drawRect ( -10 , -10 , 20 , 20 );
	
	this.gun = new createjs.Shape();
    this.gun.graphics.setStrokeStyle(1, 'round', 'round');
    this.gun.graphics.beginStroke(('#000000'));
    this.gun.graphics.moveTo(0,0);
    this.gun.graphics.lineTo(10,0);
    this.gun.graphics.endStroke();
    this.gun.graphics.endFill();
	
	this.width = 20;
	this.height = 20;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.addChild(this.view);
	this.addChild(this.gun);
	this.addChild(this.center);
}

ChaseEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*20 + 50;
	this.rotationSpeed = 50;
	this.health = 20;
	this.nearDamage = 20;
	this.minRange = 10;
	this.maxRange = 20;
}

ChaseEnemy.prototype.move = function (elapsedTime)
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