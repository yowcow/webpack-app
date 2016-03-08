var WebPack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path:              __dirname,
        filename:          "[name].js",
        sourceMapFilename: "[name].map"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        new WebPack.optimize.UglifyJsPlugin()
    ]
};
