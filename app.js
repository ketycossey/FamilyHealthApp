const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const careprovidersRouter = require('./routes/careproviders')
const familiesRouter = require('./routes/families')
const membersRouter = require('./routes/members')
const medicationRouter = require('./routes/medications')
const labresultsRouter = require('./routes/labresults')
const PORT = process.env.PORT || 8080
// const PORT = 3000
require('dotenv').config()
const path = require('path')
const VIEWS_PATH = path.join(__dirname,'/views')

global.models = require("./models")
app.use(express.static(__dirname + '/public'))
//app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine', 'mustache')


// const indexRouter = require('./routes/index')


// app.use('/', indexRouter)
app.use('/labresults', labresultsRouter)
app.use('/careproviders', careprovidersRouter)
app.use('/families', familiesRouter)
app.use('/members', membersRouter)
app.use('/medications', medicationRouter)
app.get('/', (req, res) => {
    console.log("just for testing if it is running or not")
    //res.send("I AM RUNNING if you are testing me:)")
    res.render('index')
})
app.listen(PORT, ()=>{
    console.log("Server is running...")
})