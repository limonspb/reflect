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
}

extend(EnemyUnit,BaseUnit);
