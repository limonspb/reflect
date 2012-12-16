/**
 * @author ProBigi
 */



function HeroUnit()
{
	HeroUnit.superclass.constructor.apply(this);
	
	this.angle;
	
	this.LEFT = false;
	this.RIGHT = false;
	this.FORWARD = false;
	this.BACK = false;
	this.bodySize;
	
	this.a_c = 0;
	this.a_c_max_foward = 1000;
	this.a_c_max_backward = -1000;
	this.a_c_triction = 500;
	this.v_c = 0;
	this.max_v_c_forward = 300; 
	this.max_v_c_backward = -100;
	
	this.ar_c = 0; 
	this.ar_c_max = 1000; 
	this.ar_c_triction = 1000;
	this.vr_c = 0;
	this.vr_c_max = 300; 
	
	this.initView();
}

extend(HeroUnit,BaseUnit);

/**
 * Инициализация отображения юнита
 */
HeroUnit.prototype.initView = function ()
{
	this.rotation = 270;
	this.view = new createjs.Container();
	
	this.bodySize = global.preloader.imgs.player.height;
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 9]},
		"images": [global.preloader.imgs.player],
		"frames": {
		"regX": global.preloader.imgs.player.height/2,
		"regY": global.preloader.imgs.player.height/2,
		"height": global.preloader.imgs.player.height,
		"width": global.preloader.imgs.player.height
		}
	});	
				
	this.ss.getAnimation("run").frequency = 0;
				
	this.body = new createjs.BitmapAnimation(this.ss);
				
	this.body.gotoAndPlay("run");	
	this.body.rotation = 90;
	
	
	this.sheild = new createjs.Shape();
	this.sheild.graphics.beginFill("green").drawRect ( 25 , -25 , 10 , 50 , 5 );
	
	this.addChild(this.body);
	
	this.addChild(this.sheild);
		
	this.rotationSpeed = 200;
}


/**
 * Движение юнита
 * @param {Number} elapsedTime	время прошедшее с последнего тика
 */
HeroUnit.prototype.move = function (elapsedTime)
{
	var dt = elapsedTime/1000;
	
	if (this.FORWARD){
		this.a_c = this.a_c_max_foward;
	}
	else if (this.BACK){
		this.a_c = this.a_c_max_backward;
	}else{
		if (this.v_c > 0){
			this.a_c = -this.a_c_triction;
		}else if (this.v_c < 0){
			this.a_c = this.a_c_triction;			
		}else{
			this.a_c = 0;
		}
	}
	
	if (this.LEFT){
		this.ar_c = -this.ar_c_max;	
	}
	else if (this.RIGHT){
		this.ar_c = this.ar_c_max;	
	}else{
		if (this.vr_c > 0){
			this.ar_c = -this.ar_c_triction;
		}else if (this.vr_c < 0){
			this.ar_c = this.ar_c_triction;			
		}else{
			this.ar_c = 0;
		}		
	}
	
	var tempvrc = this.vr_c;
	this.vr_c += this.ar_c * dt;
	if (tempvrc * this.vr_c < 0){
		this.vr_c = 0;
	}
	if (this.vr_c > this.vr_c_max ){
		this.vr_c = this.vr_c_max;
	}else if (this.vr_c < -this.vr_c_max){
		this.vr_c = -this.vr_c_max;		
	}
	
	this.rotation+=this.vr_c * dt;
	
	
	this.angle = this.rotation/180 * Math.PI;	
	
	var tempvc = this.v_c;
	this.v_c += this.a_c * dt;
	if (tempvc * this.v_c < 0){
		this.v_c = 0;
	}
	if (this.v_c > this.max_v_c_forward){
		this.v_c = this.max_v_c_forward;
	}else
	if (this.v_c < this.max_v_c_backward){
		this.v_c = this.max_v_c_backward;
	}
	
	var vx_c = this.v_c * Math.cos(this.angle);
	var vy_c = this.v_c * Math.sin(this.angle);
	this.ss.getAnimation("run").frequency = Math.ceil(11 - this.v_c/this.max_v_c_forward * 10);
	if (this.v_c == 0){
		this.ss.getAnimation("run").frequency = 100000;
	}
	
	this.x += vx_c*dt;
	this.y += vy_c*dt;
	
	if (this.x<this.bodySize){
		this.vx_c = 0;
		this.x = this.bodySize;
	}else
	if (this.x> global.levelWidth - this.bodySize){
		this.vx_c = 0;
		this.x = global.levelWidth - this.bodySize;
	}

	if (this.y<this.bodySize){
		this.vy_c = 0;
		this.y = this.bodySize;
	}else
	if (this.y> global.levelHeight - this.bodySize){
		this.vy_c = 0;
		this.y = global.levelHeight - this.bodySize;		
	}
	
	this.rotationSheild();
}
	
/**
 * Поворот щита относительно курсора
 */
HeroUnit.prototype.rotationSheild = function ()
{
	this.dx = this.x - global.stage.mouseX - global.camera.lookAtX;
	this.dy = this.y - global.stage.mouseY - global.camera.lookAtY;
	
	this.sheildAngle = Math.atan2(this.dy, this.dx)*180/Math.PI;
	this.sheild.rotation = 180 + this.sheildAngle - this.rotation;
}
