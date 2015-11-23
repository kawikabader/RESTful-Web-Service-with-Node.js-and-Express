var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');


var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
  .get(function (request, response) {
    Book.find(function (error, books) {
      if (error)
        response.status(500).send(error);
      else
        response.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Gulp is running my app on port: ' + port);
});