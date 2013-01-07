LifePanel = function(){
	this.curLife;
	this.maxLife;	
	
	this.update();	
}

LifePanel.prototype.show = function(){
	$('#lifePanel').fadeIn();
}

LifePanel.prototype.hide = function(){
	$('#lifePanel').fadeOut();
}

LifePanel.prototype.update = function(){
	if (this.curLife != global.hero.health){
		this.curLife = global.hero.health;
		$('#currentLife').text(Math.ceil(this.curLife.toString()));		
	}
	
	if (this.maxLife != global.hero.MAX_HEALTH){
		this.maxLife = global.hero.MAX_HEALTH;
		$('#maxLife').text(Math.ceil(this.maxLife.toString()));		
	}
}


