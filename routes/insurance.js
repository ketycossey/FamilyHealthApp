const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')
var multer = require('multer')
let photo1 = ''
let photo2 = ''
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({storage: storage})
// .fields([
//   {name:'photo1'},
//   {name: 'photo2'}
// ])

//let uniqueFilename1 = ''
//let uniqueFilename2 = ''

router.get('/', async (req, res) => {
  let insurance = await models.Insurance.findAll({
    where: {
      member_id: req.session.memberInfo.id
    }
  })
  res.render('insurance', {insurance: insurance})
})

router.get('/add-insurance', (req, res) => {
  res.render('add-insurance')
})


router.post('/upload', upload.any() ,(req, res,next) => {
  photo1 = req.files[0].filename
  photo2 = req.files[1].filename
  let photo1URL = `/uploads/${photo1}`
  let photo2URL = `/uploads/${photo2}`
  
  res.render('add-insurance', {imageURLfront: photo1URL, imageURLback: photo2URL, className: 'labresult-preview-image' })
})

router.post('/add-insurance', async (req, res) => {
  let careprovider = req.body.careprovider
  let insurance = models.Insurance.build({
    care_provider_name: careprovider,
    member_id: req.session.memberInfo.id,
    front_pic: photo1,
    back_pic: photo2
  })
  
  let persistedInsurance = await insurance.save()
  if(persistedInsurance != null ){
    res.redirect('/insurance')
  } else {
    res.render('add-insurance', {message: 'Unable to add insurance'})
  }
})

module.exports = router