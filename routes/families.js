const express = require("express")
const router = express.Router()

router.post("/signout", (req, res) => {
    req.session.destroy
    res.redirect("/login")
  })  
  
router.get("/", async (req,res)=>{
  //let familyId = req.params.familyId

  let families = await models.family.findAll({
    where:{
      id: req.session.family.userId
    }
  })
  res.render('family', {families: families})
})

module.exports = router