define(['jquery', 'underscore', 'backbone',
	'views/basic/ModelView', 'hbs!templates/navs/TopNavbarTemplate'], 
	function ($, _, Backbone, ModelView, TopNavbarTemplate) {
		return ModelView.extend({
				template: TopNavbarTemplate,
				// tagName: "li",
  			className: "container-fluid",
  			initialize: function () {
  				// console.log('TOP NAVBAR INIT');
  			}
			});
});