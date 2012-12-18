/**
 * @author ProBigi
 */


function MediumEnemy()
{
	MediumEnemy.superclass.constructor.apply(this);
	
	
	this.backTime = 0;
	this.moveBackState;
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
	this.range = 500;
}

MediumEnemy.prototype.move = function (elapsedTime)
{
	this.rotation = this.getAngleToObject(global.hero);
	this.angle = this.rotation/180 * Math.PI;
	var dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
	var dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
	
	
	this.backTime -= elapsedTime;
	if (this.backTime > 0)
	{
		this.x -= dx+7;
		this.y -= dy+7;
	}
	else
	{
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
		var angle = this.getAngleToObject.apply(this, [global.hero]);
		this.bullet = global.BulletFactory.addBullet(this.bulletType, angle, this.x, this.y);
		
		this.respawnCount = 0;
		
		this.backTime = 300;
	}
}
