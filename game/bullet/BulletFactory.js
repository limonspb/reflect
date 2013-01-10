function BulletFactory()
{
	this.bullets = [];
	this.bulletsCont = new createjs.Container();
	
	this.doubleDamageTime = 0;
	this.doubleDamage = false;
	
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 15]},
		"images": [global.preloader.imgs.blow_anim],
		"frames": {
		"regX": global.preloader.imgs.blow_anim.height/2,
		"regY": global.preloader.imgs.blow_anim.height/2,
		"height": global.preloader.imgs.blow_anim.height,
		"width": global.preloader.imgs.blow_anim.height
		}
	});
	
	this.ss.getAnimation("run").frequency = 1;
	
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
//	for (var i=0; i<5; i++){
//		global.BulletFactory.addBullet(BulletTypes.SHOT_GUN, 35+i, 100, 000);		
//	}
	var len = this.bullets.length;
	for (var i = 0; i < len; ++i)
	{
		this.bullets[i].move(elapsedTime);
		if(!checkOutOfStage(this.bullets[i]))
		{
			if (this.bulletsCont.contains(this.bullets[i]),true)
			{
				this.removeBullet(i);
				len--;
				i--;
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

BulletFactory.prototype.removeBullet = function(index, noExplosion)
{
	if(!!!noExplosion){
		this.makeExplosion(this.bullets[index].x, this.bullets[index].y);
	}
	this.bulletsCont.removeChild(this.bullets[index]);
	//TODO clear bullet
	this.bullets.splice(index,1);
}

BulletFactory.prototype.makeExplosion = function(x,y){	
	var expl = new createjs.BitmapAnimation(this.ss);
	
	expl.onAnimationEnd = function(anim, frame)
	{
		anim.stop();
		global.stage.removeChild(anim);
		anim = null;
		//global.EnemyManager.removeEnemy(unit);
	}
	
	//var scale = 0.6;
	expl.x = x;
	expl.y = y;
	global.stage.addChild(expl);
				
	expl.gotoAndPlay("run");
	expl.rotation = Math.random()*360;
	expl.scaleX = expl.scaleY = 0.3;


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
	
	//if (this.bulletsCont.parent) { this.bulletsCont.parent.removeChild(this.bulletsCont); }
}