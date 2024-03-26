const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "commonjs-module",
    },
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  resolve: {
    extensions: [".ts"],
  },
  target: "node",
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};
