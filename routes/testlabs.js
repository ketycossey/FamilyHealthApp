const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')

let uniqueFilename = ''

router.get('/add-lab-result', async (req, res) => {
  res.render("add-lab-result")
})

router.post('/add-lab-result', async (req, res) => {
  let testdate = req.body.testdate
  let category = req.body.category
  let memberId = req.session.user.memberId
  
  let labresult = models.TestLab.build({
    test_date: testdate,
    category: category,
    memberId: memberId,
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

router.post('/upload/edit/:labId', (req, res) => {
  uploadFile(req, async (photoURL) => {
    
    let labId = parseInt(req.params.labId)
    let labresult = await models.TestLab.findByPk(labId)
    
    let response = labresult.dataValues
    response.imageURL = photoURL
    res.render('labresults-edit')
  })
  res.send()
})

router.post('/update-labresult', async (req, res) => {
  const labresultId = req.body.labresultId
  const category = req.body.category
  const testdate = req.body.testdate
  
  models.TestLab.update({
    category: category,
    test_date: testdate,
    imageURL: uniqueFilename
    
  }), {
    where: {
      id: labresultId
    }
  }
  res.redirect('/labresults')
})

router.get('/edit/:labresultId', async (req, res) => {
  let labresultId = req.body.labresultId
  let labresult = await models.TestLab.findByPk(labresultId)
  res.render('labresult-edit', labresult.dataValues)
})

router.post('/delete-labresult', async (req, res) => {
  let labresultId = parseInt(req.body.labresultId)
  
  let result = await models.TestLab.destroy({
    where: {
      id: labresultId
    }
  })
  res.redirect('/labresults')
})

router.get('/:memberId', async (req, res) => {
  let memberId = req.params.memberId
  let labresults = await models.TestLab.findAll({
    where: {
      memberId: memberId
    }
  })
  
  res.render('labresults', {labresults: labresults})
})

module.exports = router