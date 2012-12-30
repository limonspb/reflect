function playSound(v,level){
	if(!level) level = 1;
	if(global.volumePanel.sound){
		createjs.SoundJS.play(v, createjs.SoundJS.INTERRUPT_NONE, 0, 0, false, level);		
	}
}

function playRicochet(){
	var n = randomNumber(1,3);	
	playSound("ricochet"+n.toString());
}

function playFire(){
	var n = randomNumber(1,7);	
	playSound("fire"+n.toString());
}

function playExp(){
	var n = randomNumber(1,7);	
	playSound("exp"+n.toString());
}

function playDamage(){
	playSound("damage");
}
