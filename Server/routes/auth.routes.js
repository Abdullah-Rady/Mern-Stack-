const express = require('express');
// const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router()

router.route('/auth/signin')
    .post(authCtrl.signin)
    
router.route('/auth/signout')
    .get(authCtrl.signout)

router.route('/auth/requestPasswordReset')
    .post(authCtrl.requestPasswordResetController)

    
router.route('/auth/PasswordReset')
    .post(authCtrl.resetPasswordController)

    

// router.param('userId', userCtrl.userByID)

    
module.exports = router