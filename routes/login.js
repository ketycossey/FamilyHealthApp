const express = require("express")
const router = express.Router()


router.post('/', async (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let user = await models.family.findOne({
        where:{
            username: username
           
        }
    })
    if(user != null){
        bcrypt.compare(password, user.passwor, (error, result)=>{
            if(result){
                if(require.session){
                    req.session.user = {userId: family.id}
                    res.redirect('/index')
                }
            }else{
                res.render('login', {message:'Incorrect username or password'})
            }
        })
    }else{
        res.render('login',{message:'Incorrect username or password'})
    }
})

router.get('/',(req,res) => {
    res.render('login')
})

module.exports = router