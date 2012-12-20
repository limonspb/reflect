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
	this.view = new createjs.Shape();
	this.view.graphics.setStrokeStyle(1, 'round', 'round');
	this.view.graphics.beginStroke(('#000000'));
	this.view.graphics.beginFill("green").drawCircle ( 0 , 0 , 10 );
	this.view.graphics.endStroke();
    this.view.graphics.endFill();
    
    this.gun = new createjs.Shape();
    this.gun.graphics.setStrokeStyle(1, 'round', 'round');
    this.gun.graphics.beginStroke(('#000000'));
    this.gun.graphics.moveTo(0,0);
    this.gun.graphics.lineTo(15,0);
    this.gun.graphics.endStroke();
    this.gun.graphics.endFill();
	
	this.width = 10;
	this.height = 10;
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.addChild(this.view);
	this.addChild(this.gun);
	this.addChild(this.center);
}

/**
 * Задание параметров
 */
MediumEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*30 + 80;
	this.rotationSpeed = 100;
	this.health = 30;
	this.damage = 30;
	this.bulletRespawn = 5000;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 50;
	this.maxRange = 500;
}

MediumEnemy.prototype.move = function (elapsedTime)
{
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
	
	if (this.pauseMove(elapsedTime) || this.getDistanceToObject(global.hero) <= this.minRange+5)
	{
		if (dt > 0)
		{
			dx = 0;
			dy = 0;
		}
	}
	
	/*if (this.getDistanceToObject(global.hero) <= this.minRange+5/* && this.getDistanceToObject(global.hero) > this.minRange)
	{
		if (dt > 0)
		{
			dx = 0;
			dy = 0;
		}
	}*/
		
	
	this.x += dx*dt; 
	this.y += dy*dt;
	
	
	
	this.gun.rotation += this.getRotation(this.gun)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	
	this.shoot();
}

MediumEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		//var angle = this.getAngleToObject(global.hero);
		this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
		
		this.respawnCount = 0;
		
		this.bulletAngle = this.gun.rotation;
		this.backTime = 200;
	}
}
