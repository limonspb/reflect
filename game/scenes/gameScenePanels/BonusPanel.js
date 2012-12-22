BonusPanel = function(){
	this.changeBonus(1,1);
	this.addBonus(2,1);
	this.delBonus(3);
	
}

BonusPanel.prototype.show = function(){
	$('#bonusPanel').fadeIn();
}

BonusPanel.prototype.hide = function(){
	$('#bonusPanel').fadeOut();
}

BonusPanel.prototype.changeBonus = function(n,bonus){ //MAX
	$('#bonusPanel').append('change: '+n.toString()+'<br>');
}

BonusPanel.prototype.addBonus = function(n,bonus){//MAX
	$('#bonusPanel').append('add: '+n.toString()+'<br>');	
}

BonusPanel.prototype.delBonus = function(n){//MAX
	$('#bonusPanel').append('del: '+n.toString()+'<br>');	
}