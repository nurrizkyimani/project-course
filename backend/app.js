
const express = require('express')
const dotenv = require('dotenv')
const mongoDB = require('mongodb')
const connectDatabase = require('./mongodb')
const morgan = require('morgan')
const PORT = process.env.PORT || 6000
const passport = require('passport')
const session = require('express-session')

dotenv.config({path: './config/config.env'})

//passport config
require('./passport')(passport)


connectDatabase()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Sessions;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

//Passport js middleware

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



app.listen(PORT, console.log(`PORT LISTEN TO ${process.env.NODE_ENV} mode on port ${PORT}`))