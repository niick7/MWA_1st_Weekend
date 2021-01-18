const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
})

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    require: true
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    "default": 1
  },
  year: {
    type: Number,
    "default": 1958
  },
  reviews: [reviewSchema]
})

mongoose.model("Book", bookSchema, "books");