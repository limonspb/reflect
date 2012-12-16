/**
 * @author ProBigi
 */


function SimpleEnemy()
{
	SimpleEnemy.superclass.constructor.apply(this);
	
	this.health = SimpleEnemy.superclass.health;
	this.speed = SimpleEnemy.superclass.speed;
	this.rotationSpeed = SimpleEnemy.superclass.rotationSpeed;
	this.view = SimpleEnemy.superclass.view;
	
	this.damage = SimpleEnemy.superclass.damage;
	this.bulletType = SimpleEnemy.superclass.bulletType;
	this.bulletRespawn = SimpleEnemy.superclass.bulletRespawn;
	this.range = SimpleEnemy.superclass.range;
	
	this.initView();
}

extend(SimpleEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
SimpleEnemy.prototype.initView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("blue").drawRect ( -20 , -20 , 40 , 40 , 10 );
	
	this.addChild(this.view);
	
	this.speed = 60;
	this.rotationSpeed = 60;
	this.health = 10;
	this.damage = 15;
	this.bulletRespawn = 1000;
	//this.bulletType = ;
	this.range = 1000;
}


SimpleEnemy.prototype.move = function ()
{
	
}

SimpleEnemy.prototype.shoot = function ()
{
	
}

