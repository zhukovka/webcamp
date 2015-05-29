var express = require('express');
var router = express.Router();
var course = require('../controllers/courseController');

router.get('/', course.get);

router.get('/lessons', course.getAllLessons);

router.get('/instructors', course.getInstructors);
router.get('/instructors/:id', course.getOneInstructor);

router.get('/category', course.getCategories);
router.get('/category/:title', course.getCategoryByTitle);

router.get('/:id', course.getOne);
router.get('/:id/lessons', course.getLessons);




module.exports = router;