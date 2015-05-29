var students = {};
var Student = require('../models/students/Student');
var Course = require('../models/courses/Course');
var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

students.get = function (req, res, next) {
	Student.findAsync()
	.then(function (students) {
		res.json(students);
	})
	.error(function (err) {
		next(err);
	});
};

students.getOne = function (req, res, next) {
	Student.findById(req.params.id)
	.populate('courses')
	.exec(function (err, student) {
	  if (err) return next(err);
			res.json(student);
	});
};

students.create = function (req, res, next) {
	Student.createAsync(req.body)
	.then(function(student) {
		console.log(student, 'student added');
		res.json(student);
	})
	.error(function(err) {
		res.send(422, {error: err.message});
	})
	.catch(function(err){
	  res.send(500, {error: err});
	});
};

students.createOrUpdate = function (req, res, next) {
	
	Student.enroll(req, res, function (err) {
		
		if(err) res.send(422, {error: err.message});
	});

};

students.confirm = function (req, res, next) {
	Student.update({_id:req.params.id}, {confirmed:true}, function (err) {
		if(err) throw err;
		res.send('confirmed');
	});
};

students.createAddCourse = function (req, res, next) {
	Student.createAsync(req.body)
	.then(function(student) {
		Course.findOneAsync({title:req.body.course})
		.then(function (course) {
			student.update({$addToSet: { courses: course._id }}, 
				function (err) {
								if (err) throw err;
							});
			course.update({$addToSet: { students: student._id }}, function (err) {
							if (err) throw err;
						});
		})
		.error(function(err) {
			res.send(422, {error: err.message});
		});
		console.log(student, 'student added');
		return res.json(student);
	})
	.error(function(err) {
		console.log(err);
		res.send(422, {error: err.message});
	})
	.catch(function(err){
	  res.send(500, {error: err});
	});
};

students.remove = function (req, res, next) {
	var studentId = req.params.id;
	Student.findOne({_id:studentId}, function (err, student) {
		if (err) throw err;
		if(student){
			student.remove(function (err) {
					if (err) throw err;
					res.send('student removed');
				});
		}
		res.json(student);
	});
};

students.addCourse = function (req, res) {
	// body...
	var studentId = req.params.id;
	Student.findOne({_id:studentId}, function (err, student) {
	// body...
		if (err) throw err;
		Course.findOne(req.body, function (err, course) {
			if (err) throw err;
			student.update({$addToSet: { courses: course._id }}, function (err) {
								if (err) throw err;
								console.log("student updated");
							});
			course.update({$addToSet: { students: student._id }}, function (err) {
								if (err) throw err;
								console.log("course updated");
							});
			res.json(student);
		});
	});
};

module.exports = students;