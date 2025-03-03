const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  {
    index: './src/js/pages/index.js',
    archived: './src/js/pages/archived.js',
    notes: './src/js/pages/notes.js',
    create: './src/js/pages/create.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/archived/index.html',
      filename: 'archived.html',
      chunks: ['archived']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/notes/index.html',
      filename: 'notes.html',
      chunks: ['notes']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/create/index.html',
      filename: 'create.html',
      chunks: ['create']
    })
  ],
};