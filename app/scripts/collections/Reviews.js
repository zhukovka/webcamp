define(['jquery', 'underscore', 'backbone',
	'models/courses/Review'], 
	function ($, _, Backbone, Review) {
		return Backbone.Collection.extend({
			model: Review,
			
		});
});