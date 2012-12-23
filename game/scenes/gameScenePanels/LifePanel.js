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

LifePanel.prototype.setMaxLife = function(value){
	$('#maxLife').text(value.toString());
}

LifePanel.prototype.setCurLife = function(value){
	$('#currentLife').text(value.toString());
}

LifePanel.prototype.updateValues = function(){
	this.curLife = global.hero.health;
	this.maxLife = global.hero.MAX_HEALTH;
}

LifePanel.prototype.updateView = function(){
	$('#currentLife').text(this.curLife.toString());	
	$('#maxLife').text(this.maxLife.toString());
}


LifePanel.prototype.update = function(){
	this.updateValues();	
	this.updateView();	
}
