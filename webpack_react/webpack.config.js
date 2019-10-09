const path = require('path')
const {join, resolve} = path 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',
  stats: 'errors-only', // 仅在有错误时在控制台输出
  bail: true,
  entry: './src/index.js',
  output: {
    // pluginPath: join(__dirname, 'dist/js'), // js引用的路劲
    path: process.NODE_ENV === 'production' ? "./" : resolve(__dirname, 'dist') , // 出口目录
    filename: 'js' + '/[name].[hash].js' // 打包后的文件名
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        // loader: 'babel-loader',
        include: /src/, //  // 只转化src目录下的js
        exclude: /node_modules/, //  // 排除掉node_modules，优化打包速度
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react']
            }
          }
        ],
      }, 
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({ // 使用ExtractTextWebpackPlugin 就不需要style-loader
          use: ['css-loader', 'postcss-loader']  
        }) 
        // use: ['style-loader', 'css-loader', 'postcss-loader'], // 从右向左解析
        /*
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
          ]
        */
      }, 
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/', // 图片打包后存放的目录
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
    extensions: ['.js', '.json', '.css'],
    alias: {
      "@": join(__dirname, 'src'),
      "~": join(__dirname, 'src/containt'),
      "static": join(__dirname, 'static')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        verdor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'verdor', // 打包后的文件名
          priority: 10 // 设置优先级
        },
        // 抽离自己写的公共代码 名字随意起
        utils: {
          chunks: 'initial',
          name: 'utils',
          minSize: 0 // 超出一个字节就生成一个包
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html', // 模板 
      hash: true,  
    }),
    new ExtractTextWebpackPlugin('css/style.css'), 
    // 打包前先清空
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
          messages: [`Your application is running here: ${'http:127.0.0.1:5000'} \n proxy------>http://localhost:3000`],
      },
      // onErrors: config.dev.notifyOnErrors
      //     ? utils.createNotifierCallback()
      //     : undefined,
      clearConsole: true,
    }), 
  ], 
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    port: 5000,
    open: true,
    hot: true,
    // noInfo: true,
    quiet: true,
    // clientLogLevel: "none",
    proxy: { // 代理
      '/api': 'http://localhost:3000'
    }
  }  
  
}