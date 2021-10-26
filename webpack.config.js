const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";

  process.env.BABEL_ENV = options.mode;

  const config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/[name].js",
      chunkFilename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/[name].js"
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        favicon: path.resolve(__dirname, "public/favicon.ico"),
        ...(isProduction && {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        })
      })
    ],
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all"
      }
    }
  };

  return config;
};
