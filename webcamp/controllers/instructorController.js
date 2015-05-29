var Course = require('../models/courses/Course');
var Instructor = require('../models/courses/Instructor');
var mongoose = require('mongoose');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

var instructor = {
	getAll: function (req, res, next) {
		Instructor.find().populate('courses','title').exec(function (err, instructors) {
			if (err) next(err);
			res.json(instructors);
		});
	},
	get: function (req, res, next) {
		Instructor.findById(req.params.id)
			.populate('courses','title').exec(function (err, instr) {
			if (err) next(err);
			// res.json(instructor);
			var instructor = instr.toJSON();
			console.log(instructor);
			res.render('admin/instructor', {layout: 'admin', instructor:instructor});
		});
	},
	set: function (req, res, next) {
		var course = req.body.course;
		delete req.body.course;
		// console.log(req.body);
		Instructor.findOne({email:req.body.email}, function (err, instructor) {
			if (err) next(err);
			if(!instructor){
				var instructor = new Instructor(req.body);
			}
			// console.log(instructor.courses);
			instructor.courses.addToSet(course);
			instructor.save(function (err, instructor) {
				if (err) next(err);
				console.log(instructor);
				res.redirect('/admin/'+course);
			});
		});
	},
	update: function (req, res, next) {
		Instructor.findByIdAndUpdate(req.params.id, req.body, function (err) {
			if (err) next(err);
			res.end('instructor updated');
		});
	}
};

module.exports = instructor;