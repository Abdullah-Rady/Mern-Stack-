const mongoose = require('mongoose');




const LessonSchema =  new mongoose.Schema({
    lesson_name:{
        type: String
    },
    link: {
        type: String,
    },
    description: {
        type: String
    },
    exam:  [{
            questionText: { type: String},
            answerOptions: [{ answerText : {type: String}, isCorrect:  {type: Boolean}}]
            }]
    
})



const CourseSchema =  new mongoose.Schema({
    img:{
        type: String
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    
    hours: {
        type: Number,
        required: true
    },
    
    price: {
        type: mongoose.Decimal128,
        required: true
    },

    
    subject: {
        type: String,
        required: true,
        enum:["Computer Science", "Mathematics", "Web Development", "Android Development", "IOS Development", "Machine Learning", "Artificial Intelligence", "Software Testing"]
    },
    
    numberOfRatings: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    author:{
        type: String,
    },
    instructor: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    description:{
        type: String,
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
   preview: {
       type: String,
   },
    lessons: {
        type: [LessonSchema]
    },

})





module.exports = mongoose.model("Course", CourseSchema)
