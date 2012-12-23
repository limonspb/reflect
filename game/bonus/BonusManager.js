/**
 * Менеджер управления Бонусами
 * @author ProBigi
 */

function BonusManager()
{
	this.bonuses = [];
	this.bonusesCont = new createjs.Container();	
	
	
	this.smallMedKitBonusTime = 0;
	this.mediumMedKitBonusTime = 0;
	this.plusToLifeBonusTime = 0;
	this.freezBonusTime = 0;
	this.doubleDamageBonusTime = 0;
	this.speedUpBonusTime = 0;
	this.regenerationBonusTime = 0;
	this.teleportBonusTime = 0;
	this.enemyScaleBonusTime = 0;
	this.shieldScaleBonusTime = 0;
	this.fullProtectBonusTime = 0;
}

BonusManager.prototype.addBonus = function(type, x, y)
{
	//if (this.bonuses.length >= 1) { return; }
	
	var bonus;
	switch(type)
	{
		case BonusTypes.SMALL_MED_KIT:
			bonus = new SmallMedKitBonus();
			break;
		case BonusTypes.MEDIUM_MED_KIT:
			bonus = new MediumMedKitBonus();
			break;
		case BonusTypes.PLUS_TO_LIFE:
			bonus = new PlusToLifeBonus();
			break;
		case BonusTypes.FREEZ:
			bonus = new FreezBonus();
			break;
		case BonusTypes.DOUBLE_DAMAGE:
			bonus = new DoubleDamageBonus();
			break;
		case BonusTypes.SPEED_UP:
			bonus = new SpeedUpBonus();
			break;
		case BonusTypes.REGENERATION:
			bonus = new RegenerationBonus();
			break;
		case BonusTypes.TELEPORT:
			bonus = new TeleportBonus();
			break;
		case BonusTypes.ENEMY_SCALE:
			bonus = new EnemyScaleBonus();
			break;
		case BonusTypes.SHIELD_SCALE:
			bonus = new ShieldScaleBonus();
			break;
		case BonusTypes.FULL_PROTECT:
			bonus = new FullProtectionBonus();
			break;
	}
	if (bonus)
	{
		bonus.init(x,y);
		this.bonusesCont.addChild(bonus);
		this.bonuses.push(bonus);
	}
}

BonusManager.prototype.removeBonus = function(bonus)
{
	var index = this.bonuses.indexOf(bonus,0);
	
	if (index != -1)
	{
		//TODO clear Bonus
		if (this.bonusesCont.contains(bonus)) { this.bonusesCont.removeChild(bonus); }
		this.bonuses.splice(index, 1);
	}
	
}

BonusManager.prototype.update = function(elapsedTime)
{
	/*this.smallMedkitUpdate(elapsedTime);
	this.mediumMedkitUpdate(elapsedTime);
	this.plusToLifeUpdate(elapsedTime);
	this.freezUpdate(elapsedTime);*/
	this.doubleDamageUpdate(elapsedTime);
	/*this.speedUpUpdate(elapsedTime);
	this.regenerationUpdate(elapsedTime);
	this.teleportUpdate(elapsedTime);
	this.enemyScaleUpdate(elapsedTime);
	this.shieldScaleUpdate(elapsedTime);
	this.fullProtectUpdate(elapsedTime);*/
	
	
	this.checkPickUp()
}

/**
 * Выпадение бонусов с типов SMALL_MED_KIT
 * @param {Number} elapsedTime
 */
BonusManager.prototype.smallMedkitUpdate = function(elapsedTime)
{
	this.smallMedKitBonusTime += elapsedTime;
	if (this.smallMedKitBonusTime >= 1000 + Math.random()*2000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SMALL_MED_KIT, x, y);
		this.smallMedKitBonusTime = 0;
	}
}

BonusManager.prototype.mediumMedkitUpdate = function(elapsedTime)
{
	this.mediumMedKitBonusTime += elapsedTime;
	if (this.mediumMedKitBonusTime >= 1000 + Math.random()*2000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.MEDIUM_MED_KIT, x, y);
		this.mediumMedKitBonusTime = 0;
	}
}

BonusManager.prototype.plusToLifeUpdate = function(elapsedTime)
{
	this.plusToLifeBonusTime += elapsedTime;
	if (this.plusToLifeBonusTime >= 1000 + Math.random()*2000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.PLUS_TO_LIFE, x, y);
		this.plusToLifeBonusTime = 0;
	}
}

BonusManager.prototype.freezUpdate = function(elapsedTime)
{
	this.freezBonusTime += elapsedTime;
	if (this.freezBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.FREEZ, x, y);
		this.freezBonusTime = 0;
	}
}

BonusManager.prototype.doubleDamageUpdate = function(elapsedTime)
{
	this.doubleDamageBonusTime += elapsedTime;
	if (this.doubleDamageBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.DOUBLE_DAMAGE, x, y);
		this.doubleDamageBonusTime = 0;
	}
}

BonusManager.prototype.speedUpUpdate = function(elapsedTime)
{
	this.speedUpBonusTime += elapsedTime;
	if (this.speedUpBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SPEED_UP, x, y);
		this.speedUpBonusTime = 0;
	}
}

BonusManager.prototype.regenerationUpdate = function(elapsedTime)
{
	this.regenerationBonusTime += elapsedTime;
	if (this.regenerationBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.REGENERATION, x, y);
		this.regenerationBonusTime = 0;
	}
}

BonusManager.prototype.teleportUpdate = function(elapsedTime)
{
	this.teleportBonusTime += elapsedTime;
	if (this.teleportBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.TELEPORT, x, y);
		this.teleportBonusTime = 0;
	}
}

BonusManager.prototype.enemyScaleUpdate = function(elapsedTime)
{
	this.enemyScaleBonusTime += elapsedTime;
	if (this.enemyScaleBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.ENEMY_SCALE, x, y);
		this.enemyScaleBonusTime = 0;
	}
}

BonusManager.prototype.shieldScaleUpdate = function(elapsedTime)
{
	this.shieldScaleBonusTime += elapsedTime;
	if (this.shieldScaleBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SHIELD_SCALE, x, y);
		this.shieldScaleBonusTime = 0;
	}
}

BonusManager.prototype.fullProtectUpdate = function(elapsedTime)
{
	this.fullProtectBonusTime += elapsedTime;
	if (this.fullProtectBonusTime >= 1000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.FULL_PROTECT, x, y);
		this.fullProtectBonusTime = 0;
	}
}

BonusManager.prototype.checkPickUp = function()
{
	var len = this.bonuses.length;
	
	for (var i = 0; i < len; i++)
	{
		var bonus = this.bonuses[i];
		
		if (bonus.isPickuped) { return; }
		
		if (getDistanceToObject(bonus, global.hero) <= bonus.size*0.75)
		{
			bonus.pickUp();
			break;
		}
	}
}

BonusManager.prototype.clearAll = function(elapsedTime)
{
	for (var i = 0; i < this.bonuses.length; i++)
	{
		if (!this.bonuses[i]) { continue; }
		
		if (this.bonusesCont.contains(this.bonuses[i])) { this.bonusesCont.removeChild(this.bonuses[i]) }
		this.bonuses[i].clearData();
		this.bonuses[i] = null;
	}
	this.bonuses.length = 0;
	
	if (this.bonusesCont.parent) { this.bonusesCont.parent.removeChild(this.bonusesCont); }
}
