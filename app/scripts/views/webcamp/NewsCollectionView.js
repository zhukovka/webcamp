define(['jquery', 'underscore', 'backbone', 
	'views/basic/CollectionView','views/webcamp/NewsView'], 
	function ($, _, Backbone, CollectionView, NewsView) {
	return CollectionView.extend({
		// id:'',
		ItemView: NewsView,
		tagName: 'section',
		className: 'news',
		// initialize: function () {
		// 	console.log(this.collection);
		// }
	});
});