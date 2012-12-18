/**
 * Менеджер управления Врагами
 * @author ProBigi
 */

function EnemyManager()
{
	global.EnemyFactory = new EnemyFactory();
	
	
	this.timerAddEnemy = 0;
	this.timeToAdd = 2000;
}

EnemyManager.prototype.update = function(elapsedTime)
{
	this.move(elapsedTime);
	
	this.checkAddSimpleEnemy(elapsedTime);
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
	this.timerAddEnemy += elapsedTime;
	if (this.timerAddEnemy >= this.timeToAdd)
	{
		for (var i = 0; i < 1; i++)
		{
			global.EnemyFactory.addEnemy(EnemyTypes.SIMPLE_ENEMY);
		}
		this.timerAddEnemy = 0;
	}
}
