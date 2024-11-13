const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/preview/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/preview"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules\/(?!yoga-layout)/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs"],
    fallback: {
      crypto: false,
      stream: false,
      path: false,
      fs: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/preview/index.html",
    }),
  ],
  devServer: {
    port: 3001,
    hot: true,
  },
};
