const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')

router.get('/', async (req, res) => {
  
  let insurance = await models.Insurance.findAll({
    where: {
      member_id: req.session.member_id
    }
  })
  if(insurance != null) {
    res.render('insurance', {insurance: insurance})
  } else {
    res.render('insurance', {message: "Upload insurance to display"})
  }
  
})

module.exports = router