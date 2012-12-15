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
}

extend(BackGround,createjs.Container);
