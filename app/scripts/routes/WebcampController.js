define(['jquery', 'underscore', 'backbone',
	'views/webcamp/WebcampLayoutView', 'views/webcamp/ContactView',
	'models/Webcamp'], 
	function ($, _, Backbone, WebcampLayoutView, ContactView, WebcampModel) {
	return {
		showAbout: function (self) {
			
      FB.api(
        "/217557725110551?access_token=CAAMppa2FKP4BAGQucHlc2RpYnNbRM06l5W3hHwhLMTNZAaSgdhqZBryzcZAvm9s7VcVD7ZA4tvRsqNGSPQEgbVQdht7m8jKRB6pVavuDWgnW0qtZAsVocw9tWIsi1l4dMgtLenWmDSK4NSJoCYv5DF67ZCbWPhUGJVELo7tzbCf1A2JmzWHhLllLdZBR7fQQVIZD",
        function (response) {
          if (response && !response.error) {
          	// console.log(response);
            var about = new WebcampModel(response);
            var webcampLayoutView = new WebcampLayoutView({model:about});
            self.changeView(webcampLayoutView);
          }
          else{
            console.dir(response.error);
          }
        });
    },
    showContact: function (self) {
    	var contactView = new ContactView();
      // var mapOptions = {
      //   zoom: 8,
      //   center: new google.maps.LatLng(-34.397, 150.644)
      // };
      // var mapCanvas = this.$el.find('#map-canvas')[ 0 ];
      // map = new google.maps.Map(mapCanvas, mapOptions);
      self.changeView(contactView);
      addMap();
    }
	};
});