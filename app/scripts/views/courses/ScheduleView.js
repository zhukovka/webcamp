define(['jquery', 'underscore', 'backbone', 
	'views/courses/CourseView', 'hbs!templates/courses/ScheduleTemplate'], 
	function ($, _, Backbone, CourseView, ScheduleTemplate) {
	return CourseView.extend({
		template: ScheduleTemplate,
		// id:'',
		tagName: 'tr',
		// className: 'container-fluid',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			console.log(this.model, 'Shedule Model');
			this.listenTo(this.model, 'change', this.render);
		},
		
	});
});