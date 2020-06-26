

const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }))

router.get('/logout',(req, res) => {
  req.logOut()
})

module.exports = router