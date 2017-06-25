var nodeExternals = require('webpack-node-externals');

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
      use: [
        {
            loader: "null-loader"
        },
      ]
    },
    {
      test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
      use: "null-loader",
    }
  ]
};

var resolve = {
  extensions: [".ts", ".tsx", ".js"],
  modules: [
    __dirname,
    "node_modules"
  ]
};

module.exports = {
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  target: 'node',  // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "inline-cheap-module-source-map",
  module: modules,
  resolve: resolve
};