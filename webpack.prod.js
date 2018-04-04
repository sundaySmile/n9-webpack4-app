const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
		// minSize: 30000,
		// minChunks: 1,
    splitChunks: {
			chunks:'all' ,
			name: 'c',
      cacheGroups: {
        commons: {
          // test: /[\\/]node_modules[\\/]/,
          name: '',
          chunks: 'all'
        }
      }
    }
  },
  module: {
  	// rules: [
  	// 	{
		// 		test: /\.css$/,
		// 		use: ExtractTextPlugin.extract({
		// 			fallback: "style-loader",
		// 			remove: false,
		// 			// omit: true,
    //       use: {
    //         loader: 'css-loader',
    //         options: {
    //           sourceMap: true,
    //         },
    //       },
		// 			publicPath: '/'
		// 		})
  	// 	}
  	// ]
  },
  plugins: [
		new ExtractTextPlugin({
			// id: '1',
			filename: 'build.main.css',
			disable: false,
			allChunks: true,
			ignoreOrder: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
		}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
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
