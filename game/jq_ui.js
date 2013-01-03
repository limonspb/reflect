$(function() {
	$( "#volume_slider" ).slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 50,
		slide: function( event, ui ) {
			global.volumePanel.setVolume( ui.value );
		}
	});
	
	$( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
	
	$('#info_center_content').load('scenes/html/info.html');
	
	$('#credits_center_content').load('scenes/html/credits.html');
	
	$('.backButton').append(
		'<div class="backButton_img1" style="float:left; width:63px; height:63px; background-image:url(\'img/menu/back_arrow/1_standart.png\');  position:absolute; top:0px; left:0px;"></div>'
			+		
		'<div class="backButton_img1_hover" style="display:none; width:63px; height:63px; background-image:url(\'img/menu/back_arrow/1_hover.png\');  position:absolute; top:0px; left:0px;"></div>'
			+
		'<div class="backButton_img2" style="float:left; width:63px; height:63px; background-image:url(\'img/menu/back_arrow/2_standart.png\');  position:absolute; top:0px; left:45px;"></div>'
			+
		'<div class="backButton_img2_hover" style="display:none; width:63px; height:63px; background-image:url(\'img/menu/back_arrow/2_hover.png\');  position:absolute; top:0px; left:45px;"></div>'
	);
	
	var speed_anim = 300;
	$('.backButton').hover(function(){
		$(this).find('.backButton_img1_hover').css('display', 'block');
		$(this).find('.backButton_img2_hover').css('display', 'block');
		
		$(this).find('.backButton_img2_hover').stop();
		$(this).find('.backButton_img2').stop();
		$(this).find('.backButton_img2_hover').animate({left : "30px"}, speed_anim);
		$(this).find('.backButton_img2').animate({left : "30px"}, speed_anim);
	},function(){
		$(this).find('.backButton_img1_hover').css('display', 'none');
		$(this).find('.backButton_img2_hover').css('display', 'none');
		
		$(this).find('.backButton_img2_hover').stop();
		$(this).find('.backButton_img2').stop();
		$(this).find('.backButton_img2_hover').animate({left : "45px"}, speed_anim);
		$(this).find('.backButton_img2').animate({left : "45px"}, speed_anim);
		
	});
	
});
