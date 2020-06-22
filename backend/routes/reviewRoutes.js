const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Review = require('../models/Review')
const Student = require('../models/Student')


router.get('/add', ensureAuth,  async (req, res)=> {
   res.send('it should be an template')
   
})

router.post('/submit', ensureAuth,  async (req, res)=> {
    try {
        req.body.student = req.student.id
        await Student.create(req.body)
        res.send('all set done;')
    } catch (error) {
        res.send(error)
    }
 })

router.put('/:id', ensureAuth, async (req, res) => {
    let review = await Review.findById(req.params.id).lean()
    res.send('update rest')
})
 
module.exports = router