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
	
}

/**
 * Выпадение бонусов с типов SMALL_MED_KIT
 * @param {Number} elapsedTime
 */
BonusManager.prototype.smallMedkitUpdate = function(elapsedTime)
{
	this.bonusTime += elapsedTime;
	if (this.bonusTime >= 2000)
	{
		var x = global.camera.lookAtX + Math.random() * global.gameWidth;
		var y = global.camera.lookAtY + Math.random() * global.gameHeight;
		
		global.BonusFactory.addBonus(BonusTypes.SMALL_MED_KIT, x, y);
		this.bonusTime = 0;
	}
}
