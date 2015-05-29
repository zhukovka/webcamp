define(['jquery', 'underscore', 'backbone', 
	'views/basic/CollectionView', 'views/instructors/InstructorView'], 
	function ($, _, Backbone, CollectionView, InstructorView) {
	return CollectionView.extend({
		ItemView: InstructorView,
		// id:'',
		tagName: 'section',
		className: 'details-container container-fluid',
		serialize: function (item) {
			// item.set('more', false);
			// var coursesCollection = item.get('courses');
			// this.$(el).append('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>');
			return new this.ItemView({ model: item, className: 'row color-row' });
		},
		initialize: function () {
			// console.log('Show showInsrtuctors', this.collection);
			this.listenTo(this.collection, "reset", this.render);
		}
	});
});