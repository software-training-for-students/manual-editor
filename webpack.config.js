var path = require("path");

function srcPath(subdir) {
  return path.join(__dirname, subdir);
}

var config = {
  entry: ["./app.tsx"],
  devtool: "source-map",
  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: function(info){
      return "file:///"+info.absoluteResourcePath;
    }
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      components : srcPath("components"),
      containers : srcPath("containers"),
      stores : srcPath("stores"),
      actions : srcPath("actions"),
      reducers : srcPath("reducers"),
      Menu : srcPath("Menu"),
      Manual : srcPath("Manual"),
      ElementTypes : srcPath("ElementTypes"),
      EditableBase : srcPath("EditableBase"),
      DocumentMappers : srcPath("DocumentMappers")
    }
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