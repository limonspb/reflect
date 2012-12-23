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
	this.view = new createjs.Bitmap(global.preloader.imgs.simple_bullet);
	this.view.x = -5;
	this.view.y = -3;
	
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

ShotGunBullet.prototype.setMyBullet = function() {
	this.damage *= 2;
	
	this.isMy = true;
	
	/*this.view.graphics.clear();
	this.view.graphics.beginFill("#2E2B57").drawRect( -5 , -3 , 10 , 6);
	this.view.graphics.endFill();*/
}