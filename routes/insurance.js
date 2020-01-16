const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')

router.get('/', async (req, res) => {
  //let member_id = req.body.member_id
  //console.log(member_id)
  // let insurance = await models.Insurance.findAll({
  //   where: {
  //     member_id: member_id
  //   }
  // })
  let insurance = req.session.memberInfo.Insurance
  if(insurance != null) {
    res.render('insurance', {insurance: insurance})
  } else {
    res.render('insurance', {message: "Upload insurance to display", insurance: insurance})
  }
  
})

module.exports = router