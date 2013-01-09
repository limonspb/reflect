$(document).ready(function(){
	function supports_canvas() {
		return !!document.createElement('canvas').getContext;
	}
	
	
	if (!supports_canvas()){
		alert('Sorry, your browser is very pld. Please, update it');		
	}else
		if (!jQuery.browser.chrome){
			$('#attention_chrome').css("display","block");	
		}else{
			
		}
	
});

