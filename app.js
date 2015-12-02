var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = express.Router();

bookRouter.route('/Books')
  .post(function(request, response){
    var book = new Book(request.body);

    console.log(book);
    response.send(book);

  })
  .get(function (request, response) {

    var query = {};

    if (request.query.genre)
    {
      query.genre = request.query.genre;
    }
    Book.find(query, function (error, books) {
      if (error)
        response.status(500).send(error);
      else
        response.json(books);
    });
  });


bookRouter.route('/Books/:bookId')
.get(function (request, response) {

    Book.findById(request.params.bookId, function (error, book) {
      if (error)
        response.status(500).send(error);
      else
        response.json(book);
    });
  });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Gulp is running my app on port: ' + port);
});
