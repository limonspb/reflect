function CreditsScene(){
	$("#backButton_credits").bind('click',this.onBackCkick);
}
extend(CreditsScene,BaseScene);

CreditsScene.prototype.show = function(){	
	$("#credits").fadeIn();
}

CreditsScene.prototype.hide = function(){
	global.stage.removeChild(this.cCreditsContainer);
	$("#credits").fadeOut();
}

CreditsScene.prototype.onBackCkick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}
