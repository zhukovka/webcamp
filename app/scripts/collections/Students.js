define(['jquery', 'underscore', 'backbone',
	'models/courses/Student'], 
	function ($, _, Backbone, Student) {
		return Backbone.Collection.extend({
			model: Student,
			url: '/students'
		});
});