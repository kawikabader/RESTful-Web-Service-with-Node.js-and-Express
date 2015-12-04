var should = require('should'),
  sinon = require('sinon');

describe('Book Controller Tests:', function () {
  describe('Post', function () {
    it('Should not allow an empty title on Post', function () {
      var Book = function (book) {
        this.save = function () { };
      };

      var request = {
        body: {
          author: 'Kawika'
        }
      };

      var response = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      
      var bookController = require('../controllers/bookController')(Book);
      
      bookController.post(request, response);

      response.status.called(400).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
      response.send.calledWith('Title is required.').should.equal(true);
    });
  });
});
