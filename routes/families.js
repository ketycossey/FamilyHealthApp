const express = require("express")
const router = express.Router()

router.post("/signout", (req, res) => {
    req.session.destroy
    res.redirect("/login")
  })  
  
router.get("/", async (req,res)=>{
  let families = await models.family.findAll({
    where:{
      id: req.session.family.userId
    }
  })
  res.render('family', {families: families})
})

router.get("/:memberId", async (req,res)=>{
  let memberId= req.params.memberId
  let members = await models.family_member.findAll({
    where:{
      memberId: memberId
  
    }
  })
  res.render('family', {members: members})
})
  

module.exports = router