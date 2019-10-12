const path = require('path')
const {join, resolve} = path 
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  // mode: 'development',
  stats: 'errors-only',  
  bail: true,
  entry:  [
    'webpack-hot-middleware/client.js',
    './src/index.js'
  ],
  output: { 
    path: process.NODE_ENV === 'production' ? "./" : resolve(__dirname, 'dist') ,  
    filename: 'js' + '/[name].[hash].js'  
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/, 
        include: /src/,  
        exclude: /node_modules/,  
        use: [
          {
            loader: 'babel-loader',
            options: {
              'presets': ['es2015', 'stage-0', 'react'], 
            }
          }
        ],
      }, 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']   
      }, 
      {
        test: /\.(scss|sass)$/,  
          use: [
            process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            'postcss-loader',
            "sass-loader",
          ] 
      }, 
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, 
              outputPath: 'images/',  
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },

    ]
  }, 
  resolve: {
    extensions: ['.js', '.json', '.css','.scss'],
    alias: {
      "@": join(__dirname, 'src'),
      "~": join(__dirname, 'src/containt'),
      "static": join(__dirname, 'static')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: { 
        verdor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'verdor',  
          priority: 10  
        }, 
        utils: {
          chunks: 'initial',
          name: 'utils',
          minSize: 0  
        }
      }
    }
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',  
      hash: true,  
    }), 
    new CleanWebpackPlugin(),      
    new FriendlyErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), 
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({  
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css"
    })
  ],   
  
}