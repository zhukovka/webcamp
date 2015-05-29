define(['jquery', 'underscore', 'backbone', 
	'views/basic/LayoutView', 'views/courses/ScheduleCoursesView',
	'views/components/FilterView',
	'hbs!templates/courses/ScheduleLayoutTemplate'], 
	function ($, _, Backbone, LayoutView, 
		ScheduleCoursesView, FilterView, ScheduleLayoutTemplate) {
	return LayoutView.extend({
		template: ScheduleLayoutTemplate,
		// id:'',
		tagName: 'section',
		// className: 'kwicks kwicks-vertical',
		initialize: function () {
			this.filterCollection = this.collection.clone();
		},
		regions: {
				schedulesRegion: "#schedules",
				filterRegion: '#filter'
			},
		layoutReady: function () {
			var scheduleCoursesView = new ScheduleCoursesView(
					{collection: this.filterCollection});
			var categoriesModel = new Backbone.Model(this.collection.toJSON());
			var filterView = new FilterView({model:categoriesModel, className:'container'});
			this.schedulesRegion.append(scheduleCoursesView.render().el);
			this.filterRegion.append(filterView.render().el);
		},
		events:{
			'change #categorySelect': 'filterByCategoryTitle'
		},
		filterByCategoryTitle: function (e) {
			e.preventDefault();
			var title = $( "#categorySelect option:selected" ).text();
			var all = $( "#categorySelect option:selected" ).val() === 'all';
			if(all){
				this.filterCollection.reset(this.collection.toJSON());
			} else{
				var result = this.collection.filterByName(title);
				// console.log(result, 'filterByName');
				this.filterCollection.reset(result);
			}
		}
	});
});