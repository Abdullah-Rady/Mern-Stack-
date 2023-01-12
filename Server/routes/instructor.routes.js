const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const instructorCtrl = require('../controllers/instructor.controller');
const router = express.Router()


router.route('/api/instructor')
    .post(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.create(instructorCtrl.create))
    
router.route('/api/instructor/:id')
    .get(instructorCtrl.getInstructor)

router.route('/api/instructor/:id/rate')
    .post(instructorCtrl.addRating)

//router.param('instructorId', userCtrl.userById, instructorCtrl.getInstructorByIdParam)

module.exports = router