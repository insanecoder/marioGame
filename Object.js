"use strict"
class PolygonObject{
	
	constructor(vertexArr){
		this.vertexArr=vertexArr;
		this.uniqueObjectID;
		this.toDeferCall=0;
		this.checkCollisionWith={};
		this.isDeferCollided=0;
	}
	
	getVertexWithMinX(){
		var minX=this.vertexArr[0].x;
		var lenVertices= this.vertexArr.length;
		var vertex=this.vertexArr[0];
		for(var i=0;i<lenVertices;i++){
			if(this.vertexArr[i].x<minX){
				minX=this.vertexArr[i].x;
				vertex=this.vertexArr[i];
			}
		}
		return vertex;
	}
	
	getVertexWithMaxX(){
		var maxX=this.vertexArr[0].x;
		var lenVertices= this.vertexArr.length;
		var vertex=this.vertexArr[0];
		for(var i=0;i<lenVertices;i++){
			if(this.vertexArr[i].x>maxX){
				maxX=this.vertexArr[i].x;
				vertex=this.vertexArr[i];
			}
		}
		return vertex;
	}

	
	getVertexWithMinY(){
		var minY=this.vertexArr[0].y;
		var lenVertices= this.vertexArr.length;
		var vertex=this.vertexArr[0];
		for(var i=0;i<lenVertices;i++){
			if(this.vertexArr[i].y<minY){
				minY=this.vertexArr[i].y;
				vertex=this.vertexArr[i];
			}
		}
		return vertex;
	}
	
	getVertexWithMaxY(){
		var maxY=this.vertexArr[0].y;
		var lenVertices= this.vertexArr.length;
		var vertex=this.vertexArr[0];
		for(var i=0;i<lenVertices;i++){
			if(this.vertexArr[i].y>maxY){
				maxY=this.vertexArr[i].y;
				vertex=this.vertexArr[i];
			}
		}
		return vertex;
	}
	
	getCenter(){
		var maxlen= this.vertexArr.length;
		var tempX=0;var tempY=0;
		for(var i=0;i<maxlen;i++){
			tempX+= this.vertexArr[i].x;
			tempY+= this.vertexArr[i].y;
		}
		return new Point(tempX/maxlen,tempY/maxlen);
	}
	
	getY(){
		var maxY= this.getVertexWithMaxY();
		return maxY.y;
	}
	
	getMinX(){
		var minX= this.getVertexWithMinX();
		return minX.x;
	}
	
	getMaxX(){
		var maxX= this.getVertexWithMaxX();
		return maxX.x;
	}
	
	getMinY(){
		var minY= this.getVertexWithMinY();
		return minY.y;
	}
	
	getImage(){
		return this.currentImage;
	}
	
	toBeCollectedByGarbage(){
		return true;
	}
	toBeConsideredWithCollision(){
		return false;
	}
	
	handleCollision(){
		
	}
	
	setUniqueObjectID(id){
		this.uniqueObjectID= id;
	}
	
	getUniqueID(){
		return this.uniqueObjectID;
	}
}