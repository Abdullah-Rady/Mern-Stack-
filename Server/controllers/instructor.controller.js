const Instructor = require('../models/users/instructor.model');
const User = require('../models/users/user.model');

const create = async (user) => {
    
    const instructor = new Instructor({_userid: user._id})
    user.role = "Instructor"
    
    try {
        const id = instructor._id
        await instructor.save()
        return id
    } catch (error) {
        throw new Error(error)
    }
}

const list = async (req, res) => {
    try {
        // let users = await User.find().select('name email ')
        let instructors = await Instructor.find()
        return res.json(instructors)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const getInstructorByIdParam = (req, res, next) => {
    try {
        let instructor = Instructor.findById(req.profile._roleid)
        req.profile = {...req.profile, instructor}

        if (!instructor)
            return res.status('400').json({
                message: "Instructor not found"
            })

        next()
    } catch (error) {
         res.status(400).json({
            message: error
        })
    }
}

const getInstructorById = (req, res) => {
    return res.status(200).json({  
        Instructor: req.profile
    })
}

const addCourse = async (course, req) => {
    try {

        const instructor = await Instructor.findOneAndUpdate({id: req.auth._id}, { $push: { courses: course._id}}, {new: true} )
        
        if (!instructor)
            return res.status('400').json({
                message: "Instructor not found"
            })

        await instructor.save()
        let us = await User.findById({_id: req.auth._id})

        return us
    } catch (error) {
        throw new Error(error)
    }
}

const getInstructor = async (req, res) => {
    try{
        const instructor = await User.findById(req.params.id)
        if (!instructor)
            return res.status('400').json({
                message: "Instructor not found"
            })

        let u = await Instructor.findById(instructor._roleid)


        return res.status(200).json({instructor, u})

    }catch (error){
        return res.status(400).json({
            error: error
        })
    }
}

const addRating = async (req, res) => {
    try{
        const instructor = await User.findById(req.params.id)
        if (!instructor)
            return res.status('400').json({
                message: "Instructor not found"
            })

        let u = await Instructor.findById(instructor._roleid)
        u.rating = u.rating + req.body.rate

        u.numberOfRatings = u.numberOfRatings + 1

        await u.save()

        return res.status(200).json(u)

    }catch (error){
        return res.status(400).json({
            error: error
        })
    }
}

module.exports = {create, getInstructorById, getInstructorByIdParam, addCourse, getInstructor, addRating}