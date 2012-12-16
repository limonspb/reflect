/**
 * @author ProBigi
 */


function BulletFactory()
{
	this.bullets = [];
}

BulletFactory.prototype.getBullet = function(type)
{
	switch(type)
	{
		case BulletTypes.SHOT_GUN:
			return new ShotGunBullet();
			break;
		case BulletTypes.MACHINE_GUN:
			
			break;
		case BulletTypes.ROCKET_GUN:
			
			break;
	}
}

BulletFactory.prototype.moveBullets = function(elapsedTime)
{
	for (var i = 0; i < this.bullets.length; ++i)
	{
		this.bullets[i].move(elapsedTime);
	}
}
