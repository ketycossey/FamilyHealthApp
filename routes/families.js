const express = require("express")
const router = express.Router()

router.post("/signout", (req, res) => {
    req.session.destroy
    res.redirect("/login")
  })  
  
router.get("/", async (req,res)=>{
  console.log(req.session.family.userId)
  let families = await models.Family_member.findAll({
    where:{
      family_id: req.session.family.userId
    }
  })
  res.render('family', {families: families})
})

router.get("/", async (req,res)=>{
  
})


module.exports = router