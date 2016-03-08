var React    = require('react')
var ReactDOM = require('react-dom')
var marked   = require('marked')

module.exports = React.createClass({
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
