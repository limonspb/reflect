/**
 * @author ProBigi
 */

function FullProtectionBonus()
{
	FullProtectionBonus.superclass.constructor.apply(this);
	
	
	this.fullProtectionTime = 10000;
}

extend(FullProtectionBonus, BaseBonus);

FullProtectionBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.full_protect);
    
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
	
	this.type = BonusTypes.FULL_PROTECT;
	
	this.show();
}

FullProtectionBonus.prototype.testRemove = function()
{
	this.hide();
}

FullProtectionBonus.prototype.includeBonus = function()
{
	global.hero.fullProtectMode = true;
	global.hero.fullProtectTime = this.fullProtectionTime;
}
