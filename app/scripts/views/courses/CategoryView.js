define(['jquery', 'underscore', 'backbone', 
	'views/basic/RelationalModelView', 
	'views/courses/CoursesView',
	'hbs!templates/courses/CategoryTemplate'], 
	function ($, _, Backbone, RelationalModelView, CoursesView, CategoryTemplate) {
	return RelationalModelView.extend({
		template: CategoryTemplate,
		// id:'',
		tagName: 'div',
		className: 'col-sm-6 category',
		serialize: function() {
			var model = this.model.clone();
			var data = model.attributes;
			data.courses = this.model.get('courses').toJSON();
			// console.log(data, "Model in Category View");
	    return data;
		},
		events: {
    	"click .course-logo": "theCategory",
  	},
    theCategory: function (e) {
    	e.preventDefault();
    	var title = this.model.get('title');
    	// console.log(title, 'THE Category title');
    	Backbone.history.navigate(title, {trigger: true});
    },
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			// body...
			// console.log('CategoryView Init', this.model);
			// console.log(this.template);
			this.listenTo(this.model, 'change', this.render);
		}
	});
});