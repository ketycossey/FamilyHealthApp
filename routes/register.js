const express = require("express")
const router = express.Router()


router.post('/',async (req,res) => {

    let family_name = req.body.family_name 
    let username = req.body.username
    let password = req.body.password
    let address = req.body.address

    let persistedFamily= await models.family.findOne({
       where:{
           family_name: family_name,
           username: username,
           address: address
       }
   })
   if(persistedFamily == null){
       bcrypt.hash(password, SALT_ROUNDS,async(error, hash)=>{
           if(error){
               res.render('/', {message: 'Error creating user!'})
           }else{
            let family = models.family.build({
                family_name : family_name,
                username : username,
                address : address,
                password: hash
            })
            let savedFamily = await family.save()
            if(savedFamily != null){
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

router.get('/',(req,res) => {
    res.render('register')
})

module.exports = router