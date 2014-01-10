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

describe('default settings', function() {

  it('should return under a minute text', function() {
    assert.equal(readTime(generateWords(199)), 'Less than a minute');

  });

  it('should handle exactly 1 minute of read time', function() {
    assert.equal(readTime(generateWords(200)), '1 minute');
  });

  it('should handle exactly 2 minute of read time', function() {
    assert.equal(readTime(generateWords(400)), '2 minutes');
  });

  it('should handle when only seconds are plural', function() {
    assert.equal(readTime(generateWords(398)), '1 minute 59 seconds');
  });

  it('should handle where both minutes and seconds are plural', function() {
    assert.equal(readTime(generateWords(777)), '3 minutes 53 seconds');
  });

});

describe('changing WPM setting', function() {

  var options = {
    WPM: 100
  };

  it('should return under a minute text', function() {
    assert.equal(readTime(generateWords(99), options), 'Less than a minute');
  });

  it('should handle exactly 1 minute of read time', function() {
    assert.equal(readTime(generateWords(100), options), '1 minute');
  });

  it('should handle exactly 2 minute of read time', function() {
    assert.equal(readTime(generateWords(200), options), '2 minutes');
  });

  it('should handle when only seconds are plural', function() {
    assert.equal(readTime(generateWords(199), options), '1 minute 59 seconds');
  });

  it('should handle where both minutes and seconds are plural', function() {
    assert.equal(readTime(generateWords(388), options), '3 minutes 52 seconds');
  });

});