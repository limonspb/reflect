/**
 * @author ProBigi
 */

function FreezBonus()
{
	FreezBonus.superclass.constructor.apply(this);
	
	
	this.freezTime = 10000;
}

extend(FreezBonus, BaseBonus);

FreezBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.freez);
    
    this.width = global.preloader.imgs.freez.width;
	this.height = global.preloader.imgs.freez.height;
	
	var scale = 0.6;
	
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

FreezBonus.prototype.testRemove = function()
{
	this.hide();
}

FreezBonus.prototype.includeBonus = function()
{
	EnemyManager.freezMode = true;
	
	var len = global.EnemyManager.enemies.length;
	for (var i = 0; i < len; i++)
	{
		var enemy = global.EnemyManager.enemies[i];
		if (enemy)
		{
			enemy.pauseCount = 0;
			enemy.pauseTime = this.freezTime;
		}
	}
	
}
