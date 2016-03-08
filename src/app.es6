var React    = require('react')
var ReactDOM = require('react-dom')
var marked   = require('marked')

var CommentForm = React.createClass({
    render() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
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
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
        )
    }
})

var data = [
    { id: 1, author: "Hoge", text: "あああああ" },
    { id: 2, author: "Fuga", text: "いいいいい" }
]

ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
)
