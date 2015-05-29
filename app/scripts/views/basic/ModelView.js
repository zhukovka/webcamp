define(['jquery', 'underscore', 'backbone',
	'core/BaseView'], 
	function ($, _, Backbone, BaseView) {
		return BaseView.extend({
				render: function () {
					// console.log(this.model, "Model in RENDER");
					var data = {};
					if(this.model){
						data = this.model.attributes;
						// console.log(this.template, 'template');
						console.log(data, 'ModelView model');
					}
					if(this.attributes){
						console.log("this.attributes", this.attributes);
						if(this.attributes['data-course']){
							data.course = this.attributes['data-course'];
						}
					}
					// console.log("Model RENDER DATA");
					
					this.$el.html(this.template(data));
					// console.log('Model RENDER', this.$el.html(this.template(data)));
          return this;
				}
			});
});