/**
 * @author ProBigi
 */

function SmallMedKitBonus()
{
	SmallMedKitBonus.superclass.constructor.apply(this);
	
	
	this.updateHealth = 20;
}

extend(SmallMedKitBonus, BaseBonus);

SmallMedKitBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.bonus_20hp);
    
    this.width = global.preloader.imgs.bonus_20hp.width;
	this.height = global.preloader.imgs.bonus_20hp.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
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

SmallMedKitBonus.prototype.includeBonus = function()
{
	global.hero.health += this.updateHealth;
	
	if (global.hero.health > global.hero.MAX_HEALTH) { global.hero.health = global.hero.MAX_HEALTH; }
	
	global.hero.alpha = global.hero.health/global.hero.MAX_HEALTH;
}
