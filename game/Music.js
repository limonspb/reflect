Music = function(){
	this.mus;
}

Music.prototype.play = function(){
	this.mus = createjs.SoundJS.play("mus1", createjs.SoundJS.INTERRUPT_NONE);
	this.nowPlaying = 0;
	
	this.mus.onComplete = this.songComplete;

}

Music.prototype.songComplete = function(i){
	var id = "";
	if (global.music.nowPlaying == 0){
		id = "mus2";
		global.music.nowPlaying = 1;
	}else{
		id = "mus1";
		global.music.nowPlaying = 0;
	}
	global.music.mus = createjs.SoundJS.play(id, createjs.SoundJS.INTERRUPT_NONE);	
	global.music.mus.onComplete = global.music.songComplete;
}

Music.prototype.setPlay = function(toplay){	
	if (toplay){
		this.mus.play();
	}else{
		this.mus.stop();	
	}	
}
