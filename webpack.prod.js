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
  // performance: {
  // 	maxAssetSize: 200000,
  // 	maxEntrypointSize: 40000,
  // 	assetFilter: function (assetFilename) {
  // 		return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
  // 	}
  // },
  output: {
    publicPath: config.build.assetsPublicPath
  },
	optimization: {
    nodeEnv: 'production',
		minimize: true,
    // minimizer: [
    //   new UglifyJSPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true // set to true if you want JS source maps
    //   }),
    //   new OptimizeCSSAssetsPlugin({})
    // ],
		// minSize: 30000,
		// minChunks: 1,
    splitChunks: {
			cacheGroups: {
				styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
				},
        commons: {
          // test: /[\\/]node_modules[\\/]/,
          // name: '',
          // chunks: 'all'
        }
      }
    }
  },
  module: {
  	rules: [
  		{
				// test: /\.css$/,
				// use: [
				// 	MiniCssExtractPlugin.loader,
				// 	'css-loader'
				// ]
  		}
  	]
  },
  plugins: [
		// new MiniCssExtractPlugin({
		// 	// id: '1',
		// 	filename: 'build.main.css',
		// 	chunkFilename: "[id].css"
    // }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   // cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: { removeAll: true } },
    //   canPrint: true
		// }),
    new webpack.BannerPlugin('Created at ' + new Date()),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true
      }
    }),
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

module.exports = prodWebpackConfig
