//
// "main function"
//
function init() {
	$("#version_div").append("v 0.9.1.1");
	global.canvas = document.getElementById("reflectCanvas");
	
	global.canvas.height =  Math.min( $(window).height(), 1500 );
	global.canvas.width = Math.min( $(window).width(), 1500 );
	
	global.stage = new createjs.Stage(global.canvas);
	global.stage.enableMouseOver();
	//global.stage.mouseMoveOutside = true;
	global.gameWidth = global.canvas.width;
	global.gameHeight = global.canvas.height;
	
	global.keyboard = new Keyboard();
	global.preloader = new Preloader();
	global.music = new Music();
	global.soundManager = new SoundManager();
	global.volumePanel = new VolumePanel();	
	
	global.preloader.onComplete = handleImageLoad;
	global.preloader.go();	
}

function handleImageLoad(event){	
	global.sceneController = new SceneController();
	global.sceneController.currentScene = global.sceneController.menuScene;
	global.sceneController.menuScene.show();	
	
	createjs.Ticker.setFPS(60);
//	createjs.Ticker.useRAF = true;
		
}