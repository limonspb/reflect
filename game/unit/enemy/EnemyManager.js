/**
 * Менеджер управления Врагами
 * @author ProBigi
 */

function EnemyManager()
{
	this.enemies = [];
	this.enemiesCont = new createjs.Container();
	
	this.freezMode = false;
	
	this.timerAddSimpleEnemy = 0;
	this.timeToAddSimple = 1000;
	
	this.timerAddMediumEnemy = 0;
	this.timerToAddMedium = 7000;
	
	this.timerAddEscapeEnemy = 0;
	this.timerToAddEscape = 9000;
	
	this.timerAddStrongEnemy = 0;
	this.timerToAddStrong = 5000;
}

EnemyManager.prototype.addEnemy = function(type)
{
	if (this.enemies.length >= 50) { return; }
	
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
			break;
	}
	if (enemy)
	{
		enemy.init();
		
		this.enemiesCont.addChild(enemy);
		this.enemies.push(enemy);
	}
}

EnemyManager.prototype.removeEnemy = function(enemy)
{
	var index = this.enemies.indexOf(enemy);
	if (index != -1)
	{
		if (this.enemiesCont.contains(enemy)) { this.enemiesCont.removeChild(enemy); }
		
		//TODO очистка всего содержимого врага
		
		this.enemies.splice(index,1);
	}
}

EnemyManager.prototype.update = function(elapsedTime)
{
	this.move(elapsedTime);
	
	this.checkAddSimpleEnemy(elapsedTime);
	this.checkAddMediumEnemy(elapsedTime);
	this.checkAddEscapeEnemy(elapsedTime);
	this.checkAddStrongEnemy(elapsedTime);
}

EnemyManager.prototype.move = function(elapsedTime)
{
	for (var i = 0; i < this.enemies.length; i++)
	{
		this.enemies[i].move(elapsedTime);
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
