const User = require('../models/users/user.model');
const Corporate = require('../models/users/corporateTrainee.model');
const Course = require('../models/courses/course.model')
const Requests = require('../models/utils/requests.model');

const create = async (user) => {
    
    
    const corporate = new Corporate({_userid: user._id})
    user.role = "Corporate Trainee"
 
    try {
        let id = corporate._id
        await corporate.save()
        return id
    } catch (error) {

        throw new Error(error)
    }
}

const enrollCourse = async (req, res) => {

    try {

        await Requests.deleteOne({userid: req.body._id, courseid: req.body.courseid})
      
        
        const individual = await User.findById(req.body._id)

        
        if(!individual){
            return res.status(400).json({
                msg: "Not Found"
            })
        }
        
        let u = await Corporate.findById(individual._roleid)

        if(!u){
            return res.status(400).json({
                msg: "Not Found"
            })
        }

        if(u.enrolled_courses.includes(req.body.courseid)){
            return res.status(400).json({
                msg: "Already Enrolled"
            })
        }

        u.enrolled_courses.push(req.body.courseid)

        await u.save()

        return res.status(200).json({
            msg: { u}
        })


    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

const request = async (req, res) => {

    try {
        
        let u = await User.findById(req.body.userid)

        let cc = await Corporate.findById(u._roleid)

        if(cc.enrolled_courses.includes(req.body.courseid)){
            return res.status(200).json({
                msg: "Already Enrolled"
            })
        }


        let r = await Requests.findOne({userid: req.body.userid, courseid: req.body.courseid})
        if(r){
            return res.status(200).json({
                msg: "Already Requested"
            })
        }


        let c = await Course.findById(req.body.courseid)
        
        const request = new Requests({...req.body, name: u.first_name + " " + u.last_name, course: c.title})
        
        await request.save()

        return res.status(200).json({
            msg: "Requested successfully"
        })


    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

const getAllRequests = async (req, res) => {

try{
    const request = await Requests.find()

    return res.status(200).json(request)

}catch(error){
    return res.status(400).json({
        error: error
    })
}

}

const reject = async (req, res) => {
    try {
        let r = await Requests.deleteOne({userid: req.body.userid, courseid: req.body.courseid})
        
            return res.status(200).json({
                msg: "Rejected successfully"
            })
        



    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

const getCorporateCourses = async (req, res) => {

    try {
       
        
        const corporate = await Corporate.findOne({_userid :req.params.id})
        
        if(!corporate){
            return res.status(400).json({
                msg: "Not Found"
            })
        }
        
        await corporate.populate('enrolled_courses')
       
        return res.status(200).json({
            user: corporate
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}


module.exports = {create, enrollCourse, request, getAllRequests, reject, getCorporateCourses}