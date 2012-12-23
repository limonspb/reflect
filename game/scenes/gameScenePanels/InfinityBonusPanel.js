InfinityBonusPanel = function(){
	this.update();	
}

InfinityBonusPanel.prototype.show = function(){
	$('#infinityBonusPanel').fadeIn();
}

InfinityBonusPanel.prototype.hide = function(){
	$('#infinityBonusPanel').fadeOut();
}

InfinityBonusPanel.prototype.update = function(){
	$('#teleportCount').text(global.hero.teleportCount.toString());
	$('#regenerationCount').text(global.hero.regenerationCount.toString());
}
