const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    class : {
        type : String,
        required : true
    },
    rollNo : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    marks : {
        math : {
            type : Number,
            required : true
        },
        english : {
            type : Number,
            required : true
        },
        science : {
            type : Number,
            required : true
        },
        nepali : {
            type : Number,
            required : true
        },
        account : {
            type : Number,
            required : true
        }
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    status :  {
        enum : ['pass','fail'],
        type : String,
    },
    percentage : {
        type : String,
    },
    total : {
        type : Number,
    }
})

studentSchema.index ({class : 1, rollNo : 1},{unique : true})

studentSchema.pre('save', async function(){
    const marks = this.marks;

    this.status = (marks.math >= 40 &&
                   marks.english >= 40 &&
                   marks.science >= 40 &&
                   marks.nepali >= 40 &&
                   marks.account >= 40)
                   ? 'pass'
                   : 'fail';
    this.total = marks.nepali + marks.account + marks.english + marks.science + marks.math;
    
    this.percentage = `${(this.total*100)/500}%`

    // if(this.isModified('password')){
    //     const salt = await bcrypt.genSalt(10)
    //     const hashPass = await bcrypt.hash(this.pasword, salt)
    // }

    // next()
})

module.exports = mongoose.model('Student' , studentSchema);