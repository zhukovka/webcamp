var express = require('express');
var router = express.Router();
var student = require('../controllers/studentController');

router.get('/', student.get);
router.post('/', student.create);

router.get('/:id', student.getOne);
router.delete('/:id', student.remove);
router.put('/:id', student.addCourse);

router.post('/add', student.createAddCourse);
router.post('/enroll', student.createOrUpdate);

// router.get('confirm/:id', student.confirm);
router.post('/confirm/:id', student.confirm);


module.exports = router;