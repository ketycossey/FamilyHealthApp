const express = require("express")
const router = express.Router()

app.get('/',(req,res) => {
    res.render('login')
})

app.post('/login', (req,res)=>{
    const username = req.body.username
    const password = req.body.
    
    db.one('SELECT id,username,password FROM users Where')
})



modules.export = router