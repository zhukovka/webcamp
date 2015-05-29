define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'hbs!templates/webcamp/NewsTemplate'], 
	function ($, _, Backbone, BaseView, NewsTemplate) {
	return BaseView.extend({
		template: NewsTemplate,
		tagName: 'article',
		// className: 'row color-row',
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			console.log(this.model);
			if(!this.model.get('isChanged')){
				this.changeModel();
			}
		},
		changeModel: function () {
			var published = moment(this.model.get('created_time')).format("dddd, Do MMMM YYYY, HH:mm");
			this.model.set('created_time', published);
		}
	});
});