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
	global.stage.enableMouseOver();	
	global.stage.mouseMoveOutside = true;
	global.gameWidth = global.canvas.width;
	global.gameHeight = global.canvas.height;
	
	global.keyboard = new Keyboard();
	global.preloader = new Preloader();
	global.music = new Music();
	
	global.preloader.onComplete = handleImageLoad;
	global.preloader.go();
}

function bodyKeyDown(event){
	keys[event.keyCode] = true;
}

function bodyKeyUp(event){
	keys[event.keyCode] = false;
}

var preload;

function handleImageLoad(event){
	global.music.play();
	global.sceneController = new SceneController();
	global.sceneController.currentScene = global.sceneController.menuScene;
	global.sceneController.menuScene.show();
	global.volumePanel = new VolumePanel();
	
	
	
	createjs.Ticker.addListener(window);	
	createjs.Ticker.setFPS(30);	
		
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
