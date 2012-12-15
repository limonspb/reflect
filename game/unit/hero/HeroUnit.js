/**
 * @author ProBigi
 */


function HeroUnit()
{
	HeroUnit.superclass.constructor.apply(this);
	this.setView();
}

extend(HeroUnit,BaseUnit);

HeroUnit.prototype.setView = function ()
{
	//var view = HeroUnit.superclass.view;
	var view = new createjs.Shape();
	view.graphics.beginFill("red").drawCircle(0, 0, 50);
	
	console.log(this);
	
	this.addChild(view);
}

HeroUnit.prototype.move = function ()
{
	
}
