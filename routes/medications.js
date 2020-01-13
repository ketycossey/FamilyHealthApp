const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  models.Medication
    .findAll()
    .then(medications => res.render("medication", { medications: medications }));
});
router.get('/add-medication', (req, res) => {
  res.render('add-medication')
})
router.post('/add-medication', async(req, res)=>{
  let medicineName = req.body.medicineName
  let medDescription = req.body.medDescription
  let medFrequency = req.body.medFrequency
console.log(medicineName)

  let medication= models.Medication.build({
  medicineName:medicineName,
  //medImageUrl: uniqueFilename,
  medDescription:medDescription,
  medFrequency: medFrequency
})
console.log(medication)
let persistedMedication = await medication.save()
if (persistedMedication !=null){
  res.redirect('/medications')
} else{
  res.render('/add-medicine', {message:'Unable to add medication'})
}
})
router.get('/medications/:medicationId', async (req, res) =>{
  let medicationId = req.params.medicationId
  let medication= await models.Medication.findByPk(medicationId)
  res.render('/edit-medicine', medication.dataValues)
})
router.post('/edit-medicine', async (req, res)=>{
 //const medId = request.body.medId
  const medicineName = req.body.medicineName
  const medDescription = req.body.medDescription
  const medFrequency = req.body.medFrequency

const result = await models.Medication.update({
  medicineName:medicineName,
  //medImageUrl: uniqueFilename,
  medDescription:medDescription,
  medFrequency: medFrequency
},{where: {medicineName: medicineName}
  
})
res.redirect('/medications')
})

router.post('/delete-medicine', async (req, resp)=>{
  let medicineId = parseInt(req.body.medicineId)
  let result = await models.Medication.destroy({
    where:{
      id:medicineId
    }


  })
res.redirect('/medication')
})
module.exports = router;
