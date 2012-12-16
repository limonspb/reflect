/**
 * @author ProBigi
 */


function BonusFactory()
{
	this.bonuses = [];
	this.bonusesCont = new createjs.Container();
}

BonusFactory.prototype.addBonus = function(type, x, y)
{
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

BonusFactory.prototype.removeBonus = function(bonus)
{
	var index = this.bonuses.indexOf(bonus,0);
	
	if (index != -1)
	{
		//TODO clear Bonus
		if (this.bonusesCont.contains(bonus)) { this.bonusesCont.removeChild(bonus); }
		this.bonuses.splice(index, 1);
	}
	
}
