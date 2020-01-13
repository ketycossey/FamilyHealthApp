function checkAuthorization(req, res, next) {

    if(req.session) {
      if(req.session.family) {
        next()
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  
  }
  
  module.exports = checkAuthorization
  