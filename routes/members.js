const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    models.families.findAll().then(members => res.render("members", {members: members}))
})

router.post('/add/:familyId',(req,res) => {
    let member = models.Family_member.build({
        image_url: req.body.image_url,
        family_member: req.body.family_member,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        family_id: req.params.familyId
    })
    member.save().then(savedMember => console.log(savedMember))
})


module.exports = router