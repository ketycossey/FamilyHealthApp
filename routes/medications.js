const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const uuidv1 = require("uuid/v1");
const models = require("../models");
const fs = require("fs");

let uniqueFilename = "";

router.get("/", (req, res) => {
  models.Medication.findAll({
    where:{ member_id:req.session.memberInfo.id}
   }).then(medications => {
    req.session.memberInfo.Medication=medications
    console.log(req.session.memberInfo);
    res.render("medication", { medications: req.session.memberInfo.Medication });
  });

  // console.log(req.session.memberInfo);
  //   res.render("medication", { medications: req.session.memberInfo.Medication });
});

//add medication
router.get("/add-medication", (req, res) => {
  res.render("add-medication", { memberId: 23 });
});

router.post("/add-medication", async (req, res) => {
  let medicineName = req.body.medicineName;
  //let member_id = req.session.memberInfo.id;
  let medDescription = req.body.medDescription;
  let medFrequency = req.body.medFrequency;
  console.log(medicineName);

  let medication = models.Medication.build({
    medicineName: medicineName,
    medImageUrl: uniqueFilename,
    medDescription: medDescription,
    medFrequency: medFrequency,
    member_id: req.session.memberInfo.id
  });
  let persistedMedication = await medication.save();
  req.session.memberInfo.Medication.push(persistedMedication)
  if (persistedMedication != null) {
    res.redirect("/medications");
  } else {
    res.render("/add-medication", { message: "Unable to add medication" });
  }
});
//edit medication
router.get("/edit-medication/:id", async (req, res) => {
  let medicationId = req.params.id;
  let medication = await models.Medication.findByPk(medicationId);
  res.render("edit-medication", medication.dataValues);
});

router.post("/edit-medication/:id", async (req, res) => {
  const id = req.params.id;
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
    { where: { id: id } }
  );
  res.redirect("/medications");
});
//delete medication
router.post("/delete-medicine", async (req, res) => {
  let medicineId = parseInt(req.body.medicineId);
  let medImageUrl = req.body.medImageUrl;
  let result = await models.Medication.destroy({
    where: {
      id: medicineId
    }
  }); 
  const updatedMedicine = req.session.memberInfo.Medication.filter(medicine => medicine.id != medicineId)
  req.session.memberInfo.Medication = updatedMedicine
  
  if (result) {
    //console.log("this is sparta" + medImageUrl);
    fs.unlinkSync(`${__basedir}/uploads/${medImageUrl}`);
    //console.log(result);
  }
  res.redirect("/medications");
});

function uploadFile(req, callback) {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      uniqueFilename = `${uuidv1()}.${file.name.split(".").pop()}`;
      file.name = uniqueFilename;
      file.path = __basedir + "/uploads/" + file.name;
    })
    .on("file", (name, file) => {
      callback(file.name);
    });
}
router.post("/upload/:memberId", (req, res) => {
 // let member_id = req.params.memberId;
  uploadFile(req, photoURL => {
    photoURL = `/uploads/${photoURL}`;
    res.render("add-medication", {
      //member_id: member_id,
      medImageUrl: photoURL,
      className: "medication-preview-image"
    });
  });
});

router.post("/upload/edit-medication/:id", (req, res)=>{
  uploadFile(req, async (photoURL) => {
    
    let medicineId= parseInt(req.params.id)
    let medResult = await models.Medication.findByPk(medicineId)
    
    let response = medResult.dataValues
    response.medImageUrl = photoURL
    res.render('edit-medication', response)
  })
})
module.exports = router;
