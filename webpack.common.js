const path = require('path');

module.exports = {
  entry:  {
    index: './src/js/pages/index.js',
    archived: './src/js/pages/archived.js',
    notes: './src/js/pages/notes.js',
    create: './src/js/pages/create.js'
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].bundle.js'
  },
};