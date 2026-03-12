const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const teacherSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    salary : {
        type : Number,
        required: true
    },
    phone : {
        type : Number,
        required: true
    }
})

module.exports = mongoose.model('Teacher',teacherSchema)