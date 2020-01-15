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

  router.get("/", async (req, res) => {
   let notes = await models.notes.findAll({
        where: {
            family_id: req.session.family.userId
        }
    })
    res.render('notes', {notes: notes})
  })


module.exports=router