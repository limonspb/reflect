/**
 * @author ProBigi
 */

function BaseUnit()
{
	this.health;
	this.speed;
	this.view;
}

extend(BaseUnit,createjs.Container);

BaseUnit.prototype.move = function() { }
BaseUnit.prototype.setView = function() { }