var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('./Course');

var CategorySchema = Schema({
	title: {type: String, required: true, unique: true},
	courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    description: String
});

CategorySchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    var self = this;
    this.model('Course').remove({_id: {$in: this.courses}}).exec(function (err) {
    	if (err) throw err;
    	console.log('course removed');
    });
    next();
});

CategorySchema.methods.addCourse = function (course, cb) {
	return this.update({$addToSet: { courses: course._id }}, cb);
};


module.exports = mongoose.model('Category', CategorySchema);