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
	this.smallMedkitUpdate(elapsedTime);
	this.mediumMedkitUpdate(elapsedTime);
	this.plusToLifeUpdate(elapsedTime);
	this.freezUpdate(elapsedTime);
	this.doubleDamageUpdate(elapsedTime);
	this.speedUpUpdate(elapsedTime);
	this.regenerationUpdate(elapsedTime);
	this.teleportUpdate(elapsedTime);
	this.enemyScaleUpdate(elapsedTime);
	this.shieldScaleUpdate(elapsedTime);
	this.fullProtectUpdate(elapsedTime);
	
	
	this.checkPickUp()
}

/**
 * Выпадение бонусов с типом SMALL_MED_KIT.
 * Выпадает каждые 15-45сек, если количество жизней меньше 80% от максимального.
 */
BonusManager.prototype.smallMedkitUpdate = function(elapsedTime)
{
	if (global.hero.health/global.hero.MAX_HEALTH > 0.8) { return; }
	
	this.smallMedKitBonusTime += elapsedTime;
	
	if (this.smallMedKitBonusTime >= 8000 + Math.random()*30000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SMALL_MED_KIT, x, y);
		this.smallMedKitBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом MEDIUM_MED_KIT.
 * Выпадает каждые 5-40сек, если количество жизней меньше 50% от максимального.
 */
BonusManager.prototype.mediumMedkitUpdate = function(elapsedTime)
{
	if (global.hero.health/global.hero.MAX_HEALTH > 0.5) { return; }
	
	this.mediumMedKitBonusTime += elapsedTime;
	
	if (this.mediumMedKitBonusTime >= 5000 + Math.random()*20000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.MEDIUM_MED_KIT, x, y);
		this.mediumMedKitBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом PLUS_TO_LIFE.
 * Выпадает каждые 20-60сек, повышает максимальный запас жизней на 10.
 */
BonusManager.prototype.plusToLifeUpdate = function(elapsedTime)
{
	this.plusToLifeBonusTime += elapsedTime;
	if (this.plusToLifeBonusTime >= 20000 + Math.random()*40000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.PLUS_TO_LIFE, x, y);
		this.plusToLifeBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом FREEZ.
 * Выпадает каждые 20-80сек, на время останавливает всех вражеских юнитов.
 */
BonusManager.prototype.freezUpdate = function(elapsedTime)
{
	this.freezBonusTime += elapsedTime;
	if (this.freezBonusTime >= 20000 + Math.random()*60000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.FREEZ, x, y);
		this.freezBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом DOUBLE_DAMAGE.
 * Выпадает каждые 10-110сек, при отражении щитом удваивает урон снарядов на определенное время.
 */
BonusManager.prototype.doubleDamageUpdate = function(elapsedTime)
{
	this.doubleDamageBonusTime += elapsedTime;
	if (this.doubleDamageBonusTime >= 10000 + Math.random()*100000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.DOUBLE_DAMAGE, x, y);
		this.doubleDamageBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом SPEED_UP.
 * Выпадает каждые 15-45сек, ускоряет в два раза движение персонажа.
 */
BonusManager.prototype.speedUpUpdate = function(elapsedTime)
{
	this.speedUpBonusTime += elapsedTime;
	if (this.speedUpBonusTime >= 15000 + Math.random()*30000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SPEED_UP, x, y);
		this.speedUpBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом REGENERATION.
 * Выпадает раз в 1-5сек после каждого 10го убитого врага, добавляет регенерацию жизней на 2.
 */
BonusManager.prototype.regenerationUpdate = function(elapsedTime)
{
	if (global.EnemyManager.totalEnemyKills == 0 || global.EnemyManager.totalEnemyKills%10 != 0) { return; } 
	
	this.regenerationBonusTime += elapsedTime;
	if (this.regenerationBonusTime >= 5000 + Math.random()*5000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.REGENERATION, x, y);
		this.regenerationBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом TELEPORT.
 * Выпадает раз в 1-20сек после каждого 8го убитого врага, добавляет возможность телепортироваться 1 раз за каждый такой бонус.
 */
BonusManager.prototype.teleportUpdate = function(elapsedTime)
{
	if (global.EnemyManager.totalEnemyKills == 0 || global.EnemyManager.totalEnemyKills%8 != 0) { return; } 
	
	this.teleportBonusTime += elapsedTime;
	if (this.teleportBonusTime >= 10000 + Math.random()*10000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.TELEPORT, x, y);
		this.teleportBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом ENEMY_SCALE.
 * Выпадает раз в 30-90сек, увеличивает размер всех монстров в 1.5 раза на время.
 */
BonusManager.prototype.enemyScaleUpdate = function(elapsedTime)
{
	this.enemyScaleBonusTime += elapsedTime;
	if (this.enemyScaleBonusTime >= 30000 + Math.random()*60000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.ENEMY_SCALE, x, y);
		this.enemyScaleBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом SHIELD_SCALE.
 * Выпадает раз в 15-45сек, увеличивает размер щита главного игрока в 1.5 раза на время.
 */
BonusManager.prototype.shieldScaleUpdate = function(elapsedTime)
{
	this.shieldScaleBonusTime += elapsedTime;
	if (this.shieldScaleBonusTime >= 15000 + Math.random()*45000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SHIELD_SCALE, x, y);
		this.shieldScaleBonusTime = 0;
	}
}

/**
 * Выпадение бонусов с типом FULL_PROTECT.
 * Выпадает раз в 15-75сек после каждого 10го убитого монстра, на время делает игрока неуязвимым к любым уронам.
 */
BonusManager.prototype.fullProtectUpdate = function(elapsedTime)
{
	if (global.EnemyManager.totalEnemyKills == 0 || global.EnemyManager.totalEnemyKills%5 != 0) { return; }
	
	this.fullProtectBonusTime += elapsedTime;
	if (this.fullProtectBonusTime >= 8000 + Math.random()*15000)
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
	
	//if (this.bonusesCont.parent) { this.bonusesCont.parent.removeChild(this.bonusesCont); }
}
