Preloader = function(){
	this.manifest = [];
	
	this.imgs = {};	

	this.initConstants();

	//createjs.FlashPlugin.BASE_PATH = "lib/srcsound/soundjs/";
	if (!createjs.SoundJS.checkPlugin(true)){
		alert('sound problems');
	}	
	createjs.SoundJS.setMasterVolume(0.5);
	
	this.pr = new createjs.PreloadJS();	
	this.pr.installPlugin(createjs.SoundJS);		
	this.pr.owner = this;
	this.pr.onFileLoad = this.onFileLoad; 
	this.pr.onProgress = this.onProgress;
	this.onComplete = null;

	this.pr_error = new createjs.PreloadJS();	
	this.pr_error.onFileLoad = this.onFileLoad; 
	this.pr_error.installPlugin(createjs.SoundJS);		
	this.pr_error.owner = this;	
	
	this.onProgress = null;
	this.errored = [];
	
	//this.pr.onFileProgress = handleFileProgress;
	this.pr.onError = function(e){
		global.preloader.errored.push(e);
		log(e);
	}
	//this.pr.setMaxConnections(1);
	
	
	this.pr.onComplete = function(event){
		if (event.target.owner.errored.length !=0){
			event.target.owner.pr_error.loadManifest(event.target.owner.errored,true);			
		}else{
			event.target.owner.pr_error.onComplete(event);
		}
	}
	
	this.pr_error.onComplete = function(event){
		if(event.target.owner.onComplete){
			$("#preloader").fadeOut();
			event.target.owner.onComplete();					
		}
	};
	
				
};


Preloader.prototype.onFileLoad = 	function(event){
		
		if (event.type == "image"){
			event.target.owner.imgs[event.id] = event.result;	
		}else{
			//alert("sound loaded");
		}
		
		
};



Preloader.prototype.go = function(){	
	this.pr.loadManifest(this.manifest,true);	
};

Preloader.prototype.onProgress = function(event){
	var progress = 0;
	progress = event.target.progress;
	$("#bar").width(progress*400);
};




Preloader.prototype.addImage = function(src, name){	
	this.manifest.push({src:src, id:name, data:1});
}

Preloader.prototype.addSound = function(src,name,times){	
	this.manifest.push({src:src+'.mp3|'+src+'.ogg',id:name, data:times});
	//alert(this.manifest[this.manifest.length-1].src);
}

Preloader.prototype.initConstants = function()
{
   this.addSound("sound/phh","phh",2);
   this.addSound("sound/menu/MenuButtonBack","menu_back",2);
   this.addSound("sound/menu/MenuButtonForward","menu_forward",2);
   this.addSound("sound/menu/hover","hover",2);
   //this.addSound("sound/game/exp/1","hover",10);
   
   this.addSound("sound/game/ricochet/r1","ricochet1",3);
   this.addSound("sound/game/ricochet/r2","ricochet2",3);
   this.addSound("sound/game/ricochet/r3","ricochet3",3);
   
   for (var i=1; i<8; i++){
	   this.addSound("sound/game/fire/"+i.toString(),"fire"+i.toString(),5);
	    	
   }
   for (var i=1; i<8; i++){
	   this.addSound("sound/game/exp/"+i.toString(),"exp"+i.toString(),2);
	   	
   }
   
   this.addSound("sound/game/damage/1","damage",3);
	
	
	
	
	
   
   this.addImage("img/back/pattern.png","pattern");
   for (var i=1; i <= 15; i++){
	   this.addImage("img/back/cloud_"+ i.toString() + ".png","cloud_"+i.toString());   	
   }
   for (var i=1; i <= 14; i++){
	   this.addImage("img/back/line_"+ i.toString() + ".png","line_"+i.toString());   	
   }
   
   this.addImage("img/back/big_1.png","big_1");
   this.addImage("img/back/big_2.png","big_2");
   this.addImage("img/back/big_3.png","big_3");
   this.addImage("img/back/big_4.png","big_4");
   this.addImage("img/back/big_5.png","big_5");
   this.addImage("img/back/big_6.png","big_6");
   this.addImage("img/back/big_7.png","big_7");
   this.addImage("img/back/lit_mount_1.png","lit_mount_1");
   this.addImage("img/back/lit_mount_2.png","lit_mount_2");
   this.addImage("img/back/lit_mount_3.png","lit_mount_3");
   this.addImage("img/back/mount_1.png","mount_1");
   this.addImage("img/back/mount_2.png","mount_2");
   this.addImage("img/back/small_1.png","small_1");
   this.addImage("img/back/small_2.png","small_2");
   this.addImage("img/back/small_3.png","small_3");
   this.addImage("img/back/small_4.png","small_4");
   this.addImage("img/back/small_5.png","small_5");
   this.addImage("img/player3.png","player");
   this.addImage("img/player_arrow.png","player_arrow");
   this.addImage("img/bonus/20hp.png","bonus_20hp");
   this.addImage("img/bonus/50hp.png","bonus_50hp");
   this.addImage("img/bonus/plus_10_to_life.png","bonus_plus10_life");
   this.addImage("img/bonus/freeze.png","freez");
   this.addImage("img/bonus/x2damage.png","x2damage");
   this.addImage("img/bonus/speedUp.png","speedUp");
   this.addImage("img/bonus/regeneration.png","regeneration");
   this.addImage("img/bonus/teleport.png","teleport");
   this.addImage("img/bonus/enemi_scale.png","enemy_scale");
   this.addImage("img/bonus/full_protectionl.png","full_protect");
   this.addImage("img/bonus/shield_scale.png","shield_scale");
   
   this.addImage("img/bullets/bullet.png","simple_bullet");
   this.addImage("img/bullets/flame_bullet_animation.png","x2damage_bullet");
   
   this.addImage("img/effects/1.png","blow_anim");
   this.addImage("img/effects/protection.png","full_protect_icon");
   
   this.addImage("img/enemies/chase/animation.png","chase_anim");
   this.addImage("img/enemies/chase/shadow.png","chase_shadow");
   
   this.addImage("img/enemies/escape/body_animation.png","escape_anim");
   this.addImage("img/enemies/escape/gun.png","escape_gun");
   
   this.addImage("img/enemies/tank/animation.png","tank_anim");
   this.addImage("img/enemies/tank/shadow.png","tank_shadow");
   
   this.addImage("img/enemies/medium/wheels_animation.png","medium_anim");
   this.addImage("img/enemies/medium/body.png","medium_gun");
   this.addImage("img/enemies/medium/shadow.png","medium_shadow");
   
   this.addImage("img/enemies/strong/Body_animation.png","strong_anim");
   this.addImage("img/enemies/strong/gun.png","strong_gun");
   
   this.addImage("img/enemies/vacuum/body.png","vacuum_anim");
   this.addImage("img/enemies/vacuum/GUN_animation.png","vacuum_gun");
   
   this.addImage("img/enemies/simple/Body.png","simple_anim");
   this.addImage("img/enemies/simple/Gun.png","simple_gun");
   
   this.addImage("img/shield.png","shield");
   this.addImage("img/underShield.png","underShield");  
};

