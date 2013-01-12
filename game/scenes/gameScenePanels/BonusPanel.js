BonusPanel = function(){
	
	this.gunTr = $('#gunTr');
	this.speedUpTR = $('#speedUpTR');
	this.freezTr = $('#freezTr');
	this.enemyScaleTr = $('#enemyScaleTr');
	this.protectionTr = $('#protectionTr');
	this.shieldScaleTr = $('#shieldScaleTr');
	this.x2DamageTr = $('#x2DamageTr');

	this.s_gunTr = $('#gunSec');
	this.s_speedUpTR = $('#speedUpSec');
	this.s_freezTr = $('#freezSec');
	this.s_enemyScaleTr = $('#enemyScaleSec');
	this.s_protectionTr = $('#protectionSec');
	this.s_shieldScaleTr = $('#shieldScaleSec');
	this.s_x2DamageTr = $('#x2DamageSec');

	
	this.divs = [];
	this.divsSec = [];
	this.divs[0] = this.speedUpTR;
	this.divs[1] = this.freezTr;
	this.divs[2] = this.enemyScaleTr;
	this.divs[3] = this.protectionTr;
	this.divs[4] = this.shieldScaleTr;
	this.divs[5] = this.x2DamageTr;
	this.divs[6] = this.gunTr;
	
	this.divsSec[0] = this.s_speedUpTR;
	this.divsSec[1] = this.s_freezTr;
	this.divsSec[2] = this.s_enemyScaleTr;
	this.divsSec[3] = this.s_protectionTr;
	this.divsSec[4] = this.s_shieldScaleTr;
	this.divsSec[5] = this.s_x2DamageTr;
	this.divsSec[6] = this.s_gunTr;
	
	this.values = [];
	
	
	for (var i=0; i<7; i++){
		this.divs[i].showed = false;
		this.divs[i].fadeOut();
		this.values[i] = 0;
	}	
}

BonusPanel.prototype.show = function(){
	$('#bonusPanel').fadeIn();
}

BonusPanel.prototype.hide = function(){
	$('#bonusPanel').fadeOut();
}

BonusPanel.prototype.getBonusTime = function(i){
	var r = 0;
	switch (i){
		case 0:
			r = global.hero.speedTime
			break
		case 1:
			r = global.EnemyManager.freezTime			
			break
		case 2:
			r = global.EnemyManager.enemyScaleTime
			break
		case 3:
			r = global.hero.fullProtectTime
			break
		case 4:
			r = global.hero.shieldScaleTime
			break
		case 5:
			r = global.BulletFactory.doubleDamageTime
			break
		case 6:
			r = global.hero.gunModeTime
			break
		default:
			r = 0;
	}
	if (r<0) r = 0;
	return r;
}

BonusPanel.prototype.update = function(){
//	this.speedyMode = false;
//	this.speedTime;
	var temp = 0;
	for (var i=0; i<7; i++){
		temp = this.getBonusTime(i);			
		if (temp!=0){			
			if (this.divs[i].showed==false){
				this.divs[i].showed = true;
				this.divs[i].fadeIn();								
			}
			temp = Math.floor(temp/1000);
			if (temp!=this.values[i]){
				this.values[i] = temp;
				this.divsSec[i].text(temp.toString());			
			}
		}else{			
			if (this.divs[i].showed==true){
				this.divs[i].showed = false;
				this.divs[i].fadeOut();				
			}
		}
	}
	
	$('#bonusPanel').css("margin-top",(-$("#bonusPanel").height()).toString() + "px");
}
