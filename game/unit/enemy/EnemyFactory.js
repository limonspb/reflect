/**
 * @author ProBigi
 */

function EnemyFactory()
{
	
}

EnemyFactory.prototype.getEnemy = function(type)
{
	switch(type)
	{
		case EnemyTypes.SIMPLE_ENEMY:
			return new SimpleEnemy();
			break;
		case EnemyTypes.SIMPLE_ENEMY:
			//return new SimpleEnemy();
			break;
	}
}
