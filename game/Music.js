Music = function(){
	this.M = [];
	this.M[0] = document.getElementById('menu_audio');
	this.M[1] = document.getElementById('game_audio');
	this.current = 0;
	this.mute = true;
}

Music.prototype.play = function(n){
	this.current = n;
	for (var i=0; i<2; i++){
		this.M[i].pause();
		if (this.M[i].currentTime!=0){
			this.M[i].currentTime = 0;			
		}
	}
	if (!this.mute){
		this.M[n].play();	
	}
	
	
}


Music.prototype.stopAll = function(){
	for (var i=0; i<2; i++){
		this.M[i].pause();
		this.M[i].currentTime=0;		
	}
}

Music.prototype.setPlay = function(bool){
	if (bool != this.mute) return;
	this.mute = !bool;
	if (bool){
		this.play(this.current);
	}else{
		this.stopAll();
	}
}

Music.prototype.setVolume = function(v){
	for (var i=0; i<2; i++){
		this.M[i].volume = v;
				
	}	
}
