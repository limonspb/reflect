var stage, circle, filter, test;
function init() {
	stage = new createjs.Stage("reflectCanvas");
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	circle.x = 181;
	circle.y = 100;
	circle.vx = 150;
	circle.vy = 0;	
				
	circle.shadow = new createjs.Shadow("#454", 10, 15, 14);
	stage.addChild(circle);
	
	var image = new Image();
	image.src = "img/spider.png";
	image.onload = handleImageLoad;
	
	
	// stage.addChild(new createjs.Shape()).setTransform(100,100).graphics.f("red").dc(0,0,50);
}

function handleImageLoad(event){
	var image = event.target;
	var bitmap;
	
	
	
	var data = {
			images: [image],
			frames: {width:64,height:64},
			//animations: {www:[0,3]}
		};
	var spriteSheet = new createjs.SpriteSheet(data);
	img = createjs.SpriteSheetUtils.extractFrame(spriteSheet, 3);
	
	bitmap = new createjs.Bitmap(img);
	bitmap.x = 100;
	stage.addChild(bitmap);
	
	test = new CutSprite(image,200,200,9);
	test.x = 200;
	test.y = 200;	
	stage.addChild(test);
	
	
	
	createjs.Ticker.addListener(window);	
	createjs.Ticker.setFPS(60);
	
	
}

function onCanvasClick(){
	if (test.explode){
		test.explode = false;
		test.placeBitmaps();
	}else{
		test.explode = true;
		
	}
}
			
			
function tick(elapsedTime) {
	// time based
	//elapsedTime
	circle.vy+=400*elapsedTime/1000;
	circle.y+=circle.vy*elapsedTime/1000;
	circle.x+=circle.vx*elapsedTime/1000;
				
	if (circle.x > stage.canvas.width-50) { circle.x = stage.canvas.width-50; circle.vx = -circle.vx;}
	if (circle.x < 50) { circle.x = 50; circle.vx = -circle.vx;}
	if (circle.y > stage.canvas.height-50) {circle.y = stage.canvas.height-50; circle.vy = -circle.vy;}
	//test.tick(elapsedTime);		
	
	stage.update(elapsedTime);
}			
