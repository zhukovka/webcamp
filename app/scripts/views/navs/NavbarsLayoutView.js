define(['jquery', 'underscore', 'backbone', 'utils',
	'views/basic/LayoutView', 
	'hbs!templates/navs/NavbarLayoutTemplate',
	'views/navs/TopNavbarView',
	'views/navs/LeftNavbarView'
	], 
	function ($, _, Backbone, Utils, LayoutView, NavbarLayoutTemplate, 
		TopNavbarView, LeftNavbarView) {
	return LayoutView.extend({
			// id:'',
			// tagName: '',
			// className: ''
			/*There are several special options that, if passed, 
			will be attached directly to the view: model, 
			collection, el, id, className, tagName, 
			attributes and events. If the view defines an 
			initialize function, it will be called when the 
			view is first created.*/
			template: NavbarLayoutTemplate,
			regions: {
				topNavbarRegion: "#top-navbar",
				leftNavbarRegion: "#left-navbar",
			},
			layoutReady: function () {
				var topNavbarView = new TopNavbarView();
				var leftNavbarView = new LeftNavbarView();
				// console.log(this.topNavbarRegion);
				this.topNavbarRegion.append(topNavbarView.render().el);
				this.leftNavbarRegion.append(leftNavbarView.render().el);
			},
			initialize: function () {
				// console.log('topNavbarView Layout Init');
			},
			events:{
  				'click #slider' : 'slide'
			},
			slide: function (e) {
				e.preventDefault();
				this.$('#left-navbar').toggleClass('max-index');
				// var lNav = this.$('#left-navbar');
				// lNav.delay(index*100).animate({
		  //     left: parseInt(lNav.css('left'),10) == 0 ? -(lNav.outerWidth()-20) : 0
		  //   });
			}
			
		});
});