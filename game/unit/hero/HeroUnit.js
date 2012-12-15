/**
 * @author ProBigi
 */


function HeroUnit()
{
	HeroUnit.superclass.constructor.apply(this);
	
	this.health = HeroUnit.superclass.health;
	this.speed = HeroUnit.superclass.speed;
	this.rotationSpeed = HeroUnit.superclass.rotationSpeed;
	this.view = HeroUnit.superclass.view;
	this.angle;
	
	this.LEFT = false;
	this.RIGHT = false;
	this.FORWARD = false;
	this.BACK = false;
	
	this.direction;
	
	this.setView();
}

extend(HeroUnit,BaseUnit);

HeroUnit.prototype.setView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("red").drawRoundRect ( -30 , -20 , 60 , 40 , 10 );
	
	
	this.addChild(this.view);
	
	this.rotationSpeed = 100;
}

HeroUnit.prototype.move = function (elapsedTime)
{
	this.speed = 0;
	if (this.FORWARD)
	{
		this.speed = 300;
		this.rotationSpeed = Math.abs(this.rotationSpeed);
	}
	else if (this.BACK)
	{
		this.speed = -100;
		this.rotationSpeed = -Math.abs(this.rotationSpeed);
	}
	
	if (this.LEFT)
	{
		this.rotation -= this.rotationSpeed*elapsedTime/1000;
	}
	else if (this.RIGHT)
	{
		this.rotation += this.rotationSpeed*elapsedTime/1000;
	}
	
	this.angle = this.rotation/180 * Math.PI;
	
	
	this.x += this.speed*Math.cos(this.angle)*elapsedTime/1000;
	this.y += this.speed*Math.sin(this.angle)*elapsedTime/1000;
}

HeroUnit.prototype.setDirectionMove = function(direction)
{
	this.direction = direction;
}
