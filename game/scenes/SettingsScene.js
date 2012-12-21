function SettingsScene(){
	$("#backButton_settings").bind('click',this.onBackCkick);
}
extend(SettingsScene,BaseScene);

SettingsScene.prototype.show = function(){	
	$("#settings").fadeIn();
}

SettingsScene.prototype.hide = function(){
	global.stage.removeChild(this.cCreditsContainer);
	$("#settings").fadeOut();
}

SettingsScene.prototype.onBackCkick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}
