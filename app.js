const express = require('express')

const db = require('./db')
const studentRoute = require('./routes/studentRoute')
const teacherRoute = require('./routes/teacherRoute')

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')

const logTime = (req, res, next) =>{
    console.log(`${new Date().toLocaleString()} : Request made at ${req.originalUrl}`)
    next()
}

app.use(logTime)
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/student', studentRoute)
app.use('/teacher', teacherRoute)


const PORT = 4444
app.listen(PORT ,() => {
    console.log(`Project is Running`)
})