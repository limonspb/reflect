/**
 * @author ProBigi
 */

function EnemyScaleBonus()
{
	EnemyScaleBonus.superclass.constructor.apply(this);
	
	
	this.enemyScaleTime = 10000;
}

extend(EnemyScaleBonus, BaseBonus);

EnemyScaleBonus.prototype.init = function(x,y)
{
    this.view = new createjs.Bitmap(global.preloader.imgs.enemy_scale);
    
    this.width = global.preloader.imgs.enemy_scale.width;
	this.height = global.preloader.imgs.enemy_scale.height;
	
	this.view.x = -this.width/2*this.scale;
	this.view.y = -this.height/2*this.scale;
	this.view.scaleX = this.view.scaleY = this.scale;
	
	this.addChild(this.view);
	
	this.x = x;
	this.y = y;
	
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	this.type = BonusTypes.ENEMY_SCALE;
	
	this.show();
}

EnemyScaleBonus.prototype.testRemove = function()
{
	this.hide();
}

EnemyScaleBonus.prototype.includeBonus = function()
{
	global.EnemyManager.enemyScaleMode = true;
	global.EnemyManager.enemyScaleTime = this.enemyScaleTime;
	
	var len = global.EnemyManager.enemies.length;
	for (var i = 0; i < len; i++)
	{
		var enemy = global.EnemyManager.enemies[i];
		if (enemy)
		{
			enemy.setBigEnemy();
		}
	}
	
}
