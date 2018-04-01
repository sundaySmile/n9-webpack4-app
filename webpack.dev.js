const webpack = require("webpack");
const path = require("path");
// const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: {
        main: ["./src/main.js"]
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/"
    },
    mode: 'development',
    devtool: "source-map",
    // resolve: {
    //   root: [
    //     path.join(__dirname, 'src'),
    //     path.join(__dirname, 'node_modules')
    //   ]
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg|webp)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name]-[hash:8].[ext]"                           }
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
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
            analyzerMode: "disabled"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                WEBPACK: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new webpack.NamedModulesPlugin()
        // new HTMLWebpackPlugin({
        //     template: "./src/index.ejs",
        //     inject: true,
        //     title: "Hello"
        // })
    ]
}