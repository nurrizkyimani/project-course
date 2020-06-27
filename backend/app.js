
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDatabase = require('./mongodb')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
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
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Sessions;
app.use(session({
    secret: 'tes2',
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