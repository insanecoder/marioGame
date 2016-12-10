"use strict";
class Duck extends Rectangle{
	
	constructor(originPoint,len,breadth){
		super(originPoint,len,breadth);
		this.backwardspriteArr=["duck1","duck2"];
		this.duckDeadImage= 'duck_dead';
		this.backwardspriteLength= this.backwardspriteArr.length;
		this.currentSpriteIndex=0;
		this.defaultImage= this.backwardspriteArr[0];
		this.velocityY=0;
		this.velocityX=0;
		this.isDead= 0;
		this.isDeadAndRunningBack= 0;
	}	
	
	setEventXVelocity(){
		if(this.isDead){
			var mul=1;
			if(this.isDeadAndRunningBack==1){
				mul= -1;
			}
			this.velocityX= mul*DUCK_VELOCITY;
			return;
		}
		if(Stage.checkIfObjectCrossYBoundary(this)){
			this.velocityX= -1*DUCK_VELOCITY;
		}else{
			this.velocityX= 0;
		}
	}
	
	toBeConsideredWithCollision(){
		return true;
	}
	
	getNextImage(){
		if(this.isDead){
			return this.duckDeadImage;
		}
		var img= this.backwardspriteArr[this.getNextCurrentIndex()];
		return img;
	}
	
	getNextCurrentIndex(){
		var tempIndex= (this.currentSpriteIndex+1)%this.backwardspriteLength;
		return tempIndex;
	}
	
	setImage(img){
		this.currentImage= img;
	}
		
	setCurrentIndex(currIndex){
		this.currentSpriteIndex= currIndex;
	}
				   
   	setEventYVelocity(){
		this.applyGravity();
	}
	
	setYVel(Vy){
		this.velocityY= Vy;
	}
	
	applyGravity(){
		if(!Stage.checkIfObjectCrossYBoundary(this)){
			this.velocityY+=GRAVITY_STAGE;
		}else{
			this.velocityY=0;
		}
		return this.velocityY;
	}
	
	getImage(){
		return this.currentImage;
	}

	
	getNextXCord(){
		var xPos=(this.vertexArr[0].x+this.velocityX);
		return xPos;
	}
	
	getNextYCord(){
		var yPos= (this.vertexArr[0].y+this.velocityY);
		var nextPlayerImage= document.getElementById(this.getNextImage());
		var imageHeight= nextPlayerImage.height;
		if(yPos>=(Stage.getMaxYOfCanvas()-imageHeight) ){
			yPos= Stage.getMaxYOfCanvas()-imageHeight;
		}
		return yPos;
	}
	
	setDeadAndRunningBack(val){
		this.isDeadAndRunningBack= val;
	}
	handleCollision(objID){
		switch(objID){
				case TYPE_DUCKS+objID.slice(TYPE_DUCKS.length):
					var duck= ObjectWrapper.getObjectByKey(objID);
					var tempDuck= new Duck(new Point(duck.getNextXCord()-10,duck.getNextYCord()),duck.len,duck.breadth);
					if(tempDuck.checkCollisionWithAnotherOrthRectangle(this)){
						if(duck.isDead || this.isDead==1){
							duck.isDead= 1;
							this.isDead= 1;
						}
						if(duck.getMinX()<this.getMinX()){
							duck.isDeadAndRunningBack= 1;
							this.isDeadAndRunningBack= 0;
						}else{
							duck.isDeadAndRunningBack= 0;
							this.isDeadAndRunningBack= 1;
						}
					}
					break;
		}
	}
}