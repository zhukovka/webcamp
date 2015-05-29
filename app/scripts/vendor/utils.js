define([
	'jquery',
	'underscore'
], function($, _) {
	var Utils = {
		coursesJQ: function () {
			var coursesHeight = $('.courses').height();
				
				$('.course').each(function(index, val) {
					var height = $(this).height();
					$(this).css('padding-top', (coursesHeight-height)/2);
				});

				$('.courses').hover(function() {
					/* Stuff to do when the mouse enters the element */
					var course = $(this).siblings('.courses').find('.course');
					course.animate({'padding-top': '-=50'}, 400);
				}, function() {
					/* Stuff to do when the mouse leaves the element */
					var course = $(this).siblings('.courses').find('.course');
					course.animate({'padding-top': '+=50'}, 400);
				});

				$('.category').hover(function() {
					/* Stuff to do when the mouse enters the element */
					$(this).find('.hide-it').fadeIn( "slow" );
				}, function () {
					$(this).find('.hide-it').fadeOut( "slow" );
				});
		}
	};
	_.mixin(Utils);

	return Utils;
});