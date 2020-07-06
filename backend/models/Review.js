const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  course: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    enum: [
      "Semester1",
      "Semester2",
      "Semester3",
      "Semester4",
      "Semester5",
      "Semester6",
      "Semester7",
      "Semester8",
    ],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
});

module.exports = mongoose.model("Review", ReviewSchema);
