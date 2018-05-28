const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const BrotliPlugin = require("brotli-webpack-plugin")
const config = require('./config')

const baseWebpackConfig = require('./webpack.common.js')

let prodWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash:8].css',
			chunkFilename: "[id].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
		}),
    new webpack.BannerPlugin('Created at ' + new Date()),
    new UglifyJSPlugin({
      sourceMap: true
    })
    // new BrotliPlugin()
  ]
})

if (config.build.productionGzip) {
  const CompressionPlugin = require('compression-webpack-plugin')

  prodWebpackConfig.plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
prodWebpackConfig.module.rules[1] = {
	test: /\.css$/,
	use: [
		MiniCssExtractPlugin.loader,
		'css-loader',
		'postcss-loader'
	],
	exclude: /node_modules/
}

module.exports = prodWebpackConfig
