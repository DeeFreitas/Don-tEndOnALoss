const constants = require('../constants/constants.js');
const pic = require('require-all')(__dirname + '../../constants/assets');

module.exports = {
    getChampImg: function (champNameImg) {
        let img = constants[champNameImg];
        return img;
    },
};