const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{

    models.Family_member.findAll({
        where: {
            family_id: req.session.family.userId
        }
    }).then(members => {
        //console.log(members)
        res.render("members", {members: members})
        console.log(req.session)
    })
})


//<localhost>:<port>/members/add/<family_id>
router.post('/add/',(req,res) => {
    let member = models.Family_member.build({
        image_url: req.body.image_url,
        family_member: req.body.family_member,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        family_id: req.session.family.userId
    })
    member.save().then(savedMember => console.log(savedMember))
    
})

router.get('/update/:member',(req,res) => {
  
    res.render('update', {id: req.params.member})

})

router.get('/add',(req,res) => {
  
    res.render('add', {id: req.session.family.userId})

})

//<Localhost>:<port>/members/update/<memberId>
router.post('/update/:memberId',(req,res) => {
    let member = models.Family_member.update({
        image_url: req.body.image_url,
        family_member: req.body.family_member,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday
    }, {
            where: {
                id: req.params.memberId,
            }
    })
    res.redirect('/members')
})

//<Localhost>:<port>/members/delete/<memberId>
router.post('/delete/:memberId',(req,res) => {
    let member = models.Family_member.destroy({
        where: {
            id: req.params.memberId
        }
    })
    res.render('members')
})



module.exports = router