/**
 * @author ProBigi
 */

function BaseUnit()
{
	BaseUnit.superclass.constructor.apply(this);
	
	this.health;
	this.speed;
	this.view;
}

extend(BaseUnit,createjs.Container);

BaseUnit.prototype.move = function() { }
BaseUnit.prototype.setView = function() { }