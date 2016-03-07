var assert  = require('assert')
var content = require('../src/content.es6');

describe('content', function () {
    it('should return a message with name: AAA', function () {
        assert.equal("Hello world, AAA", content({ name: "AAA" }))
    })
})
