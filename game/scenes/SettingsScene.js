function SettingsScene(){
	
	$( "#controlling_type_radio" ).buttonset();
	if (localStorage.getItem('hahaton_reflect_staticControl')=='true'){
		global.staticControl = true;
		//$("#radio_static").attr('checked',true).button("refresh");
		$('#radio_static').removeClass('control').addClass('control_select');
		$('#radio_relative').removeClass('control_select').addClass('control');
	}else{
		global.staticControl = false;
		//$("#radio_relative").attr('checked',true).button("refresh");
		$('#radio_static').removeClass('control_select').addClass('control');
		$('#radio_relative').removeClass('control').addClass('control_select');
	}
	$("#radio_relative").click('change',this.radio_controlling_change);
	$("#radio_static").click('change',this.radio_controlling_change);
	
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

SettingsScene.prototype.radio_controlling_change = function(){
	global.staticControl = !global.staticControl;
	if (global.staticControl){
		
		//$("#radio_static").attr('checked',true).button("refresh");
		$('#radio_static').removeClass('control').addClass('control_select');
		$('#radio_relative').removeClass('control_select').addClass('control');
	}else{		
		//$("#radio_relative").attr('checked',true).button("refresh");
		$('#radio_static').removeClass('control_select').addClass('control');
		$('#radio_relative').removeClass('control').addClass('control_select');
	}
	
	localStorage.setItem('hahaton_reflect_staticControl',global.staticControl);
}
