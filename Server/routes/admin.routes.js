const express = require('express');
const adminCtrl = require('../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const router = express.Router()

router.route('/api/admins')
    .post(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.create(adminCtrl.create))
    

router.route('/api/admins/check')
    .get(authCtrl.requireSignin, adminCtrl.check)
    

    
    
module.exports = router