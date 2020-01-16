const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')

let uniqueFilename = ''

router.get('/', async (req, res) => {
  let labresults = await models.TestLab.findAll({
    where: {
      memberId: req.session.memberInfo.id
    }
  })
  res.render('labresults', {labresults: labresults})
})

router.get('/add-lab-result', async (req, res) => {
  res.render("add-lab-result")
})

router.post('/add-lab-result', async (req, res) => {
  let testdate = req.body.testdate
  let category = req.body.category
  
  
  let labresult = models.TestLab.build({
    test_date: testdate,
    category: category,
    memberId: req.session.memberInfo.id,
    imageURL: uniqueFilename
  })
  
  let persistedProduct = await labresult.save()
  if(persistedProduct != null) {
    res.redirect('/labresults')
  } else {
    res.render('add-lab-result', {message: 'Unable to add labresult'})
  }
  
})



function uploadFile(req, callback) {
  new formidable.IncomingForm().parse(req)
  .on('fileBegin', (name, file) => {
    uniqueFilename = `${uuidv1()}.${file.name.split('.').pop()}`
    file.name = uniqueFilename
    file.path = __basedir + '/uploads/' + file.name
  })
  .on('file', (name,file) =>{
    callback(file.name)
  })
}

router.post('/upload', (req, res) => {
  uploadFile(req, (photoURL) => {
    photoURL = `/uploads/${photoURL}`
    res.render('add-lab-result', {imageURL: photoURL, className: 'labresult-preview-image'})
  })
})

// Edit page
router.post('/upload/edit/:labId', (req, res) => {
  uploadFile(req, async (photoURL) => {
    
    let labId = parseInt(req.params.labId)
    let labresult = await models.TestLab.findByPk(labId)
    
    let response = labresult.dataValues
    response.imageURL = photoURL
    res.render('labresult-edit', response)
  })
  
})

// edit page
router.post('/update-labresult', async (req, res) => {
  
  const labresultId = req.body.labresultId
  const category = req.body.category
  const testdate = req.body.testdate
  
  await models.TestLab.update({
    category: category,
    test_date: testdate,
    imageURL: uniqueFilename
  }, {
    where: {
      id: labresultId
    }
  })
  res.redirect('/labresults')
})

router.get('/edit/:labresultId', async (req, res) => {
  let labresultId = req.params.labresultId
  let labresult = await models.TestLab.findByPk(labresultId)
  res.render('labresult-edit', labresult.dataValues)
})

router.post('/delete-labresult', async (req, res) => {
  let labresultId = parseInt(req.body.labresultId)
  let imageURL = req.body.imageURL
  let result = await models.TestLab.destroy({
    where: {
      id: labresultId
    }
  })
  
  if(result) {
    fs.unlinkSync(`${__basedir}/uploads/${imageURL}`)
  }
  res.redirect('/labresults')
})

module.exports = router