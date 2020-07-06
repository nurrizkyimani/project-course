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
    type: String,
    enum: [
      "semester_1",
      "semester_2",
      "semester_3",
      "semester_4",
      "semester_5",
      "semester_6",
      "semester_7",
      "semester_8",
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
