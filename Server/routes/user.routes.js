const express = require('express');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router()


router.route('/api/users')
    .get(userCtrl.list)

router.route('/api/users/finish/:id')
    .get(userCtrl.finishCourse)

router.route('/api/users/:userId')
    .patch(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .get(userCtrl.getUser)


router.param('userId', userCtrl.userById)
    
    
module.exports = router