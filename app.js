const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 

const db = require('./db')
const studentRoute = require('./routes/studentRoute')
const teacherRoute = require('./routes/teacherRoute')
const studentModels = require('./models/studentModels')

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')

const logTime = (req, res, next) =>{
    console.log(`${new Date().toLocaleString()} : Request made at ${req.originalUrl}`)
    next()
}

app.use(passport.initialize())

// passport strategy
passport.use(new LocalStrategy(
    { usernameField: 'name', passwordField: 'password' },
    async (name, password, done)=>{
        try {
            const user = await studentModels.findOne({name : name})

            if(!user){
                return done(null, false, {message : "User not found"})
            }

            const isMatchPwd = user.password === password

            if(!isMatchPwd){
                return done(null, false, {message : "Invalid Password"})
            }

            return done(null, user)

        } catch (error) {
            return done(error)
        }
}))

const authMiddleware = passport.authenticate('local', {session:false})

app.use(logTime)

app.get('/', authMiddleware, (req, res) => {
    res.render('home')
})

app.use('/student', studentRoute)
app.use('/teacher', teacherRoute)

const PORT = 4444
app.listen(PORT ,() => {
    console.log(`Project is Running`)
})