function BackGround(){
	BackGround.superclass.constructor.apply(this);
	var pattern = global.preloader.imgs.pattern;
	var patternWidth = pattern.width;
	var patternHeight = pattern.height;
	
	var nw = Math.ceil(global.levelWidth/patternWidth);
	var nh = Math.ceil(global.levelHeight/patternHeight);
	
	for (var x=0; x<nw; x++ ){
		for (var y=0; y<nh; y++ ){
			var temp =  new createjs.Bitmap(global.preloader.imgs.pattern);
			temp.x = x*patternWidth;
			temp.y = y*patternHeight;
			this.addChild(temp);			
		}		
	}
	
	this.addPict("cloud_",20,1,3,false,1, 0.5);
	this.addPict("big_",5,1,8,false,0.5, 0.5);
	this.addPict("lit_mount_",10,1,3,false,0.33, 0.7);
	this.addPict("mount_",10,1,2,false,0.33, 0.7);
	this.addPict("small_",100,1,2,false,0.25, 0.75);
	this.addPict("small_",400,3,5,false,0.25, 0.75);

	this.cache(0,0,global.levelWidth,global.levelHeight);
}


extend(BackGround,createjs.Container);

BackGround.prototype.addPict = function(a_name,N,i_min,i_max,b_rotation,scale_Mult, scale_Summ){
	for (var i = 0; i < N; i++){		
		for (var j=i_min; j<=i_max; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs[a_name+j.toString()]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			if (b_rotation)
				temp.rotation = randomNumber(0, 360);				
			var scale = Math.random()*scale_Mult + scale_Summ;
			temp.scaleX = scale;
			temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}	
	
}
