'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');
var $ = require('jquery');

var CommentForm = React.createClass({
  displayName: 'CommentForm',
  getInitialState: function getInitialState() {
    return { author: '', text: '' };
  },
  handleAuthorChange: function handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  },
  render: function render() {
    return React.createElement(
      'form',
      { className: 'commentForm', onSubmit: this.handleSubmit },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Your name',
        value: this.state.author,
        onChange: this.handleAuthorChange }),
      React.createElement('input', {
        type: 'text',
        placeholder: 'Say something',
        value: this.state.text,
        onChange: this.handleTextChange }),
      React.createElement(
        'button',
        { type: 'submit' },
        'Post'
      )
    );
  }
});

var Comment = React.createClass({
  displayName: 'Comment',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'comment' },
      React.createElement(
        'h2',
        { className: 'commentAuthor' },
        this.props.author
      ),
      React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() })
    );
  },
  rawMarkup: function rawMarkup() {
    var raw = marked(this.props.children.toString(), { sanitize: true });
    return { __html: raw };
  }
});

var CommentList = React.createClass({
  displayName: 'CommentList',
  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.author, key: comment.id },
        comment.text
      );
    });
    return React.createElement(
      'div',
      { className: 'commentList' },
      commentNodes
    );
  }
});

var CommentBox = React.createClass({
  displayName: 'CommentBox',
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  loadCommentsFromServer: function loadCommentsFromServer() {
    var _this = this;

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    }).done(function (data) {
      _this.setState({ data: data.data });
    }.bind(this)).fail(function (xhr, status, err) {
      console.error(_this.props.url, status, err.toString());
    }.bind(this));
  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
  },
  handleCommentSubmit: function handleCommentSubmit(comment) {
    var _this2 = this;

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      //type:     'POST',
      data: comment
    }).done(function (data) {
      _this2.setState({ data: data.data });
    }.bind(this)).fail(function (xhr, status, err) {
      console.error(_this2.props.url, status, err.toString());
    }.bind(this));
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'commentBox' },
      React.createElement(
        'h1',
        null,
        'Comments'
      ),
      React.createElement(CommentList, { data: this.state.data }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }
});

ReactDOM.render(React.createElement(CommentBox, { url: 'comments.json' }), document.getElementById('content'));