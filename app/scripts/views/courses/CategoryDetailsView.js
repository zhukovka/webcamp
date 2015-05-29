define(['jquery', 'underscore', 'backbone', 
	'views/basic/CollectionView', 
	'views/courses/CourseView', 
	'hbs!templates/courses/CategoryDetailsTemplate'], 
	function ($, _, Backbone, CollectionView, CourseView/*,
		CategoryDetailsTemplate*/) {
	return CollectionView.extend({
		// template: CategoryDetailsTemplate,
		tagName: 'div',
		className: 'details-container',
		ItemView: CourseView,
		serialize: function (item) {
			item.set('more', false);
			// console.log(item, 'Category Detaild Model');
			return new this.ItemView({ model: item, className: 'container-fluid color-row' });
		},
		initialize: function () {
			_.bindAll();
			this.listenTo(this.collection, 'reset', this.render);
		},
		
	});
});