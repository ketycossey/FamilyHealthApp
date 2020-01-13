const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const models = require('../models')


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
                //creating session and below should be req.session
                if(req.session){
                    req.session.user = {userId: user.id} //line 9 = user not family
                    req.session.username = {username: user.username}
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