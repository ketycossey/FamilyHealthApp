const express = require("express");
const router = express.Router();
const formidable = require('formidable')
const uuidv1 = require('uuid/v1')
const models = require('../models')


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
router.get("/edit-medication/:id", async (req, res) => {
  let medicationId = req.params.id;
  let medication = await models.Medication.findByPk(medicationId);
  res.render("edit-medication", medication.dataValues);
});

router.post("/edit-medication/:id", async (req, res) => {
  const id = request.body.id
  const medicineName = req.body.medicineName;
  const medDescription = req.body.medDescription;
  const medFrequency = req.body.medFrequency;

  const result = await models.Medication.update(
    {
      medicineName: medicineName,
      medImageUrl: uniqueFilename,
      medDescription: medDescription,
      medFrequency: medFrequency
    },
    { where: { medicineName: medicineName } }
  );
  res.redirect("/medications");
});
//delete medication
router.post("/delete-medicine", async (req, resp) => {
  let medicineId = parseInt(req.body.medicineId);
  let result = await models.Medication.destroy({
    where: {
      id: medicineId
    }
  });
  res.render("/medication");
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
