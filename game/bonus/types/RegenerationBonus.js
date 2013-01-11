/**
 * @author ProBigi
 */

function RegenerationBonus()
{
	RegenerationBonus.superclass.constructor.apply(this);
	
}

extend(RegenerationBonus, BaseBonus);

RegenerationBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.regeneration);
    
    this.width = global.preloader.imgs.regeneration.width;
	this.height = global.preloader.imgs.regeneration.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.REGENERATION;
	
	this.show();
}

RegenerationBonus.prototype.testRemove = function()
{
	this.hide();
}

RegenerationBonus.prototype.includeBonus = function()
{
	global.hero.regenerationCount += 1;
}
