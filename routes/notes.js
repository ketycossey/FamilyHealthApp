const express = require("express")
const router = express.Router()


//add note
router.post("/", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let family_id = req.session.family.userId
    let notes = models.notes.build({
      title: title,
      body: body
    })
      notes.save().then((savedNote)=>{
          console.log(savedNote)
      })
  });

router.get("/", (req,res)=>{
   res.render("notes")

})


module.exports=router