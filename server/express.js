const express = require("express");
const webpack = require("webpack");
// const webpackMerge = require('webpack-merge')
const path = require("path");
const config = require('../config')

const server = express();
let baseWebpackConfig = require("../webpack.common.js");
// baseWebpackConfig = webpackMerge(baseWebpackConfig, {
// 	plugins: [
// 		new webpack.HotModuleReplacementPlugin(),
// 		new webpack.NamedModulesPlugin(),
// 	]
// });
baseWebpackConfig.entry.hotMdidleware = 'webpack-hot-middleware/client';
const compiler = webpack(Object.assign(baseWebpackConfig, 
	{
		mode: 'development',
		devtool: 'inline-source-map'
	})
);
const webpackDevMiddleware = require("webpack-dev-middleware")(
	compiler,
	{
		publicPath: baseWebpackConfig.output.publicPath,
		overlay: true,
		reload: true,
		quiet: true,
		open: false,
		overlay: true,
		contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
		compress: true, // enable gzip compression
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		https: false, // true for self-signed, object for cert authority
		noInfo: true // only errors & warns on hot reload
	}
);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler,	
	{
		path: baseWebpackConfig.output.publicPath,
		overlay: true,
		reload: true,
		quiet: true,
		noInfo: false // only errors & warns on hot reload
	}
);

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')())

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
webpackDevMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + 'localhost' + '\n')
  _resolve()
})

const port = process.env.PORT || '9000';
const http = require('http');
http.createServer(server).listen(port, "0.0.0.0", () => {
  console.log("start listen", port)
})
