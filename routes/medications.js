const express = require("express");
<<<<<<< HEAD
const router = express.Router()

router.get("/medications", (req, res) => {
  models.medications
    .findAll()
    .then(medications => res.render("test", { medications: medications }));
=======
const router = express.Router();

router.get("/", (req, res) => {
  models.medications.findAll().then(medications => res.render("test", { medications: medications }))
>>>>>>> master
});
module.exports = router;
