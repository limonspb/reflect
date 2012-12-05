/**
 * @author limon
 */
var stage, circle, filter;
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
	// stage.addChild(new createjs.Shape()).setTransform(100,100).graphics.f("red").dc(0,0,50);
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(60);
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
				
	stage.update();
}			
