var express = require('express');

var routes = function (Book) {
  var bookRouter = express.Router();

  bookRouter.route('/')
    .post(function (request, response) {
      var book = new Book(request.body);

      book.save();
      response.status(201).send(book);

    })
    .get(function (request, response) {

      var query = {};

      if (request.query.genre) {
        query.genre = request.query.genre;
      }
      Book.find(query, function (error, books) {
        if (error)
          response.status(500).send(error);
        else
          response.json(books);
      });
    });


  bookRouter.route('/:bookId')
    .get(function (request, response) {

      Book.findById(request.params.bookId, function (error, book) {
        if (error)
          response.status(500).send(error);
        else
          response.json(book);
      });
    })
    .put(function (request, response) {
      Book.findById(request.params.bookId, function (error, book) {
        if (error)
          response.status(500).send(error);
        else {
          book.title = request.body.title;
          book.author = request.body.author;
          book.genre = request.body.genre;
          book.read = request.body.read;
          book.save();
          response.json(book);
        }
      })
    });
  return bookRouter;
};

module.exports = routes;
