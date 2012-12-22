/**
 * @author ProBigi
 */

function PlusToLifeBonus()
{
	PlusToLifeBonus.superclass.constructor.apply(this);
	
	
	this.plusToLife = 10;
}

extend(PlusToLifeBonus, BaseBonus);

PlusToLifeBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.bonus_plus10_life);
    
    this.width = global.preloader.imgs.bonus_plus10_life.width;
	this.height = global.preloader.imgs.bonus_plus10_life.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.PLUS_TO_LIFE;
	this.showTime = 20;
	
	this.show();
	
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { } ,5000).call(this.testRemove);
}

PlusToLifeBonus.prototype.testRemove = function()
{
	this.hide();
}

PlusToLifeBonus.prototype.includeBonus = function()
{
	global.hero.MAX_HEALTH += this.plusToLife;
}
