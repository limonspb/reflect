function CutSprite(a_img, a_width, a_height, a_numframes){
	//holder = stage.addChild(new createjs.Container());
	CutSprite.superclass.constructor.apply(this, arguments);
	this.imgs = [];
	this.bitmaps = [];
	this.numframes = a_numframes;
	this.imgWidth = a_width;
	this.imgHeight = a_height;
	this.explode = false;
	//this.x = 0;
	//this.y = 0;
	var data = {
			images: [a_img],
			frames: {width:a_width,height:a_height},			
		};
	var spriteSheet = new createjs.SpriteSheet(data);
	for (var i=0; i<a_numframes; i++){		
		this.imgs.push( createjs.SpriteSheetUtils.extractFrame(spriteSheet, i) );
		this.bitmaps.push(new createjs.Bitmap( this.imgs[i] ));
		this.addChild(this.bitmaps[i]);		
	}	
	
	this.placeBitmaps();
}

extend(CutSprite,createjs.Container);

CutSprite.prototype.placeBitmaps = function(){
	for (var i=0; i<this.numframes; i++){		
		this.bitmaps[i].x = 0;
		this.bitmaps[i].y = 0;
		this.bitmaps[i].regX = this.imgWidth/2;
		this.bitmaps[i].regY = this.imgHeight/2;
		this.bitmaps[i].rotation = 0;
		this.bitmaps[i].vangle = i*Math.PI*2/this.numframes - Math.PI/2;		
		this.bitmaps[i].v = 200 + Math.random()*100;
		this.bitmaps[i].rotationV = Math.random()*12 - 6;				
	}
	
}

CutSprite.prototype.onTick = function(elapsedTime){
	if (! this.explode) return;
	for (var i=0; i<this.numframes; i++){
		if (this.bitmaps[i].v > 0){
			this.bitmaps[i].v-=elapsedTime/1000 * 600;	
		}else{
			this.bitmaps[i].v = 0;			
		}
		if (this.bitmaps[i].rotationV>0){
			this.bitmaps[i].rotationV-=elapsedTime/1000 * 12;
		}else{
			this.bitmaps[i].rotationV = 0;
		}
		
		this.bitmaps[i].rotation+=this.bitmaps[i].rotationV;
		this.bitmaps[i].x += this.bitmaps[i].v * Math.cos(this.bitmaps[i].vangle)*elapsedTime/1000;
		this.bitmaps[i].y += this.bitmaps[i].v * Math.sin(this.bitmaps[i].vangle)*elapsedTime/1000;
	}
}
