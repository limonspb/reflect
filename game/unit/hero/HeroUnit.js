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
	
	
	this.initView();
}

extend(HeroUnit,BaseUnit);

/**
 * Инициализация отображения юнита
 */
HeroUnit.prototype.initView = function ()
{
	this.view = new createjs.Container();
	
	
	this.body = new createjs.Shape();
	this.body.graphics.beginFill("red").drawRect ( -20 , -20 , 40 , 40 , 10 );
	
	this.sheild = new createjs.Shape();
	this.sheild.graphics.beginFill("green").drawRect ( 25 , -25 , 10 , 50 , 5 );
	
	this.addChild(this.body);
	
	this.addChild(this.sheild);
	
	//this.addChild(this.view);
	
	this.rotationSpeed = 100;
	//this.speed = 500;
}

/**
 * Поворот щита относительно мыши
 */
HeroUnit.prototype.mouseMove = function (event) {
	
	this.dx = this.x - event.pageX - global.camera.lookAtX;
	this.dy = this.y - event.pageY - global.camera.lookAtY;
	
	//console.log("THIS " + this.x, this.y);
	//console.log("CLIENT " + event.pageX, event.pageY);
	
	this.angle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	this.sheild.rotation = 180 + this.angle - this.rotation;
}


/**
 * Движение юнита
 * @param {Number} elapsedTime	время прошедшее с последнего тика
 */
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
