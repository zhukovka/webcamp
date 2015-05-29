define(['jquery', 'underscore', 'backbone', 'utils',
	'views/basic/LayoutView', 'views/webcamp/AboutView',
	'views/webcamp/NewsCollectionView', 
	'hbs!templates/webcamp/WebcampLayoutTemplate'], 
	function ($, _, Backbone, Utils, LayoutView, AboutView, 
		NewsCollectionView, WebcampLayoutTemplate) {
	return LayoutView.extend({
			// id:'',
			tagName: 'section',
			className: 'container-fluid details-container',
			template: WebcampLayoutTemplate,
			regions: {
				aboutRegion: "#about",
				newsRegion: "#news",
			},
			layoutReady: function () {
				if(!this.model.get('isChanged')){
					this.changeModel();
				}
				var aboutView = new AboutView({model: this.model});
				this.aboutRegion.append(aboutView.render().el);

				this.galleryShow();
			},
			initialize: function () {
				console.log("showAbout");
				if (!this.news){
					this.getNews();
				}
			},
			getNews: function () {
				var self = this;
	      FB.api("/217557725110551/feed?limit=5&access_token=CAAMppa2FKP4BAGQucHlc2RpYnNbRM06l5W3hHwhLMTNZAaSgdhqZBryzcZAvm9s7VcVD7ZA4tvRsqNGSPQEgbVQdht7m8jKRB6pVavuDWgnW0qtZAsVocw9tWIsi1l4dMgtLenWmDSK4NSJoCYv5DF67ZCbWPhUGJVELo7tzbCf1A2JmzWHhLllLdZBR7fQQVIZD",
          function (response) {
            if (response && !response.error) {
            	self.news = new Backbone.Collection(response.data);
							var newsView = new NewsCollectionView({collection: self.news});
							self.newsRegion.append(newsView.render().el);
            }
          });
			},
			changeModel: function () {
				var description = this.model.get('description').split("\n");
				this.model.set('description', description);
				this.model.set('isChanged',true);
			},
			galleryShow: function () {
				var smallImages = this.$('.office-photos>img');
				var largeImages = this.$('.gallery>.photos>.photo>img');
				
				$.each(smallImages, function(index, val) {
					 /* iterate through array or object */
					 $(this).on('click', /*'.selector',*/ function(event) {
						 $('.gallery:hidden').show();
						 	window.scrollTo(0, $('#classes').offset().top);
						 	/* Act on the event */
						 	largeImages.not( ":hidden" ).hide();
						 	largeImages.eq(index).toggle();
					 });
				});
				
				this.$('.gallery>.photos>.next').on('click', function(event) {
					event.preventDefault();
					var visible = largeImages.not(":hidden");
					var visIndex = largeImages.index(visible);
					/* Act on the event */
					if((visIndex+1)===largeImages.length){
						largeImages.eq(0).toggle();
					}else{
						largeImages.eq(visIndex+1).toggle();
					}
					visible.hide();
				});

				this.$('.gallery>.photos>.prev').on('click', function(event) {
					event.preventDefault();
					var visible = largeImages.not(":hidden");
					var visIndex = largeImages.index(visible);
					/* Act on the event */
					console.log(visIndex-1);
					if((visIndex-1) < 0){
						console.log('less');
						largeImages.eq(largeImages.length-1).toggle();
					}else{
						largeImages.eq(visIndex-1).toggle();
					}
					visible.hide();
				});

				this.$('.close-gallery').on('click', function(event) {
					event.preventDefault();
					/* Act on the event */
					$('.gallery').hide();
				});
			}
		});
});