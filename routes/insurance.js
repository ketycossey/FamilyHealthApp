const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, file.originalname)
  }
})
var upload = multer({storage: storage}).fields([
  {name:'photo1'},
  {name: 'photo2'}
])

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


router.post('/upload', (req, res,next) => {
  upload(req, res, function(err){
    if(err){
      console.log(err)
    } else {
      console.log(req.files)
      res.render('add-insurance')
    }
  })
  
  
//   uploadFile1(req, (photoURL1, photoURL2) => {
//     photoURL1 = `/uploads/${photoURL1}`
//     photoURL2 = `/uploads/${photoURL1}`
//     res.render('add-insurance', {imageURLback: photoURL2, imageURLfront: photoURL1, className: 'labresult-preview-image'})
// })
})

// router.post('/upload2', (req, res) => {
//   uploadFile1(req, (photoURL) => {
//     photoURL = `/uploads/${photoURL}`
//     res.render('add-insurance', {imageURLback: photoURL, className: 'labresult-preview-image'})
//   })
// })


router.post('/add-insurance', (req, res) => {

  
})

module.exports = router