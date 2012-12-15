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
	
	for (var i = 0; i < 20; i++){		
		for (var j=1; j<=3; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs["cloud_"+j]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			//temp.rotation = randomNumber(0, 360);
			var scale = Math.random() + 0.5;
			temp.scaleX = scale;
			temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}

	
	for (var i = 0; i < 5; i++){		
		for (var j=1; j<8; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs["big_"+j]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			//temp.rotation = randomNumber(0, 360);
			var scale = Math.random()/2 + 0.5;
			temp.scaleX = scale;
			temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}

	for (var i = 0; i < 10; i++){		
		for (var j=1; j<=3; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs["lit_mount_"+j]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			//temp.rotation = randomNumber(0, 360);
			var scale = Math.random()/3 + 0.7;
			temp.scaleX = scale;
			temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}

	for (var i = 0; i < 10; i++){		
		for (var j=1; j<=2; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs["mount_"+j]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			//temp.rotation = randomNumber(0, 360);
			var scale = Math.random()/3 + 0.7;
			temp.scaleX = scale;
			temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}

	for (var i = 0; i < 100; i++){		
		for (var j=1; j<=2; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs["small_"+j]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			//temp.rotation = randomNumber(0, 360);
			//var scale = Math.random()/4 + 0.75;
			//temp.scaleX = scale;
			//temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}
	
	for (var i = 0; i < 400; i++){		
		for (var j=3; j<=5; j++){
			var temp =  new createjs.Bitmap(global.preloader.imgs["small_"+j]);		
			temp.x = randomNumber(0, global.levelWidth);
			temp.y = randomNumber(0, global.levelHeight);
			//temp.rotation = randomNumber(0, 360);
			//var scale = Math.random()/4 + 0.75;
			//temp.scaleX = scale;
			//temp.scaleY = scale;
			this.addChild(temp);	
		}		
	}


	this.cache(0,0,global.levelWidth,global.levelHeight);


}


extend(BackGround,createjs.Container);
