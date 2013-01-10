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
		var st_sex = this.sex.toString();
		if (st_sex.length == 1){
			st_sex = '0'+st_sex;
		}
		var st_min = this.mins.toString();		
		if (st_min.length == 1){
			st_min = '0'+st_min;
		}
		$('#currentTime').text(st_min+":"+st_sex);		
	}
	
	if (this.points!=global.points){
		this.points = global.points;
		$('#currentPoints').text(Math.floor(global.points).toString());		
	}
	
}
