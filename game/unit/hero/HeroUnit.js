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
	this.ar_c_max = 5000; 
	this.ar_c_triction = 5000;
	this.vr_c = 0;
	this.vr_c_max = 300;
	
	this.shieldWidth = 150;
	this.shieldHeight = 10;
	this.shieldDist = 25;
	this.sh_segments = [{},{},{},{}];
	
	this.old_x = this.x;
	this.old_y = this.y;
	
	this.old_x = 300;
	this.old_y = 300;
	
	this.initView();
		
	this.sh_old_segments = [{},{},{},{}];
	this.sh_old_angle = 90;
}

extend(HeroUnit,BaseUnit);

HeroUnit.prototype.archiveShieldSegments = function(){
	for (var i=0; i<4; i++){
		this.sh_old_segments[i] = clone(this.sh_segments[i]);
	}
}

HeroUnit.prototype.setActualShieldSegments = function(){
	this.archiveShieldSegments();
	this.sh_segments = this.countShieldSegments(this.sheildAngle, this.x,this.y);
}

HeroUnit.prototype.getSieldSegmentsArray_usingOldandNow = function(count){
	var posArr = this.getPositionArray(count);
	var angleArr = this.getRotationShieldArray(count);
	var res = [];
	for (var i=0; i<count; i++){
		res[i] = {};
		res[i] = this.countShieldSegments(angleArr[i], posArr[i].x, posArr[i].y);		
	}
	return res;
	
}

HeroUnit.prototype.getPositionArray = function(count){
	var res = [];
	var dx = (this.x - this.old_x)/(count-1);
	var dy = (this.y - this.old_y)/(count-1);
	for (var i=0; i<count; i++){
		res[i] = {};
		res[i].x = this.old_x + dx*i;
		res[i].y = this.old_y + dy*i;
	}	
	return res;	
}

HeroUnit.prototype.countShieldSegments = function(angle,px,py){
	var sh_TopLeft = {};
	var sh_TopRight = {};
	var sh_BottomRight = {};
	var sh_BottomLeft = {};

	
	sh_TopLeft.x = -this.shieldWidth/2;
	sh_TopLeft.y = -this.shieldDist - this.shieldHeight;
	
	sh_TopRight.x = this.shieldWidth/2;
	sh_TopRight.y = -this.shieldDist  - this.shieldHeight;
	
	sh_BottomLeft.x = -this.shieldWidth/2;
	sh_BottomLeft.y = -this.shieldDist;
	
	sh_BottomRight.x = this.shieldWidth/2;
	sh_BottomRight.y = -this.shieldDist;

	var alpha = (angle-90)/180 * Math.PI;
	sh_TopLeft = rotateVec(sh_TopLeft, alpha);
	sh_TopRight = rotateVec(sh_TopRight, alpha);	
	sh_BottomLeft = rotateVec(sh_BottomLeft, alpha);	
	sh_BottomRight = rotateVec(sh_BottomRight,alpha);
	
	sh_TopLeft.x += px;
	sh_TopRight.x += px;
	sh_BottomLeft.x += px;
	sh_BottomRight.x += px;
		
	sh_TopLeft.y += py;	
	sh_TopRight.y += py;	
	sh_BottomLeft.y += py;	
	sh_BottomRight.y += py;
	
	sh_segments = [{},{},{},{}];
	
	sh_segments[0].x1 = sh_TopLeft.x;	
	sh_segments[0].y1 = sh_TopLeft.y;
	sh_segments[0].x2 = sh_TopRight.x; 	
	sh_segments[0].y2 = sh_TopRight.y;

	sh_segments[1].x1 = sh_TopRight.x; 	
	sh_segments[1].y1 = sh_TopRight.y; 	
	sh_segments[1].x2 = sh_BottomRight.x; 	
	sh_segments[1].y2 = sh_BottomRight.y; 	

	sh_segments[2].x1 = sh_BottomRight.x; 	
	sh_segments[2].y1 = sh_BottomRight.y; 	
	sh_segments[2].x2 = sh_BottomLeft.x; 	
	sh_segments[2].y2 = sh_BottomLeft.y; 	

	sh_segments[3].x1 = sh_BottomLeft.x; 	
	sh_segments[3].y1 = sh_BottomLeft.y; 	
	sh_segments[3].x2 = sh_TopLeft.x; 	
	sh_segments[3].y2 = sh_TopLeft.y;	
	
	return sh_segments;
}




