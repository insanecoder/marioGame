var ObjectWrapper=(
	
	function(){
		var objectList={};
		var keyEvent= 0;
		
		var missileCount=0;
		var duckCount= 0;
		var ifWeCanAddDuck= 1;
		var ifWeCanAddMissile= 1;
		
		function getObjectByType(type){
			var objSelected;
			switch(type){
				case TYPE_PLAYER:
					objSelected= getPlayerObj(type);
					break;
				case TYPE_DRAGON:
					objSelected= getDragonObj(type);
					break;
				case TYPE_MISSILES+type.slice(TYPE_MISSILES.length):
					objSelected= getMissileObj(type);
					break;
					
				case TYPE_DUCKS+type.slice(TYPE_DUCKS.length):
					objSelected= getDuckObj(type);
					break;
			}
			objectList[type]= objSelected;
			objSelected.setUniqueObjectID(type);
		}
		
		function deferCallSettings(newObj,oldObj){
			newObj.toDeferCall=oldObj.toDeferCall;
			newObj.checkCollisionWith=oldObj.checkCollisionWith;
			newObj.isDeferCollided=oldObj.isDeferCollided;
			return newObj;
		}
		
		function getPlayerObj(type){
			if(!objectList[type]){
				return getDefaultPlayer();
			}else{
				var player= objectList[type];
				if(keyEvent){
					player.setKeyEvent(keyEvent);
				}
				player.setEventXVelocity();
				player.setEventYVelocity();
				var img=player.getNextImage();
				var tempImg= document.getElementById(img);
				var nextPlayerObj= new Player(new Point(player.getNextXCord(),player.getNextYCord()),tempImg.width, tempImg.height );
				nextPlayerObj.setYVel(player.velocityY);
				nextPlayerObj.setImage(img);
				nextPlayerObj.setIsFacingForward(player.isFacingForward);
				nextPlayerObj.setCurrentIndex(player.getNextCurrentIndex());
				nextPlayerObj.setIfInAir(player.isInAir);
				nextPlayerObj.isDead= player.isDead;
				return nextPlayerObj;
			}
		}
		
		function getDefaultPlayer(){
			var img= document.getElementById(PLAYER_IMAGE);
			var player= new Player(new Point(PLAYER_XPOS,PLAYER_YPOS),img.width,img.height);
			player.setImage(PLAYER_IMAGE);
			player.setCurrentIndex(0);
			return player;
		}
		
		function getDuckObj(type){
			if(!objectList[type]){
				return getDefaultDuck();
			}else{
				var duck= objectList[type];
				var img=duck.getNextImage();
				var tempImg= document.getElementById(img);
				duck.setEventXVelocity();
				duck.setEventYVelocity();
				var nextDuckObj= new Duck(new Point(duck.getNextXCord(),duck.getNextYCord()),tempImg.width, tempImg.height );
				nextDuckObj.setYVel(duck.velocityY);
				nextDuckObj.setImage(img);
				nextDuckObj.setCurrentIndex(duck.getNextCurrentIndex());
				nextDuckObj.isDead= duck.isDead;
				nextDuckObj.setDeadAndRunningBack(duck.isDeadAndRunningBack);
				return nextDuckObj;
			}
		}
		
		function getDefaultDuck(){
			var img= document.getElementById(DUCK_IMAGE);
			var duck= new Duck(new Point(DUCK_XPOS,DUCK_YPOS),img.width,img.height);
			duck.setImage(DUCK_IMAGE);
			return duck;
		}
		
		function getDragonObj(type){
			if(!objectList[type]){
				return getDefaulDragon();
			}else{
				var dragon= objectList[type];
				dragon.setYVelocity();
				var img=dragon.getNextImage();
				var tempImg= document.getElementById(img[0]);
				var nextDragonObj= new Dragon(new Point(dragon.getNextXCord(),dragon.getNextYCord()),tempImg.width, tempImg.height );
				nextDragonObj.setYVel(dragon.velocityY);
				nextDragonObj.setEnergy(dragon.energy);
				nextDragonObj.isFreeze= dragon.isFreeze;
				nextDragonObj=deferCallSettings(nextDragonObj,dragon);
				return nextDragonObj;
			}
		}
		
		function getDefaulDragon(){
			var img= document.getElementById(DRAGON_IMAGE[0]);
			var dragon= new Dragon(new Point(DRAGON_XPOS,DRAGON_YPOS),img.width,img.height);
			return dragon;
		}
		
		function getMissileObj(type){
			if(!objectList[type]){
				return getDefaultMissileObj();
			}else{
				var missile= objectList[type];
				missile.setAnimationXVel();
				missile.setAnimationYVel();
				var img=missile.getNextImage();
				var tempImg= document.getElementById(img);
				var nextMissileObj= new Missile(new Point(missile.getNextXCord(),missile.getNextYCord()),tempImg.width, tempImg.height );
				
				nextMissileObj.setXVel(missile.velocityX);
				nextMissileObj.setYVel(missile.velocityY);
				return nextMissileObj;
			}
		}
		
		function getDefaultMissileObj(){
			var dragon= objectList[TYPE_DRAGON];
			var posY= dragon.vertexArr[0].y+20;
			var posX= dragon.vertexArr[0].x-50;
			var missile= new Missile(new Point(posX,posY),63,28);
			return missile;
		}
		
		function addMissiles(){
				var type= TYPE_MISSILES+'_'+missileCount;
				getObjectByType(type);
				missileCount++;
		}
		
		function addDucks(){
				var type= TYPE_DUCKS+'_'+duckCount;
				getObjectByType(type);
				duckCount++;
		}
		
		return {
			init: function(key){
				keyEvent= key;
			},
			getObjectList: function(){
				var tempObjList =objectList;
				for( x in tempObjList){
					getObjectByType(x);
				}
				return objectList;
			},
			addDefaultObjects(){
				if(!objectList[TYPE_PLAYER]){
					getObjectByType(TYPE_PLAYER);
				}
				if(!objectList[TYPE_DRAGON]){
					getObjectByType(TYPE_DRAGON);
				}
			},
			addOtherObjects(){
				if(ifWeCanAddDuck){
					ifWeCanAddDuck= 0;
					addDucks();
					var randomTime= Math.random()*TIME_MAX_DUCKS+TIME_MIN_DUCKS;
					setTimeout( function(){ifWeCanAddDuck =1;}, randomTime);
				}
				
				if(ifWeCanAddMissile){
					ifWeCanAddMissile= 0;
					addMissiles();
					setTimeout( function(){ifWeCanAddMissile =1;}, TIME_MISSILES);
				}
			},
			deleteFromObjList(key){
				delete objectList[key];
			},
			getObjectByKey(key){
				return objectList[key];
			},
			clearAll(){
				objectList={};
			},
			removeDragonFreeze(){
				var dragon= objectList[TYPE_DRAGON];
				dragon.isFreeze=0;
			}
		};
	}
)();