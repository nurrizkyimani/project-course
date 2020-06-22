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
        enum: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester5', 'Semester 6','Semester 7', 'Semester 8'],
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: [String]


})

module.exports = mongoose.model('Review', ReviewSchema)