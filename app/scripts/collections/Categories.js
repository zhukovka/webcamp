define(['jquery', 'underscore', 'backbone',
	'models/courses/Category'], 
	function ($, _, Backbone, Category) {
		return Backbone.Collection.extend({
			model: Category,
			url: '/courses/category',
			filterByName: function (title) {
				return this.where({title:title});
			}
		});
});