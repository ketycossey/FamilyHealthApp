const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const careprovidersRouter = require('./routes/careproviders')
const familiesRouter = require('./routes/families')
const membersRouter = require('./routes/members')
const medicationRouter = require('./routes/medications')
const indexRouter = require('./routes/index')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const labresultsRouter = require('./routes/labresults')
const PORT = process.env.PORT || 8080
require('dotenv').config()
const path = require('path')
const VIEWS_PATH = path.join(__dirname,'/views')
const session = require("express-session")
app.use(session({
    secret: "He who has a why to live can bear almost any how",
    resave: false,
    saveUninitialized: true
}))

global.models = require("./models")


function auth(req,res,next) {
    if(req.session.isAuth) {
        next()
    } else {
        res.redirect("/")
    }
}

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine', 'mustache')
app.use('/', indexRouter)
app.use('/register',registerRouter)
app.use('/login', loginRouter)
app.use('/labresults', labresultsRouter)
app.use('/careproviders', careprovidersRouter)
app.use('/families', familiesRouter)
app.use('/members', membersRouter)
app.use('/medications', medicationRouter)

app.listen(PORT, ()=>{
    console.log("Server is running...")
})