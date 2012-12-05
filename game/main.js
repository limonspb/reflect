//
// "main function"
//

var keys = [];
var circle, filter, test;


var greenImgs = [
	"img/image0.jpg",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg"    
];

var map = new Array();
var preload;
var loader;
var manifest = new Array();

function init() {
	manifest = greenImgs.slice(0);
	console.log(manifest.length);
	
	preload = new createjs.PreloadJS();
			preload.onFileLoad = handleFileLoad;
			preload.onProgress = handleOverallProgress;
			preload.onFileProgress = handleFileProgress;
			preload.onError = handleFileError;
			preload.setMaxConnections(5);	
	
	while (manifest.length > 0) {
				loadAnother();
	}	
	
	
	global.canvas = document.getElementById("reflectCanvas");
	global.stage = new createjs.Stage(global.canvas);
	global.gameWidth = global.canvas.width;
	global.gameHeight = global.canvas.height;
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	circle.x = 181;
	circle.y = 100;
	circle.vx = 150;
	circle.vy = 0;	
				
	circle.shadow = new createjs.Shadow("#454", 10, 15, 14);
	global.stage.addChild(circle);
	
	var image = new Image();
	
	image.onload = handleImageLoad;
	image.src = "img/spider.png";	
	
	
	
	
	
}


function loadAnother() {
			// Get the next manifest item, and load it
			var item = manifest.shift();
			preload.loadFile(item);

		}

function handleFileLoad(event) {
			
			// Get a reference to the loaded image (<img/>)
			var img = event.result;
			console.log('image loaded');
}


function handleOverallProgress(event) {
			console.log('TOTAL: '+preload.progress);
			
			
			
}


function handleFileProgress(event) {
		
}


function handleFileError(event) {
	console.log('error');
}

function bodyKeyDown(){
	keys[event.keyCode] = true;
}

function bodyKeyUp(){
	keys[event.keyCode] = false;
}

function handleImageLoad(event){
	var image = event.target;
	
	test = new CutSprite(image,200,200,9);
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
	//console.log('tick');

	circle.vy+=400*elapsedTime/1000;
	
//	circle.y+=circle.vy*elapsedTime/1000;
//	circle.x+=circle.vx*elapsedTime/1000;

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
				
	//if (circle.x > global.stage.canvas.width-50) { circle.x = global.stage.canvas.width-50; circle.vx = -circle.vx;}
	//if (circle.x < 50) { circle.x = 50; circle.vx = -circle.vx;}
	//if (circle.y > global.stage.canvas.height-50) {circle.y = global.stage.canvas.height-50; circle.vy = -circle.vy;}
	
	global.camera.setLookAt(circle.x,circle.y);
	global.camera.applyTransform();
	
	
	global.stage.update(elapsedTime);
}			
