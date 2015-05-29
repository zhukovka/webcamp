var courses = {};
var Course = require('../models/courses/Course');
var Category = require('../models/courses/Category');
var Lesson = require('../models/courses/Lesson');
var Instructor = require('../models/courses/Instructor');
var mongoose = require('mongoose');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

courses.get = function (req, res, next) {
	Course.findAsync()
	.then(function (courses) {
		res.json(courses);
	})
	.error(function (err) {
		return next(err);
	});
};

courses.getOne = function (req, res, next) {
	Course.findOneAsync({_id:req.params.id})
	.then(function (courses) {
		res.json(courses);
	})
	.error(function (err) {
		next(err);
	});
};

courses.getLessons = function (req, res, next) {
	console.log('lessons');
	Course.findById(req.params.id).populate('lessons', 'title description')
	.exec(function (err, course) {
		if(err) next(err);
		res.json(course.lessons);
	})
};

courses.getOneInstructor = function (req, res, next) {
	Instructor.findOneAsync({_id:req.params.id})
	.then(function (instructor) {
		res.json(instructor);
	})
	.error(function (err) {
		return next(err);
	});
};


courses.remove = function (req, res, next) {
	Course.remove({_id:req.params.id}, function (err) {
		if (err) return next(err);
	});
	res.send('course removed');
};

courses.categoryRemove = function (req, res, next) {
	Category.findOne({_id:req.params.id}, function (err, category) {
		category.remove(function (err) {
			if (err) return next(err);
		});
		res.send('category removed');
	});
};

courses.create = function (req, res, next) {
	var self = this;
	Course.createAsync({title:req.body.title})
	.then(function(course) {
		course.addCategory(req.body.category, function (err) {
			if (err) throw err;
		});
		console.log(course, 'Course added');
		res.json(course);
	})
	.error(function(err) {
		res.send(422, {error: err.message});
	})
	.catch(function(err){
	  res.send(500, {error: err});
	});
};

courses.update = function (req, res, next) {
	Course.findOne({_id:req.params.id}, function (err, course) {
			if (err) throw err;
			if(req.body.title){
				course.updateTitle(req.body.title, function (err, course) {
					if (err) throw err;
					res.send('title was updated');
				});
			} else if(req.body.category){
				course.addCategory(req.body.category, function (err, course) {
					if (err) throw err;
					res.send('category was updated');
				});
			}
	});
};


courses.categoryCreateAddCourse = function (req, res, next) {
	Category.createAsync(req.body)
	.then(function(category) {
		Course.createAsync({title:req.body.course})
		.then(function (course) {
			category.update({$addToSet: { courses: course._id }}, 
				function (err) {
								if (err) throw err;
							});
			course.update({$set: { category: category._id }}, function (err) {
							if (err) throw err;
						});
		})
		.error(function(err) {
			res.send(422, {error: err.message});
		});
		// console.log(student, 'student added');
		return res.json(category);
	})
	.error(function(err) {
		res.send(422, {error: err.message});
	})
	.catch(function(err){
	  res.send(500, {error: err});
	});
};

courses.getCategories = function (req, res, next) {
	Category.find().populate('courses').exec(function(err, docs) {

    var options = {
      path: 'courses.instructor',
      select: 'name _id photo bio',
      model: 'Instructor'
    };

    if (err) return res.json(500);
    Category.populate(docs, options, function (err, categories) {
      res.json(categories);
    });
  });
};

courses.getInstructors = function (req, res, next) {
	Instructor.find().exec(function (err, instructors) {
	  if (err) return next(err);
			res.json(instructors);
	});
};

courses.getAllLessons = function (req, res, next) {
	Lesson.find().exec(function (err, lessons) {
	  if (err) return next(err);
			res.json(lessons);
	});
};

courses.getCategoryByTitle = function (req, res, next) {
	Category.findOne({title: req.params.title}).populate('courses').exec(function (err, categories) {
	  if (err) return next(err);
			res.json(categories);
	});
};

module.exports = courses;