function SceneController(){
	this.currentScene = null;
	this.menuScene = new MenuScene();
	this.creditsScene = new CreditsScene();
	this.gameScene = new GameScene();
	this.event = 0;
}

SceneController.eventTypes = {};
SceneController.eventTypes.MAIN_MENU = 1;
SceneController.eventTypes.CREDITS = 2;
SceneController.eventTypes.NEW_GAME = 3;

SceneController.prototype.switchScene = function(s_event){
	if (this.currentScene){
		this.currentScene.hide();
	}
	
	var scene = null;
	switch (s_event){
		case SceneController.eventTypes.MAIN_MENU:
			scene = this.menuScene
			break
		case SceneController.eventTypes.CREDITS:
			scene = this.creditsScene
			break
		case SceneController.eventTypes.NEW_GAME:
			scene = this.gameScene
			break 
	}
	this.currentScene = scene;
	if (this.currentScene){
		this.currentScene.show();
	}
}



