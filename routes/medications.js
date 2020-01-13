const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  models.Medication
    .findAll()
    .then(medications => res.render("medication", { medications: medications }));
});
router.post('/add-medicine', async(req, res)=>{
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
module.exports = router;
