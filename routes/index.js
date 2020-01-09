const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
<<<<<<< HEAD
    res.send('hello, index!')
=======
    res.send("index")
>>>>>>> master
})


module.exports = router