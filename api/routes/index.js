const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books_controller");
const reviewsController = require("../controllers/reviews_controller");

router.route("/books").get(booksController.getBooks)
                      .post(booksController.createBook);
router.route("/books/:bookId").get(booksController.getBook)
                              .put(booksController.updateBook)
                              .delete(booksController.deleteBook);
router.route("/books/:bookId/reviews").get(reviewsController.getReviews)
                                      .post(reviewsController.createReview);
router.route("/books/:bookId/reviews/:reviewId").get(reviewsController.getReview)
                                                .put(reviewsController.updateReview)
                                                .delete(reviewsController.deleteReview);

module.exports = router;