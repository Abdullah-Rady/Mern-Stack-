const express = require('express');
const userCtrl = require('../controllers/user.controller');
const individualCntrl = require('../controllers/IndividualTrainee.controller');
const router = express.Router()


router.route('/api/individual')
    .post(userCtrl.create(individualCntrl.create))

router.route('/api/individual/enroll')
    .post(individualCntrl.enrollCourse)
    
router.route('/api/individual/:id')
    .get(individualCntrl.getIndividualCourses)

module.exports = router

