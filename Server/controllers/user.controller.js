const User = require('../models/users/user.model');
const _ = require('lodash');
const sendEmail = require('../utils/emails/sendEmail');
const sendPDF = require('../utils/emails/sendPDF');

const create = (cb) => {
    return async (req, res) => {

        const user = new User(req.body)
        
        try {
            const id = await cb(user)

            user._roleid = id
            await user.save()

            await sendEmail(
                user.email,
                "Welcome",
                {name: user.first_name + " " + user.last_name},
                "/template/welcome.handlebars"
            )

            return res.status(200).json({
                message: "Successfully signed up!"
            })
        } catch (err) {

            res.status(400).json({
                error: err
            })
        }
    }

}

const list = async (req, res) => {
    try {
        // let users = await User.find().select('name email ')
        let users = await User.find()
        return res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)

        if (!user)
        return res.status('400').json({
            message: "User not found"
        })

        await user.populate('_roleId')
   
        req.profile = user
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        next()

    } catch (err) {
        return res.status('400').json({
            error: err
        })
    }
}



// const userByID = async (req, res, next, id) => {
    
//     try {
        
//         let user = await User.findById(id)
        
//         if (!user)
//             return res.status('400').json({
//                 message: "User not found"
//             })
       
//         req.profile = user
//         req.profile.hashed_password = undefined
//         req.profile.salt = undefined
//         next()

//     } catch (err) {
//         return res.status('400').json({
//             error: err
//         })
//     }
// }

const getUser = async (req, res) => {
    try {
        
        res.status(200).json({
            user: req.profile
        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

const update = async (req, res) => {
    try {      
        let user = req.profile
        user = _.extend(user, req.body)
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        return res.json(user)
        
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


const finishCourse = async (req, res) => {
    try {
        let u = await User.findById(req.params.id)
        await sendPDF(u.email, "Here is your certificate")

        res.status(200).json({
            msg: ""
        })

    } catch (error) {
        
    }
}

module.exports = {create, list, update, userById, getUser, finishCourse}