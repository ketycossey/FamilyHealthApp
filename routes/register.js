const express = require("express")
const router = express.Router()


app.post('/',(req,res) => {

    const familyName = req.body.family_name 
    const username = req.body.username
    const password = req.body.password
    const address = req.body.address

   modules.Family.findOne({
       where:{
           username: username
       }
   })
   if(persistedUser == null){
       let user = models.Family.build({
           familyName : familyName,
           username : username,
           address : address,
           password: password
       })
       let savedUser = await family.save()
       if(savedUser != null){
           res.redirect('/login')
       }else{
           res.render('/',{message: "User already exists!"})
       }
   }

})

app.get('/',(req,res) => {
    res.render('register')
})

module.exports = router