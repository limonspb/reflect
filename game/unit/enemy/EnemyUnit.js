/**
 * @author ProBigi
 */

var ShotType = {
	
	FORWARD_SHOT: 0,
	STUPID_SHOT: 1,
	CLEVER_SHOT: 2
	
}


function EnemyUnit()
{
	EnemyUnit.superclass.constructor.apply(this);
	
	this.type;
	
	this.damage;
	this.nearDamage = 5;
	this.bulletType;
	this.bulletRespawn;
	this.respawnCount = 0;
	this.nearRespawn = 2000;
	this.nearRespawnCount = this.nearRespawn;
	this.minRange;
	this.maxRange;
	
	this.pauseCount = Math.random() * 20000 + 3000;;
	this.pauseTime = Math.random()*10000 + 3000;
	
	
	//for spiral moving
	this.velocity;
	this.disared;
	this.position;
	this.steering;
	this.MAX_FORCE;
	this.MAX_VELOCITY;
	this.mass;
	
}

extend(EnemyUnit,BaseUnit);


//Interface

/**
 * Инициализация юнита
 */
EnemyUnit.prototype.init = function() {
	this.initView();
	this.initPosition();
	this.initOptions();
}

EnemyUnit.prototype.initView = function() { }

EnemyUnit.prototype.initOptions = function() { }

EnemyUnit.prototype.initPosition = function() {
	var random = Math.random();
	if (random <= .25) {
		this.x = Math.random()*global.levelWidth;
		this.y = - this.height - 20;
	}
	else if (random > .25 && random < .5) {
		this.x = Math.random()*global.levelWidth;
		this.y = global.levelHeight + this.height + 20;
	}
	else if (random > .5 && random < .75) {
		this.x = - this.width - 20;
		this.y = Math.random() * global.levelHeight;
	}
	else if (random >= .75) {
		this.x = global.levelWidth + this.width + 20;
		this.y = Math.random() * global.levelHeight;
	}
	
	//console.log("R " + random);
	//console.log(this.x, this.y);
	
	//this.x = Math.random() * global.gameWidth;
	//this.y = Math.random() * global.gameHeight;
	
	//this.x = global.hero.x;
	//this.y = global.hero.y;
}

EnemyUnit.prototype.move = function(elapsedTime) { }

EnemyUnit.prototype.shoot = function() { }

/** Расчет случайной остановки на случайное время юнита*/
EnemyUnit.prototype.pauseMove = function(elapsedTime)
{
	this.pauseCount -= elapsedTime;
	var pause;
	
	if (this.pauseCount <= 0) { 
		pause = true;
	}
	if (pause == true && this.pauseTime > 0)
	{
		this.pauseTime -= elapsedTime;
	}
	else if (this.pauseTime <= 0)
	{
		this.pauseCount = Math.random()*20000 + 3000;;
		this.pauseTime = Math.random()*10000 + 3000;
		pause = false;
		EnemyManager.freezMode = false;
	}
	else { pause = false; }
	
	if (EnemyManager.freezMode) { pause = true; }
	
	return pause;
}

EnemyUnit.prototype.checkHitHero = function(elapsedTime)
{
	if (getDistanceToObject(this, global.hero) <= (this.size + global.hero.size)*0.75)
	{
		this.nearRespawnCount += elapsedTime;
		if (this.nearRespawnCount >= this.nearRespawn)
		{
			this.setUnitDamage(global.hero, this.nearDamage);
			
			this.nearRespawnCount = 0;
		}
	} else {
		this.nearRespawnCount = this.nearRespawn;
	}
	
	this.checkHitTank();
}

EnemyUnit.prototype.checkHitTank = function(elapsedTime)
{
	if (global.EnemyManager.tank == null) { return; }
	
	if (this == global.EnemyManager.tank) { return; }
	
	if (getDistanceToObject(this, global.EnemyManager.tank) <= (global.EnemyManager.tank.size + this.size)*0.75)
	{
		global.EnemyManager.blow(this);
	}
}

EnemyUnit.prototype.setBigEnemy = function()
{
	this.scaleX = this.scaleY = 1.5;
	if (this.scaleX != 1.5) { this.size *= 1.5; }
}

EnemyUnit.prototype.setNormalEnemy = function()
{
	this.scaleX = this.scaleY = 1;
	this.size /= 1.5;
}

/**
 * Получить направление поворота относительно элемента к герою
 * @param {Object} item
 */
EnemyUnit.prototype.getGunRotation = function(item, shotType)
{
	if (item.rotation < -360 || item.rotation >  360) { item.rotation %= 360; }
	
	var angle;
	switch(shotType)
	{
		case ShotType.FORWARD_SHOT:
			angle = this.getAngleToObject(global.hero) - item.rotation;
			break;
		case ShotType.STUPID_SHOT:
			angle = global.hero.getChanceFireAngle_simple(this.x, this.y, 50+ Math.random()*100) - item.rotation;
			break;
		case ShotType.CLEVER_SHOT:
			angle = global.hero.getChanceFireAngle(this.x, this.y, 500) - item.rotation;
			break;
	}
	//console.log(shotType, angle);
	
	//var angle = this.getAngleToObject(global.hero) - item.rotation;
	//var angle = global.hero.getChanceFireAngle(this.x, this.y, 500) - item.rotation;
	//var angle = global.hero.getChanceFireAngle_simple(this.x, this.y, 200) - item.rotation;
	
	if (angle < -360 || angle >  360) { angle %= 360; }
	
	if (Math.abs(angle) > 180) { angle = -angle; }
	
	
	var minAngle = 10;
	var rot;
	if (Math.abs(angle) <= minAngle)
    {
    	rot = 0;
    }
    else if (angle >= 0)
    {
    	rot = this.rotationSpeed;
    }
    else if (angle < 0)
    {
    	rot = -this.rotationSpeed;
    }
    
    //console.log("ANGLE " + angle + " ROT " + rot);
    
	return (rot);
}

/** Проверка принадлежности пули игроку */
EnemyUnit.prototype.checkMyBullet = function ()
{
	if (!this.bullet) { return; }
	
	if (getDistanceToObject(this, this.bullet) > this.size*0.7)
	{
		this.bullet = null;
	}
}


/** Поиск цели*/
EnemyUnit.prototype.seek = function(target) {
	
	this.disared = target.subtract(this.position);
	this.disared.normalize();
	this.disared.scaleBy(this.MAX_VELOCITY);
	
	var force = this.disared.subtract(this.velocity);
	
	return force;
}

/** Срез направления вектора*/
EnemyUnit.prototype.truncate = function(vector, max) {
	var i = max / vector.length();
	
	i = i < 1.0 ? 1.0 : i;
	
	vector.scaleBy(i);
}

/** Задание координат движения по дуге*/
EnemyUnit.prototype.update = function(target) {
	//var target = global.hero.getChanceFireCoords(this.x,this.y, this.speed);
	//var target = global.hero.getChanceFireCoords(this.x,this.y, this.speed);
	//console.log(target.x,target.y);
	this.steering = this.seek(new Vec2(target.x, target.y));
	
	this.truncate(this.steering, this.MAX_FORCE);
	this.steering.scaleBy(1 / this.mass);
	
	this.velocity = this.velocity.addV(this.steering);
	this.truncate(this.velocity, this.MAX_VELOCITY);
	
	this.position = this.position.addV(this.velocity);
	
	this.view.rotation = Math.atan2(this.y - this.position.y, this.x - this.position.x)*180/Math.PI
	
	this.x = this.position.x;
	this.y = this.position.y;
}

