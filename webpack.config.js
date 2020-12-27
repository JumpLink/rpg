const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env = {}) => {
  // OPTIMIZATION

  const optimization = {
    minimize: false,
    minimizer: [],
  };

  if (!env.production) {
    const TerserPlugin = require("terser-webpack-plugin");
    const terser = new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
    });
    (optimization.minimize = true), optimization.minimizer.push(terser);
  }

  // PLUGINS

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: "Excalibur Webpack Sample",
    }),
  ];

  if (!env.production) {
    const CompressionWebpackPlugin = require("compression-webpack-plugin");
    plugins.push(new CompressionWebpackPlugin());
  }

  return {
    optimization,
    mode: env.production ? "production" : "development",
    devtool: env.production ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: "./dist",
    },
    entry: "./src/index.ts",
    target: "web",
    output: {
      filename: "[name].js",
      sourceMapFilename: "[file].map",
      path: path.resolve(__dirname, "dist"),
    },

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: [path.resolve(__dirname, "node_modules/excalibur")],
          enforce: "pre",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins,
  };
};
