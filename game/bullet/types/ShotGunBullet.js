/**
 * @author ProBigi
 */

function ShotGunBullet()
{
	ShotGunBullet.superclass.constructor.apply(this);
}

extend(ShotGunBullet, BaseBullet);

ShotGunBullet.prototype.init = function(angle, x, y)
{
	this.initView(x,y);
	this.initOptions(angle);
}

ShotGunBullet.prototype.initView = function(x,y)
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("red").drawRect ( -10 , -5 , 20 , 10);
	
	this.addChild(this.view);	
	
	this.x = this.futureX = x;
	this.y = this.futureY = y;
}

ShotGunBullet.prototype.initOptions = function(angle)
{
	this.rotation = this.futureRotation = angle;
	this.speed = 500;
	this.type = BulletTypes.SHOT_GUN;
}

ShotGunBullet.prototype.move = function(elapsedTime)
{
	this.x = this.futureX;
	this.y = this.futureY;
	this.rotation = this.futureRotation;
	
	this.angle = this.futureRotation/180*Math.PI;
	this.futureX += this.speed*Math.cos(this.angle)*elapsedTime/1000;
	this.futureY += this.speed*Math.sin(this.angle)*elapsedTime/1000;
}