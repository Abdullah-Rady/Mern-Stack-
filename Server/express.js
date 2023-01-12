require('dotenv').config({path: "./config/.env"})
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const app = express();

const CURRENT_WORKING_DIR = process.cwd()

//import routes
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const instructorRoutes = require('./routes/instructor.routes')
const corporateRoutes = require('./routes/corporateTrainee.routes')
const subjectRoutes = require('./routes/subject.routes')
const promoRoutes = require('./routes/promo.routes')
const individualRoutes = require('./routes/IndividualTrainee.routes')
const reportRoutes = require('./routes/reports.routes')

//after building to send react
// app.use('/dist', express.static(path.jopin(CURRENT_WORKING_DIR, 'dist')))



//add middleware
if(process.env.env === "development")
    app.use(morgan("dev"))

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compression())

//add routes
app.use(userRoutes)
app.use(authRoutes)
app.use(adminRoutes)
app.use(courseRoutes)
app.use(instructorRoutes)
app.use(corporateRoutes)
app.use(individualRoutes)
app.use(subjectRoutes)
app.use(promoRoutes)
app.use(reportRoutes)


//to catch auth errors
// app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({"error" : err.name + ": " + err.message})
//     }else if (err) {
//         res.status(400).json({"error" : err.name + ": " + err.message})
//         console.log(err)
//     }
// })


//test axios 
app.post('/axios', (req, res) => {

    console.log(req.body);
    return res.json({
        a : "axios"
    })

})


module.exports = app
