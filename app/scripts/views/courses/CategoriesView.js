define(['jquery', 'kwicks', 'underscore', 'backbone', 
	'views/basic/CollectionView', 'views/courses/CategoryView',
	'models/courses/Category',
	'hbs!templates/courses/CategoriesTemplate'], 
	function ($, kwicks, _, Backbone, CollectionView, 
		CategoryView, CategoryModel, CategoriesTemplate) {
	return CollectionView.extend({
		template: CategoriesTemplate,
		ItemView: CategoryView,
		// id:'',
		tagName: 'section',
		className: 'kwicks kwicks-vertical',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			// body...
			console.log('CategoryView Init');
			this.listenTo(this.collection, "reset", this.render);
			// this.collection.reset(this.collection.sortByName());
			// var category = new CategoryModel({
			// 	title:'category',
			// 	courses:[{title:'ololo'}]
			// });
			// console.log(category.get('courses').at(0), '<<<<category');
		},
		render: function () {
			console.log("RENDER");
			var self = this;
			this.$el.html(this.template());
      this.collection.each(function(item, index) {
        var itemView = new self.ItemView({ model: item });
        // console.log(item);
        if(index%2 === 0){
					// console.log(self.$('#odd'), "self.$('#odd')");
	        self.$('#odd').append(itemView.render().el);
        }else{
	        self.$('#even').append(itemView.render().el);
        }
      }, this);
			return this;
		}
	});
});