InfinityBonusPanel = function(){
	this.update();
	this.teleportCount = 1000000;
	this.regenerationCount = 10000000;
}

InfinityBonusPanel.prototype.show = function(){
	$('#infinityBonusPanel').fadeIn();
}

InfinityBonusPanel.prototype.hide = function(){
	$('#infinityBonusPanel').fadeOut();
}

InfinityBonusPanel.prototype.update = function(){
	if (this.regenerationCount!=global.hero.regenerationCount){
		this.regenerationCount = global.hero.regenerationCount;
		$('#regenerationCount').text(global.hero.regenerationCount.toString());
	}
	
	if(this.teleportCount!=global.hero.teleportCount){
		this.teleportCount!=global.hero.teleportCount;
		$('#teleportCount').text(global.hero.teleportCount.toString());
	}
}
