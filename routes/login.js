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
        bcrypt.compare(password, user.password, (error, result)=>{
            if(result){
                if(require.session){
                    req.session.userId = {userId: family.id}
                    req.session.username = {username: family.username}
                    req.session.isAuth = true
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