define(['jquery', 'underscore', 'backbone', 
	'views/courses/CourseView', 'hbs!templates/courses/BriefCourseTemplate'], 
	function ($, _, Backbone, CourseView, BriefCourseTemplate) {
	return CourseView.extend({
		template: BriefCourseTemplate,
		// id:'',
		// tagName: 'article',
		className: "col-sm-6 col-md-4",
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			console.log(this.model);
		},
		
	});
});