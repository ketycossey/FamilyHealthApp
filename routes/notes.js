const express = require("express")
const router = express.Router()


//add note
// router.post("/", async (req, res) => {
//     let title = req.body.noteTitle;
//     let body = req.body.noteBody;
//     let notes = models.notes.build({
//       title: title,
//       body: body
//     })
//       res.render("notes")
//   });

  router.get("/", async (req, res) => {
    // models.notes.findAll().then(notes =>
    //   res.render("notes", { notes: notes })
    // )
    let allnotes = await models.notes.findAll({
        where: {
            family_id: 4
        }
    })
    res.render('notes', {notes: allnotes})
  })


module.exports=router