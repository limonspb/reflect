//
//CutSprite - a class for exploding based on png images - peaces of the sprite
//

function CutSprite(a_img, a_width, a_height, a_numframes){	
	CutSprite.superclass.constructor.apply(this, arguments);
	this.imgs = [];
	this.bitmaps = [];
	this.numframes = a_numframes;
	this.imgWidth = a_width;
	this.imgHeight = a_height;
	this.averageSize = (a_width+a_height)/2;
	this.explode = false; //move parts or not
	
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
		this.bitmaps[i].v = this.averageSize + Math.random()*this.averageSize/2;
		this.maxRotationSpeedX2 = 6;
		this.bitmaps[i].rotationV = Math.random()*this.maxRotationSpeedX2 - this.maxRotationSpeedX2/2;				
	}
	
}

CutSprite.prototype.onTick = function(elapsedTime){
	if (! this.explode) return;
	for (var i=0; i<this.numframes; i++){
		if (this.bitmaps[i].v > 0){
			this.bitmaps[i].v-=elapsedTime/1000 * this.averageSize*3;
		}else{
			this.bitmaps[i].v = 0;			
		}
		
		if (Math.abs(this.bitmaps[i].rotationV)>elapsedTime/1000 * this.maxRotationSpeedX2){
			this.bitmaps[i].rotationV =
				this.bitmaps[i].rotationV
					- (this.bitmaps[i].rotationV > 0)*elapsedTime/1000 * this.maxRotationSpeedX2
					+ (this.bitmaps[i].rotationV < 0)*elapsedTime/1000 * this.maxRotationSpeedX2;
		}else{
			this.bitmaps[i].rotationV = 0;
		}
		
		this.bitmaps[i].rotation+=this.bitmaps[i].rotationV;
		this.bitmaps[i].x += this.bitmaps[i].v * Math.cos(this.bitmaps[i].vangle)*elapsedTime/1000;
		this.bitmaps[i].y += this.bitmaps[i].v * Math.sin(this.bitmaps[i].vangle)*elapsedTime/1000;
	}
}
