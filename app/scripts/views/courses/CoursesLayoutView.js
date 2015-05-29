define(['jquery', 'underscore', 'backbone', 'utils',
	'views/basic/LayoutView', 'views/courses/CategoriesView', 
	'hbs!templates/courses/CoursesLayoutTemplate'], 
	function ($, _, Backbone, Utils, LayoutView, CategoriesView, 
		CoursesLayoutTemplate) {
	return LayoutView.extend({
			// id:'',
			// tagName: '',
			// className: ''
			/*There are several special options that, if passed, 
			will be attached directly to the view: model, 
			collection, el, id, className, tagName, 
			attributes and events. If the view defines an 
			initialize function, it will be called when the 
			view is first created.*/
			template: CoursesLayoutTemplate,
			regions: {
				coursesRegion: "#categories"
			},
			layoutReady: function () {
				var categoriesView = new CategoriesView(
						{collection: this.collection});

				this.coursesRegion.append(categoriesView.render().el);
				
			},
			initialize: function () {
				console.log('Courses Layout Init');
			},
			addKwicks: function () {
				this.$('.kwicks-vertical').kwicks({
	          maxSize : '75%',
	          isVertical: true,
	          behavior: 'menu',
	          selectOnClick: false
	      });

	      this.$('.kwicks-horizontal').kwicks({
	          maxSize: '75%',
	          behavior: 'menu',
	          selectOnClick: false
	      });

	      Utils.coursesJQ();
			}
		});
});