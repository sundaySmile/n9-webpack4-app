const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

module.exports = {
//   return {
	entry: {
		main: ["./src/main.js"]
	},
	output: {
		filename: "[name]-bundle.js",
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/"
	},
	mode: 'production',
	devServer: {
		contentBase: "dist",
		overlay: true,
		stats: {
			colors: true
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: {
						loader: "css-loader",
						options: {
							minimize: true
						}
					}
				})
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "images/[name].[ext]"
						}
					}
				]
			},
			{
					test: /\.html$/,
					use: [
							{
									loader: "file-loader",
									options: {
											name: "[name].[ext]"
									}
							},
							{
									loader: "extract-loader"
							},
							{
									loader: "html-loader",
									options: {
											attrs: ["img:src"]
									}
							}
					]
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: "markdown-with-front-matter-loader"
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV:JSON.stringify(process.env.NODE_ENV || "production"),
				WEBPACK: true
			}
		}),
		new webpack.NamedModulesPlugin(),
	//   new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
		new UglifyJSPlugin(),
		new CompressionPlugin({
			algorithm: "gzip"
		}),
		new BrotliPlugin()
	]
//   }
}