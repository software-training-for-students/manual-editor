var path = require("path");

var config = {
  entry: ["./app.tsx"],

  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
};

module.exports = config;