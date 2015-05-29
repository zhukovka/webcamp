define(['underscore','backbone',
  'views/modals/basemodal', 
  'views/courses/EnrollView'],
	function (_, BackBone, BaseModal, EnrollView) {
	return BaseModal.extend({
      title: "Записаться",
      events: {
            'click #closeModal':'close',
            // 'click #signup':'signup'
      },
      close: function () {
        
        this.teardown();
        
      },
      renderModalBody: function () {
        var course = this.$el.attr('data-course');
        console.log(course, '<<< Enroll Modal el');
        var enrollView = new EnrollView(
          {className: 'clearfix', 
          attributes: {"data-course":course}});
        this.$("#modal-body").html(enrollView.render().$el);

      },
      
		});
});
