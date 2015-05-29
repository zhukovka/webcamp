define(['jquery', 'underscore', 'backbone', 
	'views/basic/ModelView', 'hbs!templates/students/ConfirmTemplate'], 
	function ($, _, Backbone, ModelView, ConfirmTemplate) {
	return ModelView.extend({
		template: ConfirmTemplate,
		// id:'',
		tagName: 'section',
		className: 'confirm',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			// body...
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'change', this.loadInfo);
			console.log('ConfirmView Init', this.model);
			this.confirmAjax(this.model.id);
		},
		confirmAjax: function (id) {
			$.ajax({
          url : 'students/confirm/'+id,
          data : {},
          type : 'POST'
      }).done(function(response){
        console.log('<<<<<<<<<<< confirm done', response);
      }).fail(function(){
          console.log('error');
      });
		},
		loadInfo: function () {
			this.model.get('courses').forEach(function(el, index) {
				if(el.currents[0]){
					var dates = el.currents[0];
					var startDate = moment(dates.start);
					dates.soon = moment.duration(startDate.diff(moment(), 'days'), 'days').humanize(true);
					var start = startDate.format("dddd, Do MMMM YYYY");
					dates.startDate = start;
					console.log(dates.startDate);
				}
			});
			this.model.set('address', 'г. Киев, ул. Дарвина, 10');
			console.log(this.model);
		}
	});
});