/**
 * @author ProBigi
 */

function SpeedUpBonus()
{
	SpeedUpBonus.superclass.constructor.apply(this);
	
	this.speedTime = 3000;
}

extend(SpeedUpBonus, BaseBonus);

SpeedUpBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.speedUp);
    
    this.width = global.preloader.imgs.speedUp.width;
	this.height = global.preloader.imgs.speedUp.height;
	
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
	
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { } ,5000).call(this.testRemove);
}

SpeedUpBonus.prototype.testRemove = function()
{
	this.hide();
}

SpeedUpBonus.prototype.includeBonus = function()
{
	global.hero.speedyMode = true;
	global.hero.speedTime = this.speedTime;
	
	global.hero.max_v_c_forward = global.hero.current_forward*1.5;
	global.hero.max_v_c_backward = global.hero.current_backward*1.5;
	//this.current_backward;
	//this.current_forward;
}