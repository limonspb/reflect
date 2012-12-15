/**
 * @author ProBigi
 */


function SimpleUnit()
{
	SimpleUnit.superclass.constructor.apply(this);
	
	this.health = SimpleUnit.superclass.health;
	this.speed = SimpleUnit.superclass.speed;
	this.rotationSpeed = SimpleUnit.superclass.rotationSpeed;
	this.view = SimpleUnit.superclass.view;
	
	this.damage = SimpleUnit.superclass.damage;
	this.bulletType = SimpleUnit.superclass.bulletType;
	this.bulletRespawn = SimpleUnit.superclass.bulletRespawn;
	this.range = SimpleUnit.superclass.range;
}

extend(SimpleUnit,EnemyUnit);



