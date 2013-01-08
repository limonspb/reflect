function sleep(millisecondi)
{
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;

    while(true)
    {
        now = new Date();
        if(now.getTime() > exitTime) return;
    }
}

/**
 * логирование
 * можно убрать все логи и эту функцию
 */
var log = function() {
    if (typeof console !=="undefined" && console.log) {
        var args = $.makeArray(arguments.callee.arguments);
        $.each(args, function(k, v) {
            console.log(v);
        });
    }
};


// функция генерирует целое случайное число от m до n
function randomNumber (m,n)
{
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}

function getLine(x1,y1,x2,y2){
	var A = y2 - y1;
	var B = x1 - x2;
	
	if ((A==0)&&(B==0)){
		return null;
	}else{
		var C = y1*(x2 - x1) - x1*(y2 - y1);
		return {A : A, B:B, C:C};		
	}	
}

function intersectLines(A1,B1,C1,A2,B2,C2){
	var d = A1*B2-A2*B1;
	if (d == 0){
		return null;
	}else{
		var x = -(C1*B2 - C2*B1)/d;
		var y = -(A1*C2 - A2*C1)/d;
		return {x : x, y : y};
	}
}

function intersectSegments(x1,y1,x2,y2,x3,y3,x4,y4){
	var line1 = getLine(x1,y1,x2,y2);
	var line2 = getLine(x3,y3,x4,y4);
	if ((line1==null)||(line2==null)){
		return null;
	}else{
		var p = intersectLines(line1.A,line1.B,line1.C,line2.A,line2.B,line2.C);
		if (p == null){
			return p;
		}else{
			if (  (  (Math.abs(x2 - p.x) <= Math.abs(x2-x1)) &&  (Math.abs(x1 - p.x) <= Math.abs(x2-x1))  ) &&
				  (  (Math.abs(x4 - p.x) <= Math.abs(x4-x3)) &&  (Math.abs(x3 - p.x) <= Math.abs(x4-x3))  )   ){
				return p;
			}else{
				return null;
			}
		}
	}	
}

function intersectSegments_obj(s1,s2){
	return intersectSegments(
								s1.x1,s1.y1,
								s1.x2,s1.y2,
								s2.x1,s2.y1,
								s2.x2,s2.y2
							);
}


function rotateVec(vec, angle){
	var r = {x:0.0,y:0.0};
	r.x =   vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
	r.y =   vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
	return r;
}

function vec_normal(vec){
	var d = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
	var r = {x:0.0,y:0.0};
	if (d!=0){
		r.x = vec.x/d;
		r.y = vec.y/d;
	}
	return r;
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function vec_Get(x1,y1, x2,y2){
	return {x: x2-x1, y:y2-y1};
}

function vec_Length(v){
	return Math.sqrt(v.x*v.x + v.y*v.y);
}

function vec_Scale(v,new_length){
	var d = vec_Length(v);
	if (d==0){
		return {x:0.0, y:0.0};
	}else{
		var res = {x:0.0,y:0.0};
		res.x = v.x/d*new_length;
		res.y = v.y/d*new_length;
		return res;
	}
}

function vec_Summ(v1,v2){
	return {x : v1.x+v2.x, y : v1.y + v2.y};
}

function vec_Perp(v){
	return {x : v.y, y : -v.x};
}

function getAngleDiff_grad(angle1,angle2){
	var a1 = angle1;
	var a2 = angle2;
	while (a1>0) a1-=360;
	while (a2>0) a2-=360;
	while (a1<0) a1+=360;
	while (a2<0) a2+=360;	
	
	var d1 = a2 - a1;
	var d2;
	if (a1 >= a2){		
		d2 = a2 + (360 - a1);
	}else{
		d2 = -(360 - a2) - a1;				
	}	
	
	var ad1 = Math.abs(d1);
	var ad2 = Math.abs(d2);	
	
	var res = d2;
	
	if (ad1 <= ad2)
		res = d1;
		
	return res;
}




function get_sh_segments_array(begin, end, count /*segments arrays*/){
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

/** Определение расстояния между двумя объектами*/
function getDistanceToObject(object1, object2) {
	var dx = object1.x - object2.x;
	var dy = object1.y - object2.y;
	
	var dist = Math.sqrt(dx*dx + dy*dy);
	
	return dist;
}


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function checkOutOfStage(object)
{
	if (object.x > global.levelWidth) { return false; }
	else if (object.x < 0) { return false; }
	if (object.y >= global.levelHeight) { return false; }
	else if (object.y < 0) { return false; }
		
	return true;
}
