const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports.getBooks = function(req, res) {
  let offset = 0;
  let count = 5;
  if(req.query) {
    if (req.query.offset)
      offset = parseInt(req.query.offset);
    if (req.query.count)
      count = parseInt(req.query.count);
  }
  if(isNaN(offset) || isNaN(count)) {
    res.status(400).json({message: "Offset and Count must be number."})
  }

  Book.find().skip(offset).limit(count).exec(function(err, books){
    const response = {
      status: 200,
      message: books
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createBook = function(req, res) {
  Book.create({
    title: req.body.title,
    year: parseInt(req.body.year),
    rate: parseInt(req.body.rate),
    price: parseFloat(req.body.price)
  }, function(err, createdBook){
    response = {
      status: 201,
      message: createdBook
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getBook = function(req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function(err, book) {
    const response = {
      status: 200,
      message: book
    }
    if (err || !book) {
      response.status = 404;
      response.message = {message: "Book Id is not found."};
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updateBook = function(req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function(err, book){
    let response = { status: 204 };
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!book) {
      response.status = 404;
      response.message = {message: "Book Id is not found."}
    }
    if(response.status !== 204) {
      res.status(res.status).json(response.message);
    } else {
      Book.updateOne(
        { _id: bookId}, 
        { $set: {
            title: req.body.title,
            year: parseInt(req.body.year),
            rate: parseInt(req.body.rate),
            price: parseFloat(req.body.price)
          }
        }, function(addedErr, updatedBook){
        if (addedErr) {
          response.status = 500;
          response.message = addedErr;
        } else {
          response.message = updatedBook;
        }
        res.status(response.status).json(response.message);
      })
    }
  })
}

module.exports.deleteBook = function(req, res) {
  const bookId = req.params.bookId;
  Book.findByIdAndDelete(bookId).exec(function(err, deletedBook){
    let response = {
      status: 204,
      message: "Deleted book successfully."
    };
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!deletedBook) {
      response.status = 404;
      response.message = {message: "Book Id is not found."}
    }
    res.status(response.status).json(response.message);
  })
}