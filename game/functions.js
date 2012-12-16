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
			if ( (Math.abs(x2 - p.x) <= Math.abs(x2-x1)) &&  (Math.abs(x1 - p.x) <= Math.abs(x2-x1))){
				return p;
			}else{
				return null;
			}
		}
	}
	
}
