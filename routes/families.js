const express = require("express")
const router = express.Router()


router.get("/", (req,res)=>{
    models.family.findAll().then(families => res.render("family", {families: families}))
})


module.exports = router