function CreditsScene(){
	$("#backButton_credits").bind('click',this.onBackCkick);
	$('#backButton_credits').mouseover(function(){playSound("hover")});
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
	playSound("menu_back");
	global.sceneController.switchScene(SceneController.eventTypes.MAIN_MENU);
}
