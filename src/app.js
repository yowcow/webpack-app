'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');

var CommentForm = React.createClass({
    displayName: 'CommentForm',
    render: function render() {
        return React.createElement(
            'div',
            { className: 'commentForm' },
            'Hello, world! I am a CommentForm.'
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
    render: function render() {
        return React.createElement(
            'div',
            { className: 'commentBox' },
            React.createElement(
                'h1',
                null,
                'Comments'
            ),
            React.createElement(CommentList, { data: this.props.data }),
            React.createElement(CommentForm, null)
        );
    }
});

var data = [{ id: 1, author: "Hoge", text: "あああああ" }, { id: 2, author: "Fuga", text: "いいいいい" }];

ReactDOM.render(React.createElement(CommentBox, { data: data }), document.getElementById('content'));