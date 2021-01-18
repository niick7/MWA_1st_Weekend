const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const message404 = "Book Id is not found.";

module.exports.getReviews = function(req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function(err, book){
    const response = { status: 200 }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!book) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      response.message = book.reviews ? book.reviews : []
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createReview = function(req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function(err, book){
    const response = { status: 201 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!book) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      const review = {
        name: req.body.name,
        rating: parseInt(req.body.rating),
        review: req.body.review
      }
      Book.updateOne({_id: book._id}, {$push: {reviews: review}}, function(addedErr, updatedBook){
        if (addedErr) {
          response.status = 500;
          response.message = addedErr;
        } else {
          response.message = updatedBook;
        }
      })
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getReview = function(req, res) {
  const bookId = req.params.bookId;
  const reviewId = req.params.reviewId;
  Book.findById(bookId).exec(function(err, book){
    const response = { status: 200 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!book) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      const review = book.reviews.id(reviewId);
      if (!review) {
        response.status = 404;
        response.message = { message: "Review Id is not found" };
      } else {
        response.message = review;
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updateReview = function(req, res) {
  const bookId = req.params.bookId;
  const reviewId = req.params.reviewId;
  Book.findById(bookId).exec(function(err, book){
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!book) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      let review = book.reviews.id(reviewId);
      if (!review) {
        response.status = 404;
        response.message = { message: "Review Id is not found" };
      } else {
        Book.updateOne(
          { _id: book._id, "reviews._id": reviewId}, 
          { $set: {
              "reviews.$.name": req.body.name,
              "reviews.$.rating": parseInt(req.body.rating),
              "reviews.$.review": req.body.review
            }
          }, function(addedErr, updatedBook){
          if (addedErr) {
            response.status = 500;
            response.message = addedErr;
          } else {
            response.message = updatedBook;
          }
        })
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.deleteReview = function(req, res) {
  const bookId = req.params.bookId;
  const reviewId = req.params.reviewId;
  Book.findById(bookId).exec(function(err, book){
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!book) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      let review = book.reviews.id(reviewId);
      if (!review) {
        response.status = 404;
        response.message = { message: "Review Id is not found" };
      } else {
        Book.updateOne(
          { _id: book._id }, 
          { $pull: {
              reviews: {_id: reviewId}
            }
          }, function(addedErr, updatedBook){
          if (addedErr) {
            response.status = 500;
            response.message = addedErr;
          } else {
            response.message = updatedBook;
          }
        })
      }
    }
    res.status(response.status).json(response.message);
  })
}