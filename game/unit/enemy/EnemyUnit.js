/**
 * @author ProBigi
 */


function EnemyUnit()
{
	EnemyUnit.superclass.constructor.apply(this);
	
	this.damage;
	this.bulletType;
	this.bulletRespawn;
	this.respawnCount = 0;
	this.minRange;
	this.maxRange;
	
	this.bullet;
	
	this.pauseCount = Math.random() * 20000 + 3000;;
	this.pauseTime = Math.random()*10000 + 3000;
}

extend(EnemyUnit,BaseUnit);


//Interface

/**
 * Инициализация юнита
 */
EnemyUnit.prototype.init = function() {
	this.initView();
	this.initOptions();
	this.initPosition();
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
}

EnemyUnit.prototype.move = function(elapsedTime) { }

EnemyUnit.prototype.shoot = function() { }

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
		this.pauseCount = Math.random() * 20000 + 3000;;
		this.pauseTime = Math.random()*10000 + 3000;
		pause = false;
	}
	else { pause = false; }
	
	return pause;
}

/**
 * Получить направление поворота относительно элемента к герою
 * @param {Object} item
 */
EnemyUnit.prototype.getRotation = function(item)
{
	if (item.rotation < -360 || item.rotation >  360) { item.rotation %= 360; }
	
	//console.log(item.rotation);
	
	
	//var angle = this.getAngleToObject(global.hero) - item.rotation;
	var angle = global.hero.getChanceFireAngle(this.x, this.y, 500) - item.rotation;
	//var angle = global.hero.getChanceFireAngle_simple(this.x, this.y, 200) - item.rotation;
		
	
	
	if (angle < -360 || angle >  360) { angle %= 360; }
	
	if (Math.abs(angle) > 180) { angle = -angle; }
	
	//console.log(angle);
	
	var minAngle = 5;
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
