/**
 * @author ProBigi
 */

function BaseUnit()
{
	BaseUnit.superclass.constructor.apply(this);
	
	this.health;
	this.speed;
	this.rotationSpeed;
	this.view;
	this.width;
	this.height;
}

extend(BaseUnit,createjs.Container);

BaseUnit.prototype.move = function(elapsedTime) { }
BaseUnit.prototype.initView = function() { }
BaseUnit.prototype.initOptions = function() { }
BaseUnit.prototype.getAngleToUnit = function(unit) {
	this.dx = this.x - unit.x;
	this.dy = this.y - unit.y;
	
	this.angle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	
	return (180 + this.angle);
}
