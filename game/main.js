//
// "main function"
//

var keys = [];
var circle, filter, test;

var map = new Array();

function init() {	
	global.canvas = document.getElementById("reflectCanvas");
	global.canvas.height = $(window).height()-8;
	global.canvas.width = $(window).width()-8;
	global.stage = new createjs.Stage(global.canvas);
	global.stage.enableMouseOver()
	global.gameWidth = global.canvas.width;
	global.gameHeight = global.canvas.height;
	
	global.preloader.onComplete = handleImageLoad;
	global.preloader.go();	
	
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	circle.x = 181;
	circle.y = 100;
	circle.vx = 150;
	circle.vy = 0;	
				
	circle.shadow = new createjs.Shadow("#454", 10, 15, 14);
	global.stage.addChild(circle);		
}

function bodyKeyDown(event){
	keys[event.keyCode] = true;
}

function bodyKeyUp(event){
	keys[event.keyCode] = false;
}

function handleImageLoad(event){
	global.sceneController = new SceneController();
	global.sceneController.menuScene.show();
	
	test = new CutSprite(global.preloader.imgs.spider,200,200,9);
	test.x = 200;
	test.y = 200;	
	global.stage.addChild(test);	
	
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
	circle.vy+=400*elapsedTime/1000;

	if (keys[87]){
		circle.y-=6;
	}
	if (keys[83]){
		circle.y+=6;
	}
	if (keys[65]){
		circle.x-=6;
	}
	if (keys[68]){
		circle.x+=6;
	}				
	
	global.camera.setLookAt(circle.x,circle.y);
	global.camera.applyTransform();
	
	
	global.stage.update(elapsedTime);
}			
