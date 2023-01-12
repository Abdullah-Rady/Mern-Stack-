const mongoose = require('mongoose');


const InstructorSchema =  new mongoose.Schema({
    _userid:{
        type : mongoose.ObjectId,
        ref: "User"
    },
    
    courses:{
        type : [mongoose.ObjectId],
        ref: "Course"
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRatings: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Instructor", InstructorSchema)