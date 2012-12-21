function InfoScene(){
	$("#backButton_info").bind('click',this.onBackCkick);
}
extend(InfoScene,BaseScene);

InfoScene.prototype.show = function(){	
	$("#info").fadeIn();
}

InfoScene.prototype.hide = function(){
	global.stage.removeChild(this.cCreditsContainer);
	$("#info").fadeOut();
}

InfoScene.prototype.onBackCkick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}
