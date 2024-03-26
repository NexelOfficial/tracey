const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts"],
},
target: "node",
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};
