const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const corporateCntrl = require('../controllers/corporateTrainee.controller');
const router = express.Router()


router.route('/api/corporates')
    .post(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.create(corporateCntrl.create))

router.route('/api/corporates/request')
    .post(corporateCntrl.request)

router.route('/api/corporates/enroll')
    .post(corporateCntrl.enrollCourse)

    router.route('/api/corporates/reject')
    .post(corporateCntrl.reject)

router.route('/api/requests')
    .get(corporateCntrl.getAllRequests)

router.route('/api/corporates/:id')
    .get(corporateCntrl.getCorporateCourses)

module.exports = router
