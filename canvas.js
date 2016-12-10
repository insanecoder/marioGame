var Canvas=(
	
	function(){
		this.canvas='';
		this.ctx='';
		this.canvasContext="2d";
		this.canvasHeight='';
		this.canvasWidth='';
	
		var multipleCanvas={};

		var initCanvasFunction= function(canvasID){
			this.canvas = document.getElementById(canvasID);
			var canvas= this.canvas;
			this.ctx = canvas.getContext(this.canvasContext);
			this.canvasContext="2d";
			this.canvasHeight =canvas.height;
			this.canvasWidth= canvas.width;
			multipleCanvas[canvasID]=this;
		};
		return {
			getAttr:function(canvasID,attr){
				return multipleCanvas[canvasID][attr];
			},
			getInstance: function(canvasID){
				if(!multipleCanvas.canvasID){
					initCanvasFunction(canvasID);
				}
				return multipleCanvas[canvasID];
			}
		};

	}
)();
