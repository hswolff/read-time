var assert = require('assert');
var readTime = require('../src/read-time');

function generateString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(var i=0; i < length; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function randomLength() {
  return Math.ceil(Math.random() * 8);
}

function generateWords(count) {
  var words = '';
  for (var i = 0; i < count; i++) {
    words += ' ' + generateString(randomLength());
  }
  // Remove leading space
  return words.substr(1);
}

describe('readTime', function() {

  beforeEach(function() {
    readTime.reset();
  });

  describe('default settings', function() {
    var response;

    it('should handle words that are less than a minute', function() {
      response = readTime(generateWords(199));
      assert.equal(response.text, 'Less than a minute');
      assert.equal(response.words, 199);
      assert.equal(response.m, 0);
      assert.equal(response.s, 59);
    });

    it('should handle exactly 1 minute of read time', function() {
      response = readTime(generateWords(200));
      assert.equal(response.text, '1 minute');
      assert.equal(response.words, 200);
      assert.equal(response.m, 1);
      assert.equal(response.s, 0);
    });

    it('should handle exactly 2 minute of read time', function() {
      response = readTime(generateWords(400));
      assert.equal(response.text, '2 minutes');
      assert.equal(response.words, 400);
      assert.equal(response.m, 2);
      assert.equal(response.s, 0);
    });

    it('should handle when only seconds are plural', function() {
      response = readTime(generateWords(398));
      assert.equal(response.text, '1 minute 59 seconds');
      assert.equal(response.words, 398);
      assert.equal(response.m, 1);
      assert.equal(response.s, 59);
    });

    it('should handle where both minutes and seconds are plural', function() {
      response = readTime(generateWords(777));
      assert.equal(response.text, '3 minutes 53 seconds');
      assert.equal(response.words, 777);
      assert.equal(response.m, 3);
      assert.equal(response.s, 53);
    });

  });

  describe('changing WPM settings per invocation', function() {

    var response;
    var options = {
      WPM: 100
    };

    it('should return under a minute text', function() {
      response = readTime(generateWords(99), options);
      assert.equal(response.text, 'Less than a minute');
      assert.equal(response.words, 99);
      assert.equal(response.m, 0);
      assert.equal(response.s, 59);
    });

    it('should handle words that are less than a minute', function() {
      response = readTime(generateWords(199));
      assert.equal(response.text, 'Less than a minute');
      assert.equal(response.words, 199);
      assert.equal(response.m, 0);
      assert.equal(response.s, 59);
    });

    it('should handle exactly 1 minute of read time', function() {
      response = readTime(generateWords(100), options);
      assert.equal(response.text, '1 minute');
      assert.equal(response.words, 100);
      assert.equal(response.m, 1);
      assert.equal(response.s, 00);
    });

    it('should handle exactly 2 minute of read time', function() {
      response = readTime(generateWords(200), options);
      assert.equal(response.text, '2 minutes');
      assert.equal(response.words, 200);
      assert.equal(response.m, 2);
      assert.equal(response.s, 0);
    });

    it('should handle when only seconds are plural', function() {
      response = readTime(generateWords(199), options);
      assert.equal(response.text, '1 minute 59 seconds');
      assert.equal(response.words, 199);
      assert.equal(response.m, 1);
      assert.equal(response.s, 59);
    });

    it('should handle where both minutes and seconds are plural', function() {
      response = readTime(generateWords(388), options);
      assert.equal(response.text, '3 minutes 52 seconds');
      assert.equal(response.words, 388);
      assert.equal(response.m, 3);
      assert.equal(response.s, 52);
    });

  });

  describe('changing defaults for all invocations', function() {

    beforeEach(function() {
      readTime.defaults({
        WPM: 100
      });
    });

    it('should handle exactly 1 minute of read time', function() {
      response = readTime(generateWords(100));
      assert.equal(response.text, '1 minute');
      assert.equal(response.words, 100);
      assert.equal(response.m, 1);
      assert.equal(response.s, 0);
    });

    it('should handle exactly 2 minute of read time', function() {
      response = readTime(generateWords(200));
      assert.equal(response.text, '2 minutes');
      assert.equal(response.words, 200);
      assert.equal(response.m, 2);
      assert.equal(response.s, 0);
    });
  });

});