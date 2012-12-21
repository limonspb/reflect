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
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("#FF6F00").drawRect ( -10 , -10 , 20 , 20 );
	
	this.gun = new createjs.Shape();
    this.gun.graphics.setStrokeStyle(1, 'round', 'round');
    this.gun.graphics.beginStroke(('#000000'));
    this.gun.graphics.moveTo(0,0);
    this.gun.graphics.lineTo(10,0);
    this.gun.graphics.endStroke();
    this.gun.graphics.endFill();
	
	this.width = 20;
	this.height = 20;
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.addChild(this.view);
	this.addChild(this.gun);
	this.addChild(this.center);
}

StrongEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*30 + 80;
	this.rotationSpeed = 200;
	this.health = 20;
	this.damage = 10;
	this.bulletRespawn = 4500;
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

StrongEnemy.prototype.move = function (elapsedTime)
{
	this.dist = this.getDistanceToObject(global.hero);
	
	if (!this.pauseMove(elapsedTime))
	{
		this.update(global.hero)
	}
	
	this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	this.shoot();
}

StrongEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		if (this.dist <= this.maxRange && this.dist >= this.minRange)
		{
			//var angle = this.getAngleToObject(global.hero);
			this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
			
			this.respawnCount = 0;
		}
	}
}
