/**
 * @author ProBigi
 */


function HeroUnit()
{
	
}

extends(HeroUnit,BaseUnit);

HeroUnit.prototype.setView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("red").drawCircle(0, 0, 50);
	this.view.x = 181;
	this.view.y = 100;
	this.keys = [];
}

HeroUnit.prototype.move = function ()
{
	
}
