/**
 * @author ProBigi
 */


function MediumEnemy()
{
	MediumEnemy.superclass.constructor.apply(this);
	
}

extend(MediumEnemy,EnemyUnit);


/**
 * Создание отображения
 */
MediumEnemy.prototype.initView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("green").drawCircle ( -15 , -15 , 30 );
	
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
	this.bulletRespawn = 1500;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.range = 500;
}

MediumEnemy.prototype.move = function (elapsedTime)
{
	/*this.rotation = this.getAngleToUnit.apply(this, [global.hero]);
	
	this.angle = this.rotation/180 * Math.PI;
	
	this.x += this.speed*Math.cos(this.angle)*elapsedTime/1000;
	this.y += this.speed*Math.sin(this.angle)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	
	this.shoot();*/
}

MediumEnemy.prototype.shoot = function ()
{
	/*if (this.respawnCount >= this.bulletRespawn)
	{
		var angle = this.getAngleToUnit.apply(this, [global.hero]);
		global.BulletFactory.addBullet(this.bulletType, angle, this.x, this.y);
		
		this.respawnCount = 0;
	}*/
}
