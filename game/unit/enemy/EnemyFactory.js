/**
 * @author ProBigi
 */

function EnemyFactory()
{
	this.enemies = [];
	this.enemiesCont = new createjs.Container();
}

EnemyFactory.prototype.addEnemy = function(type)
{
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
	}
	if (enemy)
	{
		enemy.init();
		
		this.enemiesCont.addChild(enemy);
		this.enemies.push(enemy);
	}
}

EnemyFactory.prototype.removeEnemy = function(enemy)
{
	//TODO удаление enemy
}
