var React    = require('react')
var ReactDOM = require('react-dom')

var CommentBox = require('./comment-box.es6')

ReactDOM.render(
  <CommentBox url="comments.json" />,
  document.getElementById('content')
)
