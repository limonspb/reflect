/**
 * @author ProBigi
 */


function SimpleEnemy()
{
	SimpleEnemy.superclass.constructor.apply(this);
	
}

extend(SimpleEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
SimpleEnemy.prototype.initView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("blue").drawRect ( -20 , -20 , 40 , 40 );
	
	this.width = 40;
	this.height = 40;
	
	this.addChild(this.view);
}

SimpleEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*30 + 40;
	this.rotationSpeed = 60;
	this.health = 10;
	this.damage = 15;
	this.bulletRespawn = 1000;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.range = 1000;
}

SimpleEnemy.prototype.move = function (elapsedTime)
{
	this.rotation = this.getAngleToUnit.apply(this, [global.hero]);
	
	this.angle = this.rotation/180 * Math.PI;
	
	this.x += this.speed*Math.cos(this.angle)*elapsedTime/1000;
	this.y += this.speed*Math.sin(this.angle)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	
	this.shoot();
}

SimpleEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		var angle = this.getAngleToUnit.apply(this, [global.hero]);
		global.BulletFactory.addBullet(this.bulletType, angle, this.x, this.y);
		
		this.respawnCount = 0;
	}
}
	

