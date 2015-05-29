define(['jquery', 'underscore', 'backbone', 
	'core/BaseView','hbs!templates/components/FilterTemplate'], 
	function ($, _, Backbone, BaseView, FilterTemplate) {
	return BaseView.extend({
		template: FilterTemplate,
		// id:'',
		tagName: 'aside',
		initialize: function () {
			// console.log('FullCategory View Init Model', this.model);
			this.listenTo(this.model, "change", this.render);
		},
		serialize: function () {
			// console.log(this.model.attributes);
			return {categories: this.model.attributes};
		},
		
	});
});