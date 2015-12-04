var bookController = function (Book) {
  var post = function (request, response) {
    var book = new Book(request.body);

    book.save();
    response.status(201).send(book);

  };
  var get = function (request, response) {

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
  };
  return {
    post: post,
    get: get
  };
};

module.exports = bookController;
