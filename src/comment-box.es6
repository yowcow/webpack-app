var React    = require('react')
var ReactDOM = require('react-dom')
var $        = require('jquery')

var CommentList = require('./comment-list.es6')
var CommentForm = require('./comment-form.es6')

module.exports = React.createClass({
  getInitialState() {
    return { data: [] }
  },
  loadCommentsFromServer() {
    $.ajax({
      url:      this.props.url,
      dataType: 'json',
      cache:    false,
    })
    .done(
      ((data) => {
        this.setState({ data: data.data })
      }).bind(this)
    )
    .fail(
      ((xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }).bind(this)
    )
  },
  componentDidMount() {
    this.loadCommentsFromServer()
  },
  handleCommentSubmit(comment) {
    $.ajax({
      url:       this.props.url,
      dataType: 'json',
      //type:     'POST',
      data:     comment
    })
    .done(
      ((data) => {
        this.setState({ data: data.data })
      }).bind(this)
    )
    .fail(
      ((xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }).bind(this)
    )
  },
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
})
