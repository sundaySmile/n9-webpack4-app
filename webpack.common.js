const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const HTMLWebpackPlugin = require("html-webpack-plugin")
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
	entry: {
		app: './src/main.js'
		// print: ['./src/print.js']
	},
	output: {
		filename: '[name].[hash:7].js',
		path: path.resolve(__dirname, './dist')
		// chunkFilename: '[name].bundle.js'
	},
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
		],
		extensions: [".js", ".json", ".css"]
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							path: './postcss.config.js'
						}
					}
        ]
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]'
      //       }
      //     },
      //     {
      //       loader: 'extract-loader'
      //     },
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         attrs: ['img:src']
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-with-front-matter-loader'
          }
        ]
      }
    ]
	},
	externals: {},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HTMLWebpackPlugin({
			template: 'index.html',
			title: 'Hello',
			timestamp: new Date().toJSON(),
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),

		// 自动加载模块
		new webpack.ProvidePlugin({}),

		// AggressiveSplittingPlugin
		// new webpack.optimize.AggressiveSplittingPlugin({
		// 	minSize: 30000,
		// 	maxSize: 60000,
		// 	chunkOverhead: 0,
		// 	entryChunkMultiplicator: 1
		// })
	]
}
