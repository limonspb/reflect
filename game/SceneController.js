function SceneController(){
	this.currentScene;
	this.menuScene = new MenuScene();
}

SceneController.prototype.closeCurrent = function(){
	console.log('SceneController.prototype.closeCurrent');
	if (this.currentScene){
		this.currentScene.close();
	}
}




