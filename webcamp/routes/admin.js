var express = require('express');
var router = express.Router();
var admin = require('../controllers/adminController');
var instructor = require('../controllers/instructorController');

router.get('/', admin.main);
router.post('/', admin.addCategory);

router.post('/add', admin.addCourse);
router.put('/course/:id', admin.editCourse);

router.get('/instructor/:id', instructor.get);
router.get('/instructors', instructor.getAll);
router.post('/instructor/add', instructor.set);
router.post('/instructor/:id', instructor.update);


router.post('/category/description/:id', admin.editDescription);

router.get('/lesson/:lessonId', admin.getLesson);
router.post('/lesson/:lessonId', admin.editLesson);

router.get('/student/:id', admin.getStudent);
router.delete('/student/:id', admin.deleteStudent);

router.post('/:courseId/project', admin.addProject);

router.post('/:courseId/project/:projectId', admin.editProject);
router.post('/playlist/:courseId', admin.editPlaylist);

router.post('/:courseId/lesson', admin.addLesson);

router.get('/:courseId', admin.getCourse);
router.post('/:courseId', admin.addDates);
// router.post('/', course.create);

// router.post('/category', course.categoryCreateAddCourse);
// router.delete('/category/:id', course.categoryRemove);
// router.put('/:id', course.update);
// router.delete('/:id', course.remove);



module.exports = router;