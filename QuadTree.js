"use strict";
class QuadTree{
	
	constructor(objectArr,plane,level,sizeLimit){
		this.objectArr=objectArr;
		this.plane=plane;
		this.level=level;
		this.resultObj={};
		this.sizeLimit= sizeLimit;
	}
	
	getSizeLimit(){
		var size= this.objectArr.length;
		var sizeLimit=0;
		for(var i=0;i<size;i++){
			if(Math.max(this.objectArr[i].len,this.objectArr[i].breadth)>sizeLimit){
				sizeLimit= Math.max(this.objectArr[i].len,this.objectArr[i].breadth);
			}
		}
		this.sizeLimit= sizeLimit;
		return this.sizeLimit;
	}
	
	checkIfValidPlaneSize(){
		var sLimit=0;
		if(this.sizeLimit){
			sLimit= this.sizeLimit;
		}else{
			sLimit= this.getSizeLimit();
		}
		var newPlaneLength= this.plane.getMaxLength()/4;
		if(this.sizeLimit<newPlaneLength){
			return true;
		}
		return false;
	}
	
	split(){
		
		var planes=this.plane.splitInEqual4();
		var maxLen= this.objectArr.length;
		
		var planeObjectArr=new Array(4);
		for(var i=0;i<4;i++){
			planeObjectArr[i]= new Array();
		}
		
		for(var i=0;i<maxLen;i++){
			var obj= this.objectArr[i];
			var planeIndexArr= this.getIndexesOfObject(obj,planes);
			if(planeIndexArr[0]==1 && planeIndexArr[3]==1){
				planeIndexArr[1]=planeIndexArr[2]=1;
			}
			for(var j=0;j<4;j++){
				if(planeIndexArr[j]==1){
					planeObjectArr[j].push(obj);
				}
			}
		}
		for(var i=0;i<4;i++){
			if(planeObjectArr.length>1 ){
				var q=new QuadTree(planeObjectArr[i],planes[i],this.level+1,this.sizeLimit);
				q.getClusterByPlane();
			}
		}
	}
	
	getIndexesOfObject(obj,planes){
		
		// 0 if not present in plane i and 1 if present
		var presentInPlane =[0,0,0,0];
		
		// plane 1 and 3 with minX
		var v=obj.getVertexWithMinX();
		if(v.liesInOrthogonalPlane(planes[0])){
			presentInPlane[0]=1;
		}
		if(v.liesInOrthogonalPlane(planes[2])){
			presentInPlane[2]=1;
		}
		
		// plane 2 and 4 with maxX
		var v=obj.getVertexWithMaxX();
		if(v.liesInOrthogonalPlane(planes[1])){
			presentInPlane[1]=1;
		}
		if(v.liesInOrthogonalPlane(planes[3])){
			presentInPlane[3]=1;
		}
		
		// plane 1 and 2 with minY
		var v=obj.getVertexWithMinY();
		if(v.liesInOrthogonalPlane(planes[0])){
			presentInPlane[0]=1;
		}
		if(v.liesInOrthogonalPlane(planes[1])){
			presentInPlane[1]=1;
		}
		
		// plane 3 and 4 with maxY
		var v=obj.getVertexWithMaxY();
		if(v.liesInOrthogonalPlane(planes[2])){
			presentInPlane[2]=1;
		}
		if(v.liesInOrthogonalPlane(planes[3])){
			presentInPlane[3]=1;
		}
		return presentInPlane;
	}
	
	storeResultSet(){
		var maxLen=Object.keys(this.resultObj).length;
		this.resultObj[maxLen+1]=this.objectArr;
	}

	
	getClusterByPlane(){
		if(this.level<MAX_QUADTREE_LEVEL && this.objectArr.length<=MAX_QUADTREE_OBJECTS && this.checkIfValidPlaneSize()){
			this.split();
		}else if(this.objectArr.length>1){
			Stage.storeGlobalCollisionResult(this.objectArr);
			return this.resultObj;
		}
	}
	
}