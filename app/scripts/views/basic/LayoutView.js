define(['backbone', 'underscore', 'core/BaseView'], 
	function (Backbone, _ , BaseView) {
	var LayoutView = BaseView.extend({
			render: function () {
				// var templateSource = $().html();
	      this.$el.append(this.template);
	      
	      // console.log(this.$el, 'this.$el LayoutView');
	      var self = this;
	      _.each(self.regions, function (selector, name) {
	      	self[name] = self.$(selector);
	      });
	      // console.log("LAYOUT");
	      // console.log(self.collection, 'self.collection');
	      // if(self.filteredCollection) console.log(self.filteredCollection.reset(self.collection.toJSON()), 'self.filteredCollection');
	      if(self.layoutReady) self.layoutReady();
				return self;
			}
		});
	return LayoutView;
});