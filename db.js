const mongoose = require('mongoose')

const mongooseURL = "mongodb://127.0.0.1:27017/school"

mongoose.connect(mongooseURL)

const db = mongoose.connection

db.on('connected', () =>{
    console.log("MongoDB connected")
})

db.on('error', (error) =>{
    console.log("Error connecting MongoDB "+ error  )
})

db.on('disconnected', () =>{
    console.log("MongoDB disconnected")
})

module.exports = db