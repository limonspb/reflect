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
	//TODO определить отдельным методом. Появление первого типа бонусов
	
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

BonusManager.prototype.checkPickUp = function()
{
	var len = this.bonuses.length;
	
	for (var i = 0; i < len; i++)
	{
		var bonus = this.bonuses[i];
		
		if (bonus.isPickuped) { return; }
		
		if (getDistanceToObject(bonus, global.hero) <= bonus.size*0.75)
		{
			//console.log("HIT TEST BONUS " + i);
			//bonus.alpha = 0.2;
			bonus.pickUp();
			break;
		}
	}
}
