function TeleportBonus()
{
	TeleportBonus.superclass.constructor.apply(this);
	
}

extend(TeleportBonus, BaseBonus);

TeleportBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.teleport);
    
    this.width = global.preloader.imgs.teleport.width;
	this.height = global.preloader.imgs.teleport.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.TELEPORT;
	
	this.show();
	
	var tween = createjs.Tween.get(this, {loop:false});	
	tween.to( { } ,5000).call(this.testRemove);
}

TeleportBonus.prototype.testRemove = function()
{
	this.hide();
}

TeleportBonus.prototype.includeBonus = function()
{
	global.hero.teleportCount += 1;
}
