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
}

extend(BaseUnit,createjs.Container);

BaseUnit.prototype.move = function(elapsedTime) { }
BaseUnit.prototype.setView = function() { }