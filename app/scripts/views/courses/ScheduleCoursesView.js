define(['jquery', 'underscore', 'backbone', 
	'views/courses/FullCategoriesView', 'views/courses/ScheduleCourseView'], 
	function ($, _, Backbone, FullCategoriesView, ScheduleCourseView) {
	return FullCategoriesView.extend({
		ItemView: ScheduleCourseView,
		// id:'',
		// tagName: 'article',
		className: 'schedules-all',
		
	});
});