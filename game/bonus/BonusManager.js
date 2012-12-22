/**
 * Менеджер управления Бонусами
 * @author ProBigi
 */

function BonusManager()
{
	this.bonuses = [];
	this.bonusesCont = new createjs.Container();
	
	
	this.bonusTime = 0;
}

BonusManager.prototype.addBonus = function(type, x, y)
{
	
	if (this.bonuses.length >= 1) { return; }
	
	var bonus;
	switch(type)
	{
		case BonusTypes.SMALL_MED_KIT:
			bonus = new SmallMedKitBonus();
			break;
		case BonusTypes.MEDIUM_MED_KIT:
			bonus = new MediumMedKitBonus();
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
	//TODO определить отдельным методом. Появление первого типа бонусов
	
	this.checkPickUp()
}

/**
 * Выпадение бонусов с типов SMALL_MED_KIT
 * @param {Number} elapsedTime
 */
BonusManager.prototype.smallMedkitUpdate = function(elapsedTime)
{
	this.bonusTime += elapsedTime;
	if (this.bonusTime >= 1000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		this.addBonus(BonusTypes.SMALL_MED_KIT, x, y);
		this.bonusTime = 0;
	}
}

BonusManager.prototype.checkPickUp = function()
{
	var len = this.bonuses.length;
	
	for (var i = 0; i < len; i++)
	{
		var bonus = this.bonuses[i];
		
		if (getDistanceToObject(bonus, global.hero) <= bonus.width)
		{
			console.log("HIT TEST BONUS " + i);
			bonus.alpha = 0.2;
			
			bonus.pickUp();
			break;
		}
	}
}
