define(['jquery', 'underscore', 'backbone', 
	'views/basic/CollectionView','views/reviews/ReviewView'], 
	function ($, _, Backbone, CollectionView, ReviewView) {
	return CollectionView.extend({
		// template: ReviewsTemplate,
		// id:'',
		ItemView: ReviewView,
		tagName: 'section',
		className: 'container-fluid details-container',
		initialize: function () {
			
			console.log(this.collection);
			if(!this.collection.at(0).get('photo')){
				this.getPhoto();
			}
		},
		getPhoto: function () {
			this.collection.each(function(item, index) {
        var empty = 5 - item.get('rating');
        item.set('empty', empty);
	      FB.api("/"+item.get('reviewer').id+"/picture",
          function (response) {
            if (response && !response.error) {
              item.set('photo', response.data.url);
            }
          });
	    }, this);
		}
	});
});
// access_token=CAAMppa2FKP4BAICyGHPiJkN2iO5hiDXEFA5axh9ydnFKfM1NAoi2NZACMjFp2vNY5FitiygCCXI9F6k2bo9HhRfQlN5aSjEZCFEnXrZBst9WgEkrY03X7OPV09hvLbiiCuszgMbxweO6BoNuqrmwbl4jMFBVF0ZAuhkr36j9LloEU6Pt8eZCcbEgZC2dsZBYsFvEE4Ll4GALvgmZCFSVHna5&expires=5184000

// https://graph.facebook.com/oauth/access_token?client_id=890216487659774&client_secret=915029b96bc6c99bfbca9972b2a4f196&grant_type=fb_exchange_token&fb_exchange_token=CAAMppa2FKP4BAN6xCsO23KZCkCdLbkiZBKDbwpwlLYUW8JGn1EOVKNog5eQucsRGUAAIgLRLrgdZCE76ExPvQKyCk57x16mtCo7JatsyQTp1T04rj8IW4BUQeZBuF97Tf9POWocjOhRO6p0SABcxtrOGPwCffZBWSkygVvnBTXcuE7gaY0TpBkNnyRyDrckggGRLvwPVVcZC4bl9AWZCDeswH3ZBZBnxChqMZD