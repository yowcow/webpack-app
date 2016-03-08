var React    = require('react')
var ReactDOM = require('react-dom')

var Comment = require('./comment.es6')

module.exports = React.createClass({
  render() {
    var commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
})
