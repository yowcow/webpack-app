var React    = require('react')
var ReactDOM = require('react-dom')
var marked   = require('marked')
var $        = require('jquery')

var CommentForm = React.createClass({
  getInitialState() {
    return { author: '', text: '' }
  },
  handleAuthorChange(e) {
    this.setState({ author: e.target.value })
  },
  handleTextChange(e) {
    this.setState({ text: e.target.value })
  },
  handleSubmit(e) {
    e.preventDefault()
    var author = this.state.author.trim()
    var text   = this.state.text.trim()
    if (!text || !author) {
        return
    }
    this.props.onCommentSubmit({ author: author, text: text })
    this.setState({ author: '', text: '' })
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange} />
        <input
          type="text"
          placeholder="Say something"
          value={this.state.text}
          onChange={this.handleTextChange} />
        <button type="submit">Post</button>
      </form>
    )
  }
})

var Comment = React.createClass({
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  },
  rawMarkup() {
    var raw = marked(this.props.children.toString(), {sanitize: true})
    return { __html: raw }
  }
})

var CommentList = React.createClass({
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

var CommentBox = React.createClass({
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

ReactDOM.render(
  <CommentBox url="comments.json" />,
  document.getElementById('content')
)
