define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'views/courses/BriefCourseView',
	'collections/Courses', 'hbs!templates/courses/FullCategoryTemplate'], 
	function ($, _, Backbone, BaseView, 
		BriefCourseView, CoursesCollection, FullCategoryTemplate) {
	return BaseView.extend({
		template: FullCategoryTemplate,
		ItemView: BriefCourseView,
		// id:'',
		tagName: 'section',
		className: 'row color-row',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			this.listenTo(this.collection, "reset", this.render);
			this.listenTo(this.model, "change", this.render);
		},
		render: function () {
			var self = this;
			this.$el.html(this.template(this.model.attributes));
			var container = '#'+this.model.get('title')+'-courses';
			var classname = 'col-sm-6'/* + Math.floor(12/this.collection.length)*/;
      this.collection.each(function(item, index) {
        item.set('more', false);
        var itemView = new self.ItemView({ model: item});
        this.$(container).append(itemView.render().el);
      }, this);
			return this;
		}
	});
});