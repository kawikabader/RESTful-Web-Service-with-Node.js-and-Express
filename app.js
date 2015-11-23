var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
  .get(function (request, response) {
    var responseJson = { hello: 'This is my API.' };
    
    // Sending json response
    response.json(responseJson);
  });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Gulp is running my app on port: ' + port);
});