define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'hbs!templates/components/ReviewsTemplate'], 
	function ($, _, Backbone, BaseView, ReviewsTemplate) {
	return BaseView.extend({
		template: ReviewsTemplate,
		tagName: 'article',
		className: 'row color-row',
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		}
	});
});