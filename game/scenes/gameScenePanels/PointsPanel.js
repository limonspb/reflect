PointsPanel = function(){
	this.mins = 0;
	this.sex = 0;	
	this.points  = 0;
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
	
	if ((mins!=this.mins)||(sex!=this.sex)){
		this.mins = mins;
		this.sex = sex;
		$('#currentTime').text(mins.toString()+":"+sex.toString());
	}
	
	if (this.points!=global.points){
		this.points = global.points;
		$('#currentPoints').text(Math.floor(global.points).toString());		
	}
	
}
