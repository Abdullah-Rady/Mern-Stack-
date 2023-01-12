const mongoose = require('mongoose');


const IndividualSchema =  new mongoose.Schema({
    _userid:{
        type : mongoose.ObjectId,
        ref: "User"
    },
    enrolled_courses: {
        type: [mongoose.ObjectId],
        ref: "Course"
    }
})

module.exports = mongoose.model("Individual Trainee", IndividualSchema)