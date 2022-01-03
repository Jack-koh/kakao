const path = require("path");

module.exports = {
  entry: { index: "./src/index.ts" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "build/",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./src/assets"),
    index: "index.html",
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", { targets: "defaults" }],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
