/**
 * @author ProBigi
 */


function VacuumEnemy()
{
	VacuumEnemy.superclass.constructor.apply(this);
	
}

extend(VacuumEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
VacuumEnemy.prototype.initView = function ()
{
	this.body = new createjs.Bitmap(global.preloader.imgs.vacuum_anim);
	this.body.regX = global.preloader.imgs.vacuum_anim.width/2;
	this.body.regY = global.preloader.imgs.vacuum_anim.height/2;
	this.body.rotation = 90;
	
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 3]},
		"images": [global.preloader.imgs.vacuum_gun],
		"frames": {
		"regX": global.preloader.imgs.vacuum_gun.height/2,
		"regY": global.preloader.imgs.vacuum_gun.height/2,
		"height": global.preloader.imgs.vacuum_gun.height,
		"width": global.preloader.imgs.vacuum_gun.height
		}
	});	
	
	this.ss.getAnimation("run").frequency = 4;
	
	this.gunView = new createjs.BitmapAnimation(this.ss);
	
	var scale = 1;
				
	this.gunView.gotoAndPlay("run");
	this.gunView.rotation = 90;
	this.gunView.scaleX = this.body.scaleY = scale;
	
	this.gun = new createjs.Container();
	this.gun.addChild(this.gunView);
	
	this.width = global.preloader.imgs.vacuum_anim.width;
	this.height = global.preloader.imgs.vacuum_anim.height;
	if (this.width >= this.height) { this.size = this.height; }
	else { this.size = this.width; }
	
	
	this.view = new createjs.Container();
	this.view.addChild(this.body);
	
	this.addChild(this.view);
	this.addChild(this.gun);
}

VacuumEnemy.prototype.initOptions = function ()
{
	this.type = EnemyTypes.VACUUM_ENEMY;
	var skill = global.EnemyManager.skillKoeff;
	
	this.speed = Math.random()*20*skill + 30;
	this.rotationSpeed = 50;
	this.MAX_HEALTH = this.health = 20*skill;
	this.nearDamage = 20*skill;
	this.minRange = 10;
	this.maxRange = 20;
	
	this.vacuum = 150;
	
	this.points = 25*skill;
}

/*VacuumEnemy.prototype.clearData = function ()
{
	this.body.stop();
	
	this.view.removeChild(this.body);
	this.gun.removeChild(this.gunView);
	this.removeChild(this.gun);
	this.removeChild(this.view);
	
	this.ss = null;
	this.body = null;
	this.gunView = null;
	this.gun = null;
	this.view = null;
}*/

VacuumEnemy.prototype.move = function (elapsedTime)
{
	if (this.stopUnit == true) { return; }
	
	this.dist = getDistanceToObject(this, global.hero);
	
	if (!this.pauseMove(elapsedTime))
	{
		//this.view.rotation = this.getAngleToObject(global.hero);
		
		this.view.rotation += this.getGunRotation(this.view, ShotType.CLEVER_SHOT)*elapsedTime/1000;
		
		this.angle = this.view.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		if (this.dist <= this.minRange+5)
		{
			dx = 0;
			dy = 0;
		}
		
		this.x += dx;
		this.y += dy;
	}
	
	this.gun.rotation = this.getAngleToObject(global.hero);
	
	this.checkHitHero(elapsedTime);
	
	//this.gun.rotation += this.getGunRotation(this.gun, ShotType.CLEVER_SHOT)*elapsedTime/1000;
	
	//this.respawnCount += elapsedTime;
	//this.shoot();
	
	//this.checkMyBullet();
	this.checkHitBullet();
}

/*VacuumEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		if (this.dist <= this.maxRange && this.dist >= this.minRange)
		{
			//var angle = this.getAngleToObject(global.hero);
			this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
			this.bullet.damage = this.damage;
			
			this.respawnCount = 0;
		}
	}
}
*/
