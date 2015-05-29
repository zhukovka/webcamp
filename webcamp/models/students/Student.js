var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = require('../courses/Course');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

var StudentSchema = Schema({
	name: {type: String, required: true},
	email: {
        type:String,
        required: true,
        unique: true
    },
	phone: {type: String, required: true},
	registered: { type: Date, default: Date.now },
	courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    spype: Boolean,
    confirmed: Boolean
});

// specify the transform StudentSchema option
if (!StudentSchema.options.toJSON) StudentSchema.options.toJSON = {};
StudentSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.__v;
}

StudentSchema.pre('remove', function(next){
		console.log('pre remove', this);
    this.model('Course').update(
        {_id: {$in: this.courses}}, 
        {$pull: {students: this._id}}, 
        {multi: true}, function (err) {
        	if (err) throw err;
        	console.log('course updated pre');
        });
    next();
});

StudentSchema.statics.enroll = function (req, res, cb) {
    var self = this;

    self.findOneAsync({email:req.body.email})
        .then(function (student) {
            if(student){
                Course.enrollStudent(req, res, student, function (err) {
                    if (err) throw err;
                    
                });
            } else {
                self.createAsync(req.body)
                    .then(function (student) {
                        Course.enrollStudent(req, res, student, function (err) {
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


module.exports = mongoose.model('Student', StudentSchema);