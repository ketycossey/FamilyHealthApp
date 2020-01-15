const express = require("express")
const getMember = require("../functions/member")

const router = express.Router()

router.get("/", (req, res) => {
    res.render("careproviders", {providers: req.session.memberInfo.Care_provider})
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
        member_id: req.session.memberInfo.id
    })
    provider.save().then( async (newprovider) => {
        req.session.memberInfo.Care_provider.push(newprovider)
        res.redirect("/careproviders")
    })
})

router.post("/delete-careprovider", (req, res) => {
    models.CareProviders.destroy({
        where: {
            id: req.body.id
        }
    }).then( async () => {
        const id = req.body.id
        const updatedProviders = req.session.memberInfo.Care_provider.filter(provider => provider.id != id)
        req.session.memberInfo.Care_provider = updatedProviders
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
    }).then( async () => {
        const id = req.body.id
        let updatedProviders = req.session.memberInfo.Care_provider.filter(provider => provider.id != id)
        let updatedProvider = req.session.memberInfo.Care_provider.filter(provider => provider.id == id)
        updatedProvider[0].doctor_name = req.body.doctor_name
        updatedProvider[0].address = req.body.address
        updatedProvider[0].phone = req.body.phone
        updatedProvider[0].email = req.body.email
        updatedProvider[0].website = req.body.website
        updatedProvider[0].specialty = req.body.specialty
        updatedProviders.push(updatedProvider[0])
        req.session.memberInfo.Care_provider = updatedProviders
        res.redirect("/careproviders")
    })
})

router.get("/edit-careprovider/:provider", (req, res) => {
    let id = req.params.provider
    const myprovider = req.session.memberInfo.Care_provider.filter(provider => provider.id == id)
    res.render("edit-careprovider", {myprovider: myprovider})
})

module.exports = router