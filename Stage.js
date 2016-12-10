var Stage=(
	
	function(){
		
		var stageSelected='';
		var stageArr={};
		var canvasObj='';
		var collisionObjs={};
		
		return {
			getInstance: function(stageId){
				if(!stageArr[stageId]){
					stageSelected= stageId;
					stageArr[stageId]= document.getElementById(stageId);
				}
				return stageArr[stageId];
			},
			
			getMinXOfCanvas(){
				return 0;
			},
			
			getMaxXOfCanvas(){
				return canvasObj.canvasWidth;
			},
			
			getMaxYOfCanvas(){
				return canvasObj.canvasHeight-stageArr[stageSelected].height;
			},
			
			setCanvas(can){
				canvasObj= can;
			},
			
			checkIfObjectCrossLeftBoundary(obj){
				if(obj.getMinX()<=0){
					return true;
				}
				return false;
			},
		
			checkIfObjectCrossRightBoundary(obj){
				if(obj.getMaxX()>=canvasObj.canvasWidth){
					return true;
				}
				return false;
			},
	
			checkIfObjectCrossYBoundary(obj){
				if(obj.getY()<=0 || obj.getY()>=canvasObj.canvasHeight-stageArr[stageSelected].height){
					return true;
				}
				return false;
			},
			
			checkIfBelowGround(obj){
				if(obj.getY()<0 || obj.getY()>canvasObj.canvasHeight-stageArr[stageSelected].height){
					return true;
				}
				return false;
			},
		
			getFirstCanvasPlane(){
				var p1= new Point(0,0);
				var p2= new Point(canvasObj.canvasWidth,0);
				var p3= new Point(0,canvasObj.canvasHeight-stageArr[stageSelected].height);
				var p4= new Point(canvasObj.canvasWidth, canvasObj.canvasHeight-stageArr[stageSelected].height);
				var plane= new Plane(p1,p2,p3,p4);
				return plane;
			},
			
			storeGlobalCollisionResult(objs){
				var maxLen=Object.keys(collisionObjs).length;
				collisionObjs[maxLen+1]=objs;
			},
			clearGlobalCollisionResult(){
				collisionObjs={};
			},
			getGlobalCollisionObjs(){
				return collisionObjs;
			},
			
			checkBufferCollision(obj1,obj2){
				obj1.toDeferCall=0;
				obj1.checkCollisionWith= obj2;
			}
		};
	}
)();