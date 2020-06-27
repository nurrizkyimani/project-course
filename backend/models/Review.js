const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course:{
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        enum: ['Semester_1', 'Semester_2', 'Semester_3', 'Semester_4', 'Semester_5', 'Semester_6','Semester_7', 'Semester_8'],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    status: {
        type: String, 
        enum: ['public', 'private'],
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: [String]


})

module.exports = mongoose.model('Review', ReviewSchema)