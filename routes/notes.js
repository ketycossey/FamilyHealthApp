const express = require("express")
const router = express.Router()

router.post('/', async(req,res)=>{
    let title = req.body.title
    let body = req.body.body
    await model.notes.build({
        title: title,
        body: body
    })
    notes.save().then(savedNote=> res.render("notes"))

})

router.get("/", (req,res)=>{
   res.render("notes")

})


module.exports=router