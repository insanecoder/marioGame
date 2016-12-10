"use strict"
class Rectangle extends PolygonObject{
	
	//len is along X and breadth along Y always
	constructor(originPoint,len,breadth){
		var p1=originPoint;
		var p2= new Point(p1.x+len,p1.y);
		var p3= new Point(p1.x+len,p1.y+breadth);
		var p4= new Point(p1.x,p1.y+breadth);
		var vertexArr=[p1,p2,p3,p4];
		super(vertexArr);
		this.len=len;
		this.breadth=breadth;
	}
	
	checkCollisionWithAnotherOrthRectangle(rect){
		var center=this.getCenter();
		var center1= rect.getCenter();
		if( (center.getXDiff(center1)<=(rect.len+this.len)/2) && (center.getYDiff(center1)<=(rect.breadth+this.breadth)/2) ){
			return true;
		}
		return false;
	}
	
}