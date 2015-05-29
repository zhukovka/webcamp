define(['jquery', 'underscore', 'backbone',
	'core/BaseView'], 
	function ($, _, Backbone, BaseView) {
		return BaseView.extend({
			serialize: function() {
				console.log(this.model, "Model in RENDER");
		    return this.model.attributes;
		  },
				
		});
});