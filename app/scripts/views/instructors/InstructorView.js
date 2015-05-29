define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'hbs!templates/instructors/InstructorTemplate'], 
	function ($, _, Backbone, BaseView, InstructorTemplate) {
	return BaseView.extend({
		template: InstructorTemplate,
		// id:'',
		tagName: 'article',
		serialize: function () {
			console.log(this.model.toJSON(), 'Instructor this.model.attributes');
			return this.model.toJSON();
		},
		initialize: function () {
			this.listenTo(this.model, "change", this.render);
			// console.log('Instructor View', this.model);
		}
	});
});