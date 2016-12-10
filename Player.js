"use strict";
class Player extends Rectangle{
	
	constructor(originPoint,len,breadth){
		super(originPoint,len,breadth);
		this.forwardspriteArr=["mario1","mario2","mario3"];
		this.backwardspriteArr=["mario1_back","mario2_back","mario3_back"];
		this.forwardspriteLength= this.forwardspriteArr.length;
		this.backwardspriteLength= this.backwardspriteArr.length;
		this.keyEvent=0;
		this.currentSpriteIndex=0;
		this.defaultImage= this.forwardspriteArr[0];
		this.velocityY=0;
		this.velocityX=0;
		this.downImage='mario_down';
		this.downBackImage= 'mario_down_back';
		this.isFacingForward=1;
		this.isCrouching= 0;
		this.isInAir=0;
		this.isDead= 0;
	}
	
	setKeyEvent(key){
		this.keyEvent=key;
	}
	
	setIfInAir(val){
		this.isInAir= val;
	}
	
	getDefaultImage(){
		this.currentSpriteIndex=0;
		if(this.isFacingForward){
			return this.forwardspriteArr[0];
		}
		return this.backwardspriteArr[0];
	}
	
	setIsFacingForward(isFacingForward){
		this.isFacingForward= isFacingForward;
	}
	
	getCrouchingImage(){
		if(this.isFacingForward){
			return this.downImage;
		}
		return this.downBackImage;
	}
	
	setEventXVelocity(){
		
		switch(this.keyEvent){
			case 37:
				this.isFacingForward=0;
				if(!Stage.checkIfObjectCrossLeftBoundary(this)){
					this.velocityX=-1*PLAYER_XVELOCITY;
				}else{
					this.velocityX= 0;
				}
				break;
				
			case 39:
				this.isFacingForward=1;
				if(!Stage.checkIfObjectCrossRightBoundary(this)){
					this.velocityX=PLAYER_XVELOCITY;
				}else{
					this.velocityX= 0;
				}
				break;
			case 40:
				if(Stage.checkIfObjectCrossYBoundary(this)){
					this.velocityX=0;
					this.isCrouching= 1;
				}
				break;
				
			default:
				this.velocityX= 0;
				break;
		}
	}
	
	getNextImage(){
		
		if(this.isInAir){
			return this.getDefaultImage();
		}
		
		switch(this.keyEvent){
				
			case 37:
				var img= this.backwardspriteArr[this.getNextCurrentIndex()];
				return img;
				break;
				
			case 39:
				var img= this.forwardspriteArr[this.getNextCurrentIndex()];
				return img;
				break;
				
			case 40:
				if(Stage.checkIfObjectCrossYBoundary){
					return this.getCrouchingImage();
				}
				return this.currentImage;
				break;
				
			default:
				return this.getCurrentImage();
		}
	}
	
	getNextCurrentIndex(){
		var tempIndex= this.currentSpriteIndex;
		if(this.keyEvent==37 || this.keyEvent==39){
			return ((tempIndex+1)%this.backwardspriteLength);
		}
		return tempIndex;
	}

	
	getCurrentImage(){
		if(this.currentImage!=this.downImage && this.currentImage!= this.downBackImage){
			return this.currentImage;
		}
		return this.getDefaultImage();
	}
	
	setImage(img){
		this.currentImage= img;
	}
	
	setCurrentIndex(currIndex){
		this.currentSpriteIndex= currIndex;
	}
				   
   	setEventYVelocity(){
		switch(this.keyEvent){
			case 38:
				if(Stage.checkIfObjectCrossYBoundary(this)){
					this.velocityY= -1*PLAYER_YVELOCITY;
					this.isInAir=1;
				}else{
					this.applyGravity();
				}
				break;
			
				
			default:
				this.applyGravity();
				break;
		}
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

	
	getNextXCord(){
		var xPos=(this.vertexArr[0].x+this.velocityX);
		if(xPos<Stage.getMinXOfCanvas()){
			xPos=0;
		}
		if(xPos>Stage.getMaxXOfCanvas()){
			xPos=Stage.getMaxXOfCanvas();
		}
		return xPos;
	}
	
	getNextYCord(){
		var yPos= (this.vertexArr[0].y+this.velocityY);
		var nextPlayerImage= document.getElementById(this.getNextImage());
		var imageHeight= nextPlayerImage.height;
		if(yPos>=(Stage.getMaxYOfCanvas()-imageHeight) && this.keyEvent!=38){
			yPos= Stage.getMaxYOfCanvas()-imageHeight;
			this.isInAir= 0;
		}else if(yPos<=(Stage.getMaxYOfCanvas()-imageHeight) && this.isCrouching){
			yPos= Stage.getMaxYOfCanvas()-imageHeight;
			this.isInAir= 0;
		}
		return yPos;
	}
	
	toBeCollectedByGarbage(){
		return false;
	}
	
	toBeConsideredWithCollision(){
		return true;
	}
	
	playerDead(){
		this.isDead =1;
		g.setGameStatus(GAME_OVER);
		g.resetGame();
	}
	
	handleCollision(objID){
		switch(objID){
				
				case TYPE_DRAGON:
					var dragon= ObjectWrapper.getObjectByKey(objID);
					if(dragon.checkCollisionWithAnotherOrthRectangle(this)){
						this.playerDead();
					}
					break;
				case TYPE_MISSILES+objID.slice(TYPE_MISSILES.length):
					var missile= ObjectWrapper.getObjectByKey(objID);
					if(missile.checkCollisionWithAnotherOrthRectangle(this)){
						this.playerDead()
					}
					break;
					
				case TYPE_DUCKS+objID.slice(TYPE_DUCKS.length):
					var duck= ObjectWrapper.getObjectByKey(objID);
					if(duck.checkCollisionWithAnotherOrthRectangle(this)){
						if(this.velocityY>0 && this.isInAir ){
							duck.isDead= 1;
							this.velocityY= 0;
						}else if(duck.isDead==0 || duck.isDeadAndRunningBack){
							this.playerDead();
						}
					}
					break;
			}
	}
}