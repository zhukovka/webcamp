define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'hbs!templates/webcamp/AboutTemplate'], 
	function ($, _, Backbone, BaseView, AboutTemplate) {
	return BaseView.extend({
		template: AboutTemplate,
		// id:'',
		tagName: 'article',
		// className: 'container-fluid details-container',
		// serialize: function() {
		// 	if(!this.model.get('isChanged')){
		// 		this.changeModelDetails();
		// 	}
	 //    return this.model.attributes;
		// },
		initialize: function () {
			// console.log('CourseView Init', this.model);
			this.listenTo(this.model, 'change', this.render);
		}
	});
});