const express = require("express");
const router = express.Router();


router.post("/signout", (req, res) => {
  req.session.destroy
  res.redirect("/login")
})  



router.get("/", (req, res) => {
  res.render("index")
})



module.exports = router;
