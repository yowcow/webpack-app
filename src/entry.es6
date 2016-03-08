require("./style.css")

var hello    = require('./content.js')
var React    = require('react')
var ReactDOM = require('react-dom')

ReactDOM.render(
    <em>{ hello({ name: "<script>alert(true)</script>" }) }</em>,
    document.getElementById('title')
)
