const  Course = require('../models/courses/course.model');

const create = (cb)=>{
    return async (req, res) => {
        let course = new Course(req.body)
        try {
            const id = await cb(course, req)
            course.instructor = id._id
            course.author = id.first_name + ' ' + id.last_name
            await course.save()

            res.status(200).json({
                message: "Course Added Successfully"
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
        let courses = await Course.find()
        res.status(200).json(courses)
        
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

const getMostPopular = async (req, res) => {
    try {
        let courses = await Course.find()
        res.status(200).json(courses)
        
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}


const getInstructorCourses = async(req, res) => {
    try {
        console.log("asdf");
        let courses = await Course.find({_roleid : req.params.id})
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({
            error: err
        })
    }
}

const searchCourses = async(req, res) => {


    const query = { $and: [
        {$or :[{title: { $regex: ".*" + req.body.keyword + ".*", $options: 'i' }}, {author: { $regex: ".*" + req.body.keyword + ".*", $options: 'i'}}]},
        
        
    ]}
           
            // { subject: { $in: require.body.subjects }},

        
    

    try{
        let courses = await Course.find(query)
        res.status(200).json(courses)

    }catch(err){
        res.status(400).json({
            error: err
        })
    }

}

const getCourse = async(req, res) => {
    try {
        let c = await Course.findById(req.params.id)

        c.views = c.views + 1

        await c.save()

        await c.populate(
            {
                path: 'instructor',
                // populate: [{path: '_roleid'}]
            }
        )
        // console.log(c);
        // await c.instructor.populate('_roleid')
        // console.log(c);
        return res.status(200).json(c)

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}



const coursesByfilter = async(req, res) => {

    const query = {
        title: {
            $regex: "/" + req.body.title + "/"
        }
    } 

    try{
        let courses = await Course.find(query)
        res.status(200).json(courses)

    }catch(err){
        res.status(400).json({
            error: err
        })
    }

}

const coursesPriceFilter = async(req, res) => {

    const query = {
        $and:[
            {
                price: {
                    $gte: req.body.lower,
                }
            },
            {   
                price: {
                    $lte: req.body.upper,
                }
            }

        ]
    }

    try{
        let courses = await Course.find(query)
        res.status(200).json(courses)

    }catch(err){
        res.status(400).json({
            error: err
        })
    }

}

const addRating = async (req, res) => {
    try{
        const c = await Course.findById(req.params.id)
        if (!c)
            return res.status('400').json({
                message: "Instructor not found"
            })

        
        c.rating = c.rating + req.body.rate

        c.numberOfRatings = c.numberOfRatings + 1
        await c.save()

        return res.status(200).json(c)

    }catch (error){
        return res.status(400).json({
            error: error
        })
    }
}

const addLesson = async (req, res) => {

    // const question1 = {
    //     questionText: "What is the capital of france",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const question2 = {
    //     questionText: "What is the capital of france1",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const question3 = {
    //     questionText: "What is the capital of egypt",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const question4 = {
    //     questionText: "What is the capital of germany",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const lesson = {
    //     lesson_name: "React Router",
    //     link: "I AM a LINK",
    //     description: "descriptiondescriptiondescriptiondescription",
    //     exam: [question1, question2, question3, question4]
    // }

    


    try{
        const c = await Course.findByIdAndUpdate(req.params.id,  { $push: { lessons: req.body } },)
        
        if (!c)
            return res.status('400').json({
                message: "Instructor not found"
        })

        return res.status(200).json({msg: "lesson added succenfully"})

    }catch (error){
        return res.status(400).json({
            error: error
        })
    }
}

const addExam = async (req, res) => {

    // const question1 = {
    //     questionText: "What is the capital of france",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const question2 = {
    //     questionText: "What is the capital of france1",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const question3 = {
    //     questionText: "What is the capital of egypt",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const question4 = {
    //     questionText: "What is the capital of germany",
    //     answerOptions: [{ answerText : "Paris", isCorrect:  true}, { answerText : "Cairo", isCorrect:  false}, { answerText : "Berlin", isCorrect:  false}, ]
    // }

    // const lesson = {
    //     lesson_name: "React Router",
    //     link: "I AM a LINK",
    //     description: "descriptiondescriptiondescriptiondescription",
        // exam: [question1, question2, question3, question4]
    // }

    


    try{
        const c = await Course.findById(req.params.id)
        
        if (!c)
            return res.status('400').json({
                message: "Instructor not found"
        })


        c.lessons[req.body.lesson].exam = req.body.exam
        console.log(c.lessons[req.body.lesson]);

        await c.save()

        return res.status(200).json({msg: "exam added succenfully"})

    }catch (error){
        return res.status(400).json({
            error: error
        })
    }
}





module.exports = {create, list, coursesByfilter, coursesPriceFilter, searchCourses, getCourse, getInstructorCourses, addRating, addLesson, addExam}