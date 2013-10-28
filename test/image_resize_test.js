'use strict';

var grunt = require('grunt'),
    gm    = require('gm'),
    async = require('async');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var createTest = function(test, filename) {
  return function(callback) {
    gm('tmp/'+filename).size(function(err, features) {
      gm('test/expected/'+filename).size(function(err, expected) {
        test.equal(features.width, expected.width);
        test.equal(features.height, expected.height);
        callback();
      });
    });
  };
};

exports.image_resize = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  resize: function(test) {
    test.expect(8);

    async.series([
      createTest(test, 'gnu.jpg'),
      createTest(test, 'Rhododendron.jpg'),
      createTest(test, 'wikipedia.png'),
      createTest(test, 'TeslaTurbine.png'),
    ], test.done);

  },
  upscale: function(test) {
    test.expect(6);

    async.series([
      createTest(test, "upscale.png"),
      createTest(test, "upscale2.png"),
      createTest(test, "no_upscale.png"),
    ], test.done);
  }
};
