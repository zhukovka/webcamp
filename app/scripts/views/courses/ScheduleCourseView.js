define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'views/courses/ScheduleView',
	'collections/Courses', 'hbs!templates/courses/ScheduleCourseTemplate'], 
	function ($, _, Backbone, BaseView, 
		ScheduleView, CoursesCollection, ScheduleCourseTemplate) {
	return BaseView.extend({
		template: ScheduleCourseTemplate,
		ItemView: ScheduleView,
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
			this.$el.html(this.template({title: this.model.get('title')}));
			var container = '#'+this.model.get('title')+'-schedule';
			// var classname = 'col-sm-' + Math.floor(12/this.collection.length);
      this.collection.each(function(item, index) {
        // item.set('more', false);
        var itemView = new self.ItemView({ model: item, className:'schedule'});
        this.$(container).append(itemView.render().el);
      }, this);
			return this;
		}
	});
});