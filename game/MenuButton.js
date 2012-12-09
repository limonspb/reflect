(function() {

var MenuButton = function(label, color, backWidth) {
  this.initialize(label, color,backWidth);
}
var p = MenuButton.prototype = new createjs.Container(); // inherit from Container

p.label;
p.background;
//p.count = 0;

p.Container_initialize = p.initialize;
p.initialize = function(label, color,backWidth) {
	this.Container_initialize();
	
	this.label = label;
	if (!color) { color = "#CCC"; }
	
	var text = new createjs.Text(label, "20px Arial", "#000");
	text.textBaseline = "top";
	text.textAlign = "center";
	
	if (!backWidth){
		this.width = text.getMeasuredWidth()+30;		
	}else{
		this.width = backWidth;
	}
	
	this.height = text.getMeasuredHeight()+20;	
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawRoundRect(0,0,this.width,this.height,10);
	this.background.regX = this.width/2;
	
	text.y = 10;	
	
	this.addChild(this.background,text);
}

p.onClick = function() {
	alert("You clicked on a button: "+this.label);
}

p.onMouseOver = function(){
	createjs.Tween.removeTweens(this.background);	
	var tween = createjs.Tween.get(this.background, {loop:false});	
	tween.to({scaleX:1.5},200,createjs.Ease.linear);
}

p.onMouseOut = function(){
	createjs.Tween.removeTweens(this.background);
	var tween = createjs.Tween.get(this.background, {loop:false});	
	
	tween.to({scaleX:1.0},200,createjs.Ease.linear);
}


p.onTick = function() {
	//this.alpha = Math.cos(this.count++*0.1)*0.4+0.6;	
}

window.MenuButton = MenuButton;
}());