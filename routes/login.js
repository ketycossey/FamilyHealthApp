const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const models = require('../models')


router.post('/', async (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let family = await models.family.findOne({
        where:{
            username: username
        }
    })
    if(family != null){
        bcrypt.compare(password, family.password, (error, result)=>{
            if(result){
                if(req.session){
                    req.session.family= {userId: family.id}
                    req.session.username = {username: family.username}
                    
                    req.session.isAuth = true
                    res.redirect('/families')
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