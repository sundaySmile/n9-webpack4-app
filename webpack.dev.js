const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseWebpackConfig = require("./webpack.common.js");

const devWebpackConfig = webpackMerge(baseWebpackConfig,
	{
		mode: 'development',
		devtool: 'cheap-module-eval-source-map',
		devServer: {
			// proxy: { // proxy URLs to backend development server
			// 	'/api': 'http://localhost:3000'
			// },
			host: "0.0.0.0",
			port: "9001",
			open: false,
			overlay: true,
			contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
			compress: true, // enable gzip compression
			historyApiFallback: true, // true for index.html upon 404, object for multiple paths
			hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
			https: false, // true for self-signed, object for cert authority
			noInfo: true // only errors & warns on hot reload
		},
		plugins: [
			// new BundleAnalyzerPlugin({
			// 	generateStatsFile: true,
			// 	analyzerMode: 'disabled'
			// }),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('development'),
					WEBPACK: true
				}
			})
		]
	}
);
module.exports = devWebpackConfig;
