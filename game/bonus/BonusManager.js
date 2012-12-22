/**
 * Менеджер управления Бонусами
 * @author ProBigi
 */

function BonusManager()
{
	global.BonusFactory = new BonusFactory();
	
	
	this.bonusTime = 0;
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
		
		global.BonusFactory.addBonus(BonusTypes.SMALL_MED_KIT, x, y);
		this.bonusTime = 0;
	}
}

BonusManager.prototype.checkPickUp = function()
{
	var len = global.BonusFactory.bonuses.length;
	
	for (var i = 0; i < len; i++)
	{
		var bonus = global.BonusFactory.bonuses[i];
		
		//var pt = bonus.globalToLocal(bonus.x, bonus.y);
		
		
		
		//console.log(bonus.width, global.hero.width);
		
		//bonus.alpha = 1;
		
		
		
		if (getDistanceToObject(bonus, global.hero) <= bonus.width)
		{
			console.log("HIT TEST BONUS " + i);
			bonus.alpha = 0.2;
			
			bonus.pickUp();
			break;
		}
		
	}
}
