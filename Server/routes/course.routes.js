const express = require('express');
const courseCntrl = require('../controllers/course.controller');
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const instructorCntrl = require('../controllers/instructor.controller')
const router = express.Router()

router.route('/api/courses')
    .get(courseCntrl.list)
    .post(authCtrl.requireSignin, authCtrl.isInstructor, courseCntrl.create(instructorCntrl.addCourse))

router.route("/api/courses/coursesinstructor/:id")
    .get(courseCntrl.getInstructorCourses)


router.route("/api/courses/:id")
    .get(courseCntrl.getCourse)

router.route("/api/courses/:id/addlesson")
    .post(authCtrl.requireSignin, authCtrl.isInstructor, courseCntrl.addLesson)
    
router.route("/api/courses/:id/addexam")
    .post(authCtrl.requireSignin, authCtrl.isInstructor, courseCntrl.addExam)

router.route("/api/courses/:id/rate")
    .post(courseCntrl.addRating)

router.route("/api/courses/ByFilter")
    .get(courseCntrl.coursesByfilter)

router.route("/api/courses/ByPrice")
    .post(courseCntrl.coursesPriceFilter)

router.route("/api/courses/search")
    .post(courseCntrl.searchCourses)

//adding a course could be better to pass instructor id and authorize with it than authorizing with user id then searching for the instructor 

module.exports = router
