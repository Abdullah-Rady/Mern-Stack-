require("dotenv").config({path: '../config/.env'})

const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/users/user.model');
const ROLES = require('../helper/Roles');

const { requestPasswordReset, resetPassword } = require("../services/auth.service");
  


const signin = async (req, res) => {
    try{

        let user = await User.findOne({ "email": req.body.email })

        if (!user)
            return res.status(401).json({ error: "User not found" })
        
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." })
        }
        

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.TOKEN_SECRET)
        res.cookie('t', token, {expire: new Date() + 9999})

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.first_name + " " + user.last_name,
                email: user.email,
                role: user.role
                
            }
        })
    }catch(err){
        return res.status(401).json({ error: err })

    }
}

const signout = (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: "signed out"
        })

}

//to allow specific roles 
const authRole = (role) => {
    return async (req, res, next) => {
        if(req.auth.role != role){
            return res.status(401).json({
                message: "Not Authorized"
            })
        }
        next()
    }

}

const isAdmin = authRole(ROLES.ADMIN)
const isInstructor = authRole(ROLES.INSTRUCTOR)


const isInstructorOrAdmin = async (req, res, next) => {
        if(req.auth.role != ROLES.ADMIN || req.auth.role != ROLES.INSTRUCTOR){
             next()
             return
        }
        return res.status(401).json({
            message: "Not Authorized"
        })
    }



//
const requireSignin = expressjwt({
    secret: process.env.TOKEN_SECRET,
    userProperty: 'auth',
    algorithms: ["HS256"]
})


const hasAuthorization = (req, res, next) => {

    const authorized = req.profile && req.auth && req.profile._id == req.auth._id


    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized"
        })
    }

    next()
}



  
const requestPasswordResetController = async (req, res) => {
    const requestPasswordResetService = await requestPasswordReset(req.body.email);
    return res.json(requestPasswordResetService);
};
  
const resetPasswordController = async (req, res) => {

    
    const resetPasswordService = await resetPassword(
      req.body.id,
      req.body.token,
      req.body.password
    );
    
    return res.json(resetPasswordService);
};
  

module.exports = {signin, signout, isAdmin, isInstructor, requireSignin, hasAuthorization,  requestPasswordResetController, resetPasswordController, isInstructorOrAdmin}