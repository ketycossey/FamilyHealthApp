const express = require("express")
const router = express.Router()


router.post('/delete-note', (req,res)=>{
    const id = req.body.id
    models.notes.destroy({
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect('/notes')
    })
})
router.post('/', (req,res)=>{
    let notes= models.notes.build({
        title: req.body.title,
        body: req.body.body,
        family_id: req.session.family.userId
    })
    notes.save().then(savedNote=>console.log(savedNote))
    res.redirect("/notes")
})

router.get("/", (req,res)=>{
    models.notes.findAll({
        where:{
            family_id: req.session.family.userId
        }
    }).then(notes =>{
        res.render("notes", {notes: notes})
    })
})


module.exports=router