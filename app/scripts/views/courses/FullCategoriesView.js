define(['jquery', 'underscore', 'backbone', 
	'views/basic/CollectionView', 
	'views/courses/FullCategoryView'], 
	function ($, _, Backbone, CollectionView, FullCategoryView) {
	return CollectionView.extend({
		ItemView: FullCategoryView,
		// template: FullCategoryTemplate,
		// id:'',
		// tagName: 'section',
		// className: 'row',
		serialize: function (item) {
			item.set('more', false);
			var coursesCollection = item.get('courses');
			return new this.ItemView({ model: item, collection:coursesCollection});
		},
		initialize: function () {
			this.listenTo(this.collection, "reset", this.render);
		}
	});
});