HeroUnit.prototype.initView = function ()
{
	this.rotation = 270;
	this.view = new createjs.Container();
	
	this.bodySize = global.preloader.imgs.player.height;
	this.ss = new createjs.SpriteSheet({ "animations": {
		"run": [0, 2]},
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
	this.sheild.graphics.beginFill("green").drawRect ( this.shieldDist , -this.shieldWidth/2 , this.shieldHeight , this.shieldWidth );
	
	
	this.addChild(this.body);
	
	this.addChild(this.sheild);
		
	this.rotationSpeed = 200;
}


/**
 * Движение юнита
 * @param {Number} elapsedTime	время прошедшее с последнего тика
 */
HeroUnit.prototype.move = function(elapsedTime)
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
	
	this.old_x = this.x;
	this.old_y = this.y;
	
	
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
	this.setActualShieldSegments();
	
	
	this.reflect(elapsedTime);
	
	//this.countShieldCorners2(this.sheildAngle, this.x,this.y);
	
}	
/**
 * Поворот щита относительно курсора
 */
HeroUnit.prototype.rotationSheild = function ()
{
	this.dx = this.x - global.stage.mouseX - global.camera.lookAtX;
	this.dy = this.y - global.stage.mouseY - global.camera.lookAtY;
	
	this.sh_old_angle = this.sheildAngle;
	this.sheildAngle = Math.atan2(this.dy, this.dx)*180/Math.PI;	
	this.sheild.rotation = 180 + this.sheildAngle - this.rotation;
}

HeroUnit.prototype.getRotationShieldArray = function(count){
	var res = [];
	var dangle2 = (this.sheildAngle - this.sh_old_angle)/(count-1);
	var dangle = getAngleDiff_grad(this.sh_old_angle, this.sheildAngle)/(count - 1);
	//console.log(dangle, dangle2);	
	for (var i=0; i<count; i++){
		res[i] = this.sh_old_angle + dangle*i;
	}	
	return res;	
}


HeroUnit.prototype.reflect = function(elapsedTime){		
	for (var i=0; i<global.BulletFactory.bullets.length; i++){
		var bullet = global.BulletFactory.bullets[i];
		if (Math.abs( bullet.x - this.x) < 2*this.shieldWidth){
			if (Math.abs( bullet.y - this.y) < 2*this.shieldWidth){				
					this.hardReflect(bullet, elapsedTime);	
			}				
		}			
	}				
}


HeroUnit.prototype.hardReflect = function(b, elapsedTime){
	
	
	var get_sh_segments_array = function(begin, end, count /*segments arrays*/){
		var dx1 = [];
		var dx2 = [];
		var dy1 = [];
		var dy2 = [];
		for (var i=0; i<4; i++){
			dx1[i] = (end[i].x1 - begin[i].x1)/(count - 1);
			dx2[i] = (end[i].x2 - begin[i].x2)/(count - 1);
			dy1[i] = (end[i].y1 - begin[i].y1)/(count - 1);
			dy2[i] = (end[i].y2 - begin[i].y2)/(count - 1);
		}
		//console.log(dx1[0]);
		var res = [];
		for (var i=0; i<count; i++){
			res[i] = [{},{},{},{}];
			for (var j=0; j<4; j++){
				res[i][j].x1 = begin[j].x1 + dx1[j]*i;
				res[i][j].x2 = begin[j].x2 + dx2[j]*i;
				res[i][j].y1 = begin[j].y1 + dy1[j]*i;
				res[i][j].y2 = begin[j].y2 + dy2[j]*i;
			}
		}
		return res;		
	}	
	
	//var segments_arr = get_sh_segments_array(this.sh_segments, this.sh_old_segments, 150);
	var segments_arr = this.getSieldSegmentsArray_usingOldandNow(100);
	//console.log(segments_arr);
	//console.log(this.sh_segments[0].x1 - this.sh_old_segments[0].x1);		
	
	var s = {};
	s.x1 = b.x;
	s.x2 = b.futureX;
	s.y1 = b.y;
	s.y2 = b.futureY;
	
	var Xsegment = null;
	var XX;
	
	var XsegmentNumber = -1;
	var distanceFromCornerToX;
	
	for (var seg_i = 0; seg_i<segments_arr.length; seg_i++){
		var X = [];
		var min_d = 9999;
		var d;
		var n_i = -1;
			
		for (var i=0; i<4; i++){
			X[i] = intersectSegments_obj(s,segments_arr[seg_i][i]);
			if (X[i]){
				d = Math.sqrt( (b.x-X[i].x)*(b.x-X[i].x) + (b.y-X[i].y)*(b.y-X[i].y));
				//console.log(segments_arr);
				if (d< min_d){
					min_d = d;
					n_i = i;
				}
			}		
		}
		if (n_i != -1){
			Xsegment = segments_arr[seg_i][n_i];
			XX = X[n_i];
			XsegmentNumber = n_i;
			distanceFromCornerToX = Math.sqrt((XX.x - Xsegment.x1)*(XX.x - Xsegment.x1) + (XX.y - Xsegment.y1)*(XX.y - Xsegment.y1));			
			break;
		}		
	}
	
	if (Xsegment){
		//console.log(n_i);
		var vecV = {};
		vecV.x = Math.cos(b.angle);
		vecV.y = Math.sin(b.angle);
		
		var vecP = {};
		vecP.x = Xsegment.x1 - Xsegment.x2; 
		vecP.y = Xsegment.y1 - Xsegment.y2;
		var vecN  = {};
		vecN.x = -vecP.y;
		vecN.y = vecP.x;
		vecN = vec_normal(vecN);
		vecP = vec_normal(vecP);
		
		var resV = {};
		var sMult = vecV.x * vecP.x + vecV.y*vecP.y;
		resV.x = 2*vecP.x*sMult - vecV.x;
		resV.y = 2*vecP.y*sMult - vecV.y;
		
	
		b.futureRotation = Math.atan2(resV.y, resV.x)*180/Math.PI;						
		
		//vec of the side to move bullet
		var side = vec_Get(this.sh_segments[XsegmentNumber].x1, this.sh_segments[XsegmentNumber].y1, this.sh_segments[XsegmentNumber].x2, this.sh_segments[XsegmentNumber].y2);
		var perp = vec_Perp(side);
		perp = vec_normal(perp);
		side = vec_Scale(side, distanceFromCornerToX);
		var pointtomove = vec_Summ({x:this.sh_segments[XsegmentNumber].x1, y:this.sh_segments[XsegmentNumber].y1}, side);
		perp = vec_Scale(perp, b.speed*elapsedTime/1000);
		pointtomove = vec_Summ(pointtomove, perp);
		//console.log(side, XsegmentNumber);
		
		b.futureX = pointtomove.x;
		b.futureY = pointtomove.y;	
		
		
		//b.futureX = XX.x + vecN.x;
		//b.futureY = XX.y + vecN.y;	
		
	}
	
	
}