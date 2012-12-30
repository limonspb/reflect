VolumePanel = function(){
	this.sound = false;
	this.music = false;	
	$('#sound_div').click(this.soundDivClick);
	$('#music_div').click(this.musicDivClick);
	this.getSavedValues();
	this.setControls();
	global.music.setVolume(0.5);
	global.music.setPlay(this.music);
	createjs.SoundJS.setMute(!this.sound);
	
}

VolumePanel.prototype.setControls = function(){
	if (this.sound){
		$('#mute_sound_img').fadeOut();
	}else{
		$('#mute_sound_img').fadeIn();		
	}		
	
	if (this.music){
		$('#mute_music_img').fadeOut();
	}else{
		$('#mute_music_img').fadeIn();		
	}
}


VolumePanel.prototype.getSavedValues = function(){
	if (localStorage.getItem('hahaton_reflect_sound')=='false'){
		this.sound = false;
	}else{
		this.sound = true;		
	}
	if (localStorage.getItem('hahaton_reflect_music')=='false'){
		this.music = false;
	}else{
		this.music = true;
	}
}

VolumePanel.prototype.saveValues = function(){
	localStorage.setItem('hahaton_reflect_sound',this.sound);
	localStorage.setItem('hahaton_reflect_music',this.music);
}

VolumePanel.prototype.soundDivClick = function(){
	global.volumePanel.sound = !global.volumePanel.sound;
	global.volumePanel.setControls();
	global.volumePanel.saveValues();
	createjs.SoundJS.setMute(!global.volumePanel.sound);
}
VolumePanel.prototype.musicDivClick = function(){
	global.volumePanel.music = !global.volumePanel.music;
	global.volumePanel.setControls();
	global.volumePanel.saveValues();	
	global.music.setPlay(global.volumePanel.music);
}

VolumePanel.prototype.setVolume = function(v){
	createjs.SoundJS.setMasterVolume(v/100);
	global.music.setVolume(v/100);
}

