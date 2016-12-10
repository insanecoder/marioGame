"use strict";
class Plane{
	constructor(p1,p2,p3,p4){
		this.p1=p1;
		this.p2=p2;
		this.p3=p3;
		this.p4=p4;
	}
	
	splitInEqual4(){
		var center= this.getCenter();
		var plane1= this.getOrthogonalPlaneBetweenPoints(this.p1,center);
		var plane2= this.getOrthogonalPlaneBetweenPoints(new Point( (this.p1.x+this.p2.x)/2,this.p1.y ),new Point( this.p2.x, (this.p2.y+this.p4.y)/2 ));
		var plane3= this.getOrthogonalPlaneBetweenPoints( new Point(this.p1.x,(this.p1.y+this.p3.y)/2), new Point((this.p3.x+this.p4.x)/2,this.p3.y));
		var plane4= this.getOrthogonalPlaneBetweenPoints(center,this.p4);
		return [plane1,plane2,plane3,plane4];
	}
	
	getCenter(){
		var centerX=(this.p1.x+this.p2.x+this.p3.x+this.p4.x)/4;
		var centerY=(this.p1.y+this.p2.y+this.p3.y+this.p4.y)/4;
		var center= new Point(centerX,centerY);
		return center;
	}
	
	getOrthogonalPlaneBetweenPoints(p1,p4){
		var p3= new Point(p1.x,p4.y);
		var p2= new Point(p4.x,p1.y);
		return new Plane(p1,p2,p3,p4);
	}
	
	getMaxLength(){
		return Math.max(this.p1.distanceWithPoint(this.p2), this.p1.distanceWithPoint(this.p3));
	}
}