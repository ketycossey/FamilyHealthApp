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
       bcrypt.hash(password, SALT_ROUNDS,async(error, hash)=>{
           if(error){
               res.render('/', {message: 'Error creating user!'})
           }else{
            let family = models.Family.build({
                familyName : familyName,
                username : username,
                address : address,
                password: hash
            })
            let savedUser = await family.save()
            if(savedUser != null){
                res.redirect('/login')
            }else{
                res.render('/',{message: "User already exists!"})
            }
        }
       })
   }else{
       res.render('/',{message:"User already exists!"})
   }   
})

app.get('/',(req,res) => {
    res.render('register')
})

module.exports = router