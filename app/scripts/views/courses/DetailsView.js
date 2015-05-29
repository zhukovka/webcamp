define(['jquery', 'underscore', 'backbone', 
	'core/BaseView','views/modals/EnrollModal'], 
	function ($, _, Backbone, BaseView, EnrollModal) {
	return BaseView.extend({
		events: {
    	"click .enroll": "enroll",
    	"click .more": "more",
      	},
        enroll: function (e) {
        	e.preventDefault();
        	var course = $(e.currentTarget).parent().attr('data-course');
        	var enrollModal = new EnrollModal({attributes: {"data-course":course}});
        	enrollModal.show();
        },
        more: function (e) {
        	e.preventDefault();
        	var path = this.model.get('inCategory').get('title')+'/'+this.model.get('title').replace(' ','-');
        	Backbone.history.navigate(path, { trigger : true });
        },
        changeModelDetails: function () {
            var closestDates = this.model.get('currents')[0];
            if(closestDates){
                var startDate = moment(closestDates.start);
                var endDate = moment(closestDates.end);
                closestDates.duration = endDate.diff(startDate, 'weeks');
                var start = startDate.format("dddd, Do MMMM YYYY, h:mm a").split(', ');
                closestDates.start = start;
                closestDates.days.forEach(function (day, index) {
                    console.log(closestDates.days[index]);
                    closestDates.days[index] = moment().weekday(day).format("ddd");
                });
            }
            // console.log(this.model.get('details').split('\n'));
            // this.model.details.split('\n');
            // var detailsArray = 
            // this.model.set('details', detailsArray);
            this.model.set('isChanged', true);
            var category = this.model.get('inCategory').get('title');
            this.model.set('category', category);
        }
	});
});