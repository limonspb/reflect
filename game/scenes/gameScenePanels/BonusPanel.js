BonusPanel = function(){
	$('#speedUpTR').fadeOut();
	$('#freezTr').fadeOut();
	$('#enemyScaleTr').fadeOut();
	$('#protectionTr').fadeOut();
	$('#shieldScaleTr').fadeOut();
	$('#x2DamageTr').fadeOut();
	
}

BonusPanel.prototype.show = function(){
	$('#bonusPanel').fadeIn();
}

BonusPanel.prototype.hide = function(){
	$('#bonusPanel').fadeOut();
}

BonusPanel.prototype.update = function(){
//	this.speedyMode = false;
//	this.speedTime;
	if (global.hero.speedyMode){
		$('#speedUpTR').fadeIn();
		$('#speedUpSec').text(Math.floor(global.hero.speedTime/1000).toString());
	}else{
		$('#speedUpTR').fadeOut();		
	}
	
	if (global.EnemyManager.freezTime >0){
		$('#freezTr').fadeIn();
		$('#freezSec').text(Math.floor(global.EnemyManager.freezTime/1000).toString());		
	}else{
		$('#freezTr').fadeOut();		
	}
	
	if (global.BulletFactory.doubleDamageTime >0){
		$('#x2DamageTr').fadeIn();
		$('#x2DamageSec').text(Math.floor(global.BulletFactory.doubleDamageTime/1000).toString());		
	}else{
		$('#x2DamageTr').fadeOut();		
	}
	
	if(global.hero.shieldScaleTime > 0){
		$('#shieldScaleTr').fadeIn();
		$('#shieldScaleSec').text(Math.floor(global.hero.shieldScaleTime/1000).toString());		
	}else{
		$('#shieldScaleTr').fadeOut();		
	}
	
	if(global.hero.fullProtectTime > 0){
		$('#protectionTr').fadeIn();
		$('#protectionSec').text(Math.floor(global.hero.fullProtectTime/1000).toString());			
	}else{
		$('#protectionTr').fadeOut();		
	}
	
	if(global.EnemyManager.enemyScaleTime > 0){
		$('#enemyScaleTr').fadeIn();
		$('#enemyScaleSec').text(Math.floor(global.EnemyManager.enemyScaleTime/1000).toString());		
	}else{
		$('#enemyScaleTr').fadeOut();		
	}	
}
