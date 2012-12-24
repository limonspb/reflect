/**
 * Менеджер управления Врагами
 * @author ProBigi
 */

function EnemyManager()
{
	this.enemies = [];
	this.vacuums = [];
	this.vacuumSize = 150;
	this.enemiesCont = new createjs.Container();
	
	this.tank = null;
	
	this.freezMode = false;
	this.freezTime = 0;
	
	this.enemyScaleMode = false;
	this.enemyScaleTime = 0;
	
	this.timerAddSimpleEnemy = 0;
	this.timeToAddSimple = 1000;
	
	this.timerAddMediumEnemy = 0;
	this.timerToAddMedium = 1000;
	
	this.timerAddEscapeEnemy = 0;
	this.timerToAddEscape = 1000;
	
	this.timerAddStrongEnemy = 0;
	this.timerToAddStrong = 1000;
	
	this.timerAddChaseEnemy = 0;
	this.timerToAddChase = 1000;
	
	this.timerAddTankEnemy = 0;
	this.timerToAddTank = 1000;
	
	this.timerAddVacuumEnemy = 0;
	this.timerToAddVacuum = 1000;
}

EnemyManager.prototype.addEnemy = function(type)
{
	if (this.enemies.length >= 1) { return; }
	
	var enemy;
	switch(type)
	{
		case EnemyTypes.SIMPLE_ENEMY:
			enemy = new SimpleEnemy();
			break;
		case EnemyTypes.MEDIUM_ENEMY:
			enemy = new MediumEnemy();
			break;
		case EnemyTypes.ESCAPE_ENEMY:
			enemy = new EscapeEnemy();
			break;
		case EnemyTypes.STRONG_ENEMY:
			enemy = new StrongEnemy();
			break;
		case EnemyTypes.SMART_ENEMY:
			enemy = new SmartEnemy();
			break;
		case EnemyTypes.TANK_ENEMY:
			enemy = new TankEnemy();
			this.tank = enemy;
			break;
		case EnemyTypes.CHASE_ENEMY:
			enemy = new ChaseEnemy();
			break;
		case EnemyTypes.VACUUM_ENEMY:
			enemy = new VacuumEnemy();
			if (this.vacuums.length < 3) { this.vacuums.push(enemy); } else { enemy = null; }
			break;
	}
	if (enemy)
	{
		enemy.init();
		
		this.enemiesCont.addChild(enemy);
		this.enemies.push(enemy);
	}
}

EnemyManager.prototype.blow = function(unit)
{
	var ssBlow = new createjs.SpriteSheet({ "animations": {
		"run": [0, 15]},
		"images": [global.preloader.imgs.blow_anim],
		"frames": {
		"regX": global.preloader.imgs.blow_anim.height/2,
		"regY": global.preloader.imgs.blow_anim.height/2,
		"height": global.preloader.imgs.blow_anim.height,
		"width": global.preloader.imgs.blow_anim.height
		}
	});	
	
	ssBlow.getAnimation("run").frequency = 1;
	
	var blow = new createjs.BitmapAnimation(ssBlow);
	
	blow.onAnimationEnd = function(anim, frame)
	{
		anim.stop();
		global.EnemyManager.enemiesCont.removeChild(anim);
		anim = null;
		global.EnemyManager.removeEnemy(unit);
	}
	
	//var scale = 0.6;
	blow.x = unit.x;
	blow.y = unit.y;
	global.EnemyManager.enemiesCont.addChild(blow);
				
	blow.gotoAndPlay("run");
	blow.rotation = Math.random()*360;
	blow.scaleX = blow.scaleY = 0.7;
	
	unit.stopUnit = true;
	
	//global.EnemyManager.removeEnemy(unit);
}

EnemyManager.prototype.removeEnemy = function(enemy)
{
	var index = this.enemies.indexOf(enemy);
	if (index != -1)
	{
		if (this.enemiesCont.contains(enemy)) { this.enemiesCont.removeChild(enemy); }
		
		//enemy.clearData();
		
		global.points += enemy.points;
		
		if (enemy.type == EnemyTypes.VACUUM_ENEMY)
		{
			var ind = this.vacuums.indexOf(enemy);
			if (ind!=-1)
			{
				this.vacuums.splice(ind,1);
			}
		}
		
		this.enemies.splice(index,1);
		enemy = null;
	}
}

