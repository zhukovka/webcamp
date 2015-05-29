define(['jquery', 'underscore', 'backbone',
	'views/basic/ModelView', 'hbs!templates/navs/LeftNavbarTemplate'], 
	function ($, _, Backbone, ModelView, LeftNavbarTemplate) {
		return ModelView.extend({
				template: LeftNavbarTemplate,
				// tagName: "li",
  			className: "left-navbar",
  			initialize: function () {
  				// console.log('Left NAVBAR INIT');
  			},
  			events:{
  				'click #slider' : 'slide'
  			},
  			slide: function (e) {
  				e.preventDefault();
  				
			 		this.$('#slider').animate({
			 			left: parseInt($('#slider').css('left'),10) == 0 ? ($('#left-items').outerWidth()) : 0},
			 			'slow');
			 		this.$('#slider > i').toggleClass('fa-chevron-right fa-chevron-left');
			 		
			    this.$('#left-items > li').each(function(index, el) {
			    	var $lefty = $(this);
			    	console.log(parseInt($lefty.css('left'),10));
				    $lefty.delay(index*100).animate({
				      left: parseInt($lefty.css('left'),10) == 20 ? ($lefty.outerWidth()) : 20
				    });
			    });
  			}
			});
});