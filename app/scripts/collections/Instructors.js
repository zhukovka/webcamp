define(['jquery', 'underscore', 'backbone',
	'models/courses/Instructor'], 
	function ($, _, Backbone, Instructor) {
		return Backbone.Collection.extend({
			model: Instructor,
			url: '/courses/instructors'
			
		});
});