/**
 * @author ProBigi
 */

function BaseUnit()
{
	BaseUnit.superclass.constructor.apply(this);
	
	this.MAX_HEALTH;
	this.health;
	this.speed;
	this.rotationSpeed;
	this.view;
	this.width;
	this.height;
	this.size;
	
	this.bullet;
}

extend(BaseUnit, createjs.Container);

BaseUnit.prototype.move = function(elapsedTime) { }
BaseUnit.prototype.initView = function() { }
BaseUnit.prototype.initOptions = function() { }
BaseUnit.prototype.getAngleToObject = function(object) {
	this.dx = this.x - object.x;
	this.dy = this.y - object.y;
	
	this.angle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	
	return (180 + this.angle);
}

BaseUnit.prototype.checkHitBullet = function()
{
	var len = global.BulletFactory.bullets.length;
	
	for (var i = 0; i < len; i++)
	{
		var bull = global.BulletFactory.bullets[i];
		
		//if (bull == this.bullet) { continue; }
		
		if (getDistanceToObject(this, bull) <= this.size*0.75)
		{
			//console.log("HIT TEST BULLET " + i);
			
			if (this == global.hero)
			{
				//if (!bull.isMy)
				//{
					global.BulletFactory.removeBullet(i);
					len--;
					
					this.health -= bull.damage;
			
					this.checkDestroy();
				//}
			} else {
				if (bull.isMy)
				{
					global.BulletFactory.removeBullet(i);
					len--;
					
					this.health -= bull.damage;
			
					this.checkDestroy();
				}
			}
			
		}
		
	}
	
}

BaseUnit.prototype.checkDestroy = function()
{
	console.log("HEALTH " + this.health);
	
	if (this == global.hero)
	{
		this.alpha = this.health/this.MAX_HEALTH;
	}
	
	if (this.health <= 0)
	{
		if (this == global.hero)
		{
			//TODO вывод окна об окончании игры
		}
		else
		{
			var index = global.EnemyManager.enemies.indexOf(this);
			if (index != -1)
			{
				global.EnemyManager.removeEnemy(this);
			}
		}
	}
}

