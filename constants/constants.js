// Use the picture files in assets folder to display champion icons
const fs = require('fs');
const path = require('path');
const images = {};

fs.readdirSync(path.join(__dirname, '.\\assets')).forEach(file => {
  if (file.match(/\.png$/)) {
    const fileName = file.split('.')[0];
    images[fileName] = path.join(__dirname, '.\\assets', file);
  }
});

module.exports = images;