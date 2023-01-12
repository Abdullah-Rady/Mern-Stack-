const express = require('express');
const reportCntrl = require('../controllers/reports.controller');

const router = express.Router()

router.route('/api/reports')
    .get(reportCntrl.list)

router.route('/api/reports/seen/:id')
    .get(reportCntrl.markSeen)

router.route('/api/reports/user/:id')
    .get(reportCntrl.getUserProblems)

router.route('/api/reports/resolve/:id')
    .get(reportCntrl.makeResolved)

router.route('/api/reports')
    .post(reportCntrl.post)


module.exports = router