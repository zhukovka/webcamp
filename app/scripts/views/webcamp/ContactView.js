define(['jquery', 'underscore', 'backbone', 
	'core/BaseView', 'hbs!templates/webcamp/ContactTemplate'], 
	function ($, _, Backbone, BaseView, ContactTemplate) {
	return BaseView.extend({
		template: ContactTemplate,
		// id:'',
		tagName: 'section',
		className: 'container-fluid details-container',
		// serialize: function() {
	 //    return {};
	 //  },
		render: function() {
	    // Render the template markup.
	    var markup = this.template();
	    this.$el.html(markup);
     //  var mapOptions = {
     //    zoom: 8,
     //    center: new google.maps.LatLng(-34.397, 150.644)
     //  };
     //  var mapCanvas = this.$el.find('#map-canvas')[ 0 ];
	    // map = new google.maps.Map(mapCanvas, mapOptions);
	    return this;
	  },
		initialize: function () {
			console.log('ContactView Init', this.model);
			// this.listenTo(this.model, 'change', this.render);
		},

	});
});