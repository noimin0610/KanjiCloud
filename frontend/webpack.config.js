const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src_path  = path.join(__dirname, "src");
const dist_path = path.join(__dirname, "dist");

module.exports = {
  context: src_path,
  entry: "./js/index.js",
  output: {
    path: dist_path,
    filename: "index.min.js"
  },
  devServer: {
    contentBase: dist_path,
    hot: true,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'minify',
                '@babel/preset-env'
              ]
            }
          }
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      }, 
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
          }
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ["precss", "autoprefixer"],
              },
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./html/index.html"}),
    new webpack.DefinePlugin({
      BACK_DOMAIN: JSON.stringify(process.env.BACK_DOMAIN),
      $: 'jquery'
    })
  ]
};