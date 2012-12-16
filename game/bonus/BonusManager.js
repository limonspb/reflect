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
	
	
	//TODO определить отдельным методом. Появление первого типа бонусов
	this.bonusTime += elapsedTime;
	if (this.bonusTime >= 2000)
	{
		global.BonusFactory.addBonus(BonusTypes.SMALL_MED_KIT, Math.random()*global.levelWidth, Math.random()*global.levelHeight);
		this.bonusTime = 0;
	}
}
