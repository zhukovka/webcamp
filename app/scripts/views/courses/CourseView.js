define(['jquery', 'underscore', 'backbone', 
	'views/courses/DetailsView', 'hbs!templates/courses/CourseTemplate'], 
	function ($, _, Backbone, DetailsView, CourseTemplate) {
	return DetailsView.extend({
		template: CourseTemplate,
		// id:'',
		tagName: 'section',
		className: 'container-fluid details-container',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		serialize: function() {
			if(!this.model.get('isChanged')){
				this.changeModelDetails();
			}
	    return this.model.attributes;
		},
		initialize: function () {
			// console.log('CourseView Init', this.model);
			this.listenTo(this.model, 'change', this.render);
			
		}
	});
});