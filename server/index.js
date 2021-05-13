// PACKAGE IMPORTS
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive =  require('massive')

// CONTROLLER IMPORTS
const authCtrl = require('./controllers/authController')

// APP INSTANCE
const app = express()

// ENVIRONMENT VARIABLES
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

// DATABASE CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db)
  console.log("Database connected successfully")
  // SERVER LISTENING
  app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT} :3`))
}).catch(err => console.log(err))


// ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)