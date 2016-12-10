"use strict";
class Missile extends Rectangle{
	
	constructor(originPoint,len,breadth){
		super(originPoint,len,breadth);
		this.defaultImage= MISSILE_IMAGE;
		this.currentImage= this.defaultImage;
		this.velocityY=0;
		this.velocityX=0;
	}

	getNextImage(){
		this.currentImage= this.defaultImage;
		return this.currentImage;
	}
	
	setImage(img){
		this.currentImage= img;
	}
	
	getImage(){
		return this.defaultImage;
	}
			   
   	setAnimationXVel(){	
		this.velocityX=-1*MISSILE_XVELOCITY;
	}
	
	setAnimationYVel(){	
		this.applyGravity();
	}
	
	setXVel(xVel){
		this.velocityX= xVel;
	}
	
	setYVel(yVel){
		this.velocityY= yVel;
	}
	
	getNextXCord(){
		var xPos=(this.vertexArr[0].x+this.velocityX);
		return xPos;
	}
	
	getNextYCord(){
		var yPos= (this.vertexArr[0].y+this.velocityY);
		return yPos;
	}
	
	applyGravity(){
		this.velocityY+=MISSILE_GRAVITY;
		return this.velocityY;
	}
}