"use strict";
class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	
	liesInOrthogonalPlane(P){
		var minX= Math.min(P.p1.x,P.p2.x,P.p3.x,P.p4.x);
		var maxX= Math.max(P.p1.x,P.p2.x,P.p3.x,P.p4.x);
		var minY= Math.min(P.p1.y,P.p2.y,P.p3.y,P.p4.y);
		var maxY= Math.max(P.p1.y,P.p2.y,P.p3.y,P.p4.y);
		if(this.x>=minX && this.x<=maxX && this.y>= minY && this.y<=maxY){
			return true;
		}
		return false;
	}
	
	distanceWithPoint(p){
		return Math.sqrt( (p.x-this.x)*(p.x-this.x) + (p.y-this.y)*(p.y-this.y) );
	}
	
	getXDiff(p){
		return Math.abs(p.x-this.x);
	}
	
	getYDiff(p){
		return Math.abs(p.y-this.y);
	}
}