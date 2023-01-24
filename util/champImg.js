const constants = require('../constants/constants.js');
const pic = require('require-all')(__dirname + '/../assets');

module.exports = {
    getChampImg: function (champNameImg) {
        let img = '';

        switch (champNameImg) {
            case 'AATROX':
                img = constants.AATROX;
                break;
            case 'AHRI':
                img = constants.AHRI;
                break;
            case 'AKALI':
                img = constants.AKALI;
                break;
            case 'AKSHAN':
                img = constants.AKSHAN;
                break;
            case 'ALISTAR':
                img = constants.ALISTAR;
                break;
            case 'AMUMU':
                img = constants.AMUMU;
                break;
            case 'ANIVIA':
                img = constants.ANIVIA;
                break;
            case 'ANNIE':
                img = constants.ANNIE;
                break;
            case 'APHELIOS':
                img = constants.APHELIOS;
                break;
            case 'ASHE':
                img = constants.ASHE;
                break;
            case 'AURELIONSOL':
                img = constants.AURELIONSOL;
                break;
            case 'AZIR':
                img = constants.AZIR;
                break;
            case 'BARD':
                img = constants.BARD;
                break;
            case 'BLITZCRANK':
                img = constants.BLITZCRANK;
                break;
            case 'BRAND':
                img = constants.BRAND;
                break;
            case 'BRAUM':
                img = constants.BRAUM;
                break;
            case 'CAITLYN':
                img = constants.CAITLYN;
                break;
            case 'CAMILLE':
                img = constants.CAMILLE;
                break;
            case 'CASSIOPEIA':
                img = constants.CASSIOPEIA;
                break;
            case 'CHOGATH':
                img = constants.CHOGATH;
                break;
            case 'CORKI':
                img = constants.CORKI;
                break;
            case 'DARIUS':
                img = constants.DARIUS;
                break;
            case 'DIANA':
                img = constants.DIANA;
                break;
            case 'DRAVEN':
                img = constants.DRAVEN;
                break;
            case 'DRMUNDO':
                img = constants.DRMUNDO;
                break;
            case 'EKKO':
                img = constants.EKKO
                break;
            case 'ELISE':
                img = constants.ELISE;
                break;
            case 'EVELYNN':
                img = constants.EVELYNN;
                break;
            case 'EZREAL':
                img = constants.EZREAL;
                break;
            case 'FIDDLESTICKS':
                img = constants.FIDDLESTICKS;
                break;
            case 'FIORA':
                img = constants.FIORA;
                break;
            case 'FIZZ':
                img = constants.FIZZ;
                break;
            case 'GALIO':
                img = constants.GALIO;
                break;
            case 'GANGPLANK':
                img = constants.GANGPLANK;
                break;
            case 'GAREN':
                img = constants.GAREN;
                break;
            case 'GNAR':
                img = constants.GNAR;
                break;
            case 'GRAGAS':
                img = constants.GRAGAS;
                break;
            case 'GRAVES':
                img = constants.GRAVES;
                break;
            case 'GWEN':
                img = constants.GWEN;
                break;
            case 'HECARIM':
                img = constants.HECARIM;
                break;
            case 'HEIMERDINGER':
                img = constants.HEIMERDINGER;
                break;
            case 'ILLAOI':
                img = constants.ILLAOI;
                break;
            case 'IRELIA':
                img = constants.IRELIA;
                break;
            case 'IVERN':
                img = constants.IVERN;
                break;
            case 'JANNA':
                img = constants.JANNA;
                break;
            case 'JARVANIV':
                img = constants.JARVANIV;
                break;
            case 'JAX':
                img = constants.JAX;
                break;
            case 'JAYCE':
                img = constants.JAYCE;
                break;
            case 'JHIN':
                img = constants.JHIN;
                break;
            case 'JINX':
                img = constants.JINX;
                break;
            case 'KSANTE':
                img = constants.KSANTE;
                break;
            case 'KAISSA':
                img = constants.KAISSA;
                break;
            case 'KALISTA':
                img = constants.KALISTA;
                break;
            case 'KARMA':
                img = constants.KARMA;
                break;
            case 'KARTHUS':
                img = constants.KARTHUS;
                break;
            case 'KASSADIN':
                img = constants.KASSADIN;
                break;
            case 'KATARINA':
                img = constants.KATARINA;
                break;
            case 'KAYLE':
                img = constants.KAYLE;
                break;
            case 'KAYN':
                img = constants.KAYN;
                break;
            case 'KENNEN':
                img = constants.KENNEN;
                break;
            case 'KHAZIX':
                img = constants.KHAZIX;
                break;
            case 'KINDRED':
                img = constants.KINDRED;
                break;
            case 'KLED':
                img = constants.KLED;
                break;
            case 'KOGMAW':
                img = constants.KOGMAW;
                break;
            case 'LEBLANC':
                img = constants.LEBLANC;
                break;
            case 'LEESIN':
                img = constants.LEESIN;
                break;
            case 'LEONA':
                img = constants.LEONA;
                break;
            case 'LILLIA':
                img = constants.LILLIA;
                break;
            case 'LISSANDRA':
                img = constants.LISSANDRA;
                break;
            case 'LUCIAN':
                img = constants.LUCIAN;
                break;
            case 'LULU':
                img = constants.LULU;
                break;
            case 'LUX':
                img = constants.LUX;
                break;
            case 'MALPHITE':
                img = constants.MALPHITE;
                break;
            case 'MALZAHAR':
                img = constants.MALZAHAR;
                break;
            case 'MAOKAI':
                img = constants.MAOKAI;
                break;
            case 'MASTERYI':
                img = constants.MASTERYI;
                break;
            case 'MISSFORTUNE':
                img = constants.MISSFORTUNE;
                break;
            case 'MORDEKAISER':
                img = constants.MORDEKAISER;
                break;
            case 'MORGANA':
                img = constants.MORGANA;
                break;
            case 'NAMI':
                img = constants.NAMI;
                break;
            case 'NASUS':
                img = constants.NASUS;
                break;
            case 'NAUTILUS':
                img = constants.NAUTILUS;
                break;
            case 'NEEKO':
                img = constants.NEEKO;
                break;
            case 'NIDALEE':
                img = constants.NIDALEE;
                break;
            case 'NILAH':
                img = constants.NILAH;
                break;
            case 'NOCTURNE':
                img = constants.NOCTURNE;
                break;
            case 'NUNU':
                img = constants.NUNU;
                break;
            case 'OLAF':
                img = constants.OLAF;
                break;
            case 'ORIANNA':
                img = constants.ORIANNA;
                break;
            case 'ORNN':
                img = constants.ORNN;
                break;
            case 'PANTHEON':
                img = constants.PANTHEON;
                break;
            case 'POPPY':
                img = constants.POPPY;
                break;
            case 'PYKE':
                img = constants.PYKE;
                break;
            case 'QIYANA':
                img = constants.QIYANA;
                break;
            case 'QUINN':
                img = constants.QUINN;
                break;
            case 'RAKAN':
                img = constants.RAKAN;
                break;
            case 'RAMMUS':
                img = constants.RAMMUS;
                break;
            case 'REKSAI':
                img = constants.REKSAI;
                break;
            case 'RELL':
                img = constants.RELL;
                break;
            case 'RENATAGLASC':
                img = constants.RENATAGLASC;
                break;
            case 'RENEKTON':
                img = constants.RENEKTON;
                break;
            case 'RENGAR':
                img = constants.RENGAR;
                break;
            case 'RIVEN':
                img = constants.RIVEN;
                break;
            case 'RUMBLE':
                img = constants.RUMBLE;
                break;
            case 'RYZE':
                img = constants.RYZE;
                break;
            case 'SAMIRA':
                img = constants.SAMIRA;
                break;
            case 'SEJUANI':
                img = constants.SEJUANI;
                break;
            case 'SENNA':
                img = constants.SENNA;
                break;
            case 'SERAPHINE':
                img = constants.SERAPHINE;
                break;
            case 'SETT':
                img = constants.SETT;
                break;
            case 'SHACO':
                img = constants.SHACO;
                break;
            case 'SHEN':
                img = constants.SHEN;
                break;
            case 'SHYVANA':
                img = constants.SHYVANA;
                break;
            case 'SINGED':
                img = constants.SINGED;
                break;
            case 'SION':
                img = constants.SION;
                break;
            case 'SIVIR':
                img = constants.SIVIR;
                break;
            case 'SKARNER':
                img = constants.SKARNER;
                break;
            case 'SONA':
                img = constants.SONA;
                break;
            case 'SORAKA':
                img = constants.SORAKA;
                break;
            case 'SWAIN':
                img = constants.SWAIN;
                break;
            case 'SYLAS':
                img = constants.SYLAS;
                break;
            case 'SYNDRA':
                img = constants.SYNDRA;
                break;
            case 'TAHMKENCH':
                img = constants.TAHMKENCH;
                break;
            case 'TALIYAH':
                img = constants.TALIYAH;
                break;
            case 'TALON':
                img = constants.TALON;
                break;
            case 'TARIC':
                img = constants.TARIC;
                break;
            case 'TEEMO':
                img = constants.TEEMO;
                break;
            case 'THRESH':
                img = constants.THRESH;
                break;
            case 'TRISTANA':
                img = constants.TRISTANA;
                break;
            case 'TRUNDLE':
                img = constants.TRUNDLE;
                break;
            case 'TRYNDAMERE':
                img = constants.TRYNDAMERE;
                break;
            case 'TWISTEDFATE':
                img = constants.TWISTEDFATE;
                break;
            case 'TWITCH':
                img = constants.TWITCH;
                break;
            case 'UDYR':
                img = constants.UDYR;
                break;
            case 'URGOT':
                img = constants.URGOT;
                break;
            case 'VARUS':
                img = constants.VARUS;
                break;
            case 'VAYNE':
                img = constants.VAYNE;
                break;
            case 'VEIGAR':
                img = constants.VEIGAR;
                break;
            case 'VELKOZ':
                img = constants.VELKOZ;
                break;
            case 'VEX':
                img = constants.VEX;
                break;
            case 'VI':
                img = constants.VI;
                break;
            case 'VIEGO':
                img = constants.VIEGO;
                break;
            case 'VIKTOR':
                img = constants.VIKTOR;
                break;
            case 'VLADIMIR':
                img = constants.VLADIMIR;
                break;
            case 'VOLIBEAR':
                img = constants.VOLIBEAR;
                break;
            case 'WARWICK':
                img = constants.WARWICK;
                break;
            case 'WUKONG':
                img = constants.WUKONG;
                break;
            case 'XAYAH':
                img = constants.XAYAH;
                break;
            case 'XERATH':
                img = constants.XERATH;
                break;
            case 'XINZHAO':
                img = constants.XINZHAO;
                break;
            case 'YASUO':
                img = constants.YASUO;
                break;
            case 'YONE':
                img = constants.YONE;
                break;
            case 'YORICK':
                img = constants.YORICK;
                break;
            case 'YUUMI':
                img = constants.YUUMI;
                break;
            case 'ZAC':
                img = constants.ZAC;
                break;
            case 'ZED':
                img = constants.ZED;
                break;
            case 'ZERI':
                img = constants.ZERI;
                break;
            case 'ZIGGS':
                img = constants.ZIGGS;
                break;
            case 'ZILEAN':
                img = constants.ZILEAN;
                break;
            case 'ZYRA':
                img = constants.ZYRA;
                break;
            default:
                img = constants.DEFAULT;
                break;
        }
        return img;
    },
};