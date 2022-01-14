const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.ts" },
  output: {
    filename: "static/js/[name].[contenthash].js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        type: "asset/resources",
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      title: "Kakao talk",
      template: "src/index.hbs",
      description: "Kakao talk",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
  ],
};
