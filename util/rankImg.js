const constants = require('../constants/constants.js');

module.exports = {
    getRankImg: function (tier, rank) {
        let img = '';
        let rankImg = tier + ' ' + rank;

        switch (rankImg) {
            case 'IRON IV':
                img = constants.IRON_IV;
                break;
            case 'IRON III':
                img = constants.IRON_III;
                break;
            case 'IRON II':
                img = constants.IRON_II;
                break;
            case 'IRON I':
                img = constants.IRON_I;
                break;
            case 'BRONZE IV':
                img = constants.BRONZE_IV;
                break;
            case 'BRONZE III':
                img = constants.BRONZE_III;
                break;
            case 'BRONZE II':
                img = constants.BRONZE_II;
                break;
            case 'BRONZE I':
                img = constants.BRONZE_I;
                break;
            case 'SILVER IV':
                img = constants.SILVER_IV;
                break;
            case 'SILVER III':
                img = constants.SILVER_III;
                break;
            case 'SILVER II':
                img = constants.SILVER_II;
                break;
            case 'SILVER I':
                img = constants.SILVER_I;
                break;
            case 'GOLD IV':
                img = constants.GOLD_IV;
                break;
            case 'GOLD III':
                img = constants.GOLD_III;
                break;
            case 'GOLD II':
                img = constants.GOLD_II;
                break;
            case 'GOLD I':
                img = constants.GOLD_I;
                break;
            case 'PLATINUM IV':
                img = constants.PLATINUM_IV;
                break; 
            case 'PLATINUM III':
                img = constants.PLATINUM_III;
                break;
            case 'PLATINUM II':
                img = constants.PLATINUM_II;
                break;
            case 'PLATINUM I':
                img = constants.PLATINUM_I;
                break;
            case 'DIAMOND IV':
                img = constants.DIAMOND_IV;
                break;
            case 'DIAMOND III':
                img = constants.DIAMOND_III;
                break;
            case 'DIAMOND II':
                img = constants.DIAMOND_II;
                break;
            case 'DIAMOND I':
                img = constants.DIAMOND_I;
                break;
            case 'MASTER I':
                img = constants.MASTER_I;
                break;
            case 'GRANDMASTER I':
                img = constants.GRANDMASTER_I;
                break;
            case 'CHALLENGER I':
                img = constants.CHALLENGER_I;
                break;
        }

        return img;
    },
};