EnemyManager.prototype.update = function(elapsedTime)
{
	this.move(elapsedTime);
	
	this.checkAddSimpleEnemy(elapsedTime);
	this.checkAddMediumEnemy(elapsedTime);
	this.checkAddEscapeEnemy(elapsedTime);
	this.checkAddStrongEnemy(elapsedTime);
	this.checkAddChaseEnemy(elapsedTime);
	this.checkAddTankEnemy(elapsedTime);
	this.checkAddVacuumEnemy(elapsedTime);
}

EnemyManager.prototype.move = function(elapsedTime)
{
	if (this.freezTime > 0){
		this.freezTime-=elapsedTime;
	}
	
	if (this.enemyScaleTime > 0)
	{
		this.enemyScaleTime-=elapsedTime;
	} else {
		this.enemyScaleTime = 0;
		
		if (this.enemyScaleMode)
		{
			for (var j = 0; j < this.enemies.length; j++)
			{
				this.enemies[j].setNormalEnemy();
			}
		}
		
		this.enemyScaleMode = false;
	}
	
	
	
	for (var i = 0; i < this.enemies.length; i++)
	{
		if (this.enemies[i] != null)
		{
			this.enemies[i].move(elapsedTime);
		}
	}
}

EnemyManager.prototype.checkAddSimpleEnemy = function(elapsedTime)
{
	this.timerAddSimpleEnemy += elapsedTime;
	if (this.timerAddSimpleEnemy >= this.timeToAddSimple)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.SIMPLE_ENEMY);
		}
		this.timerAddSimpleEnemy = 0;
	}
}

EnemyManager.prototype.checkAddMediumEnemy = function(elapsedTime)
{
	this.timerAddMediumEnemy += elapsedTime;
	if (this.timerAddMediumEnemy >= this.timerToAddMedium)
	{
		for (var i = 0; i < 2; i++)
		{
			this.addEnemy(EnemyTypes.MEDIUM_ENEMY);
		}
		this.timerAddMediumEnemy = 0;
	}
}

EnemyManager.prototype.checkAddEscapeEnemy = function(elapsedTime)
{
	this.timerAddEscapeEnemy += elapsedTime;
	if (this.timerAddEscapeEnemy >= this.timerToAddEscape)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.ESCAPE_ENEMY);
		}
		this.timerAddEscapeEnemy = 0;
	}
}

EnemyManager.prototype.checkAddStrongEnemy = function(elapsedTime)
{
	this.timerAddStrongEnemy += elapsedTime;
	if (this.timerAddStrongEnemy >= this.timerToAddStrong)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.STRONG_ENEMY);
		}
		this.timerAddStrongEnemy = 0;
	}
}

EnemyManager.prototype.checkAddChaseEnemy = function(elapsedTime)
{
	this.timerAddChaseEnemy += elapsedTime;
	if (this.timerAddChaseEnemy >= this.timerToAddChase)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.CHASE_ENEMY);
		}
		this.timerAddChaseEnemy = 0;
	}
}

EnemyManager.prototype.checkAddTankEnemy = function(elapsedTime)
{
	for (var j = 0; j < global.EnemyManager.enemies.length; j++)
	{
		var enemy = global.EnemyManager.enemies[j];
		if (enemy.type == EnemyTypes.TANK_ENEMY) { return; }
	}
	
	this.timerAddTankEnemy += elapsedTime;
	if (this.timerAddTankEnemy >= this.timerToAddTank)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.TANK_ENEMY);
		}
		this.timerAddTankEnemy = 0;
	}
}

EnemyManager.prototype.checkAddVacuumEnemy = function(elapsedTime)
{
	this.timerAddVacuumEnemy += elapsedTime;
	if (this.timerAddVacuumEnemy >= this.timerToAddVacuum)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.VACUUM_ENEMY);
		}
		this.timerAddVacuumEnemy = 0;
	}
}

EnemyManager.prototype.clearAll = function()
{
	for (var i = 0; i < this.enemies.length; i++)
	{
		if(!this.enemies[i]) { continue; } 
		
		if (this.enemiesCont.contains(this.enemies[i])) { this.enemiesCont.removeChild(this.enemies[i]) }
		this.enemies[i].clearData();
		this.enemies[i] = null;
	}
	this.enemies.length = 0;
	this.vacuums.length = 0;
	
	//if (this.enemiesCont.parent) { this.enemiesCont.parent.removeChild(this.enemiesCont); }
	var num = this.enemiesCont.getNumChildren();
	while(num--) { this.enemiesCont.removeChildAt(num); }
	
	this.vacuumSize = 150;
	
	this.tank = null;
	
	this.freezMode = false;
	this.freezTime = 0;
	
	this.enemyScaleMode = false;
	this.enemyScaleTime = 0;
}
