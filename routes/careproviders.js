const express = require("express")
const app = express()
const router = express.Router()

router.get("/", (req, res) => {
   models.CareProviders.findAll().then(providers => res.render("test", {providers: providers}))
})

module.exports = router