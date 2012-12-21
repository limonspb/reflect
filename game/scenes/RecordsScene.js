function RecordsScene(){
	$("#backButton_records").bind('click',this.onBackCkick);
}
extend(RecordsScene,BaseScene);

RecordsScene.prototype.show = function(){	
	$("#records").fadeIn();
}

RecordsScene.prototype.hide = function(){
	global.stage.removeChild(this.cCreditsContainer);
	$("#records").fadeOut();
}

RecordsScene.prototype.onBackCkick = function(){
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}
