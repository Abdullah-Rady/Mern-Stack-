require('dotenv').config({path: './config/.env'})
const mongoose = require('mongoose');
const app = require('./express');

mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("connected to database")
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening on ${process.env.PORT}`)
})



