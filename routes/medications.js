const express = require("express");
const router = express.Router();
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')
const fs = require('fs')


let uniqueFilename = ''

router.get("/", (req, res) => {
  models.Medication.findAll().then(medications =>
    res.render("medication", { medications: medications })
  );
});


//add medication
router.get("/add-medication", (req, res) => {
  res.render("add-medication",{className:"medicine-preview-image-invisible"});
});


router.post("/add-medication", async (req, res) => {
  let medicineName = req.body.medicineName;
  let medDescription = req.body.medDescription;
  let medFrequency = req.body.medFrequency;
  console.log(medicineName);

  let medication = models.Medication.build({
    medicineName: medicineName,
    medImageUrl: uniqueFilename,
    medDescription: medDescription,
    medFrequency: medFrequency
  });
  let persistedMedication = await medication.save();
  if (persistedMedication != null) {
    res.redirect("/medications");
  } else {
    res.render("/add-medication", {message:"Unable to add medication" });
  }
});



//edit medication


router.post('/upload/edit-medication/:id',(req,res) => {

  uploadFile(req, async (photoURL) => {

    let medId = parseInt(req.params.medId)
    let medication = await models.Medication.findByPk(medId)

    let response = medication.dataValues
    response.imageURL = photoURL

    res.render('edit-medication',response)
  })

})

 router.get('/medications/:medId',async (req,res) => {

  let medId = req.params.medId
  let medication = await models.Medication.findByPk(medId)
  res.render('edit-medication', medication.dataValues)

 })



router.get("/edit-medication/:medId", async (req, res) => {
  uploadFile(req, async (photoURL)=>{

    let medId = parseInt(req.params.medId)
    let medication = await models.Medication.findByPk(medicationId);
    res.render("edit-medication", medication.dataValues)
  })
})
  ;

router.post ("/edit-medication", async (req, res) => {
  const medId = req.body.medId
  const medicineName = req.body.medicineName;
  const medDescription = req.body.medDescription;
  const medFrequency = req.body.medFrequency;

  const result = await models.Medication.update({
      medicineName: medicineName,
      medImageUrl: uniqueFilename,
      medDescription: medDescription,
      medFrequency: medFrequency
    },{ where: { id: medId }
  
  });
  res.redirect("/medication");
});


//delete medication
router.post("/delete-medicine", async (req, res) => {
  let medId = parseInt(req.body.medId);
  let medImageUrl = req.body.medImageUrl
  let result = await models.Medication.destroy({
    where: {
      id: medId
    }
  })
   if (result) {
     console.log(medImageUrl)
     fs.unlinkSync(`${__basedir}/uploads/${medImageUrl}`)
     console.log(result)
    }
  res.redirect("/medications");
});


function uploadFile(req, callback){
  new formidable.IncomingForm().parse(req).on('fileBegin', (name, file) =>{
    uniqueFilename=`${uuidv1()}.${file.name.split('.').pop()}`
    file.name = uniqueFilename
    file.path = __basedir + '/uploads/' + file.name
  })
  .on('file',(name, file) => {
    callback(file.name)
  })
}
router.post('/upload', (req, res) =>{
  uploadFile(req, (photoURL) => { 
    photoURL = `/uploads/${photoURL}`
    res.render('add-medication', {medImageUrl:photoURL, className:'medication-preview-image'})
  })
})

module.exports = router;
