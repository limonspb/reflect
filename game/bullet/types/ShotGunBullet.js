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
	this.view.graphics.beginFill("0").drawRect ( -10 , -5 , 20 , 10);
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
}

ShotGunBullet.prototype.initOptions = function(angle)
{
	this.rotation = angle;
	this.speed = 10;
	this.type = BulletTypes.SHOT_GUN;
}

ShotGunBullet.prototype.move = function(elapsedTime)
{
	this.angle = this.rotation/180*Math.PI;
	
	this.x += this.speed*Math.cos(this.angle)*elapsedTime/1000;
	this.y += this.speed*Math.sin(this.angle)*elapsedTime/1000;
	
	//console.log(this.x, this.y);
}