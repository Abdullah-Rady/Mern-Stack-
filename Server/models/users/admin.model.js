const mongoose = require('mongoose');
// const User = require('./user.model');

const AdminSchema =  new mongoose.Schema({
    _userid:{
        type : mongoose.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Admin", AdminSchema)
