const dir = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

 output: {
   path: dir.join(__dirname, '/dist'),
   filename: 'index.bundle.js'
 },

 devServer: {
   port: 3000,
   watchContentBase: true
 },

 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',

    },
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}
