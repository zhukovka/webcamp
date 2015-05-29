define([
	'underscore',
	'backbone'
], function(_, Backbone){

	var BaseView = Backbone.View.extend({
		close : function(){
			if(this.childViews){
				this.childViews.close();
			}
			this.remove();
		},
		// Override this method to provide the right data to your template.
	  serialize: function() {
	    return this.model.attributes;
	  },

	  // This method now looks for the above `template` and `serialize` properties
	  // in order to render.
	  render: function() {
	    // Render the template markup.
	    var markup = this.template(this.serialize());
	    // Put the content into this Views element.
	    // console.log(this.serialize(), 'template data');
	    this.$el.html(markup);
	    
	    // Allow chaining.
	    return this;
	  }
	});

	return BaseView;

});