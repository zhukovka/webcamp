define(['jquery', 'underscore', 'backbone', 
	'views/basic/CollectionView', 'views/courses/CourseView',
	'hbs!templates/courses/CoursesTemplate'], 
	function ($, _, Backbone, CollectionView, CourseView, CoursesTemplate) {
	return CollectionView.extend({
		template: CoursesTemplate,
		ItemView: CourseView,
		// id:'',
		tagName: 'article',
		className: 'row course',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			// body...
			console.log('CoursesView Init');
			this.listenTo(this.collection, "reset", this.render);
			// this.collection.reset(this.collection.sortByName());
		}
	});
});