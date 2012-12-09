function Preloader(){
	this.sources;
	this.manifest;
	this.names;
	this.imgs = {};	
	
	this.pr = new createjs.PreloadJS();
	this.pr.owner = this;
	this.pr.onFileLoad = this.onFileLoad; 
	this.pr.onProgress = this.onProgress;
	this.onComplete = null;
	this.pr.onComplete = function(event){
		$("#preloader").fadeOut();
		if(event.target.owner.onComplete) event.target.owner.onComplete();		
	};
	
	this.onProgress = null;
	
	//this.pr.onFileProgress = handleFileProgress;
	//this.pr.onError = handleFileError;
	this.pr.setMaxConnections(1);		
};


Preloader.prototype.getSourceIndex = function(str){
	for (var i=0; i<this.sources.length; i++){
		if (str==this.sources[i]) return i;
	};
	return -1;
};


Preloader.prototype.onFileLoad = 	function(event){
		var n = event.target.owner.getSourceIndex(event.id);
		if (n>=0){
			event.target.owner.imgs[event.target.owner.names[n]] = event.result;
		}		
};



Preloader.prototype.go = function(){	
	//this.pr.loadManifest(this.sources,true);
	this.manifest = this.sources.slice(0);
	
	while (this.manifest.length > 0) {
	    var item = this.manifest.shift();
	    this.pr.loadFile(item);
    }	
};

Preloader.prototype.onProgress = function(event){	
	$("#bar").width(event.target.progress*300);
	if (event.target.owner.onProgress){
		event.target.owner.onProgress(event.target.progress);
	}else{		
	}	
};

//global.preloader = new Preloader();


global.preloader.sources = [
	"img/image0.jpg",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/spider.png",    
    "img/back.jpg",   
	"img/image0.jpg",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/spider.png",    
    "img/image3.jpg",   
	"img/image0.jpg",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/spider.png",    
    "img/image3.jpg",   
	"img/image0.jpg",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/spider.png",    
    "img/image3.jpg"   
];
global.preloader.names = [
	"name0",
	"name1",
	"name2",
	"spider",
	"back",	
	"name0",
	"name1",
	"name2",
	"spider",
	"name3",	
	"name0",
	"name1",
	"name2",
	"spider",
	"name3",	
	"name0",
	"name1",
	"name2",
	"spider",
	"name3"	
];

