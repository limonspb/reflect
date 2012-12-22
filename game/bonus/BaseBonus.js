/**
 * @author ProBigi
 */


function BaseBonus()
{
	BaseBonus.superclass.constructor.apply(this);
	
	this.view;
	this.type;
	this.showTime;
	
	this.size;
	this.scale = 0.6;
	
	this.isPickuped = false;
}

extend(BaseBonus,createjs.Container);

BaseBonus.prototype.init = function(x,y) { }

BaseBonus.prototype.show = function()
{
	this.scaleX = this.scaleY = 0;
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { scaleX:1, scaleY: 1 },1000,createjs.Ease.bounceOut);
	//.to( { scaleX:1, scaleY: 1 },300)
}

BaseBonus.prototype.hide = function()
{
	createjs.Tween.removeTweens(this);
	
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { scaleX:0, scaleY: 0 },500,createjs.Ease.bounceIn).wait(1).call(this.onComplete);
}

BaseBonus.prototype.onComplete = function()
{
	createjs.Tween.removeTweens(this);
	
	global.BonusManager.removeBonus(this);
}

BaseBonus.prototype.pickUp = function()
{
	this.isPickuped = true;
	
	createjs.Tween.removeTweens(this);
	
	var tween = createjs.Tween.get(this, {loop:false});
	tween.to( { scaleX:1.7, scaleY: 1.7, alpha: 0.1 },200).wait(1).call(this.onComplete);
	
	//TODO метод действия бонуса
	this.includeBonus();
}
