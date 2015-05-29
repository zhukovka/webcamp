define(['jquery', 'underscore', 'backbone', 
	'views/basic/ModelView', 'hbs!templates/courses/EnrollTemplate',
	'hbs!templates/courses/ThanksTemplate'], 
	function ($, _, Backbone, ModelView, EnrollTemplate, ThanksTemplate) {
	return ModelView.extend({
		template: EnrollTemplate,
		// id:'',
		// tagName: 'article',
		// className: 'row course',
		/*There are several special options that, if passed, 
		will be attached directly to the view: model, 
		collection, el, id, className, tagName, 
		attributes and events. If the view defines an 
		initialize function, it will be called when the 
		view is first created.*/
		initialize: function () {
			// body...
			console.log('Enroll Init', this);

			// this.listenTo(this.model, 'change', this.render);
		},
		events:{
			'submit' : 'enrollStudent'
		},
		enrollStudent: function (e) {
			e.preventDefault();
			// console.log(this, 'enroll view this');
			var name = this.$("#student-name").val();
			var phone = this.$("#student-phone").val();
			var email = this.$("#student-email").val();
			var comment = this.$("#student-comment").val();
			var skype = this.$("#student-skype").prop("checked");
			// console.log(name, phone, email, comment, skype);
			var course = this.$el.attr('data-course');
      // console.log(course, '<<< Enroll Modal el');
      var student = {
      	name:name,
      	phone:phone,
      	email:email,
      	skype:skype,
      	course:course,
      	confirmed: false,
      	comment: comment
      };
      this.enrollAjax(student);
		},
		enrollAjax: function (student) {
			// body...
			var self = this;
      var enroll = $.ajax({
          url : 'students/enroll',
          data : student,
          type : 'POST'
      });
      enroll.done(function(response){
      	
        console.log('<<<<<<<<<<< enroll done', response);
        self.renderThanks(student);
      });
      enroll.fail(function(){
          self.$('#error').toggle().html('Error !!!');

          console.log('error');
          // Backbone.history.navigate('enroll', { trigger : true });
      });
		},
		renderThanks: function (student) {
			console.log(student);
			this.$el.html(ThanksTemplate(student));
		}
	});
});