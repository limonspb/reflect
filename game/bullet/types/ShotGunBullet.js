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
	
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 1]},
		"images": [global.preloader.imgs.x2damage_bullet],
		"frames": {
		"regX": global.preloader.imgs.x2damage_bullet.height/2,
		"regY": global.preloader.imgs.x2damage_bullet.height/2,
		"height": global.preloader.imgs.x2damage_bullet.height,
		"width": global.preloader.imgs.x2damage_bullet.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 10;
	
	this.x2bullet = new createjs.BitmapAnimation(this.ss);
	
	//this.x2bullet.gotoAndPlay("run");
	this.x2bullet.x = this.view.x;
	this.x2bullet.y = this.view.y;
	
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
	
	
	this.removeChild(this.view);
	this.addChild(this.x2bullet);
	this.x2bullet.gotoAndPlay("run");
	
	/*this.view.graphics.clear();
	this.view.graphics.beginFill("#2E2B57").drawRect( -5 , -3 , 10 , 6);
	this.view.graphics.endFill();*/
}