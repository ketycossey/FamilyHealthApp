const express = require("express")
const router = express.Router()

//add note
router.post("/", async (req, res) => {
    let title = req.body.noteTitle;
    let body = req.body.noteBody;
    let notes = models.notes.build({
      title: title,
      body: body
    })
      res.render("notes", {notes: notes})
  });

router.get("/", (req,res)=>{
   res.render("notes")

})


module.exports=router