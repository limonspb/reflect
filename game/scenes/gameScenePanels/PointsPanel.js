PointsPanel = function(){
	this.update();	
}

PointsPanel.prototype.show = function(){
	$('#pointsPanel').fadeIn();
}

PointsPanel.prototype.hide = function(){
	$('#pointsPanel').fadeOut();
}

PointsPanel.prototype.update = function(){
	var mins = Math.floor(global.gameTime/1000 /60);
	var sex = Math.floor(global.gameTime/1000 % 60);
	$('#currentTime').text(mins.toString()+":"+sex.toString());
	$('#currentPoints').text(Math.floor(global.points).toString());
}
