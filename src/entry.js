'use strict';

require("./style.css");

var hello = require('./content.js');
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(React.createElement(
    'em',
    null,
    hello({ name: "<script>alert(true)</script>" })
), document.getElementById('title'));