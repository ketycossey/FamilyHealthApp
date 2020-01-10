const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  models.Medication
    .findAll()
    .then(medications => res.render("medication", { medications: medications }));
});
module.exports = router;
