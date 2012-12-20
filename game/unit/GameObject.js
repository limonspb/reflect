/**
 * @author ProBigi
 */

function GameObject()
{
	GameObject.superclass.constructor.apply(this);
}

extend(GameObject,createjs.Container);

GameObject.prototype.getDistanceToObject = function(object) {
	var dx = this.x - object.x;
	var dy = this.y - object.y;
	
	var dist = Math.sqrt(dx*dx + dy*dy);
	
	return dist;
}