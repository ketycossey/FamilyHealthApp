const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')

router.get('/', async (req, res) => {
  let member_id = req.params.member_id
  let result = await models.Insurance.findAll({
    where: {
      member_id: member_id
    }
  })
  if(result != null) {
    res.render('insurance')
  } else {
    res.render('insurance', {message: "No insurance uploaded"})
  }
  
})

module.exports = router