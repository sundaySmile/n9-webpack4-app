const express = require("express");
const path = require("path");

const server = express();
const webpack = require("webpack");
const config = require("../webpack.dev.js");
const compiler = webpack(config);
const devServer = {
    contentBase: "dist",
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    overlay: true,
    stats: {
        colors: true,
        chunks: false
    }
};
const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    // {
    //     publicPath: config.output.publicPath,
    //     contentBase: "dist",
    //     host: "0.0.0.0",
    //     port: 9000,
    //     hot: true,
    //     overlay: true,
    //     stats: {
    //         colors: true,
    //         chunks: false
    //     }
    // }
    Object.assign({
        publicPath: config.output.publicPath 
    }, devServer)
);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);
const port = process.env.PORT || devServer.port;
server.listen(port, devServer.port, () => {
    console.log("start listen", config.devServer)
});
