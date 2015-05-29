var Course = require('./Course');
var Category = require('./Category');
var Instructor = require('./Instructor');
var mongoose = require('mongoose');
var Promise = require("bluebird");
var configDB = require('../../config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

var year = 2014, 
		month = 10, 
		day = 11, 
		hours = 11;

Course.createAsync({
	title:'php Symfony',
	details: 'php pppp',
	price: 3200,
	currents: [{ 
		start: new Date(year, month, day, hours), 
		end: new Date(year, month+2, day+1, hours+2),
		days: [6, 7], 
		hours: ['19:00','21:00']
		}]
	})
	.then(function(course) {
		course.addCategory('php', function (err) {
			if (err) throw err;
		});

		course.addInstructor({
			name:'Vasia',
			email:'ololo@gmail.com'
		}, function (err) {
			if (err) throw err;
		});
		console.log(course, 'Course added');
		
	})
	.error(function(err) {
		throw err;
		// res.send(422, {error: err.message});
	})
	.catch(function(err){
		throw err;
	  // res.send(500, {error: err});
	});