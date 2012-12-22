/**
 * @author ProBigi
 */

function MediumMedKitBonus()
{
	MediumMedKitBonus.superclass.constructor.apply(this);
	
	
	this.updateHealth = 50;
}

extend(MediumMedKitBonus, BaseBonus);

MediumMedKitBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.bonus_50hp);
    
    this.width = global.preloader.imgs.bonus_50hp.width;
	this.height = global.preloader.imgs.bonus_50hp.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.MEDIUM_MED_KIT;
	this.showTime = 20;
	
	this.show();
	
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { } ,5000).call(this.testRemove);
}

MediumMedKitBonus.prototype.testRemove = function()
{
	this.hide();
}

MediumMedKitBonus.prototype.includeBonus = function()
{
	global.hero.health += this.updateHealth;
	
	if (global.hero.health > global.hero.MAX_HEALTH) { global.hero.health = global.hero.MAX_HEALTH; }
	
	global.hero.alpha = global.hero.health/global.hero.MAX_HEALTH;
}
