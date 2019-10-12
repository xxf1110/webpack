const express = require('express');
const app = express(); 
const webpack = require('webpack')  
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const open = require('open')
const proxy = require('http-proxy-middleware')
const path = require('path')

const compiler = webpack(config)

const devMiddleCompiler = devMiddleware(compiler, {
  noInfo: true,  
  logLevel: 'error',
  publicPath: '/',
})
const hotMiddleCompiler = hotMiddleware(compiler)

app.use(devMiddleCompiler)
app.use(hotMiddleCompiler) 
 
app.use('/static', express.static(path.join(__dirname, '../static')))
app.use('/api', proxy({target: 'http://127.0.0.1:3000', changeOrigin: true}))





app.listen(5000, () =>  open('http://127.0.0.1:5000') ) 
