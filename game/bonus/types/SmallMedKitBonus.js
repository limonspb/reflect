/**
 * @author ProBigi
 */

function SmallMedKitBonus()
{
	SmallMedKitBonus.superclass.constructor.apply(this);
	
}

extend(SmallMedKitBonus, BaseBonus);

SmallMedKitBonus.prototype.init = function(x,y)
{
	this.view = new createjs.Shape();
	this.view.graphics.setStrokeStyle(3, 'round', 'round');
	this.view.graphics.beginStroke(('#000000'));
    this.view.graphics.beginFill("#FF0000").drawCircle(0,0,15);
    this.view.graphics.endStroke();
    this.view.graphics.endFill();
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	this.width = 30;
	this.height = 30;
	
	this.type = BonusTypes.SMALL_MED_KIT;
	this.showTime = 20;
	
	this.show();
	
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { } ,5000).call(this.testRemove);
}

SmallMedKitBonus.prototype.testRemove = function()
{
	this.hide();
}
