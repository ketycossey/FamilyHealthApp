const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')

// hello world, I will hack this stuf to let e add oh my
router.get('/', (req, res) => {
  
  res.send("I am insurance page")
})

module.exports = router