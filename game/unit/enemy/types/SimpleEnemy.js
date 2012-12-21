/**
 * @author ProBigi
 */


function SimpleEnemy()
{
	SimpleEnemy.superclass.constructor.apply(this);
	
}

extend(SimpleEnemy,EnemyUnit);


/**
 * Инициализация отображения юнита
 */
SimpleEnemy.prototype.initView = function ()
{
	this.view = new createjs.Shape();
	this.view.graphics.beginFill("blue").drawRect ( -25 , -20 , 40 , 40 );
	
	this.gun = new createjs.Shape();
    this.gun.graphics.setStrokeStyle(1, 'round', 'round');
    this.gun.graphics.beginStroke(('#000000'));
    this.gun.graphics.moveTo(0,0);
    this.gun.graphics.lineTo(20,0);
    this.gun.graphics.endStroke();
    this.gun.graphics.endFill();
	
	this.width = 40;
	this.height = 40;
	
	this.center = new createjs.Shape();
	this.center.graphics.beginFill("red").drawCircle ( 0 , 0 , 1 );
	
	this.view.cache(-20,-20,40,40);
	this.addChild(this.view);
	this.addChild(this.gun);
	this.addChild(this.center);
}

SimpleEnemy.prototype.initOptions = function ()
{
	this.speed = Math.random()*30 + 40;
	this.rotationSpeed = 200;
	this.health = 10;
	this.damage = 15;
	this.bulletRespawn = 1000;
	this.bulletType = BulletTypes.SHOT_GUN;
	this.minRange = 300;
	this.maxRange = 1000;
	
	
	this.velocity = new Vec2(-1,-2);
	this.disared = new Vec2(0,0);
	this.position = new Vec2(this.x, this.y);
	this.steering = new Vec2(0, 0);
	this.MAX_FORCE = 0.1;
	this.MAX_VELOCITY = 1;
	this.mass = 1000 +  Math.random() * 20;
	
	this.truncate(this.velocity, this.MAX_VELOCITY);
}

SimpleEnemy.prototype.move = function (elapsedTime)
{
	/*this.dist = this.getDistanceToObject(global.hero);
	
	var dx = 0;
	var dy = 0;
	
	if (!this.pauseMove(elapsedTime))
	{
		this.view.rotation = this.getAngleToObject(global.hero);
		
		this.angle = this.view.rotation/180 * Math.PI;
		dx = this.speed*Math.cos(this.angle)*elapsedTime/1000;
		dy = this.speed*Math.sin(this.angle)*elapsedTime/1000;
		
		if (this.getDistanceToObject(global.hero) <= this.minRange+5)
		{
			dx = 0;
			dy = 0;
		} 
		
		this.x += dx;
		this.y += dy;
	}*/
	
	this.update();
	
	this.gun.rotation += this.getRotation(this.gun)*elapsedTime/1000;
	
	this.respawnCount += elapsedTime;
	this.shoot();
}

SimpleEnemy.prototype.shoot = function ()
{
	if (this.respawnCount >= this.bulletRespawn)
	{
		if (this.dist <= this.maxRange && this.dist >= this.minRange)
		{
			//var angle = this.getAngleToObject(global.hero);
			this.bullet = global.BulletFactory.addBullet(this.bulletType, this.gun.rotation, this.x, this.y);
			
			this.respawnCount = 0;
		}
	}
}

SimpleEnemy.prototype.seek = function(target) {
	var tar = new Vec2(target.x,target.y);
	
	this.disared = tar.subtract(this.position);
	this.disared.normalize();
	this.disared.scaleBy(this.MAX_VELOCITY);
	
	var force = this.disared.subtract(this.velocity);
	
	return force;
}

SimpleEnemy.prototype.truncate = function(vector, max) {
	//done +
	
	var i = max / vector.length();
	
	i = i < 1.0 ? 1.0 : i;
	
	vector.scaleBy(i);
}

SimpleEnemy.prototype.update = function() {
	this.steering = this.seek(global.hero);
	
	this.truncate(this.steering, this.MAX_FORCE);
	this.steering.scaleBy(1 / this.mass);
	
	this.velocity = this.velocity.addV(this.steering);
	this.truncate(this.velocity, this.MAX_VELOCITY);
	
	this.position = this.position.addV(this.velocity);

	this.x = this.position.x;
	this.y = this.position.y;
	
	console.log(this.x, this.y);	
}
