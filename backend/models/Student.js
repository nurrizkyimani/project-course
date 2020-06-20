const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    googleID: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    image: {
        type:String,
        
    },
    createdTime: {
        type:String,
        default: Date.now
    }
})

module.exports = mongoose.model('Student', StudentSchema)