const express = require("express")
const router = express.Router()


//add note
router.post("/", async (req, res) => {
    let title = req.body.title
    let body = req.body.body
    await models.notes.build({
      title: title,
      body: body
    })
    res.render("notes")
      
  });

  router.get("/",(req, res) => {
    const family_id = req.session.family.userId
    models.notes.findAll().then(notes => res.render("notes", {family_id: family_id, notes: notes}))
  })


module.exports=router