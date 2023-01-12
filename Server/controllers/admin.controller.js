const Admin = require('../models/users/admin.model');

const create = async (user) => {
    
    const admin = new Admin({_userid: user._id})

    user.role = "Admin"
    try {
        const id = admin._id

        await admin.save()

        return id
    } catch (error) {
        throw new Error(error)
    }
}

const list = async (req, res) => {
    try {
        let admins = await Admin.find().populate()
        return res.json(admins)
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

const check = (req, res) => {
    if(req.auth.role === "Admin")
        return res.status(200).json({
            msg: "Admin"
        })

        return res.status(400).json({
            msg: "Not authorized"
        })
}


module.exports = {create, list, check }
