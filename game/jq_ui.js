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
	
});
