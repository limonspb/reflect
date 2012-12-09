function SceneController(){
	this.currentScene;
}

SceneController.prototype.closeCurrent = function(){
	console.log('SceneController.prototype.closeCurrent');
	if (this.currentScene){
		this.currentScene.close();
	}
}

global.sceneController = new SceneController();


