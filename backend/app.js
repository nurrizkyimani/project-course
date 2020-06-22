
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const mongoDB = require('mongodb')
const connectDatabase = require('./mongodb')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const { Mongoose } = require('mongoose')
const { urlencoded } = require('express')
const MongoStore = require('connect-mongo')(session)
dotenv.config({path: './config/config.env'})

//passport config
require('./passport')(passport)

//database init
connectDatabase()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//connect bodyparser

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Sessions;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }))

//Passport js middleware
app.use(passport.initialize())
app.use(passport.session())

// ROUTE
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/review', require('./routes/reviewRoutes'))

//PORT 
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`PORT LISTEN TO ${process.env.NODE_ENV} mode on port ${PORT}`))