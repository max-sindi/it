jQuery(document).ready(function($) {
  $(window).ready(function(e){
    $.each($('div.progress-bar'),function(){
      $(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
    });
  });
  
  /* Sticky header Front */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $("#mini-panel-front_header .region-three-33-top").addClass("sticky");
    } 
    else {
      $("#mini-panel-front_header .region-three-33-top").removeClass("sticky");
    }
  });
	
  /* Sticky header Inside */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $("#header").addClass("sticky");
    } 
    else {
      $("#header").removeClass("sticky");
    }
  });	
	
	// Hide content in views cost for non deepest level term
	$(".view-id-cost .view-content").replaceWith("<div class='views-row empty'><div class='field-content'>Выберите неисправность</div></div>");
  
  
});
  
(function ($) {
  Drupal.behaviors.it = {
    attach : function(context, settings) {
			/*  $("#views-exposed-form-cost-cost #select2 option[value='94']").remove(); */
 			if ( $('select#select3').children().length == 0 ) {
				$("select").eq(-2).change(function() {
					setTimeout(function()  {
						$('#views-exposed-form-cost-cost #edit-submit-cost').trigger('click');
					}, 100);
				});
			}
			else {
				$("select").eq(-1).change(function() {
					setTimeout(function()  {
						$('#views-exposed-form-cost-cost #edit-submit-cost').trigger('click');
					}, 100);
				});
			}
    }
  };
})(jQuery);