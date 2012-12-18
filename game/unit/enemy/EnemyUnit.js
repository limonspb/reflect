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
	this.range;
	this.bullet;
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
		this.x = Math.random()*global.gameWidth;
		this.y = global.camera.lookAtY - this.height - 20;
	}
	else if (random > .25 && random < .5) {
		this.x = Math.random()*global.gameWidth;
		this.y = global.gameHeight + this.height + 20;
	}
	else if (random > .5 && random < .75) {
		this.x = global.camera.lookAtX - this.width - 20;
		this.y = Math.random() * global.gameHeight;
	}
	else if (random >= .75) {
		this.x = global.gameWidth + this.width + 20;
		this.y = Math.random() * global.gameHeight;
	}
}

EnemyUnit.prototype.move = function(elapsedTime) { }

EnemyUnit.prototype.shoot = function() { }
