const express = require("express")
const router = express.Router()

app.get('/',(req,res) => {
    res.render('register')
})
app.post('/register',(req,res) => {

    const familyName = req.body.family_name 
    const username = req.body.username
    const password = req.body.password
    const address = req.body.address

    bcrypt.hash(password, SALT_ROUNDS).then(hash => {
        db.none('INSERT INTO users(familyName, username, password, address ) VALUES($1,$2,$3,$4)',[familyName, username, hash, address]).then(() => {
            res.redirect('/login')
        })
    })

})

module.exports = router