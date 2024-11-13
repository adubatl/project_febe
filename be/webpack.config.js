import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/preview/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules\/(?!(yoga-layout)\/).*/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".mjs": [".mjs", ".mts"],
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
