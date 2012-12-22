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
	this.view = new createjs.Shape();
	this.view.graphics.setStrokeStyle(1, 'round', 'round');
	this.view.graphics.beginStroke(('#000000'));
	this.view.graphics.beginFill("#FFD700").drawCircle ( 0 , 0 , 15 );
	this.view.graphics.endStroke();
    this.view.graphics.endFill();
    
    this.gun = new createjs.Shape();
    this.gun.graphics.setStrokeStyle(1, 'round', 'round');
    this.gun.graphics.beginStroke(('#000000'));
    this.gun.graphics.moveTo(0,0);
    this.gun.graphics.lineTo(15,0);
    this.gun.graphics.endStroke();
    this.gun.graphics.endFill();
	
	this.width = 15;
	this.height = 15;
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.addChild(this.view);
	this.addChild(this.gun);
	this.addChild(this.center);
}

/**
 * Задание параметров
 */
EscapeEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*30 + 130;
	this.rotationSpeed = 150;
	this.health = 50;
	this.damage = 40;
	this.bulletRespawn = 2500;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 150;
	this.maxRange = 700;
	
	this.wtf = 1;
}

EscapeEnemy.prototype.move = function (elapsedTime)
{
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
	
	
	
	this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	
	this.shoot();
}

EscapeEnemy.prototype.shoot = function ()
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
