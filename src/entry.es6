require("./style.css");

var hello = require('./content.js')

document.getElementById('title').innerHTML = hello({ name: "Hoge" })
