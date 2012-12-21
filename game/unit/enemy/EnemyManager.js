/**
 * Менеджер управления Врагами
 * @author ProBigi
 */

function EnemyManager()
{
	global.EnemyFactory = new EnemyFactory();
	
	this.timerAddSimpleEnemy = 0;
	this.timeToAddSimple = 5000;
	
	this.timerAddMediumEnemy = 0;
	this.timerToAddMedium = 7000;
	
	this.timerAddEscapeEnemy = 0;
	this.timerToAddEscape = 9000;
	
	this.timerAddStrongEnemy = 0;
	this.timerToAddStrong = 11000;
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
	var len = global.EnemyFactory.enemies.length;
	for (var i = 0; i < len; i++)
	{
		global.EnemyFactory.enemies[i].move(elapsedTime);
	}
}

EnemyManager.prototype.checkAddSimpleEnemy = function(elapsedTime)
{
	this.timerAddSimpleEnemy += elapsedTime;
	if (this.timerAddSimpleEnemy >= this.timeToAddSimple)
	{
		for (var i = 0; i < 1; i++)
		{
			global.EnemyFactory.addEnemy(EnemyTypes.SIMPLE_ENEMY);
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
			global.EnemyFactory.addEnemy(EnemyTypes.MEDIUM_ENEMY);
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
			global.EnemyFactory.addEnemy(EnemyTypes.ESCAPE_ENEMY);
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
			global.EnemyFactory.addEnemy(EnemyTypes.STRONG_ENEMY);
		}
		this.timerAddStrongEnemy = 0;
	}
}
