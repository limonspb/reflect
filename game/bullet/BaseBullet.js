/**
 * @author ProBigi
 */


function BaseBullet()
{
	BaseBullet.superclass.constructor.apply(this);
	
	this.view;
	this.speed;
	this.type;
}

extend(BaseBullet, createjs.Container);

BaseBullet.prototype.init = function(angle, x, y) { }
BaseBullet.prototype.initView = function(x,y) { }
BaseBullet.prototype.initOptions = function(angle) { }
BaseBullet.prototype.move = function(elapsedTime) { }
BaseBullet.prototype.blow = function() { }

BaseBullet.prototype.checkOutOfStage = function()
{
	if (this.x + this.width >= global.gameWidth) { }
	if (this.y + this.height >= global.gameHeight) { }
}


BaseBullet.prototype.getAngleToUnit = function(unit) {
	this.dx = this.x - unit.x;
	this.dy = this.y - unit.y;
	
	this.angle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	
	return (180 + this.angle);
}