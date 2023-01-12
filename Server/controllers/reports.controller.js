const Reports = require('../models/utils/reports.model');




const list = async (req, res) => {
    try {
        const reports = await Reports.find()

        return res.status(200).json(reports)

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

const markSeen = async (req, res) => {
    
    try {
        const report = await Reports.findById(req.params.id)

        if(!report){
            res.status(400).json({
                error: "Not Found"
            })
        }

        report.seen = true

        await report.save()

        return res.status(200).json(report)
        
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

const post = async (req, res) => {
    try {
        const report = new Reports(req.body)
        await report.save()
        res.status(200).json({
            msg: "added successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

const getUserProblems = async (req, res) => {
    try {
        const reports = await Reports.find({userid : req.params.id})

        return res.status(200).json(reports)
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

const makeResolved = async (req, res) => {
    
    try {
        const report = await Reports.findById(req.params.id)

        if(!report){
            res.status(400).json({
                error: "Not Found"
            })
        }

        report.status = "Resolved"

        await report.save()

        return res.status(200).json(report)
        
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}



module.exports = {list, getUserProblems, post, markSeen, makeResolved}