define(['underscore','backbone',
	'core/BaseView',
	'hbs!templates/modal/basemodal'],
	function (_, BackBone, BaseView, BaseModalTemplate) {
	return BaseView.extend({
			id: 'base-modal',
      className: 'modal fade out',
      template: BaseModalTemplate,
      
      events: {
        'hidden': 'teardown',
      },
      
      initialize: function() {
      	// this.listenTo(this.$el, 'hidden.bs.modal', close);
        _(this).bindAll();
        this.render();
      },
      
      show: function() {
        this.$el.modal('show');
      },
      
      teardown: function() {
      	this.$el.modal("hide");
        this.$el.removeData('modal');
      	$('.modal-backdrop').remove();
        this.remove();
      },

      render: function() {
        var data = {};
        if(this.attributes){
          if(this.attributes['data-course']){
            data.course = this.attributes['data-course'];
          }
        }
        data.title = this.title;
      	var html = this.template(data);

        this.$el.html(html);
      	this.renderModalBody();
        // console.log(html);
        return this;
      },
      
      renderView: function(template) {
        this.$el.html(template());
        this.$el.modal({show:true}); // dont show modal on instantiation
      }
		});
});
