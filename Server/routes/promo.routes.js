const promoCntrl = require('../controllers/promo.controller');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller')
const express = require('express');

const router = express.Router()

router.route('/api/promo')
    .post(authCtrl.requireSignin, authCtrl.isInstructorOrAdmin, promoCntrl.addPromo)

router.route('/api/usepromo')
    .post(promoCntrl.usePromo)
module.exports = router