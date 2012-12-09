//
// "main function"
//

var keys = [];
var circle, filter, test;

var map = new Array();

function init() {
	global.canvas = document.getElementById("reflectCanvas");
	global.canvas.height =  Math.min( $(window).height()-8, 1500 );
	global.canvas.width = Math.min( $(window).width()-8, 1500 );
	global.stage = new createjs.Stage(global.canvas);
	global.stage.enableMouseOver()
	global.gameWidth = global.canvas.width;
	global.gameHeight = global.canvas.height;
	
	global.preloader.onComplete = handleImageLoad;
	global.preloader.go();	
	
}

function bodyKeyDown(event){
	keys[event.keyCode] = true;
}

function bodyKeyUp(event){
	keys[event.keyCode] = false;
}

function handleImageLoad(event){
	global.sceneController = new SceneController();
	global.sceneController.currentScene = global.sceneController.menuScene;
	global.sceneController.menuScene.show();
	//global.sceneController.creditsScene.show();
	
	//test = new CutSprite(global.preloader.imgs.spider,200,200,9);
	//test.x = 200;
	//test.y = 200;	
	//global.stage.addChild(test);	
	
	createjs.Ticker.addListener(window);	
	createjs.Ticker.setFPS(60);	
}


function onCanvasClick(){
	/*if (test.explode){
		test.explode = false;
		test.placeBitmaps();
	}else{
		test.explode = true;
		
	}*/
}
			
			
function tick(elapsedTime) {	
	global.stage.update(elapsedTime);
}			
