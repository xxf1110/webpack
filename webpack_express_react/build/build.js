const webpack = require('webpack')
const config = require('../webpack.config')


webpack(config, (err) => {
  console.log('buliding。。。。。。')
  if(err) throw err
})

