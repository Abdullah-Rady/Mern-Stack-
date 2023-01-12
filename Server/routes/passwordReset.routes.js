const express = require('express');
const authCntrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/services/requestPasswordReset')
    .post(authCntrl.requestPasswordResetController)

router.route('/services/requestPasswordReset')
    .post(authCntrl.resetPassword)
