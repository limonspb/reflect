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
	this.view.graphics.beginFill("blue").drawRect ( -25 , -20 , 40 , 40 );
	
	this.gun = new createjs.Shape();
    this.gun.graphics.setStrokeStyle(1, 'round', 'round');
    this.gun.graphics.beginStroke(('#000000'));
    this.gun.graphics.moveTo(0,0);
    this.gun.graphics.lineTo(20,0);
    this.gun.graphics.endStroke();
    this.gun.graphics.endFill();
	
	this.width = 40;
	this.height = 40;
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.view.cache(-20,-20,40,40);
	this.addChild(this.view);
	this.addChild(this.gun);
	this.addChild(this.center);
}

SimpleEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*30 + 40;
	this.rotationSpeed = 60;
	this.health = 10;
	this.damage = 15;
	this.bulletRespawn = 3500;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 0;
	this.maxRange = 1000;
}

SimpleEnemy.prototype.move = function (elapsedTime)
{
	this.dist = this.getDistanceToObject(global.hero);
	
	var dx = 0;
	var dy = 0;
	
	if (!this.pauseMove(elapsedTime))
	{
		this.view.rotation = this.getAngleToObject(global.hero);
		
		this.angle = this.view.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		this.x += dx;
		this.y += dy;
	}
	
	this.gun.rotation += this.getRotation(this.gun)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	this.shoot();
}

SimpleEnemy.prototype.shoot = function ()
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
	

