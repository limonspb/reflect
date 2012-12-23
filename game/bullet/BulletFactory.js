/**
 * @author ProBigi
 */


function BulletFactory()
{
	this.bullets = [];
	this.bulletsCont = new createjs.Container();
	
	this.doubleDamageTime = 0;
	this.doubleDamage = false;
}


BulletFactory.prototype.addBullet = function(type, angle, x, y)
{
	var bullet;
	switch(type)
	{
		case BulletTypes.SHOT_GUN:
			bullet = new ShotGunBullet();
			break;
		case BulletTypes.MACHINE_GUN:
			
			break;
		case BulletTypes.ROCKET_GUN:
			
			break;
	}
	if (bullet)
	{
		bullet.init(angle,x,y);
		this.bulletsCont.addChild(bullet);
		this.bullets.push(bullet);
		
		return bullet;
	}
}

BulletFactory.prototype.moveBullets = function(elapsedTime)
{
	var len = this.bullets.length;
	for (var i = 0; i < len; ++i)
	{
		this.bullets[i].move(elapsedTime);
		if(!checkOutOfStage(this.bullets[i]))
		{
			if (this.bulletsCont.contains(this.bullets[i]))
			{
				this.removeBullet(i);
				len--;
			}			
		}
	}
	
	if (this.doubleDamage)
	{
		this.doubleDamageTime -= elapsedTime;
		if (this.doubleDamageTime <= 0)
		{
			this.doubleDamage = false;
		}
	}
}

BulletFactory.prototype.removeBullet = function(index)
{
	this.bulletsCont.removeChild(this.bullets[index]);
	//TODO clear bullet
	this.bullets.splice(index,1);
}

BulletFactory.prototype.clearAll = function(elapsedTime)
{
	this.doubleDamageTime = 0;
	this.doubleDamage = false;
	
	for (var i = 0; i < this.bullets.length; i++)
	{
		if (!this.bullets[i]) { continue; }
		
		if (this.bulletsCont.contains(this.bullets[i])) { this.bulletsCont.removeChild(this.bullets[i]) }
		this.bullets[i].clearData();
		this.bullets[i] = null;
	}
	this.bullets.length = 0;
	
	if (this.bulletsCont.parent) { this.bulletsCont.parent.removeChild(this.bulletsCont); }
}