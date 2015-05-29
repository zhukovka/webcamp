var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('./Category');
var Instructor = require('./Instructor');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);
var mail = require('../../controllers/mailController');

var CourseSchema = Schema({
	title: {type: String, required: true, unique: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	instructor: {type: Schema.Types.ObjectId, ref: 'Instructor'},
	details: Array,
	price: Number,
	currents: [{ 
		start:Date, 
		end:Date, 
		days: Array, 
		hours: Array
	}],
	lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
	students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
	projects: [{
		title: String,
		git: String,
		details: String
	}],
	playlist: String
});

// specify the transform CourseSchema option
if (!CourseSchema.options.toJSON) CourseSchema.options.toJSON = {};
CourseSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.__v;
}


CourseSchema.pre('remove', function(next){
		// console.log('pre remove', this);
    this.model('Category').update(
        {_id: {$in: this.category}}, 
        {$pull: {courses: this._id}}, 
        {multi: true}, function (err) {
        	if (err) throw err;
        	console.log('category updated pre');
        });
    this.model('Student').update(
        {_id: {$in: this.students}}, 
        {$pull: {courses: this._id}}, 
        {multi: true}, function (err) {
        	if (err) throw err;
        	console.log('student updated pre');
        });
    this.model('Instructor').update(
        {_id: this.instructor}, 
        {$pull: {courses: this._id}}, 
        {multi: true}, function (err) {
        	if (err) throw err;
        	console.log('instructor updated pre');
        });
    this.model('Lesson').remove({_id: {$in: this.lessons}}).exec(function (err) {
	    	if (err) throw err;
	    	console.log('lesson removed');
	    });
    next();
});

CourseSchema.methods.updateTitle = function (title, cb) {
	return this.update({$set: { title: title }}, cb);
};

CourseSchema.methods.addCategory = function (categoryTitle, cb) {
	var self = this;
	
	Category.findOne({title:categoryTitle}, function (err, category) {
		if (err) throw err;
		/*if the category exists*/
		if(category){
			category.addCourse(self, function (err) {
				if (err) throw err;
			});
			return self.update({$set: { category: category._id }}, cb);
		}else{
			var category = new Category({title:categoryTitle});
			category.courses.push(self._id);
			category.save();
			return self.update({$set: { category: category._id }}, cb);
		}
	});

};

CourseSchema.methods.addInstructor = function (instructorData, cb) {
	var self = this;
	
	Instructor.findOne(instructorData, function (err, instructor) {
		if (err) throw err;
		/*if the instructor exists*/
		if(instructor){
			instructor.addCourse(self, function (err) {
				if (err) throw err;
			});
			return self.update({$set: { instructor: instructor._id }}, cb);
		}else{
			var instructor = new Instructor(instructorData);
			instructor.courses.push(self._id);
			instructor.save();
			return self.update({$set: { instructor: instructor._id }}, cb);
		}
	});

};

CourseSchema.statics.enrollStudent = function (req, res, student, cb) {
	var self = this;
	self.findOneAsync({title:req.body.course})
		.then(function (course) {
			student.update({$addToSet: { courses: course._id }}, 
				function (err) {
								if (err) throw err;
							});
			course.update({$addToSet: { students: student._id }}, 
				function (err) {
								if (err) throw err;
							});
		})
		.then(function () {
			student.course = req.body.course;
			res.render('email', 
				{layout:null, student:student}, 
				function (err, html) {
					if (err) throw err;
					// setup e-mail data with unicode symbols
					var mailOptions = {
					    from: 'Webcamp курсы программирования <register@webcamp.com.ua>', // sender address
					    to: req.body.email, // list of receivers
					    subject: 'Подтверждение регистрации на курс '+req.body.course, // Subject line
					    html: html // html body
					};
					var mailOptions2 = {
					    from: req.body.email, // sender address
					    to: 'register@webcamp.com.ua, darvina10@gmail.com', // list of receivers
					    subject: 'Новый абитуриент на курс '+req.body.course, // Subject line
					    html: '<p> Имя: '+req.body.name+'</p>'+
					    '<p> Курс: '+req.body.course+'</p>'+ // html body
					    '<p>'+req.body.email+'</p>'+ // html body
					    '<p>'+req.body.phone+'</p>'+ // html body
					    '<p> Комментарий: '+req.body.comment+'</p>' // html body
					};

					// send mail with defined transport object
					mail.sendMail(mailOptions, function(error, info){
					    if(error){
					        console.log(error);
					    }else{
					        console.log('Message sent: ' + info.response);
					    }
					});
					mail.sendMail(mailOptions2, function(error, info){
					    if(error){
					        console.log(error);
					    }else{
					        console.log('Message sent: ' + info.response);
					    }
					});
			});
			res.json(student);
		})
		.error(cb);
};


module.exports = mongoose.model('Course', CourseSchema);