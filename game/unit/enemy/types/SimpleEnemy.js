/**
 * @author ProBigi
 */


function SimpleEnemy()
{
	SimpleEnemy.superclass.constructor.apply(this);
	
	this.initView();
}

extend(SimpleEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
SimpleEnemy.prototype.initView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("blue").drawRect ( -20 , -20 , 40 , 40 );
	
	this.addChild(this.view);
	
	this.speed = 60;
	this.rotationSpeed = 60;
	this.health = 10;
	this.damage = 15;
	this.bulletRespawn = 1000;
	//this.bulletType = ;
	this.range = 1000;
}


SimpleEnemy.prototype.move = function (elapsedTime)
{
	this.rotation = this.getAngleToUnit.apply(this, [global.hero]);
	
	this.angle = this.rotation/180 * Math.PI;
	
	this.x += this.speed*Math.cos(this.angle)*elapsedTime/1000;
	this.y += this.speed*Math.sin(this.angle)*elapsedTime/1000;
}

SimpleEnemy.prototype.shoot = function ()
{
	
}

