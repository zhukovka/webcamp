define(['jquery', 'underscore', 'backbone',
	'models/courses/Course'], 
	function ($, _, Backbone, Course) {
		return Backbone.Collection.extend({
			model: Course,
			url: '/courses',
			sortByName: function () {
				return this.sortBy('category');
			},
		});
});