function Camera(){
	this.lookAtX = 0;
	this.lookAtY = 0;
}

Camera.prototype.applyTransform = function(){
	global.stage.setTransform(-this.lookAtX, -this.lookAtY);
}

Camera.prototype.setLookAt = function(a_x,a_y){
	if (a_x < global.gameWidth/2){
		this.lookAtX = 0;	
	}else
	if (a_x > global.levelWidth - global.gameWidth/2){		
		this.lookAtX = global.levelWidth - global.gameWidth;		
	}else{
		this.lookAtX = -global.gameWidth/2+a_x;			
	}
	
	

	if (a_y < global.gameHeight/2){
		this.lookAtY = 0;	
	}else
	if (a_y > global.levelHeight - global.gameHeight/2){
		this.lookAtY = global.levelHeight - global.gameHeight;	
	}else{
		this.lookAtY = -global.gameHeight/2+a_y;
	}
	
	
	
	
	
}

global.camera = new Camera();
