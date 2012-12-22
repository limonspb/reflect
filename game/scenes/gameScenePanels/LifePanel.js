LifePanel = function(){
	
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