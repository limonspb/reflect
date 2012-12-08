function Preloader(){
	this.sources;
	this.names;
	this.imgs = {};
	
	this.pr = new createjs.PreloadJS();
	this.pr.owner = this;
	this.pr.onFileLoad = this.onFileLoad; 
	this.pr.onProgress = this.onProgress;
	this.onComplete = null;
	this.pr.onComplete = function(event){
		if(event.target.owner.onComplete) event.target.owner.onComplete()
	};
	
	this.onProgress = null;
	
	//this.pr.onFileProgress = handleFileProgress;
	//this.pr.onError = handleFileError;
	this.pr.setMaxConnections(5);		
};


Preloader.prototype.getSourceIndex = function(str){
	for (var i=0; i<this.sources.length; i++){
		if (str==this.sources[i]) return i;
	};
	return -1;
};


Preloader.prototype.onFileLoad = 	function(event){
		console.log('file loaded: '+event.id);
		console.log(event.target.toString());
		var n = event.target.owner.getSourceIndex(event.id);
		if (n>=0){
			event.target.owner.imgs[event.target.owner.names[n]] = event.result;
		}		
};



Preloader.prototype.go = function(){
	this.pr.loadManifest(this.sources,true);
};

Preloader.prototype.onProgress = function(event){
	if (event.target.owner.onProgress){
		event.target.owner.onProgress(event.target.progress);
	}else{
		console.log('TOTAL: '+event.target.progress);	
	}
	
};

global.preloader = new Preloader();
