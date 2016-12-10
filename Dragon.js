"use strict";
class Dragon extends Rectangle{
	
	constructor(originPoint,len,breadth){
		super(originPoint,len,breadth);
		this.keyEvent=0;
		this.defaultImage= DRAGON_IMAGE;
		this.currentImage= this.defaultImage;
		this.velocityY=0;
		this.velocityX=0;
		this.energy= DRAGON_ENERGY;
		this.isFreeze=0;
	}
	
	setKeyEvent(key){
		this.keyEvent=key;
	}
	
	setEnergy(energy){
		this.energy= energy;
	}
	
	setEventXVelocity(){
		this.velocityY=0;
	}
	
	getNextImage(){
		this.currentImage= this.defaultImage;
		return this.currentImage;
	}
	
	setImage(img){
		this.currentImage= img;
	}
	
	getImage(){
		return this.currentImage;
	}
	
	setCurrentIndex(currIndex){
		this.currentSpriteIndex= currIndex;
	}
				   
   	setYVelocity(){	
		if(this.isFreeze){
				this.velocityY=0;
				return;
			}
		if(Stage.checkIfObjectCrossYBoundary(this)){
			
			this.velocityY= -1*DRAGON_YVELOCITY;
		}else{
			this.applyGravity();
		}
	}
	
	setYVel(Vy){
		this.velocityY= Vy;
	}
	
	applyGravity(){
		if(!Stage.checkIfObjectCrossYBoundary(this)){
			this.velocityY+=DRAGON_GRAVITY;
		}else{
			this.velocityY=0;
		}
		return this.velocityY;
	}

	
	getNextXCord(){
		var xPos=(this.vertexArr[0].x+this.velocityX);
		return xPos;
	}
	
	getNextYCord(){
		var yPos= (this.vertexArr[0].y+this.velocityY);
		var dragonImage= document.getElementById(this.currentImage[0]);
		if(dragonImage)
			var imageHeight= dragonImage.height;
		if(yPos>(Stage.getMaxYOfCanvas()-imageHeight) && this.keyEvent!=38){
			yPos= Stage.getMaxYOfCanvas()-imageHeight;
		}
		return yPos;
	}
	
	toBeCollectedByGarbage(){
		return false;
	}
	
	toBeConsideredWithCollision(){
		return true;
	}
	
	dragonDead(){
		g.setGameStatus(GAME_WON);
		g.resetGame();
	}
	
	hitDetected(objID){
		//g.callAlert();
		this.energy--;
		ObjectWrapper.deleteFromObjList(objID);
		if(this.energy<=0){
			this.dragonDead();
		}else{
			g.fillTextInsideCanvas(DRAGON_HIT_MESSAGE);
			this.isFreeze=1;
			setTimeout(function(){ ObjectWrapper.removeDragonFreeze() },1000);
		}
	}
	
	handleCollision(objID){
		switch(objID){
			case TYPE_DUCKS+objID.slice(TYPE_DUCKS.length):
				var duck= ObjectWrapper.getObjectByKey(objID);
				var tempDuck= new Duck(new Point(duck.x-5,duck.y));
				if(duck.checkCollisionWithAnotherOrthRectangle(this)){
					if(duck.isDead){
						this.hitDetected(objID);
						//Stage.checkBufferCollision(this,duck);
						//if(this.isDeferCollided){
							//this.hitDetected(objID);
						//}
					}
					else{
						ObjectWrapper.deleteFromObjList(objID);
					}
				}
			}
	}
	
}