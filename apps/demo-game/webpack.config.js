const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env = {}) => {
  // OPTIMIZATION

  const optimization = {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: "all",
    },
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
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.ts",
      },
    }),
  ];

  if (!env.production) {
    const CompressionWebpackPlugin = require("compression-webpack-plugin");
    plugins.push(new CompressionWebpackPlugin());
  }

  return {
    mode: env.production ? "production" : "development",
    devtool: env.production ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: "./dist",
    },
    context: __dirname, // to automatically find tsconfig.json
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
          test: /\.json$/,
          use: "file-loader",
          type: "javascript/auto",
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: [path.resolve(__dirname, "node_modules/excalibur")],
          enforce: "pre",
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization,
    plugins,
  };
};
