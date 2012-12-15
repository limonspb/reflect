/**
 * @author ProBigi
 */


function EnemyUnit()
{
	EnemyUnit.superclass.constructor.apply(this);
	
	this.health = EnemyUnit.superclass.health;
	this.speed = EnemyUnit.superclass.speed;
	this.rotationSpeed = EnemyUnit.superclass.rotationSpeed;
	this.view = EnemyUnit.superclass.view;
	
	this.damage;
	this.bulletType;
	this.bulletRespawn;
	this.range;
}

extend(EnemyUnit,BaseUnit);


EnemyUnit.prototype.move = function ()
{
	
}

EnemyUnit.prototype.shoot = function ()
{
	
}
