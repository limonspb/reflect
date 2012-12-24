Preloader = function(){
	this.sources = [];
	this.manifest;
	this.names = [];
	
	this.imgs = {};

	this.initConstants();
	
	this.pr = new createjs.PreloadJS();
	this.pr.owner = this;
	this.pr.onFileLoad = this.onFileLoad; 
	this.pr.onProgress = this.onProgress;
	this.onComplete = null;
	this.pr.onComplete = function(event){
		if(event.target.owner.onComplete){
			event.target.owner.onComplete();
			$("#preloader").fadeOut();
		}
	};
	
	this.onProgress = null;
	
	//this.pr.onFileProgress = handleFileProgress;
	//this.pr.onError = handleFileError;
	this.pr.setMaxConnections(1);	
};


Preloader.prototype.getSourceIndex = function(str){
	for (var i=0; i<this.sources.length; i++){
		if (str==this.sources[i]) return i;
	};
	return -1;
};


Preloader.prototype.onFileLoad = 	function(event){
		var n = event.target.owner.getSourceIndex(event.id);
		if (n>=0){
			event.target.owner.imgs[event.target.owner.names[n]] = event.result;
		}		
};



Preloader.prototype.go = function(){	
	//this.pr.loadManifest(this.sources,true);
	this.manifest = this.sources.slice(0);
	
	while (this.manifest.length > 0) {
	    var item = this.manifest.shift();
	    this.pr.loadFile(item);
    }	
};

Preloader.prototype.onProgress = function(event){	
	$("#bar").width(event.target.progress*400);
	if (event.target.owner.onProgress){
		event.target.owner.onProgress(event.target.progress);
	}else{		
	}	
};

//global.preloader = new Preloader();


Preloader.prototype.addImage = function(src, name){
	this.sources.push(src);
	this.names.push(name);
}

Preloader.prototype.initConstants = function()
{
   this.addImage("img/image0.jpg","name0");
   this.addImage("img/image1.jpg","name1");
   this.addImage("img/image2.jpg","name2");
   this.addImage("img/spider.png","spider");
   this.addImage("img/back.jpg","back");
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
   
   this.addImage("img/effects/blow_animation.png","blow_anim");
   
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
   
   this.addImage("img/shield.png","shield");
   this.addImage("img/underShield.png","underShield");
};

