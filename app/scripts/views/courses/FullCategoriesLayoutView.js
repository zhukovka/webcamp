define(['jquery', 'underscore', 'backbone', 
	'views/basic/LayoutView', 'views/courses/FullCategoriesView',
	'views/components/FilterView',
	'hbs!templates/courses/FullCategoryLayoutTemplate'], 
	function ($, _, Backbone, LayoutView, 
		FullCategoriesView, FilterView, FullCategoryLayoutTemplate) {
	return LayoutView.extend({
		template: FullCategoryLayoutTemplate,
		// id:'',
		tagName: 'section',
		// className: 'kwicks kwicks-vertical',
		initialize: function () {
			this.filterCollection = this.collection.clone();
		},
		regions: {
				coursesRegion: "#categories",
				filterRegion: '#filter'
			},
		layoutReady: function () {
			var fullCategoriesView = new FullCategoriesView(
					{collection: this.filterCollection});
			var categoriesModel = new Backbone.Model(this.collection.toJSON());
			var filterView = new FilterView({model:categoriesModel, className:'container'});
			this.coursesRegion.append(fullCategoriesView.render().el);
			this.filterRegion.append(filterView.render().el);
		},
		events:{
			'change #categorySelect': 'filterByCategoryTitle'
		},
		filterByCategoryTitle: function (e) {
			e.preventDefault();
			var title = $( "#categorySelect option:selected" ).text();
			var all = $( "#categorySelect option:selected" ).val() === 'all';
			if(all){
				this.filterCollection.reset(this.collection.toJSON());
			} else{
				var result = this.collection.filterByName(title);
				// console.log(result, 'filterByName');
				this.filterCollection.reset(result);
			}
		}
	});
});