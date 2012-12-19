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
	this.view.graphics.beginFill("green").drawCircle ( -5 , -5 , 10 );
	this.view.graphics.endStroke();
    this.view.graphics.endFill();
    this.view.graphics.setStrokeStyle(1, 'round', 'round');
    this.view.graphics.beginStroke(('#000000'));
    this.view.graphics.moveTo(-5,-5);
    this.view.graphics.lineTo(10,0);
	
	this.width = 10;
	this.height = 10;
	
	this.addChild(this.view);
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
	this.minRange = 0;
	this.maxRange = 500;
}

MediumEnemy.prototype.move = function (elapsedTime)
{
	var dx;
	var dy;
	
	this.backTime -= elapsedTime;
	if (this.backTime > 0)
	{
		this.rotation = this.bulletAngle;
		
		this.angle = this.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		
		this.x -= dx*7;
		this.y -= dy*7;
	}
	else
	{
		this.rotation = this.getAngleToObject(global.hero);
		this.angle = this.rotation/180 * Math.PI;
		this.speed = Math.abs(this.speed);
		
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		
		this.x += dx; 
		this.y += dy;
		
		this.backTime = 0;
	}
	
	
	this.respawnCount += elapsedTime;
	
	this.shoot();
}

MediumEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		var angle = this.getAngleToObject(global.hero);
		this.bullet = global.BulletFactory.addBullet(this.bulletType, angle, this.x, this.y);
		
		this.respawnCount = 0;
		
		this.bulletAngle = angle;
		this.backTime = 200;
	}
}
