/**
 * @author ProBigi
 */

function ShieldScaleBonus()
{
	ShieldScaleBonus.superclass.constructor.apply(this);
	
	
	this.shieldScaleTime = 15000;
}

extend(ShieldScaleBonus, BaseBonus);

ShieldScaleBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.shield_scale);
    
    this.width = global.preloader.imgs.shield_scale.width;
	this.height = global.preloader.imgs.shield_scale.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.SHIELD_SCALE;
	
	this.show();
}

ShieldScaleBonus.prototype.testRemove = function()
{
	this.hide();
}

ShieldScaleBonus.prototype.includeBonus = function()
{
	global.hero.shieldScaleTime = this.shieldScaleTime;
	global.hero.shieldScaleMode = true;
}
