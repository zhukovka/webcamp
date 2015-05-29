var Course = require('../models/courses/Course');
var Lesson = require('../models/courses/Lesson');
var Category = require('../models/courses/Category');
var Student = require('../models/students/Student');
// var Instructor = require('../models/courses/Instructor');
var mongoose = require('mongoose');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);
var moment = require('moment');

var admin = {
	main: function (req, res, next) {
		Category.find().populate('courses').exec(function(err, docs) {

	    var options = {
	      path: 'courses.instructor',
	      select: 'name _id photo bio',
	      model: 'Instructor'
	    };

	    if (err) return res.json(500);
	    Category.populate(docs, options, function (err, categories) {
	      res.render('admin/admin', {layout: 'admin', categories: categories});
	    });
	  });
	},
	addCategory: function (req, res, next) {
		// console.log('Post', req.body);
		Category.createAsync(req.body)
			.then(function(category) {
				res.redirect('/admin');
			})
			.error(function(err) {
				res.send(422, {error: err.message});
			})
			.catch(function(err){
			  res.send(500, {error: err});
			});
	},
	editDescription: function (req, res, next) {
		// body...
		console.log(req.body);
		// if (err) throw err;
		Category.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
			if (err) next(err);
			res.end('Category description edited');
		});
	},
	
	addCourse: function (req, res, next) {
	// instructor: {type: Schema.Types.ObjectId, ref: 'Instructor'},
		// console.log(req.body);
		var newCourse = {
			title: req.body.title,
			details: req.body.details.split('\n'),
			price: Number(req.body.price),
			currents: [{ 
				start: req.body.start, 
				end: req.body.end, 
				days: req.body.days.split(','), 
				hours: req.body.hours.split(',')
			}]
		};
		console.log(newCourse);
		var self = this;
		Course.createAsync(newCourse)
			.then(function(course) {
				course.addCategory(req.body.category, function (err) {
					if (err) throw err;
				});
				console.log(course, 'Course added');
				res.redirect('/admin');
			})
			.error(function(err) {
				res.send(422, {error: err.message});
			})
			.catch(function(err){
			  res.send(500, {error: err});
			});
	},
	getCourse: function (req, res, next) {
		Course.findById(req.params.courseId, function (err, course) {
			var now = new Date();
			var twoMonthsAgo = new Date (now.getFullYear(), now.getMonth()-2);
		  var opts = [
		      { path: 'category', select: 'title' }, 
		      { path: 'instructor'}, 
		      { path: 'lessons', select: 'title description' }, 
		      { path: 'students', match: { registered: { $gte: twoMonthsAgo } }}
		  ];

		  Course.populate(course, opts, function (err, course) {
		  	if (err) return next(err);
		    // console.log(course);
		    var obj = course.toJSON();
				res.render('admin/course', {layout: 'admin', course:obj});
		  });
		});
	},
	editCourse: function (req, res, next) {
		// body...
		console.log(req.body);
		// if (err) throw err;
		Course.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
			if (err) next(err);
			res.end('Course edited');
		});
	},
	addProject: function (req, res, next) {
		// body...
		Course.findByIdAndUpdate(req.params.courseId, { $push: { projects: req.body} }, function (err) {
			if (err) next(err);
			res.end('Course edited');
		});
	},
	editProject: function (req, res, next) {
		// body...
		Course.findById(req.params.courseId, function (err, course) {
			if (err) next(err);
			var project = course.projects.id(req.params.projectId);
			project.title = req.body.title;
			project.git = req.body.git;
			project.details = req.body.details;
			course.save(function (err) {
				if (err) next(err);
				res.json(project);
			});
		});
	},
	editPlaylist: function (req, res, next) {
		// body...
		Course.findByIdAndUpdate(req.params.courseId, { $set : req.body}, function (err) {
			if (err) next(err);
			console.log(req.body);
			res.end("playlist added");
		});
	},
	addDates: function (req, res, next) {
		/*add dates to currents
			currents: [{ 
			start:Date, 
			end:Date, 
			days: Array, 
			hours: Array}]*/
		delete req.body._method;
		req.body.start = moment(req.body.start).format();
		req.body.end = moment(req.body.end).format();
		req.body.days = req.body.days.split(',');
		req.body.hours = req.body.hours.split(',');
		var update = {
		  $push: {
		    currents: {
		       $each: [ req.body ],
		       $position: 0
		    }
		  }
		}
		
		Course.findByIdAndUpdate(req.params.courseId, update, function (err) {
			if (err) next(err);
		});
		
		res.redirect('/admin/'+req.params.courseId);
	},
	getLesson: function (req, res, next) {
		Lesson.findOne({_id:req.params.lessonId}).populate('course', 'title lessons')
		.exec(function (err, docs) {
			if (err) next(err);
			var opts = [
		      { path: 'course.lessons', select:'title', model:'Lesson' }, 
		  ];

		  Lesson.populate(docs, opts, function (err, lesson) {
		  	if (err) return next(err);
		    
				res.render('admin/lesson', {layout: 'admin', lesson:lesson});
		  });
		});
	},
	
	editLesson: function (req, res, next) {
		delete req.body._method;
		
		Lesson.findByIdAndUpdate(req.params.lessonId, {$set: req.body}, function (err) {
			if (err) next(err);
		});
		
		res.redirect('/admin/lesson/'+req.params.lessonId);
	},
	addLesson: function (req, res, next) {
		// body...
		Lesson.createAsync(req.body)
			.then(function(lesson) {
				
				lesson.addCourse(req.params.courseId, function (err) {
					if (err) throw err;
				});
				res.redirect('/admin/'+req.params.courseId);
			})
			.error(function(err) {
				res.send(422, {error: err.message});
			})
			.catch(function(err){
			  res.send(500, {error: err});
			});
	},
	getStudent: function (req, res, next) {
		var id = req.params.id;
		Student.findById(id).populate('courses', 'title')
		.exec(function (err, std) {
			if (err) next(err);
			var student = std.toJSON();
			console.log(student);
			res.render('admin/student', {layout: 'admin', student:student});
		});
	},
	deleteStudent: function (req, res, next) {
		var id = req.params.id;
		Student.findByIdAndRemove(id, function (err) {
			if (err) next(err);
			res.end('Student deleted');
		});
	}



};


module.exports = admin;