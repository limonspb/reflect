Preloader = function(){
	this.sources = [];
	this.manifest;
	this.names = [];
	
	this.imgs = {};

	this.initConstants();
	
	this.pr = new createjs.PreloadJS();
	this.pr.owner = this;
	this.pr.onFileLoad = this.onFileLoad; 
	this.pr.onProgress = this.onProgress;
	this.onComplete = null;
	this.pr.onComplete = function(event){
		if(event.target.owner.onComplete){
			event.target.owner.onComplete();
			$("#preloader").fadeOut();
		}
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
		var n = event.target.owner.getSourceIndex(event.id);
		if (n>=0){
			event.target.owner.imgs[event.target.owner.names[n]] = event.result;
		}		
		console.log(event.target.owner.names[n]);
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


Preloader.prototype.addImage = function(src, name){
	this.sources.push(src);
	this.names.push(name);
}

Preloader.prototype.initConstants = function()
{
   this.addImage("img/image0.jpg","name0");
   this.addImage("img/image1.jpg","name1");
   this.addImage("img/image2.jpg","name2");
   this.addImage("img/spider.png","spider");
   this.addImage("img/back.jpg","back");
   this.addImage("img/back/pattern.png","BackGround");
   this.addImage("img/back/cloud_1.png","cloud_1");
   this.addImage("img/back/cloud_2.png","cloud_2");
   this.addImage("img/back/cloud_3.png","cloud_3");
   this.addImage("img/back/big_1.png","big_1");
   this.addImage("img/back/big_2.png","big_2");
   this.addImage("img/back/big_3.png","big_3");
   this.addImage("img/back/big_4.png","big_4");
   this.addImage("img/back/big_5.png","big_5");
   this.addImage("img/back/big_6.png","big_6");
   this.addImage("img/back/big_7.png","big_7");
   this.addImage("img/back/lit_mount_1.png","lit_mount_1");
   this.addImage("img/back/lit_mount_2.png","lit_mount_2");
   this.addImage("img/back/lit_mount_3.png","lit_mount_3");
   this.addImage("img/back/mount_1.png","mount_1");
   this.addImage("img/back/mount_2.png","mount_2");
   this.addImage("img/back/small_1.png","small_1");
   this.addImage("img/back/small_2.png","small_2");
   this.addImage("img/back/small_3.png","small_3");
   this.addImage("img/back/small_4.png","small_4");
   this.addImage("img/back/small_5.png","small_5");
};

