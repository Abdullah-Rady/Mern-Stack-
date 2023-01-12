const mongoose = require('mongoose');


const SubjectSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    courses:{
        type: [mongoose.Schema.ObjectId],
        ref: 'Courses'
    }
})

module.exports = mongoose.model("Subjects", SubjectSchema)
