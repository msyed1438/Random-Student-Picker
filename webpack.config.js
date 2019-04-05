var path = require("path");
var SRC_DIR = path.join(__dirname, "/client");
var DIST_DIR = path.join(__dirname, "/dist");

module.exports = {
  entry: [`${SRC_DIR}/index.jsx`],
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: "[local]__[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
      // {
      //   loader: "url-loader",
      //   options: {
      //     limit: 8192
      //   }
      // }
    ]
  }
};
