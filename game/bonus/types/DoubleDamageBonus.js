/**
 * @author ProBigi
 */

function DoubleDamageBonus()
{
	DoubleDamageBonus.superclass.constructor.apply(this);
	
	this.damageTime = 15000;
}

extend(DoubleDamageBonus, BaseBonus);

DoubleDamageBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.x2damage);
    
    this.width = global.preloader.imgs.x2damage.width;
	this.height = global.preloader.imgs.x2damage.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.DOUBLE_DAMAGE;
	this.showTime = 20;
	
	this.show();
}

DoubleDamageBonus.prototype.testRemove = function()
{
	this.hide();
}

DoubleDamageBonus.prototype.includeBonus = function()
{
	global.BulletFactory.doubleDamageTime = this.damageTime;
	global.BulletFactory.doubleDamage = true;
}
