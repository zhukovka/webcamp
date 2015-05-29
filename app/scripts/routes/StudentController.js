define(['jquery', 'underscore', 'backbone',
	'views/students/ConfirmView', 'models/students/Student'], 
	function ($, _, Backbone, ConfirmView, StudentModel) {
	return {
		confirm: function (self, id) {
			console.log("CONFIRM");
        var student = new StudentModel({_id:id});
        student.fetch();
        var confirmView = new ConfirmView({model:student});
        self.changeView(confirmView);
    },
	};
});