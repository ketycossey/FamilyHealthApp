const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    models.CareProviders.findAll().then(providers => 
        res.render("careproviders", {providers: providers}))
       
})

router.post("/", (req, res) => {
    const provider = models.CareProviders.build({
        doctor_name: req.body.doctor_name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        specialty: req.body.specialty,
        member_id: req.body.member_id
    })
    provider.save().then(() => {
        res.redirect("/careproviders")
    })
})

module.exports = router