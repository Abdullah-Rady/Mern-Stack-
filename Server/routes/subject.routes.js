const express = require('express');
const Subject = require('../models/courses/subject.model');
const router = express.Router();

router.get('/api/subjects', async (req, res) => {
    try {
        let subjects = await Subject.find()
        
        if(!subjects)
            return res.status('400').json({
                message: "No Subjects found"
            })
        
        return res.json(subjects)
        
        
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = router