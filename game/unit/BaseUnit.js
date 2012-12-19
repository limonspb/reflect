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
BaseUnit.prototype.getAngleToObject = function(object) {
	this.dx = this.x - object.x;
	this.dy = this.y - object.y;
	
	this.angle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	
	return (180 + this.angle);
}

BaseUnit.prototype.getDistanceToObject = function(object) {
	var dx = this.x - object.x;
	var dy = this.y - object.y;
	
	var dist = Math.sqrt(dx*dx + dy*dy);
	
	return dist;
}
