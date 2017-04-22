const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function srcPath(subdir) {
  return path.join(__dirname, subdir);
}

var entry = {
  app: "./app.tsx",
  vendor: ["react", "react-dom", "redux", "draft-js", "jszip", "he",
    "react-highlight.js", "react-redux", "redux-devtools-extension",
    "redux-thunk", "@aneves/react-flyout"],
    support: ["es6-shim", "tslib"]
};

var resolve = {
  extensions: [".ts", ".tsx", ".js"],
  alias: {
    components : srcPath("components"),
    containers : srcPath("containers"),
    stores : srcPath("stores"),
    actions : srcPath("actions"),
    reducers : srcPath("reducers"),
    core: srcPath("core")
  }
};

var output = {
  path: path.resolve(__dirname, "build"),
  filename: "[name].[chunkhash].js",
  devtoolModuleFilenameTemplate: function(info){
    return "file:///"+info.absoluteResourcePath;
  }
};

var modules = {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
            loader: "awesome-typescript-loader"
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
              minimize: true,
              sourceMap: true,
            }
          }
        })
    }
  ]
};

var basePlugins = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "index.html"
  }),
  new ExtractTextPlugin("styles.css"),
  new webpack.optimize.CommonsChunkPlugin(["entry", "vendor", "support"])
];

var devPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'development'",
    'DEBUG': "true"
  })
];

var productionPlugins = [
  new UglifyJSPlugin({
    sourceMap: true,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'production'",
    'DEBUG' : "false"
  })
];

var baseConfig = {
  entry: entry,
  devtool: "source-map",
  output : output,
  resolve: resolve,
  module: modules,
};

module.exports = function(env = {}) {
  var config = baseConfig;
  var plugins = basePlugins;
  if(env.production) {
    plugins = plugins.concat(productionPlugins);
  } else {
    plugins = plugins.concat(devPlugins);
  }
  config.plugins = plugins;
  return config;
}