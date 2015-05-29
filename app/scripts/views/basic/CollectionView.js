define(['jquery', 'underscore', 'backbone',
	'core/BaseView'], 
	function ($, _, Backbone, BaseView) {
		return BaseView.extend({
			serialize: function (item) {
				return new this.ItemView({ model: item});
			},
			render: function () {
				var self = this;
				this.$el.html("");
				// this.$el.html('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>');
				console.log('this.$el.html', this.$el.html());

	      this.collection.each(function(item, index) {
	        var itemView = this.serialize(item);
	        this.$el.append(itemView.render().el);
	      }, this);
				return this;
			}
		});
});