var express = require('express');

var routes = function (Book) {
  var bookRouter = express.Router();

  var bookController = require('../Controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', function (request, response, next) {
    Book.findById(request.params.bookId, function (error, book) {
      if (error)
        response.status(500).send(error);
      else if (book) {
        request.book = book;
        next();
      } else {
        response.status(404).send('No book found...');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get(function (request, response) {
      response.json(request.book);
    })
    .put(function (request, response) {
      request.book.title = request.body.title;
      request.book.author = request.body.author;
      request.book.genre = request.body.genre;
      request.book.read = request.body.read;
      request.book.save(function (error) {
        if (error)
          response.status(500).send(error);
        else {
          response.json(request.book);
        }
      });
    })
    .patch(function (request, response) {
      if (request.body._id)
        delete request.body._id;

      for (var p in request.body) {
        request.book[p] = request.body[p];
      }
      request.book.save(function (error) {
        if (error)
          response.status(500).send(error);
        else {
          response.json(request.book);
        }
      });
    })
    .delete(function (request, response) {
      request.book.remove(function (error) {
        if (error)
          response.status(500).send(error);
        else {
          response.status(204).send('Removed...');
        }
      });
    });

  return bookRouter;
};

module.exports = routes;
