function SceneController(){
	this.currentScene = null;
	this.menuScene = new MenuScene();
	this.creditsScene = new CreditsScene();
	this.gameScene = new GameScene();
	this.infoScene = new InfoScene();
	this.settingsScene = new SettingsScene();
	this.recordsScene = new RecordsScene();
	this.gameOverScene = new GameOverScene();
	this.event = 0;
}

SceneController.eventTypes = {};
SceneController.eventTypes.MAIN_MENU = 1;
SceneController.eventTypes.CREDITS = 2;
SceneController.eventTypes.NEW_GAME = 3;
SceneController.eventTypes.INFO = 4;
SceneController.eventTypes.SETTINGS = 5;
SceneController.eventTypes.RECORDS = 6;
SceneController.eventTypes.GAME_OVER = 7;

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
		case SceneController.eventTypes.INFO:
			scene = this.infoScene
			break 
		case SceneController.eventTypes.SETTINGS:
			scene = this.settingsScene
			break 
		case SceneController.eventTypes.RECORDS:
			scene = this.recordsScene
			break 
		case SceneController.eventTypes.GAME_OVER:
			scene = this.gameOverScene
			break 
	}
	this.currentScene = scene;
	if (this.currentScene){
		this.currentScene.show();
	}
}



