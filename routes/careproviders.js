const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    models.CareProviders.findAll({
        where: {
            member_id: 1
        }
    }).then(providers => 
        res.render("careproviders", {providers: providers}))
})

router.get("/add-careprovider", (req, res) => {
    res.render("add-careprovider")
})

router.post("/add-careprovider", (req, res) => {
    const provider = models.CareProviders.build({
        doctor_name: req.body.doctor_name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        specialty: req.body.specialty,
        member_id: 1
    })
    provider.save().then(() => {
        res.redirect("/careproviders")
    })
})

router.post("/delete-careprovider", (req, res) => {
    models.CareProviders.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect("/careproviders")
    })
})

router.post("/edit-careprovider", (req, res) => {
    models.CareProviders.update({
        doctor_name: req.body.doctor_name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website,
        specialty: req.body.specialty
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect("/careproviders")
    })
})

router.get("/edit-careprovider/:provider", (req, res) => {
    let id = req.params.provider
    models.CareProviders.findByPk(id).then((myprovider) => {
        res.render("edit-careprovider", {myprovider: myprovider})
    })
})

module.exports = router