const mongoose = require('mongoose');


const CorporateSchema =  new mongoose.Schema({
    _userid:{
        type : mongoose.ObjectId,
        ref: "User"
    },
    enrolled_courses: {
        type: [mongoose.ObjectId],
        ref: "Course"
    }
})

module.exports = mongoose.model("Corporate Trainee", CorporateSchema)