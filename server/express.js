const express = require("express");
const webpack = require("webpack");
// const webpackMerge = require('webpack-merge')
const path = require("path");
const config = require('../config')

const server = express();
let baseWebpackConfig = require("../webpack.common.js");
// baseWebpackConfig.entry.hotMdidleware = 'webpack-hot-middleware/client';
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./server/dev-client'].concat(baseWebpackConfig.entry[name])
})
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


// https 设置
// const https = require('https');
// const fs = require('fs');
// const options = {  
// 	key : fs.readFileSync('ssh_key.pem'),   //读出 sytly 文件？  
// 	cert : fs.readFileSync('ssh_cert.pem'),   //同步读出 SSL 证书  
// }
// const server = http.createServer(options ,(req, res) => {  //监听到请求后，回调 function   req 请求相关的信息（如：从哪来过来的，类型是get还是post等信息）  
// 	// res 告诉服务器给这个请求响应的内容  
// 	res.statusCode = 200;  
// 	res.setHeader('Content-Type', 'text/plain');  // 返回的请求头  200 成功  文本内容Content-Type   是 text/plain  
// 	res.end('Hello World\n');  //返回的内容，改变内容的重启服务 ctrl+c关掉， 再重启 node server.js  
// });  

//listen 监听 来自 127.0.0.1 3000 的请求  
// const hostname = '127.0.0.1';  
// const port = 3000;
// server.listen(port, hostname, () => {  
// console.log(`Server running at http://${hostname}:${port}/`);  
// });