var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('./Course');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

var InstructorSchema = Schema({
	name: {type: String, required: true},
	email: {
        type:String,
        required: true,
        unique: true
    },
	phone: {type: String},
    fb: String,
    bio: String,
	courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

if (!InstructorSchema.options.toJSON) InstructorSchema.options.toJSON = {};
InstructorSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.__v;
}

InstructorSchema.pre('save', function(next){
        console.log('pre save', this);
    this.model('Course').update(
        {_id: {$in: this.courses}}, 
        {$set: {instructor: this._id}}, 
        { multi: true },
        function (err, numberAffected, raw) {
            if (err) throw err;
            console.log('course updated pre');
            console.log(numberAffected, raw);
        });
    next();
});

InstructorSchema.pre('remove', function(next){
		console.log('pre remove', this);
    this.model('Course').update(
        {_id: {$in: this.courses}}, 
        {$unset: {instructor: ""}}, 
        function (err) {
        	if (err) throw err;
        	console.log('course updated pre');
        });
    next();
});


InstructorSchema.methods.addCourse = function (course, cb) {
    return this.update({$addToSet: { courses: course._id }}, cb);
};

InstructorSchema.statics.enroll = function (req, res, cb) {
    var self = this;

    self.findOneAsync({email:req.body.email})
        .then(function (Instructor) {
            if(Instructor){
                Course.enrollInstructor(req, res, Instructor, function (err) {
                    if (err) throw err;
                    
                });
            } else {
                self.createAsync(req.body)
                    .then(function (Instructor) {
                        Course.enrollInstructor(req, res, Instructor, function (err) {
                            if (err) throw err;
                            
                        });
                    })
                    .error(function (err) {
                        res.send(422, {error: err.message});
                    });
            }
        })
        .error(cb);
};


module.exports = mongoose.model('Instructor', InstructorSchema);