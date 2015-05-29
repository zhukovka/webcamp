var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('./Course');

var LessonSchema = Schema({
	title: {type: String, required: true, unique: true},
	course: {type: Schema.Types.ObjectId, ref: 'Course'},
	description: String
});

LessonSchema.pre('remove', function(next){
		// console.log('pre remove', this);
    
		this.model('Course').update(
        {_id: {$in: this.course}}, 
        {$pull: {lessons: this._id}}, 
        {multi: true}, function (err) {
        	if (err) throw err;
        	console.log('course updated pre');
        });

    next();
});


LessonSchema.methods.addCourse = function (courseId, cb) {
	var self = this;
	Course.findById(courseId, function (err, course) {
		if (err) throw err;
		/*if the course exists*/
		if(course){
			course.update({$push: {lessons: self._id}}, {upsert:true}, 
				function (err) {
					if (err) throw err;
			})
			return self.update({$set: { course: course._id }}, cb);
		}
	});

};

module.exports = mongoose.model('Lesson', LessonSchema);