const User = require('../models/users/user.model');
const Individual = require('../models/users/individualTrainee.model');

const create = async (user) => {
    
    const individual = new Individual({_userid: user._id})
    user.role = "Trainee" 
    try {
        const id = individual._id
        await individual.save()
        return id;
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
        
        let u = await Individual.findById(individual._roleid)

        if(!u){
            return res.status(400).json({
                msg: "Not Found"
            })
        }

        if(u.enrolled_courses.includes(req.body.courseid)){
            return res.status(400).json({
                msg: "already Owened"
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

const getIndividualCourses = async (req, res) => {

    try {
       
        
        const individual = await Individual.findOne({_userid :req.params.id})
        
        if(!individual){
            return res.status(400).json({
                msg: "Not Found"
            })
        }
        
        
        await individual.populate('enrolled_courses')
        console.log(individual);


       
        return res.status(200).json({
            user: individual
        })


    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}


module.exports = {create, enrollCourse, getIndividualCourses}