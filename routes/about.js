const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')

router.get("/", (req, res) =>{
    res.render('about')
})



module.exports = router