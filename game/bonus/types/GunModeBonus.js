/**
 * @author ProBigi
 */

function GunModeBonus()
{
	GunModeBonus.superclass.constructor.apply(this);
	
	
	this.gunModeTime = 10000;
}

extend(GunModeBonus, BaseBonus);

GunModeBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.gun_mode);
    
    this.width = global.preloader.imgs.full_protect.width;
	this.height = global.preloader.imgs.full_protect.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.GUN_MODE;
	
	this.show();
}

GunModeBonus.prototype.testRemove = function()
{
	this.hide();
}

GunModeBonus.prototype.includeBonus = function()
{
	global.hero.gunMode = true;
	global.hero.gunModeTime = this.gunModeTime;
}
