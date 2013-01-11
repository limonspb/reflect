function BaseUnit()
{
	BaseUnit.superclass.constructor.apply(this);
	
	this.MAX_HEALTH;
	this.health;
	this.speed;
	this.rotationSpeed;
	this.view;
	this.width;
	this.height;
	this.size;
	
	this.bullet;
	
	this.stopUnit = false;
	this.points = 0;
}

extend(BaseUnit, createjs.Container);

BaseUnit.prototype.move = function(elapsedTime) { }
BaseUnit.prototype.initView = function() { }
BaseUnit.prototype.initOptions = function() { }
BaseUnit.prototype.getAngleToObject = function(object) {
	this.dx = this.x - object.x;
	this.dy = this.y - object.y;
	
	this.angle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	
	return (180 + this.angle);
}

BaseUnit.prototype.checkHitBullet = function()
{
	var len = global.BulletFactory.bullets.length;
	
	for (var i = 0; i < len; i++)
	{
		var bull = global.BulletFactory.bullets[i];
		
		if (bull == this.bullet) { continue; }
		if (bull == this.bullet2) { continue; }
		
		if (Math.abs(this.x - bull.x) >= this.size || Math.abs(this.y - bull.y) >= this.size) { continue; }
		
		if (getDistanceToObject(this, bull) <= this.size*0.7)
		{
			//console.log("HIT TEST BULLET " + i);
			
			//Without friendly fire
			if (this == global.hero)
			{
				if (!bull.isMy)
				{
					global.BulletFactory.removeBullet(i);
					len--;
					i--;
					
					this.setUnitDamage(this, bull.damage);
				}
			} else if (!bull.fireMode) {
				var dam;
				if (!bull.isMy)
				{
					dam = bull.damage/4;
				} else {
					dam = bull.damage;
				}
				global.BulletFactory.removeBullet(i);
				len--;
				i--;
				
				this.setUnitDamage(this, dam);
			} else if (bull.fireMode) {
				this.setUnitDamage(this, this.health);	
			}
			
			//FriendlyFireMode
			/*global.BulletFactory.removeBullet(i);
			len--;
			i--;
			
			this.setUnitDamage(this, bull.damage);*/
		}
		
	}
	
}

BaseUnit.prototype.setUnitDamage = function(unit, damage)
{
	playDamage();
	if (unit == global.hero)
	{
		//if (!unit.fullProtectMode) { global.hero.makeDamage(damage); }
		//return;
		if (unit.fullProtectMode) { return; }
	}
	//unit.health -= damage;
	unit.makeDamage(damage);
	
	unit.checkDestroy();
}

BaseUnit.prototype.checkDestroy = function()
{
	if (this.health <= 0)
	{
		var index = global.EnemyManager.enemies.indexOf(this);
		if (index != -1)
		{
			global.EnemyManager.blow(this);
		}
	}
}

BaseUnit.prototype.clearData = function()
{
	//TODO clearUnitData
}
