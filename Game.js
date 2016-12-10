"use strict";
class Game{
	
	constructor(canvasObj){
		this.canvasObj=canvasObj;
		this.ctx= this.canvasObj.ctx;
		this.stage='';
		this.keyEvent=0;
		this.gameStatus= GAME_RUNNING;
		this.alert=0;
	}
	
	start(){
		this.renderStage();
		var objs= this.getObjectList();
		var collisionGroups= this.getCollisionGroups(objs);
		this.handleCollisionGroups(collisionGroups);
		for(x in objs){
			this.renderObject(objs[x]);
			this.garbageCollection(objs[x],x)
			//if(objs[x].toDeferCall){
			//	this.checkForDeferCollision(objs[x]);
			//}
		}
		this.checkForAlert();
	}
	callAlert(){
		this.alert=1;
	}
	
	checkForAlert(){
		if(this.alert){
			this.alert=0;
			alert('here');
		}
	}
	
	resetGame(){
		ObjectWrapper.clearAll();
	}
	
	setGameStatus(status){
		this.gameStatus= status;
	}
	
	garbageCollection(obj,key){
		if(obj.toBeCollectedByGarbage()){
			if( Stage.checkIfObjectCrossLeftBoundary(obj) || Stage.checkIfObjectCrossRightBoundary(obj) ||
			  	Stage.checkIfBelowGround(obj) ){
					ObjectWrapper.deleteFromObjList(key);
			}
		}
	}
	
	getCollisionGroups(objs){
		var objArr= Object.keys(objs).map(function(key){return objs[key]});
		var quadTreeObj= new QuadTree(objArr,Stage.getFirstCanvasPlane(),1,0);
		quadTreeObj.getClusterByPlane();
		var groups= Stage.getGlobalCollisionObjs();
		Stage.clearGlobalCollisionResult();
		return groups;
	}
	
	handleCollisionGroups(collisionGroups){
		for(var rects in collisionGroups){
			var objArr= collisionGroups[rects];
			this.handleCollisionForGroup(objArr);
		}
	}
	
	handleCollisionForGroup(group){
		var maxObjArr= group.length;
		for(var i=0;i<maxObjArr;i++){
			if(group[i].toBeConsideredWithCollision()){
				for(var j=0;j<maxObjArr;j++){
					if(ObjectWrapper.getObjectByKey(group[j].getUniqueID()) && group[i].getUniqueID()!=group[j].getUniqueID()){
						group[i].handleCollision(group[j].getUniqueID());
					}
				}
			}
		}
	}
		
		
	getObjectList(){
		ObjectWrapper.init(this.keyEvent);
		return ObjectWrapper.getObjectList();
	}
	
	renderStage(){
		var img= Stage.getInstance('mario_stage');
		Stage.setCanvas(this.canvasObj);
		this.ctx.drawImage(img,0,0,img.width,img.height,0,this.canvasObj.canvasHeight-img.height,img.width,img.height);
		
		//render walls
		for(var wall in WALL_OBJS){
			var w= WALL_OBJS[wall];
			var img= document.getElementById(w.img);
			console.log(w);
			this.ctx.drawImage(img,0,0,img.width,img.height,w.x,w.y,img.width,img.height);
		}
		this.stage=img;
		ObjectWrapper.addDefaultObjects();
		ObjectWrapper.addOtherObjects();
	}
	
	renderObject(obj){
		var img= obj.getImage();
		if( Object.prototype.toString.call( img ) !== '[object Array]' ) {
    		img=[img];
		}
		for(var tempImg in img){
			var tempImgObj= document.getElementById(img[tempImg]);
			this.ctx.drawImage(tempImgObj,obj.vertexArr[0].x, obj.vertexArr[0].y);
		}
	}
	
	clearScreen(){
		this.ctx.clearRect(0, 0, this.canvasObj.canvasWidth, this.canvasObj.canvasHeight);
	}	
	
	addEvent(keyCode){
		this.keyEvent= keyCode;
	}
	
	clearEvent(){
		this.keyEvent= 0;
	}
	
	fillTextInsideCanvas(text){
	  	this.ctx.fillStyle = "blue";
	  	this.ctx.font = "bold 20px Arial";
	  	this.ctx.textAlign="center"; 
		this.ctx.textBaseline ='middle';
		this.ctx.fillText(text,this.canvasObj.canvasWidth/2,this.canvasObj.canvasHeight/2);
	}
	
	checkForDeferCollision(obj1){
		var imageData;
		var obj2= obj1.checkCollisionWith;
		if(obj1.getMinX()<obj2.getMinX()){
			imageData= canvasObj.ctx.getImageData(obj1.getMinX()-BUFFER_COLLISION,obj1.getMinY()-BUFFER_COLLISION,obj1.breadth,2*BUFFER_COLLISION);
		}else{
			imageData= canvasObj.ctx.getImageData(obj2.getMinX()-BUFFER_COLLISION,obj2.getMinY()-BUFFER_COLLISION,obj2.breadth,2*BUFFER_COLLISION);
		}
		var maxLen= imageData.data.length;
		imageData= imageData.data;
		console.log(imageData);
		for(var i=0;i<maxLen;i=i+4){
			if(imageData[i+3]!=1){
				obj1.isDeferCollided=1;
			}	
		}
	}
	
}