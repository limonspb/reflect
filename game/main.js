//
// "main function"
//


var keys = [];
var circle, filter, test;

var map = new Array();

function init() {
	$("#version_div").append("v 0.9.1.0");
	global.canvas = document.getElementById("reflectCanvas");
	global.canvas.height =  Math.min( $(window).height(), 1500 );
	global.canvas.width = Math.min( $(window).width(), 1500 );
	//global.canvas.height =  Math.min( document.body.clientHeigh, 1500 );
	//global.canvas.width = Math.min( document.body.clientWidth, 1500 );
	global.stage = new createjs.Stage(global.canvas);
	global.stage.enableMouseOver();
	global.stage.mouseMoveOutside = true;
	global.gameWidth = global.canvas.width;
	global.gameHeight = global.canvas.height;

	global.keyboard = new Keyboard();
	global.preloader = new Preloader();
	global.music = new Music();
	global.soundManager = new SoundManager();
	global.volumePanel = new VolumePanel();




	global.preloader.onComplete = handleImageLoad;
	global.preloader.go();
	console.log("Channels "+createjs.SoundJS.getCapabilities().channels.toString()+'/'+global.soundManager.MAX_NUM_SOUNDS);
}

function bodyKeyDown(event){
	keys[event.keyCode] = true;
}

function bodyKeyUp(event){
	keys[event.keyCode] = false;
}

var preload;

function handleImageLoad(event){
	
	global.sceneController = new SceneController();
	global.sceneController.currentScene = global.sceneController.menuScene;
	global.sceneController.menuScene.show();
	
	
	
	
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
