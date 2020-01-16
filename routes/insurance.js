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
console.log("I am the upload function:  " + upload)

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

router.get('/edit/:insuranceId', async (req, res) => {
  let insuranceId = req.params.insuranceId
  let insurance = await models.Insurance.findByPk(insuranceId)
  res.render('insurance-edit', insurance.dataValues)
})

router.post('/upload/edit/:insuranceId', upload.any(), async(req,res) => {
  photo1 = req.files[0].filename
  photo2 = req.files[1].filename
  let insuranceId = parseInt(req.params.insuranceId)
  let insuranceresult = await models.Insurance.findByPk(insuranceId)
  
  let response = insuranceresult.dataValues
  response.front_pic = photo1
  response.back_pic = photo2
  
  res.render('insurance-edit', response)
})

router.post('/update-insurance', async (req, res) => {
  const insuranceId = req.body.insuranceId
  const careprovider = req.body.careprovider
  
  await models.Insurance.update({
    care_provider_name: careprovider,
    front_pic: photo1,
    back_pic: photo2
  }, {
    where: {
      id: insuranceId
    }
  })
  res.redirect('/insurance')
})

router.post('/delete-insurance', async(req, res) => {
  let insuranceId = parseInt(req.body.insurance_id)
  let front_pic = req.body.front_pic
  let back_pic = req.body.back_pic
  let result = await models.Insurance.destroy({
    where: {
      id: insuranceId
    }
  })
  
  if(result) {
    fs.unlinkSync(`${__basedir}/uploads/${front_pic}`)
    fs.unlinkSync(`${__basedir}/uploads/${back_pic}`)
  }
  
  res.redirect('/insurance')
})

module.exports = router