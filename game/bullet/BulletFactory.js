/**
 * @author ProBigi
 */


function BulletFactory()
{
	this.bullets = [];
	this.bulletsCont = new createjs.Container();
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
		if(!this.bullets[i].checkOutOfStage())
		{
			if (this.bulletsCont.contains(this.bullets[i]))
			{
				this.bulletsCont.removeChild(this.bullets[i]);
				//TODO clear bullet
				this.bullets.splice(i,1);
				len--;
			}			
		}
	}
}
