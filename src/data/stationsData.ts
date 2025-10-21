export interface StationData {
  id: string;
  name: string;
  marketId: string;
  broadcasterId: string;
  cpm: string;
  marketShare: number;
  audienceSize: number;
}

export const stationsData: StationData[] = [
  {
    id: 'hubbard-broadcasting-[rcl-new',
    name: '[RCL-TV',
    marketId: 'new-york-ny',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.28',
    marketShare: 31,
    audienceSize: 2604000
  },
  {
    id: 'hearst-wcfn-new',
    name: 'WCFN-TV',
    marketId: 'new-york-ny',
    broadcasterId: 'hearst',
    cpm: '$25.66',
    marketShare: 34,
    audienceSize: 2856000
  },
  {
    id: 'nbc-xinx-new',
    name: 'XINX-TV',
    marketId: 'new-york-ny',
    broadcasterId: 'nbc',
    cpm: '$25.21',
    marketShare: 31,
    audienceSize: 2604000
  },
  {
    id: 'hearst-xlyy-los',
    name: 'XLYY-TV',
    marketId: 'los-angeles-ca',
    broadcasterId: 'hearst',
    cpm: '$23.35',
    marketShare: 33,
    audienceSize: 4356000
  },
  {
    id: 'abc-wpph-los',
    name: 'WPPH-TV',
    marketId: 'los-angeles-ca',
    broadcasterId: 'abc',
    cpm: '$25.34',
    marketShare: 22,
    audienceSize: 2904000
  },
  {
    id: 'gray-yznb-los',
    name: 'YZNB-TV',
    marketId: 'los-angeles-ca',
    broadcasterId: 'gray',
    cpm: '$23.69',
    marketShare: 28,
    audienceSize: 3696000
  },
  {
    id: 'hearst-xlyy-los-2',
    name: 'XLYY-TV.com',
    marketId: 'los-angeles-ca',
    broadcasterId: 'hearst',
    cpm: '$23.35',
    marketShare: 28,
    audienceSize: 3050000
  },
  {
    id: 'abc-wpph-los-2',
    name: 'WPPH-TV.com',
    marketId: 'los-angeles-ca',
    broadcasterId: 'abc',
    cpm: '$25.34',
    marketShare: 17,
    audienceSize: 2033000
  },
  {
    id: 'gray-yznb-los-2',
    name: 'YZNB-TV.com',
    marketId: 'los-angeles-ca',
    broadcasterId: 'gray',
    cpm: '$23.69',
    marketShare: 23,
    audienceSize: 2587000
  },
  {
    id: 'cbs-zvju-chicago',
    name: 'ZVJU-TV',
    marketId: 'chicago-il',
    broadcasterId: 'cbs',
    cpm: '$25.24',
    marketShare: 21,
    audienceSize: 2016000
  },
  {
    id: 'abc-xkvl-chicago',
    name: 'XKVL-TV',
    marketId: 'chicago-il',
    broadcasterId: 'abc',
    cpm: '$25.35',
    marketShare: 15,
    audienceSize: 1440000
  },
  {
    id: 'univision-yeon-chicago',
    name: 'YEON-TV',
    marketId: 'chicago-il',
    broadcasterId: 'univision',
    cpm: '$24.26',
    marketShare: 28,
    audienceSize: 2688000
  },
  {
    id: 'hubbard-broadcasting-[jwh-chicago',
    name: '[JWH-TV',
    marketId: 'chicago-il',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.19',
    marketShare: 25,
    audienceSize: 2400000
  },
  {
    id: 'cbs-zvju-chicago-2',
    name: 'ZVJU-TV.com',
    marketId: 'chicago-il',
    broadcasterId: 'cbs',
    cpm: '$25.24',
    marketShare: 16,
    audienceSize: 1411000
  },
  {
    id: 'abc-xkvl-chicago-2',
    name: 'XKVL-TV.com',
    marketId: 'chicago-il',
    broadcasterId: 'abc',
    cpm: '$25.35',
    marketShare: 10,
    audienceSize: 1008000
  },
  {
    id: 'univision-yeon-chicago-2',
    name: 'YEON-TV.com',
    marketId: 'chicago-il',
    broadcasterId: 'univision',
    cpm: '$24.26',
    marketShare: 23,
    audienceSize: 1882000
  },
  {
    id: 'hubbard-broadcasting-[jwh-chicago-2',
    name: '[JWH-TV.com',
    marketId: 'chicago-il',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.19',
    marketShare: 20,
    audienceSize: 1680000
  },
  {
    id: 'nbc-[akw-dallas',
    name: '[AKW-TV',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'nbc',
    cpm: '$24.43',
    marketShare: 27,
    audienceSize: 2052000
  },
  {
    id: 'hearst-wdxh-dallas',
    name: 'WDXH-TV',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'hearst',
    cpm: '$25.24',
    marketShare: 26,
    audienceSize: 1976000
  },
  {
    id: 'univision-ztxk-dallas',
    name: 'ZTXK-TV',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'univision',
    cpm: '$23.77',
    marketShare: 26,
    audienceSize: 1976000
  },
  {
    id: 'abc-[efb-dallas',
    name: '[EFB-TV',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'abc',
    cpm: '$23.10',
    marketShare: 28,
    audienceSize: 2128000
  },
  {
    id: 'scripps-zxsb-dallas',
    name: 'ZXSB-TV',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'scripps',
    cpm: '$23.35',
    marketShare: 15,
    audienceSize: 1140000
  },
  {
    id: 'tegna-ytic-dallas',
    name: 'YTIC-TV',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'tegna',
    cpm: '$24.72',
    marketShare: 19,
    audienceSize: 1444000
  },
  {
    id: 'nexstar-yhaa-philadelphia',
    name: 'YHAA-TV',
    marketId: 'philadelphia-pa',
    broadcasterId: 'nexstar',
    cpm: '$24.74',
    marketShare: 16,
    audienceSize: 992000
  },
  {
    id: 'entravision-wpxw-philadelphia',
    name: 'WPXW-TV',
    marketId: 'philadelphia-pa',
    broadcasterId: 'entravision',
    cpm: '$24.50',
    marketShare: 21,
    audienceSize: 1302000
  },
  {
    id: 'hearst-xdof-philadelphia',
    name: 'XDOF-TV',
    marketId: 'philadelphia-pa',
    broadcasterId: 'hearst',
    cpm: '$25.17',
    marketShare: 28,
    audienceSize: 1736000
  },
  {
    id: 'nbc-zsbb-philadelphia',
    name: 'ZSBB-TV',
    marketId: 'philadelphia-pa',
    broadcasterId: 'nbc',
    cpm: '$24.81',
    marketShare: 31,
    audienceSize: 1922000
  },
  {
    id: 'gray-xhyf-philadelphia',
    name: 'XHYF-TV',
    marketId: 'philadelphia-pa',
    broadcasterId: 'gray',
    cpm: '$25.63',
    marketShare: 32,
    audienceSize: 1984000
  },
  {
    id: 'tegna-ylef-houston',
    name: 'YLEF-TV',
    marketId: 'houston-tx',
    broadcasterId: 'tegna',
    cpm: '$25.49',
    marketShare: 15,
    audienceSize: 1065000
  },
  {
    id: 'entravision-wlmo-houston',
    name: 'WLMO-TV',
    marketId: 'houston-tx',
    broadcasterId: 'entravision',
    cpm: '$23.68',
    marketShare: 16,
    audienceSize: 1136000
  },
  {
    id: 'gray-[xez-houston',
    name: '[XEZ-TV',
    marketId: 'houston-tx',
    broadcasterId: 'gray',
    cpm: '$24.36',
    marketShare: 23,
    audienceSize: 1633000
  },
  {
    id: 'hearst-ymrn-houston',
    name: 'YMRN-TV',
    marketId: 'houston-tx',
    broadcasterId: 'hearst',
    cpm: '$25.78',
    marketShare: 18,
    audienceSize: 1278000
  },
  {
    id: 'abc-yzsc-atlanta',
    name: 'YZSC-TV',
    marketId: 'atlanta-ga',
    broadcasterId: 'abc',
    cpm: '$24.31',
    marketShare: 16,
    audienceSize: 976000
  },
  {
    id: 'cbs-[hvu-atlanta',
    name: '[HVU-TV',
    marketId: 'atlanta-ga',
    broadcasterId: 'cbs',
    cpm: '$23.84',
    marketShare: 16,
    audienceSize: 976000
  },
  {
    id: 'hubbard-broadcasting-yloh-atlanta',
    name: 'YLOH-TV',
    marketId: 'atlanta-ga',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.87',
    marketShare: 32,
    audienceSize: 1952000
  },
  {
    id: 'scripps-xlym-atlanta',
    name: 'XLYM-TV',
    marketId: 'atlanta-ga',
    broadcasterId: 'scripps',
    cpm: '$23.25',
    marketShare: 26,
    audienceSize: 1586000
  },
  {
    id: 'news-press-gazette-xczj-atlanta',
    name: 'XCZJ-TV',
    marketId: 'atlanta-ga',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.32',
    marketShare: 33,
    audienceSize: 2013000
  },
  {
    id: 'hearst-yhvx-washington',
    name: 'YHVX-TV',
    marketId: 'washington-dc',
    broadcasterId: 'hearst',
    cpm: '$25.49',
    marketShare: 30,
    audienceSize: 1890000
  },
  {
    id: 'gray-[pdl-washington',
    name: '[PDL-TV',
    marketId: 'washington-dc',
    broadcasterId: 'gray',
    cpm: '$25.83',
    marketShare: 31,
    audienceSize: 1953000
  },
  {
    id: 'tegna-wzlf-washington',
    name: 'WZLF-TV',
    marketId: 'washington-dc',
    broadcasterId: 'tegna',
    cpm: '$25.18',
    marketShare: 16,
    audienceSize: 1008000
  },
  {
    id: 'abc-zjxj-washington',
    name: 'ZJXJ-TV',
    marketId: 'washington-dc',
    broadcasterId: 'abc',
    cpm: '$25.38',
    marketShare: 24,
    audienceSize: 1512000
  },
  {
    id: 'univision-[pbd-washington',
    name: '[PBD-TV',
    marketId: 'washington-dc',
    broadcasterId: 'univision',
    cpm: '$23.71',
    marketShare: 28,
    audienceSize: 1764000
  },
  {
    id: 'news-press-gazette-yovn-boston',
    name: 'YOVN-TV',
    marketId: 'boston-ma',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.80',
    marketShare: 34,
    audienceSize: 1666000
  },
  {
    id: 'nexstar-[yjk-boston',
    name: '[YJK-TV',
    marketId: 'boston-ma',
    broadcasterId: 'nexstar',
    cpm: '$25.71',
    marketShare: 19,
    audienceSize: 931000
  },
  {
    id: 'gray-yfut-boston',
    name: 'YFUT-TV',
    marketId: 'boston-ma',
    broadcasterId: 'gray',
    cpm: '$24.26',
    marketShare: 20,
    audienceSize: 980000
  },
  {
    id: 'abc-[smh-boston',
    name: '[SMH-TV',
    marketId: 'boston-ma',
    broadcasterId: 'abc',
    cpm: '$24.27',
    marketShare: 26,
    audienceSize: 1274000
  },
  {
    id: 'tegna-zhqc-san',
    name: 'ZHQC-TV',
    marketId: 'san-francisco-ca',
    broadcasterId: 'tegna',
    cpm: '$25.15',
    marketShare: 22,
    audienceSize: 1716000
  },
  {
    id: 'hearst-zpyg-san',
    name: 'ZPYG-TV',
    marketId: 'san-francisco-ca',
    broadcasterId: 'hearst',
    cpm: '$24.34',
    marketShare: 26,
    audienceSize: 2028000
  },
  {
    id: 'scripps-yzmx-san',
    name: 'YZMX-TV',
    marketId: 'san-francisco-ca',
    broadcasterId: 'scripps',
    cpm: '$23.03',
    marketShare: 34,
    audienceSize: 2652000
  },
  {
    id: 'cbs-xzet-tampa',
    name: 'XZET-TV',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'cbs',
    cpm: '$25.34',
    marketShare: 19,
    audienceSize: 608000
  },
  {
    id: 'nexstar-[hmq-tampa',
    name: '[HMQ-TV',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'nexstar',
    cpm: '$23.95',
    marketShare: 30,
    audienceSize: 960000
  },
  {
    id: 'hubbard-broadcasting-xmmk-tampa',
    name: 'XMMK-TV',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.09',
    marketShare: 17,
    audienceSize: 544000
  },
  {
    id: 'abc-xdcb-tampa',
    name: 'XDCB-TV',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'abc',
    cpm: '$25.87',
    marketShare: 33,
    audienceSize: 1056000
  },
  {
    id: 'morgan-murphy-xhlj-tampa',
    name: 'XHLJ-TV',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.77',
    marketShare: 34,
    audienceSize: 1088000
  },
  {
    id: 'entravision-xtvm-phoenix',
    name: 'XTVM-TV',
    marketId: 'phoenix-az',
    broadcasterId: 'entravision',
    cpm: '$23.26',
    marketShare: 17,
    audienceSize: 850000
  },
  {
    id: 'nbc-[ofa-phoenix',
    name: '[OFA-TV',
    marketId: 'phoenix-az',
    broadcasterId: 'nbc',
    cpm: '$25.33',
    marketShare: 30,
    audienceSize: 1500000
  },
  {
    id: 'univision-[gyp-phoenix',
    name: '[GYP-TV',
    marketId: 'phoenix-az',
    broadcasterId: 'univision',
    cpm: '$25.49',
    marketShare: 24,
    audienceSize: 1200000
  },
  {
    id: 'gray-xsxu-phoenix',
    name: 'XSXU-TV',
    marketId: 'phoenix-az',
    broadcasterId: 'gray',
    cpm: '$24.25',
    marketShare: 22,
    audienceSize: 1100000
  },
  {
    id: 'hubbard-broadcasting-zwcd-seattle',
    name: 'ZWCD-TV',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.23',
    marketShare: 17,
    audienceSize: 697000
  },
  {
    id: 'entravision-wabv-seattle',
    name: 'WABV-TV',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'entravision',
    cpm: '$23.30',
    marketShare: 24,
    audienceSize: 984000
  },
  {
    id: 'nexstar-zpmz-seattle',
    name: 'ZPMZ-TV',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'nexstar',
    cpm: '$23.08',
    marketShare: 30,
    audienceSize: 1230000
  },
  {
    id: 'news-press-gazette-[kqe-seattle',
    name: '[KQE-TV',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.13',
    marketShare: 30,
    audienceSize: 1230000
  },
  {
    id: 'gray-[dmj-detroit',
    name: '[DMJ-TV',
    marketId: 'detroit-mi',
    broadcasterId: 'gray',
    cpm: '$24.58',
    marketShare: 17,
    audienceSize: 731000
  },
  {
    id: 'tegna-wlzo-detroit',
    name: 'WLZO-TV',
    marketId: 'detroit-mi',
    broadcasterId: 'tegna',
    cpm: '$23.05',
    marketShare: 15,
    audienceSize: 645000
  },
  {
    id: 'univision-[rlt-detroit',
    name: '[RLT-TV',
    marketId: 'detroit-mi',
    broadcasterId: 'univision',
    cpm: '$23.56',
    marketShare: 20,
    audienceSize: 860000
  },
  {
    id: 'nbc-[jel-detroit',
    name: '[JEL-TV',
    marketId: 'detroit-mi',
    broadcasterId: 'nbc',
    cpm: '$24.69',
    marketShare: 17,
    audienceSize: 731000
  },
  {
    id: 'gray-yrjw-orlando',
    name: 'YRJW-TV',
    marketId: 'orlando-fl',
    broadcasterId: 'gray',
    cpm: '$25.99',
    marketShare: 33,
    audienceSize: 924000
  },
  {
    id: 'nbc-[lld-orlando',
    name: '[LLD-TV',
    marketId: 'orlando-fl',
    broadcasterId: 'nbc',
    cpm: '$23.62',
    marketShare: 16,
    audienceSize: 448000
  },
  {
    id: 'univision-wffh-orlando',
    name: 'WFFH-TV',
    marketId: 'orlando-fl',
    broadcasterId: 'univision',
    cpm: '$23.18',
    marketShare: 32,
    audienceSize: 896000
  },
  {
    id: 'hubbard-broadcasting-ytjn-orlando',
    name: 'YTJN-TV',
    marketId: 'orlando-fl',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.37',
    marketShare: 16,
    audienceSize: 448000
  },
  {
    id: 'abc-xgek-minneapolis',
    name: 'XGEK-TV',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'abc',
    cpm: '$23.06',
    marketShare: 29,
    audienceSize: 1014999
  },
  {
    id: 'entravision-[yzi-minneapolis',
    name: '[YZI-TV',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'entravision',
    cpm: '$25.28',
    marketShare: 20,
    audienceSize: 700000
  },
  {
    id: 'nexstar-[uht-minneapolis',
    name: '[UHT-TV',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'nexstar',
    cpm: '$25.00',
    marketShare: 15,
    audienceSize: 525000
  },
  {
    id: 'tegna-xhyu-minneapolis',
    name: 'XHYU-TV',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'tegna',
    cpm: '$25.99',
    marketShare: 20,
    audienceSize: 700000
  },
  {
    id: 'cbs-xfvs-minneapolis',
    name: 'XFVS-TV',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'cbs',
    cpm: '$25.30',
    marketShare: 24,
    audienceSize: 840000
  },
  {
    id: 'entravision-[zaq-denver',
    name: '[ZAQ-TV',
    marketId: 'denver-co',
    broadcasterId: 'entravision',
    cpm: '$23.75',
    marketShare: 27,
    audienceSize: 783000
  },
  {
    id: 'hubbard-broadcasting-xvxo-denver',
    name: 'XVXO-TV',
    marketId: 'denver-co',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.18',
    marketShare: 30,
    audienceSize: 870000
  },
  {
    id: 'abc-xhbq-denver',
    name: 'XHBQ-TV',
    marketId: 'denver-co',
    broadcasterId: 'abc',
    cpm: '$25.76',
    marketShare: 34,
    audienceSize: 986000
  },
  {
    id: 'univision-xvat-miami',
    name: 'XVAT-TV',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'univision',
    cpm: '$24.12',
    marketShare: 32,
    audienceSize: 1984000
  },
  {
    id: 'gray-[tsk-miami',
    name: '[TSK-TV',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'gray',
    cpm: '$24.20',
    marketShare: 20,
    audienceSize: 1240000
  },
  {
    id: 'abc-xvyw-miami',
    name: 'XVYW-TV',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'abc',
    cpm: '$23.02',
    marketShare: 15,
    audienceSize: 930000
  },
  {
    id: 'news-press-gazette-xcin-miami',
    name: 'XCIN-TV',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.09',
    marketShare: 33,
    audienceSize: 2046000
  },
  {
    id: 'hearst-[slu-miami',
    name: '[SLU-TV',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'hearst',
    cpm: '$25.39',
    marketShare: 32,
    audienceSize: 1984000
  },
  {
    id: 'abc-ycza-cleveland',
    name: 'YCZA-TV',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'abc',
    cpm: '$25.42',
    marketShare: 22,
    audienceSize: 638000
  },
  {
    id: 'morgan-murphy-zekz-cleveland',
    name: 'ZEKZ-TV',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.97',
    marketShare: 26,
    audienceSize: 754000
  },
  {
    id: 'news-press-gazette-[pyl-cleveland',
    name: '[PYL-TV',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.50',
    marketShare: 27,
    audienceSize: 783000
  },
  {
    id: 'entravision-ytho-sacramento',
    name: 'YTHO-TV',
    marketId: 'sacramento-ca',
    broadcasterId: 'entravision',
    cpm: '$25.12',
    marketShare: 28,
    audienceSize: 672000
  },
  {
    id: 'morgan-murphy-xvvu-sacramento',
    name: 'XVVU-TV',
    marketId: 'sacramento-ca',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.63',
    marketShare: 32,
    audienceSize: 768000
  },
  {
    id: 'tegna-yymd-sacramento',
    name: 'YYMD-TV',
    marketId: 'sacramento-ca',
    broadcasterId: 'tegna',
    cpm: '$24.15',
    marketShare: 19,
    audienceSize: 456000
  },
  {
    id: 'nbc-wvcz-sacramento',
    name: 'WVCZ-TV',
    marketId: 'sacramento-ca',
    broadcasterId: 'nbc',
    cpm: '$25.27',
    marketShare: 32,
    audienceSize: 768000
  },
  {
    id: 'cbs-xvld-sacramento',
    name: 'XVLD-TV',
    marketId: 'sacramento-ca',
    broadcasterId: 'cbs',
    cpm: '$25.54',
    marketShare: 15,
    audienceSize: 360000
  },
  {
    id: 'abc-xvow-sacramento',
    name: 'XVOW-TV',
    marketId: 'sacramento-ca',
    broadcasterId: 'abc',
    cpm: '$24.28',
    marketShare: 34,
    audienceSize: 816000
  },
  {
    id: 'hearst-zodz-charlotte',
    name: 'ZODZ-TV',
    marketId: 'charlotte-nc',
    broadcasterId: 'hearst',
    cpm: '$25.87',
    marketShare: 23,
    audienceSize: 598000
  },
  {
    id: 'morgan-murphy-wihi-charlotte',
    name: 'WIHI-TV',
    marketId: 'charlotte-nc',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.50',
    marketShare: 19,
    audienceSize: 494000
  },
  {
    id: 'news-press-gazette-zzfw-charlotte',
    name: 'ZZFW-TV',
    marketId: 'charlotte-nc',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.03',
    marketShare: 33,
    audienceSize: 858000
  },
  {
    id: 'morgan-murphy-xyfi-raleigh',
    name: 'XYFI-TV',
    marketId: 'raleigh-durham-nc',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.20',
    marketShare: 30,
    audienceSize: 660000
  },
  {
    id: 'entravision-[zoa-raleigh',
    name: '[ZOA-TV',
    marketId: 'raleigh-durham-nc',
    broadcasterId: 'entravision',
    cpm: '$23.05',
    marketShare: 20,
    audienceSize: 440000
  },
  {
    id: 'hubbard-broadcasting-xoys-raleigh',
    name: 'XOYS-TV',
    marketId: 'raleigh-durham-nc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.32',
    marketShare: 21,
    audienceSize: 462000
  },
  {
    id: 'abc-wevl-portland',
    name: 'WEVL-TV',
    marketId: 'portland-or',
    broadcasterId: 'abc',
    cpm: '$23.98',
    marketShare: 18,
    audienceSize: 450000
  },
  {
    id: 'cbs-wrvx-portland',
    name: 'WRVX-TV',
    marketId: 'portland-or',
    broadcasterId: 'cbs',
    cpm: '$23.25',
    marketShare: 27,
    audienceSize: 675000
  },
  {
    id: 'entravision-xvnx-portland',
    name: 'XVNX-TV',
    marketId: 'portland-or',
    broadcasterId: 'entravision',
    cpm: '$24.97',
    marketShare: 34,
    audienceSize: 850000
  },
  {
    id: 'morgan-murphy-xlnd-st',
    name: 'XLND-TV',
    marketId: 'st-louis-mo',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.64',
    marketShare: 25,
    audienceSize: 700000
  },
  {
    id: 'scripps-xqsr-st',
    name: 'XQSR-TV',
    marketId: 'st-louis-mo',
    broadcasterId: 'scripps',
    cpm: '$25.20',
    marketShare: 28,
    audienceSize: 784000
  },
  {
    id: 'univision-yxnm-st',
    name: 'YXNM-TV',
    marketId: 'st-louis-mo',
    broadcasterId: 'univision',
    cpm: '$23.98',
    marketShare: 20,
    audienceSize: 560000
  },
  {
    id: 'nbc-wfyc-st',
    name: 'WFYC-TV',
    marketId: 'st-louis-mo',
    broadcasterId: 'nbc',
    cpm: '$23.98',
    marketShare: 31,
    audienceSize: 868000
  },
  {
    id: 'cbs-[xtf-st',
    name: '[XTF-TV',
    marketId: 'st-louis-mo',
    broadcasterId: 'cbs',
    cpm: '$25.67',
    marketShare: 29,
    audienceSize: 812000
  },
  {
    id: 'news-press-gazette-yrlr-indianapolis',
    name: 'YRLR-TV',
    marketId: 'indianapolis-in',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.65',
    marketShare: 31,
    audienceSize: 651000
  },
  {
    id: 'hubbard-broadcasting-[vra-indianapolis',
    name: '[VRA-TV',
    marketId: 'indianapolis-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.26',
    marketShare: 28,
    audienceSize: 588000
  },
  {
    id: 'gray-xtxb-indianapolis',
    name: 'XTXB-TV',
    marketId: 'indianapolis-in',
    broadcasterId: 'gray',
    cpm: '$24.85',
    marketShare: 26,
    audienceSize: 546000
  },
  {
    id: 'abc-[xnj-nashville',
    name: '[XNJ-TV',
    marketId: 'nashville-tn',
    broadcasterId: 'abc',
    cpm: '$25.20',
    marketShare: 20,
    audienceSize: 380000
  },
  {
    id: 'cbs-[low-nashville',
    name: '[LOW-TV',
    marketId: 'nashville-tn',
    broadcasterId: 'cbs',
    cpm: '$25.23',
    marketShare: 15,
    audienceSize: 285000
  },
  {
    id: 'nbc-[fbv-nashville',
    name: '[FBV-TV',
    marketId: 'nashville-tn',
    broadcasterId: 'nbc',
    cpm: '$25.14',
    marketShare: 33,
    audienceSize: 627000
  },
  {
    id: 'entravision-[eai-nashville',
    name: '[EAI-TV',
    marketId: 'nashville-tn',
    broadcasterId: 'entravision',
    cpm: '$25.41',
    marketShare: 21,
    audienceSize: 399000
  },
  {
    id: 'abc-xrfr-pittsburgh',
    name: 'XRFR-TV',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'abc',
    cpm: '$24.77',
    marketShare: 27,
    audienceSize: 621000
  },
  {
    id: 'cbs-[hsp-pittsburgh',
    name: '[HSP-TV',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'cbs',
    cpm: '$25.59',
    marketShare: 17,
    audienceSize: 391000
  },
  {
    id: 'nbc-wpky-pittsburgh',
    name: 'WPKY-TV',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'nbc',
    cpm: '$25.83',
    marketShare: 18,
    audienceSize: 414000
  },
  {
    id: 'gray-zbgy-pittsburgh',
    name: 'ZBGY-TV',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'gray',
    cpm: '$23.78',
    marketShare: 23,
    audienceSize: 529000
  },
  {
    id: 'nexstar-wddm-pittsburgh',
    name: 'WDDM-TV',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'nexstar',
    cpm: '$23.22',
    marketShare: 23,
    audienceSize: 529000
  },
  {
    id: 'univision-yssk-salt',
    name: 'YSSK-TV',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'univision',
    cpm: '$25.60',
    marketShare: 16,
    audienceSize: 192000
  },
  {
    id: 'hearst-[pot-salt',
    name: '[POT-TV',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'hearst',
    cpm: '$24.71',
    marketShare: 19,
    audienceSize: 228000
  },
  {
    id: 'tegna-zdoc-salt',
    name: 'ZDOC-TV',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'tegna',
    cpm: '$23.32',
    marketShare: 22,
    audienceSize: 264000
  },
  {
    id: 'abc-[znl-baltimore',
    name: '[ZNL-TV',
    marketId: 'baltimore-md',
    broadcasterId: 'abc',
    cpm: '$23.37',
    marketShare: 21,
    audienceSize: 588000
  },
  {
    id: 'hearst-zofp-baltimore',
    name: 'ZOFP-TV',
    marketId: 'baltimore-md',
    broadcasterId: 'hearst',
    cpm: '$23.80',
    marketShare: 33,
    audienceSize: 924000
  },
  {
    id: 'gray-wycl-baltimore',
    name: 'WYCL-TV',
    marketId: 'baltimore-md',
    broadcasterId: 'gray',
    cpm: '$23.95',
    marketShare: 25,
    audienceSize: 700000
  },
  {
    id: 'tegna-xmiq-baltimore',
    name: 'XMIQ-TV',
    marketId: 'baltimore-md',
    broadcasterId: 'tegna',
    cpm: '$23.22',
    marketShare: 28,
    audienceSize: 784000
  },
  {
    id: 'morgan-murphy-yqam-baltimore',
    name: 'YQAM-TV',
    marketId: 'baltimore-md',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.79',
    marketShare: 19,
    audienceSize: 532000
  },
  {
    id: 'cbs-wsvz-baltimore',
    name: 'WSVZ-TV',
    marketId: 'baltimore-md',
    broadcasterId: 'cbs',
    cpm: '$24.16',
    marketShare: 19,
    audienceSize: 532000
  },
  {
    id: 'univision-zedv-san',
    name: 'ZEDV-TV',
    marketId: 'san-diego-ca',
    broadcasterId: 'univision',
    cpm: '$23.79',
    marketShare: 31,
    audienceSize: 1023000
  },
  {
    id: 'scripps-wvtp-san',
    name: 'WVTP-TV',
    marketId: 'san-diego-ca',
    broadcasterId: 'scripps',
    cpm: '$25.29',
    marketShare: 27,
    audienceSize: 891000
  },
  {
    id: 'nexstar-yklo-san',
    name: 'YKLO-TV',
    marketId: 'san-diego-ca',
    broadcasterId: 'nexstar',
    cpm: '$25.62',
    marketShare: 25,
    audienceSize: 825000
  },
  {
    id: 'abc-zlyy-san',
    name: 'ZLYY-TV',
    marketId: 'san-antonio-tx',
    broadcasterId: 'abc',
    cpm: '$23.62',
    marketShare: 19,
    audienceSize: 475000
  },
  {
    id: 'morgan-murphy-wqqh-san',
    name: 'WQQH-TV',
    marketId: 'san-antonio-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.44',
    marketShare: 28,
    audienceSize: 700000
  },
  {
    id: 'news-press-gazette-xuon-san',
    name: 'XUON-TV',
    marketId: 'san-antonio-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.78',
    marketShare: 30,
    audienceSize: 750000
  },
  {
    id: 'cbs-wwff-san',
    name: 'WWFF-TV',
    marketId: 'san-antonio-tx',
    broadcasterId: 'cbs',
    cpm: '$24.14',
    marketShare: 26,
    audienceSize: 650000
  },
  {
    id: 'nbc-zbpn-san',
    name: 'ZBPN-TV',
    marketId: 'san-antonio-tx',
    broadcasterId: 'nbc',
    cpm: '$24.19',
    marketShare: 21,
    audienceSize: 525000
  },
  {
    id: 'abc-[plh-hartford',
    name: '[PLH-TV',
    marketId: 'hartford-ct',
    broadcasterId: 'abc',
    cpm: '$24.26',
    marketShare: 24,
    audienceSize: 432000
  },
  {
    id: 'cbs-[jnz-hartford',
    name: '[JNZ-TV',
    marketId: 'hartford-ct',
    broadcasterId: 'cbs',
    cpm: '$24.50',
    marketShare: 27,
    audienceSize: 486000
  },
  {
    id: 'nexstar-[nks-hartford',
    name: '[NKS-TV',
    marketId: 'hartford-ct',
    broadcasterId: 'nexstar',
    cpm: '$23.06',
    marketShare: 24,
    audienceSize: 432000
  },
  {
    id: 'tegna-[mip-hartford',
    name: '[MIP-TV',
    marketId: 'hartford-ct',
    broadcasterId: 'tegna',
    cpm: '$23.85',
    marketShare: 17,
    audienceSize: 306000
  },
  {
    id: 'nexstar-xgsb-kansas',
    name: 'XGSB-TV',
    marketId: 'kansas-city-mo',
    broadcasterId: 'nexstar',
    cpm: '$23.55',
    marketShare: 18,
    audienceSize: 378000
  },
  {
    id: 'news-press-gazette-zcew-kansas',
    name: 'ZCEW-TV',
    marketId: 'kansas-city-mo',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.65',
    marketShare: 26,
    audienceSize: 546000
  },
  {
    id: 'hearst-xwaw-kansas',
    name: 'XWAW-TV',
    marketId: 'kansas-city-mo',
    broadcasterId: 'hearst',
    cpm: '$25.43',
    marketShare: 30,
    audienceSize: 630000
  },
  {
    id: 'abc-[plk-kansas',
    name: '[PLK-TV',
    marketId: 'kansas-city-mo',
    broadcasterId: 'abc',
    cpm: '$24.88',
    marketShare: 25,
    audienceSize: 525000
  },
  {
    id: 'abc-[nex-austin',
    name: '[NEX-TV',
    marketId: 'austin-tx',
    broadcasterId: 'abc',
    cpm: '$25.42',
    marketShare: 24,
    audienceSize: 528000
  },
  {
    id: 'nexstar-zpsh-austin',
    name: 'ZPSH-TV',
    marketId: 'austin-tx',
    broadcasterId: 'nexstar',
    cpm: '$25.01',
    marketShare: 34,
    audienceSize: 748000
  },
  {
    id: 'tegna-wuhw-austin',
    name: 'WUHW-TV',
    marketId: 'austin-tx',
    broadcasterId: 'tegna',
    cpm: '$25.55',
    marketShare: 28,
    audienceSize: 616000
  },
  {
    id: 'entravision-wxpm-austin',
    name: 'WXPM-TV',
    marketId: 'austin-tx',
    broadcasterId: 'entravision',
    cpm: '$24.21',
    marketShare: 16,
    audienceSize: 352000
  },
  {
    id: 'hearst-zwtc-austin',
    name: 'ZWTC-TV',
    marketId: 'austin-tx',
    broadcasterId: 'hearst',
    cpm: '$25.15',
    marketShare: 16,
    audienceSize: 352000
  },
  {
    id: 'hubbard-broadcasting-[igw-austin',
    name: '[IGW-TV',
    marketId: 'austin-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.81',
    marketShare: 30,
    audienceSize: 660000
  },
  {
    id: 'cbs-yazs-columbus',
    name: 'YAZS-TV',
    marketId: 'columbus-oh',
    broadcasterId: 'cbs',
    cpm: '$23.59',
    marketShare: 34,
    audienceSize: 714000
  },
  {
    id: 'nexstar-[nyo-columbus',
    name: '[NYO-TV',
    marketId: 'columbus-oh',
    broadcasterId: 'nexstar',
    cpm: '$25.09',
    marketShare: 34,
    audienceSize: 714000
  },
  {
    id: 'news-press-gazette-zcwh-columbus',
    name: 'ZCWH-TV',
    marketId: 'columbus-oh',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.04',
    marketShare: 24,
    audienceSize: 504000
  },
  {
    id: 'morgan-murphy-wfbe-columbus',
    name: 'WFBE-TV',
    marketId: 'columbus-oh',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.07',
    marketShare: 21,
    audienceSize: 441000
  },
  {
    id: 'entravision-wejs-columbus',
    name: 'WEJS-TV',
    marketId: 'columbus-oh',
    broadcasterId: 'entravision',
    cpm: '$25.38',
    marketShare: 23,
    audienceSize: 483000
  },
  {
    id: 'hubbard-broadcasting-yxzl-columbus',
    name: 'YXZL-TV',
    marketId: 'columbus-oh',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.54',
    marketShare: 20,
    audienceSize: 420000
  },
  {
    id: 'nbc-xkra-greenville',
    name: 'XKRA-TV',
    marketId: 'greenville-sc',
    broadcasterId: 'nbc',
    cpm: '$24.31',
    marketShare: 31,
    audienceSize: 465000
  },
  {
    id: 'cbs-ypgl-greenville',
    name: 'YPGL-TV',
    marketId: 'greenville-sc',
    broadcasterId: 'cbs',
    cpm: '$23.74',
    marketShare: 21,
    audienceSize: 315000
  },
  {
    id: 'tegna-xdql-greenville',
    name: 'XDQL-TV',
    marketId: 'greenville-sc',
    broadcasterId: 'tegna',
    cpm: '$24.26',
    marketShare: 32,
    audienceSize: 480000
  },
  {
    id: 'hubbard-broadcasting-zkpf-greenville',
    name: 'ZKPF-TV',
    marketId: 'greenville-sc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.07',
    marketShare: 28,
    audienceSize: 420000
  },
  {
    id: 'cbs-ylqy-cincinnati',
    name: 'YLQY-TV',
    marketId: 'cincinnati-oh',
    broadcasterId: 'cbs',
    cpm: '$25.92',
    marketShare: 16,
    audienceSize: 352000
  },
  {
    id: 'nbc-znjw-cincinnati',
    name: 'ZNJW-TV',
    marketId: 'cincinnati-oh',
    broadcasterId: 'nbc',
    cpm: '$24.76',
    marketShare: 32,
    audienceSize: 704000
  },
  {
    id: 'news-press-gazette-zcfu-cincinnati',
    name: 'ZCFU-TV',
    marketId: 'cincinnati-oh',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.44',
    marketShare: 27,
    audienceSize: 594000
  },
  {
    id: 'entravision-yrjw-cincinnati',
    name: 'YRJW-TV',
    marketId: 'cincinnati-oh',
    broadcasterId: 'entravision',
    cpm: '$25.51',
    marketShare: 16,
    audienceSize: 352000
  },
  {
    id: 'hearst-zjbk-cincinnati',
    name: 'ZJBK-TV',
    marketId: 'cincinnati-oh',
    broadcasterId: 'hearst',
    cpm: '$25.05',
    marketShare: 24,
    audienceSize: 528000
  },
  {
    id: 'tegna-xsrh-cincinnati',
    name: 'XSRH-TV',
    marketId: 'cincinnati-oh',
    broadcasterId: 'tegna',
    cpm: '$24.60',
    marketShare: 23,
    audienceSize: 506000
  },
  {
    id: 'scripps-xijc-milwaukee',
    name: 'XIJC-TV',
    marketId: 'milwaukee-wi',
    broadcasterId: 'scripps',
    cpm: '$23.76',
    marketShare: 28,
    audienceSize: 448000
  },
  {
    id: 'gray-wbex-milwaukee',
    name: 'WBEX-TV',
    marketId: 'milwaukee-wi',
    broadcasterId: 'gray',
    cpm: '$25.82',
    marketShare: 27,
    audienceSize: 432000
  },
  {
    id: 'nbc-[vhx-milwaukee',
    name: '[VHX-TV',
    marketId: 'milwaukee-wi',
    broadcasterId: 'nbc',
    cpm: '$23.30',
    marketShare: 31,
    audienceSize: 496000
  },
  {
    id: 'entravision-zhpi-milwaukee',
    name: 'ZHPI-TV',
    marketId: 'milwaukee-wi',
    broadcasterId: 'entravision',
    cpm: '$24.89',
    marketShare: 31,
    audienceSize: 496000
  },
  {
    id: 'entravision-zimj-west',
    name: 'ZIMJ-TV',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'entravision',
    cpm: '$24.94',
    marketShare: 21,
    audienceSize: 315000
  },
  {
    id: 'scripps-wleo-west',
    name: 'WLEO-TV',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'scripps',
    cpm: '$23.65',
    marketShare: 28,
    audienceSize: 420000
  },
  {
    id: 'univision-[ibp-west',
    name: '[IBP-TV',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'univision',
    cpm: '$25.56',
    marketShare: 16,
    audienceSize: 240000
  },
  {
    id: 'abc-[gvk-las',
    name: '[GVK-TV',
    marketId: 'las-vegas-nv',
    broadcasterId: 'abc',
    cpm: '$25.79',
    marketShare: 31,
    audienceSize: 682000
  },
  {
    id: 'hearst-yufj-las',
    name: 'YUFJ-TV',
    marketId: 'las-vegas-nv',
    broadcasterId: 'hearst',
    cpm: '$24.87',
    marketShare: 23,
    audienceSize: 506000
  },
  {
    id: 'scripps-xqla-las',
    name: 'XQLA-TV',
    marketId: 'las-vegas-nv',
    broadcasterId: 'scripps',
    cpm: '$25.00',
    marketShare: 17,
    audienceSize: 374000
  },
  {
    id: 'hubbard-broadcasting-xpdc-las',
    name: 'XPDC-TV',
    marketId: 'las-vegas-nv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.06',
    marketShare: 29,
    audienceSize: 638000
  },
  {
    id: 'entravision-xojz-jacksonville',
    name: 'XOJZ-TV',
    marketId: 'jacksonville-fl',
    broadcasterId: 'entravision',
    cpm: '$23.53',
    marketShare: 28,
    audienceSize: 420000
  },
  {
    id: 'morgan-murphy-[vdq-jacksonville',
    name: '[VDQ-TV',
    marketId: 'jacksonville-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.30',
    marketShare: 16,
    audienceSize: 240000
  },
  {
    id: 'cbs-[rxd-jacksonville',
    name: '[RXD-TV',
    marketId: 'jacksonville-fl',
    broadcasterId: 'cbs',
    cpm: '$24.78',
    marketShare: 18,
    audienceSize: 270000
  },
  {
    id: 'univision-wabx-harrisburg',
    name: 'WABX-TV',
    marketId: 'harrisburg-pa',
    broadcasterId: 'univision',
    cpm: '$25.70',
    marketShare: 15,
    audienceSize: 180000
  },
  {
    id: 'hubbard-broadcasting-xdmd-harrisburg',
    name: 'XDMD-TV',
    marketId: 'harrisburg-pa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.44',
    marketShare: 24,
    audienceSize: 288000
  },
  {
    id: 'morgan-murphy-[fhk-harrisburg',
    name: '[FHK-TV',
    marketId: 'harrisburg-pa',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.80',
    marketShare: 24,
    audienceSize: 288000
  },
  {
    id: 'news-press-gazette-zlmr-harrisburg',
    name: 'ZLMR-TV',
    marketId: 'harrisburg-pa',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.83',
    marketShare: 30,
    audienceSize: 360000
  },
  {
    id: 'scripps-yysc-harrisburg',
    name: 'YYSC-TV',
    marketId: 'harrisburg-pa',
    broadcasterId: 'scripps',
    cpm: '$25.08',
    marketShare: 17,
    audienceSize: 204000
  },
  {
    id: 'gray-xyud-grand',
    name: 'XYUD-TV',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'gray',
    cpm: '$23.30',
    marketShare: 32,
    audienceSize: 448000
  },
  {
    id: 'morgan-murphy-wrto-grand',
    name: 'WRTO-TV',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.59',
    marketShare: 24,
    audienceSize: 336000
  },
  {
    id: 'hubbard-broadcasting-wmvc-grand',
    name: 'WMVC-TV',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.37',
    marketShare: 21,
    audienceSize: 294000
  },
  {
    id: 'abc-xzki-grand',
    name: 'XZKI-TV',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'abc',
    cpm: '$24.48',
    marketShare: 26,
    audienceSize: 364000
  },
  {
    id: 'scripps-xxjv-grand',
    name: 'XXJV-TV',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'scripps',
    cpm: '$25.12',
    marketShare: 28,
    audienceSize: 392000
  },
  {
    id: 'tegna-zsff-grand',
    name: 'ZSFF-TV',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'tegna',
    cpm: '$23.77',
    marketShare: 23,
    audienceSize: 322000
  },
  {
    id: 'scripps-yahp-norfolk',
    name: 'YAHP-TV',
    marketId: 'norfolk-va',
    broadcasterId: 'scripps',
    cpm: '$23.13',
    marketShare: 24,
    audienceSize: 408000
  },
  {
    id: 'nbc-[veb-norfolk',
    name: '[VEB-TV',
    marketId: 'norfolk-va',
    broadcasterId: 'nbc',
    cpm: '$23.56',
    marketShare: 23,
    audienceSize: 391000
  },
  {
    id: 'gray-[dit-norfolk',
    name: '[DIT-TV',
    marketId: 'norfolk-va',
    broadcasterId: 'gray',
    cpm: '$25.10',
    marketShare: 18,
    audienceSize: 306000
  },
  {
    id: 'hearst-yckv-norfolk',
    name: 'YCKV-TV',
    marketId: 'norfolk-va',
    broadcasterId: 'hearst',
    cpm: '$24.23',
    marketShare: 21,
    audienceSize: 357000
  },
  {
    id: 'nexstar-[yaz-norfolk',
    name: '[YAZ-TV',
    marketId: 'norfolk-va',
    broadcasterId: 'nexstar',
    cpm: '$24.18',
    marketShare: 18,
    audienceSize: 306000
  },
  {
    id: 'hearst-xfbk-birmingham',
    name: 'XFBK-TV',
    marketId: 'birmingham-al',
    broadcasterId: 'hearst',
    cpm: '$23.86',
    marketShare: 31,
    audienceSize: 372000
  },
  {
    id: 'news-press-gazette-ycxg-birmingham',
    name: 'YCXG-TV',
    marketId: 'birmingham-al',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.23',
    marketShare: 22,
    audienceSize: 264000
  },
  {
    id: 'hubbard-broadcasting-xkrt-birmingham',
    name: 'XKRT-TV',
    marketId: 'birmingham-al',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.80',
    marketShare: 19,
    audienceSize: 228000
  },
  {
    id: 'nbc-zihf-birmingham',
    name: 'ZIHF-TV',
    marketId: 'birmingham-al',
    broadcasterId: 'nbc',
    cpm: '$23.23',
    marketShare: 22,
    audienceSize: 264000
  },
  {
    id: 'gray-wkzd-birmingham',
    name: 'WKZD-TV',
    marketId: 'birmingham-al',
    broadcasterId: 'gray',
    cpm: '$25.84',
    marketShare: 17,
    audienceSize: 204000
  },
  {
    id: 'univision-[ufq-greensboro',
    name: '[UFQ-TV',
    marketId: 'greensboro-nc',
    broadcasterId: 'univision',
    cpm: '$23.48',
    marketShare: 30,
    audienceSize: 420000
  },
  {
    id: 'news-press-gazette-ywas-greensboro',
    name: 'YWAS-TV',
    marketId: 'greensboro-nc',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.98',
    marketShare: 21,
    audienceSize: 294000
  },
  {
    id: 'abc-zzgc-greensboro',
    name: 'ZZGC-TV',
    marketId: 'greensboro-nc',
    broadcasterId: 'abc',
    cpm: '$23.36',
    marketShare: 21,
    audienceSize: 294000
  },
  {
    id: 'abc-wxqp-oklahoma',
    name: 'WXQP-TV',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'abc',
    cpm: '$24.05',
    marketShare: 32,
    audienceSize: 448000
  },
  {
    id: 'cbs-[wyz-oklahoma',
    name: '[WYZ-TV',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'cbs',
    cpm: '$23.63',
    marketShare: 16,
    audienceSize: 224000
  },
  {
    id: 'nbc-xnxd-oklahoma',
    name: 'XNXD-TV',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'nbc',
    cpm: '$24.98',
    marketShare: 21,
    audienceSize: 294000
  },
  {
    id: 'entravision-ysnx-oklahoma',
    name: 'YSNX-TV',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'entravision',
    cpm: '$23.48',
    marketShare: 25,
    audienceSize: 350000
  },
  {
    id: 'hearst-wdhz-albuquerque',
    name: 'WDHZ-TV',
    marketId: 'albuquerque-nm',
    broadcasterId: 'hearst',
    cpm: '$24.22',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'abc-[tpi-albuquerque',
    name: '[TPI-TV',
    marketId: 'albuquerque-nm',
    broadcasterId: 'abc',
    cpm: '$23.75',
    marketShare: 27,
    audienceSize: 243000
  },
  {
    id: 'morgan-murphy-wyva-albuquerque',
    name: 'WYVA-TV',
    marketId: 'albuquerque-nm',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.63',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'scripps-yold-louisville',
    name: 'YOLD-TV',
    marketId: 'louisville-ky',
    broadcasterId: 'scripps',
    cpm: '$23.99',
    marketShare: 24,
    audienceSize: 312000
  },
  {
    id: 'univision-wmzv-louisville',
    name: 'WMZV-TV',
    marketId: 'louisville-ky',
    broadcasterId: 'univision',
    cpm: '$25.13',
    marketShare: 18,
    audienceSize: 234000
  },
  {
    id: 'gray-[ymw-louisville',
    name: '[YMW-TV',
    marketId: 'louisville-ky',
    broadcasterId: 'gray',
    cpm: '$23.33',
    marketShare: 18,
    audienceSize: 234000
  },
  {
    id: 'entravision-xvyv-louisville',
    name: 'XVYV-TV',
    marketId: 'louisville-ky',
    broadcasterId: 'entravision',
    cpm: '$25.64',
    marketShare: 22,
    audienceSize: 286000
  },
  {
    id: 'tegna-wdcx-louisville',
    name: 'WDCX-TV',
    marketId: 'louisville-ky',
    broadcasterId: 'tegna',
    cpm: '$23.50',
    marketShare: 27,
    audienceSize: 351000
  },
  {
    id: 'scripps-[cym-new',
    name: '[CYM-TV',
    marketId: 'new-orleans-la',
    broadcasterId: 'scripps',
    cpm: '$24.53',
    marketShare: 15,
    audienceSize: 195000
  },
  {
    id: 'hearst-xkue-new',
    name: 'XKUE-TV',
    marketId: 'new-orleans-la',
    broadcasterId: 'hearst',
    cpm: '$24.27',
    marketShare: 32,
    audienceSize: 416000
  },
  {
    id: 'nexstar-wold-new',
    name: 'WOLD-TV',
    marketId: 'new-orleans-la',
    broadcasterId: 'nexstar',
    cpm: '$23.52',
    marketShare: 33,
    audienceSize: 429000
  },
  {
    id: 'entravision-zxkd-new',
    name: 'ZXKD-TV',
    marketId: 'new-orleans-la',
    broadcasterId: 'entravision',
    cpm: '$23.06',
    marketShare: 30,
    audienceSize: 390000
  },
  {
    id: 'gray-yazb-new',
    name: 'YAZB-TV',
    marketId: 'new-orleans-la',
    broadcasterId: 'gray',
    cpm: '$25.36',
    marketShare: 18,
    audienceSize: 234000
  },
  {
    id: 'nbc-zvtt-new',
    name: 'ZVTT-TV',
    marketId: 'new-orleans-la',
    broadcasterId: 'nbc',
    cpm: '$23.59',
    marketShare: 31,
    audienceSize: 403000
  },
  {
    id: 'hearst-yfym-memphis',
    name: 'YFYM-TV',
    marketId: 'memphis-tn',
    broadcasterId: 'hearst',
    cpm: '$20.40',
    marketShare: 33,
    audienceSize: 429000
  },
  {
    id: 'morgan-murphy-[iok-memphis',
    name: '[IOK-TV',
    marketId: 'memphis-tn',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.33',
    marketShare: 24,
    audienceSize: 312000
  },
  {
    id: 'univision-zdwa-memphis',
    name: 'ZDWA-TV',
    marketId: 'memphis-tn',
    broadcasterId: 'univision',
    cpm: '$19.88',
    marketShare: 30,
    audienceSize: 390000
  },
  {
    id: 'morgan-murphy-wzao-providence',
    name: 'WZAO-TV',
    marketId: 'providence-ri',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.50',
    marketShare: 23,
    audienceSize: 368000
  },
  {
    id: 'univision-ynjz-providence',
    name: 'YNJZ-TV',
    marketId: 'providence-ri',
    broadcasterId: 'univision',
    cpm: '$19.04',
    marketShare: 26,
    audienceSize: 416000
  },
  {
    id: 'tegna-wpcd-providence',
    name: 'WPCD-TV',
    marketId: 'providence-ri',
    broadcasterId: 'tegna',
    cpm: '$21.11',
    marketShare: 31,
    audienceSize: 496000
  },
  {
    id: 'hearst-[hdz-providence',
    name: '[HDZ-TV',
    marketId: 'providence-ri',
    broadcasterId: 'hearst',
    cpm: '$19.27',
    marketShare: 24,
    audienceSize: 384000
  },
  {
    id: 'news-press-gazette-zcsk-providence',
    name: 'ZCSK-TV',
    marketId: 'providence-ri',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.21',
    marketShare: 23,
    audienceSize: 368000
  },
  {
    id: 'nexstar-zjut-providence',
    name: 'ZJUT-TV',
    marketId: 'providence-ri',
    broadcasterId: 'nexstar',
    cpm: '$19.42',
    marketShare: 31,
    audienceSize: 496000
  },
  {
    id: 'abc-yuid-ft',
    name: 'YUID-TV',
    marketId: 'ft-myers-fl',
    broadcasterId: 'abc',
    cpm: '$19.79',
    marketShare: 28,
    audienceSize: 280000
  },
  {
    id: 'tegna-wqgq-ft',
    name: 'WQGQ-TV',
    marketId: 'ft-myers-fl',
    broadcasterId: 'tegna',
    cpm: '$19.16',
    marketShare: 23,
    audienceSize: 230000
  },
  {
    id: 'cbs-ytfh-ft',
    name: 'YTFH-TV',
    marketId: 'ft-myers-fl',
    broadcasterId: 'cbs',
    cpm: '$20.02',
    marketShare: 33,
    audienceSize: 330000
  },
  {
    id: 'gray-ypan-ft',
    name: 'YPAN-TV',
    marketId: 'ft-myers-fl',
    broadcasterId: 'gray',
    cpm: '$20.19',
    marketShare: 16,
    audienceSize: 160000
  },
  {
    id: 'univision-znyy-ft',
    name: 'ZNYY-TV',
    marketId: 'ft-myers-fl',
    broadcasterId: 'univision',
    cpm: '$20.21',
    marketShare: 21,
    audienceSize: 210000
  },
  {
    id: 'abc-wvdt-buffalo',
    name: 'WVDT-TV',
    marketId: 'buffalo-ny',
    broadcasterId: 'abc',
    cpm: '$20.86',
    marketShare: 27,
    audienceSize: 297000
  },
  {
    id: 'tegna-yldz-buffalo',
    name: 'YLDZ-TV',
    marketId: 'buffalo-ny',
    broadcasterId: 'tegna',
    cpm: '$20.04',
    marketShare: 32,
    audienceSize: 352000
  },
  {
    id: 'morgan-murphy-wsvc-buffalo',
    name: 'WSVC-TV',
    marketId: 'buffalo-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.84',
    marketShare: 23,
    audienceSize: 253000
  },
  {
    id: 'gray-zxry-fresno',
    name: 'ZXRY-TV',
    marketId: 'fresno-ca',
    broadcasterId: 'gray',
    cpm: '$21.74',
    marketShare: 24,
    audienceSize: 264000
  },
  {
    id: 'nbc-[dee-fresno',
    name: '[DEE-TV',
    marketId: 'fresno-ca',
    broadcasterId: 'nbc',
    cpm: '$21.43',
    marketShare: 26,
    audienceSize: 286000
  },
  {
    id: 'scripps-xqte-fresno',
    name: 'XQTE-TV',
    marketId: 'fresno-ca',
    broadcasterId: 'scripps',
    cpm: '$20.10',
    marketShare: 23,
    audienceSize: 253000
  },
  {
    id: 'nbc-zxen-richmond',
    name: 'ZXEN-TV',
    marketId: 'richmond-va',
    broadcasterId: 'nbc',
    cpm: '$20.17',
    marketShare: 27,
    audienceSize: 351000
  },
  {
    id: 'cbs-wqtg-richmond',
    name: 'WQTG-TV',
    marketId: 'richmond-va',
    broadcasterId: 'cbs',
    cpm: '$20.97',
    marketShare: 15,
    audienceSize: 195000
  },
  {
    id: 'univision-wscz-richmond',
    name: 'WSCZ-TV',
    marketId: 'richmond-va',
    broadcasterId: 'univision',
    cpm: '$20.30',
    marketShare: 31,
    audienceSize: 403000
  },
  {
    id: 'gray-ycqp-richmond',
    name: 'YCQP-TV',
    marketId: 'richmond-va',
    broadcasterId: 'gray',
    cpm: '$19.64',
    marketShare: 33,
    audienceSize: 429000
  },
  {
    id: 'abc-zfdm-richmond',
    name: 'ZFDM-TV',
    marketId: 'richmond-va',
    broadcasterId: 'abc',
    cpm: '$20.24',
    marketShare: 22,
    audienceSize: 286000
  },
  {
    id: 'morgan-murphy-[zfx-richmond',
    name: '[ZFX-TV',
    marketId: 'richmond-va',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.56',
    marketShare: 22,
    audienceSize: 286000
  },
  {
    id: 'hubbard-broadcasting-ywzk-mobile',
    name: 'YWZK-TV',
    marketId: 'mobile-al',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.46',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'news-press-gazette-[mbk-mobile',
    name: '[MBK-TV',
    marketId: 'mobile-al',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.00',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'gray-[vjw-mobile',
    name: '[VJW-TV',
    marketId: 'mobile-al',
    broadcasterId: 'gray',
    cpm: '$21.03',
    marketShare: 18,
    audienceSize: 162000
  },
  {
    id: 'abc-zejx-mobile',
    name: 'ZEJX-TV',
    marketId: 'mobile-al',
    broadcasterId: 'abc',
    cpm: '$21.72',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'scripps-yqwd-mobile',
    name: 'YQWD-TV',
    marketId: 'mobile-al',
    broadcasterId: 'scripps',
    cpm: '$19.02',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'univision-[qpj-mobile',
    name: '[QPJ-TV',
    marketId: 'mobile-al',
    broadcasterId: 'univision',
    cpm: '$19.39',
    marketShare: 18,
    audienceSize: 162000
  },
  {
    id: 'nexstar-yuvh-little',
    name: 'YUVH-TV',
    marketId: 'little-rock-ar',
    broadcasterId: 'nexstar',
    cpm: '$20.77',
    marketShare: 31,
    audienceSize: 248000
  },
  {
    id: 'scripps-zfcx-little',
    name: 'ZFCX-TV',
    marketId: 'little-rock-ar',
    broadcasterId: 'scripps',
    cpm: '$20.22',
    marketShare: 25,
    audienceSize: 200000
  },
  {
    id: 'morgan-murphy-[clq-little',
    name: '[CLQ-TV',
    marketId: 'little-rock-ar',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.18',
    marketShare: 17,
    audienceSize: 136000
  },
  {
    id: 'gray-zehn-wilkes',
    name: 'ZEHN-TV',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'gray',
    cpm: '$19.63',
    marketShare: 31,
    audienceSize: 279000
  },
  {
    id: 'hearst-[cbv-wilkes',
    name: '[CBV-TV',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'hearst',
    cpm: '$19.56',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'morgan-murphy-xnvp-wilkes',
    name: 'XNVP-TV',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.34',
    marketShare: 34,
    audienceSize: 306000
  },
  {
    id: 'scripps-[zku-knoxville',
    name: '[ZKU-TV',
    marketId: 'knoxville-tn',
    broadcasterId: 'scripps',
    cpm: '$19.87',
    marketShare: 25,
    audienceSize: 250000
  },
  {
    id: 'abc-[vvq-knoxville',
    name: '[VVQ-TV',
    marketId: 'knoxville-tn',
    broadcasterId: 'abc',
    cpm: '$19.32',
    marketShare: 20,
    audienceSize: 200000
  },
  {
    id: 'tegna-zbie-knoxville',
    name: 'ZBIE-TV',
    marketId: 'knoxville-tn',
    broadcasterId: 'tegna',
    cpm: '$20.98',
    marketShare: 24,
    audienceSize: 240000
  },
  {
    id: 'hubbard-broadcasting-xgdn-tulsa',
    name: 'XGDN-TV',
    marketId: 'tulsa-ok',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.82',
    marketShare: 17,
    audienceSize: 170000
  },
  {
    id: 'entravision-[ibg-tulsa',
    name: '[IBG-TV',
    marketId: 'tulsa-ok',
    broadcasterId: 'entravision',
    cpm: '$19.17',
    marketShare: 23,
    audienceSize: 230000
  },
  {
    id: 'scripps-zvfo-tulsa',
    name: 'ZVFO-TV',
    marketId: 'tulsa-ok',
    broadcasterId: 'scripps',
    cpm: '$20.74',
    marketShare: 27,
    audienceSize: 270000
  },
  {
    id: 'morgan-murphy-yeoc-tulsa',
    name: 'YEOC-TV',
    marketId: 'tulsa-ok',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.63',
    marketShare: 21,
    audienceSize: 210000
  },
  {
    id: 'gray-wgxt-tulsa',
    name: 'WGXT-TV',
    marketId: 'tulsa-ok',
    broadcasterId: 'gray',
    cpm: '$19.65',
    marketShare: 31,
    audienceSize: 310000
  },
  {
    id: 'tegna-yujx-albany',
    name: 'YUJX-TV',
    marketId: 'albany-ny',
    broadcasterId: 'tegna',
    cpm: '$19.15',
    marketShare: 21,
    audienceSize: 189000
  },
  {
    id: 'cbs-zbtu-albany',
    name: 'ZBTU-TV',
    marketId: 'albany-ny',
    broadcasterId: 'cbs',
    cpm: '$19.62',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'morgan-murphy-zmrr-albany',
    name: 'ZMRR-TV',
    marketId: 'albany-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.65',
    marketShare: 33,
    audienceSize: 297000
  },
  {
    id: 'gray-xwcx-albany',
    name: 'XWCX-TV',
    marketId: 'albany-ny',
    broadcasterId: 'gray',
    cpm: '$19.43',
    marketShare: 27,
    audienceSize: 243000
  },
  {
    id: 'hubbard-broadcasting-[cgb-albany',
    name: '[CGB-TV',
    marketId: 'albany-ny',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.56',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'entravision-xahg-albany',
    name: 'XAHG-TV',
    marketId: 'albany-ny',
    broadcasterId: 'entravision',
    cpm: '$21.33',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'cbs-wplm-lexington',
    name: 'WPLM-TV',
    marketId: 'lexington-ky',
    broadcasterId: 'cbs',
    cpm: '$19.61',
    marketShare: 27,
    audienceSize: 189000
  },
  {
    id: 'abc-wcuw-lexington',
    name: 'WCUW-TV',
    marketId: 'lexington-ky',
    broadcasterId: 'abc',
    cpm: '$19.61',
    marketShare: 33,
    audienceSize: 231000
  },
  {
    id: 'hearst-yszs-lexington',
    name: 'YSZS-TV',
    marketId: 'lexington-ky',
    broadcasterId: 'hearst',
    cpm: '$21.99',
    marketShare: 29,
    audienceSize: 203000
  },
  {
    id: 'scripps-[rcj-lexington',
    name: '[RCJ-TV',
    marketId: 'lexington-ky',
    broadcasterId: 'scripps',
    cpm: '$21.99',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'scripps-ypwu-dayton',
    name: 'YPWU-TV',
    marketId: 'dayton-oh',
    broadcasterId: 'scripps',
    cpm: '$21.84',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'cbs-yjcr-dayton',
    name: 'YJCR-TV',
    marketId: 'dayton-oh',
    broadcasterId: 'cbs',
    cpm: '$20.78',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'nbc-yrdl-dayton',
    name: 'YRDL-TV',
    marketId: 'dayton-oh',
    broadcasterId: 'nbc',
    cpm: '$20.65',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'abc-[ind-tucson',
    name: '[IND-TV',
    marketId: 'tucson-az',
    broadcasterId: 'abc',
    cpm: '$20.64',
    marketShare: 32,
    audienceSize: 320000
  },
  {
    id: 'hearst-xmkk-tucson',
    name: 'XMKK-TV',
    marketId: 'tucson-az',
    broadcasterId: 'hearst',
    cpm: '$19.03',
    marketShare: 28,
    audienceSize: 280000
  },
  {
    id: 'cbs-[dbn-tucson',
    name: '[DBN-TV',
    marketId: 'tucson-az',
    broadcasterId: 'cbs',
    cpm: '$20.53',
    marketShare: 32,
    audienceSize: 320000
  },
  {
    id: 'nbc-zzrr-tucson',
    name: 'ZZRR-TV',
    marketId: 'tucson-az',
    broadcasterId: 'nbc',
    cpm: '$19.82',
    marketShare: 32,
    audienceSize: 320000
  },
  {
    id: 'morgan-murphy-yfrj-tucson',
    name: 'YFRJ-TV',
    marketId: 'tucson-az',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.10',
    marketShare: 15,
    audienceSize: 150000
  },
  {
    id: 'hearst-zzma-spokane',
    name: 'ZZMA-TV',
    marketId: 'spokane-wa',
    broadcasterId: 'hearst',
    cpm: '$20.29',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'news-press-gazette-yorj-spokane',
    name: 'YORJ-TV',
    marketId: 'spokane-wa',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.07',
    marketShare: 28,
    audienceSize: 168000
  },
  {
    id: 'gray-wbgu-spokane',
    name: 'WBGU-TV',
    marketId: 'spokane-wa',
    broadcasterId: 'gray',
    cpm: '$20.88',
    marketShare: 33,
    audienceSize: 198000
  },
  {
    id: 'hubbard-broadcasting-zilb-spokane',
    name: 'ZILB-TV',
    marketId: 'spokane-wa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.10',
    marketShare: 27,
    audienceSize: 162000
  },
  {
    id: 'morgan-murphy-wvsd-spokane',
    name: 'WVSD-TV',
    marketId: 'spokane-wa',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.49',
    marketShare: 30,
    audienceSize: 180000
  },
  {
    id: 'abc-wirf-spokane',
    name: 'WIRF-TV',
    marketId: 'spokane-wa',
    broadcasterId: 'abc',
    cpm: '$19.27',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'gray-xjvw-des',
    name: 'XJVW-TV',
    marketId: 'des-moines-ia',
    broadcasterId: 'gray',
    cpm: '$21.09',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'hearst-wirg-des',
    name: 'WIRG-TV',
    marketId: 'des-moines-ia',
    broadcasterId: 'hearst',
    cpm: '$19.71',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'nbc-[kyd-des',
    name: '[KYD-TV',
    marketId: 'des-moines-ia',
    broadcasterId: 'nbc',
    cpm: '$21.04',
    marketShare: 31,
    audienceSize: 217000
  },
  {
    id: 'morgan-murphy-zbks-des',
    name: 'ZBKS-TV',
    marketId: 'des-moines-ia',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.43',
    marketShare: 16,
    audienceSize: 112000
  },
  {
    id: 'entravision-xtnz-des',
    name: 'XTNZ-TV',
    marketId: 'des-moines-ia',
    broadcasterId: 'entravision',
    cpm: '$19.88',
    marketShare: 31,
    audienceSize: 217000
  },
  {
    id: 'scripps-xvfv-green',
    name: 'XVFV-TV',
    marketId: 'green-bay-wi',
    broadcasterId: 'scripps',
    cpm: '$21.75',
    marketShare: 15,
    audienceSize: 105000
  },
  {
    id: 'gray-[pma-green',
    name: '[PMA-TV',
    marketId: 'green-bay-wi',
    broadcasterId: 'gray',
    cpm: '$21.02',
    marketShare: 24,
    audienceSize: 168000
  },
  {
    id: 'abc-xysv-green',
    name: 'XYSV-TV',
    marketId: 'green-bay-wi',
    broadcasterId: 'abc',
    cpm: '$21.20',
    marketShare: 23,
    audienceSize: 161000
  },
  {
    id: 'tegna-xjjz-green',
    name: 'XJJZ-TV',
    marketId: 'green-bay-wi',
    broadcasterId: 'tegna',
    cpm: '$20.35',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'hearst-wbec-green',
    name: 'WBEC-TV',
    marketId: 'green-bay-wi',
    broadcasterId: 'hearst',
    cpm: '$21.49',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'cbs-yakq-green',
    name: 'YAKQ-TV',
    marketId: 'green-bay-wi',
    broadcasterId: 'cbs',
    cpm: '$20.85',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'nexstar-[sjw-honolulu',
    name: '[SJW-TV',
    marketId: 'honolulu-hi',
    broadcasterId: 'nexstar',
    cpm: '$20.07',
    marketShare: 20,
    audienceSize: 200000
  },
  {
    id: 'morgan-murphy-[med-honolulu',
    name: '[MED-TV',
    marketId: 'honolulu-hi',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.76',
    marketShare: 26,
    audienceSize: 260000
  },
  {
    id: 'univision-wusa-honolulu',
    name: 'WUSA-TV',
    marketId: 'honolulu-hi',
    broadcasterId: 'univision',
    cpm: '$21.13',
    marketShare: 28,
    audienceSize: 280000
  },
  {
    id: 'news-press-gazette-xoyf-roanoke',
    name: 'XOYF-TV',
    marketId: 'roanoke-va',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.16',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'abc-zzgl-roanoke',
    name: 'ZZGL-TV',
    marketId: 'roanoke-va',
    broadcasterId: 'abc',
    cpm: '$21.29',
    marketShare: 33,
    audienceSize: 231000
  },
  {
    id: 'entravision-zjjp-roanoke',
    name: 'ZJJP-TV',
    marketId: 'roanoke-va',
    broadcasterId: 'entravision',
    cpm: '$19.81',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'hubbard-broadcasting-wkcb-roanoke',
    name: 'WKCB-TV',
    marketId: 'roanoke-va',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.09',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'entravision-wrpu-wichita',
    name: 'WRPU-TV',
    marketId: 'wichita-ks',
    broadcasterId: 'entravision',
    cpm: '$19.51',
    marketShare: 24,
    audienceSize: 168000
  },
  {
    id: 'scripps-wcdl-wichita',
    name: 'WCDL-TV',
    marketId: 'wichita-ks',
    broadcasterId: 'scripps',
    cpm: '$21.74',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'nexstar-zwtz-wichita',
    name: 'ZWTZ-TV',
    marketId: 'wichita-ks',
    broadcasterId: 'nexstar',
    cpm: '$19.11',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'hubbard-broadcasting-yjoi-flint',
    name: 'YJOI-TV',
    marketId: 'flint-mi',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.43',
    marketShare: 34,
    audienceSize: 272000
  },
  {
    id: 'gray-[sal-flint',
    name: '[SAL-TV',
    marketId: 'flint-mi',
    broadcasterId: 'gray',
    cpm: '$20.63',
    marketShare: 16,
    audienceSize: 128000
  },
  {
    id: 'entravision-ylhg-flint',
    name: 'YLHG-TV',
    marketId: 'flint-mi',
    broadcasterId: 'entravision',
    cpm: '$21.00',
    marketShare: 27,
    audienceSize: 216000
  },
  {
    id: 'nbc-wacf-flint',
    name: 'WACF-TV',
    marketId: 'flint-mi',
    broadcasterId: 'nbc',
    cpm: '$20.37',
    marketShare: 34,
    audienceSize: 272000
  },
  {
    id: 'morgan-murphy-xsox-flint',
    name: 'XSOX-TV',
    marketId: 'flint-mi',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.18',
    marketShare: 32,
    audienceSize: 256000
  },
  {
    id: 'scripps-wjts-omaha',
    name: 'WJTS-TV',
    marketId: 'omaha-ne',
    broadcasterId: 'scripps',
    cpm: '$20.83',
    marketShare: 28,
    audienceSize: 252000
  },
  {
    id: 'abc-wtye-omaha',
    name: 'WTYE-TV',
    marketId: 'omaha-ne',
    broadcasterId: 'abc',
    cpm: '$20.53',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'univision-wkni-omaha',
    name: 'WKNI-TV',
    marketId: 'omaha-ne',
    broadcasterId: 'univision',
    cpm: '$21.81',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'cbs-xhmw-omaha',
    name: 'XHMW-TV',
    marketId: 'omaha-ne',
    broadcasterId: 'cbs',
    cpm: '$19.18',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'abc-xonq-springfield',
    name: 'XONQ-TV',
    marketId: 'springfield-mo',
    broadcasterId: 'abc',
    cpm: '$21.56',
    marketShare: 32,
    audienceSize: 160000
  },
  {
    id: 'gray-zaao-springfield',
    name: 'ZAAO-TV',
    marketId: 'springfield-mo',
    broadcasterId: 'gray',
    cpm: '$21.14',
    marketShare: 20,
    audienceSize: 100000
  },
  {
    id: 'tegna-[pzj-springfield',
    name: '[PZJ-TV',
    marketId: 'springfield-mo',
    broadcasterId: 'tegna',
    cpm: '$21.40',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'hearst-xxeh-springfield',
    name: 'XXEH-TV',
    marketId: 'springfield-mo',
    broadcasterId: 'hearst',
    cpm: '$19.86',
    marketShare: 32,
    audienceSize: 160000
  },
  {
    id: 'scripps-wifh-springfield',
    name: 'WIFH-TV',
    marketId: 'springfield-mo',
    broadcasterId: 'scripps',
    cpm: '$21.60',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'hearst-xhbe-huntsville',
    name: 'XHBE-TV',
    marketId: 'huntsville-al',
    broadcasterId: 'hearst',
    cpm: '$19.31',
    marketShare: 30,
    audienceSize: 240000
  },
  {
    id: 'news-press-gazette-xutz-huntsville',
    name: 'XUTZ-TV',
    marketId: 'huntsville-al',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.72',
    marketShare: 28,
    audienceSize: 224000
  },
  {
    id: 'univision-xkrw-huntsville',
    name: 'XKRW-TV',
    marketId: 'huntsville-al',
    broadcasterId: 'univision',
    cpm: '$20.20',
    marketShare: 31,
    audienceSize: 248000
  },
  {
    id: 'scripps-[bnk-huntsville',
    name: '[BNK-TV',
    marketId: 'huntsville-al',
    broadcasterId: 'scripps',
    cpm: '$20.38',
    marketShare: 30,
    audienceSize: 240000
  },
  {
    id: 'hubbard-broadcasting-wgti-huntsville',
    name: 'WGTI-TV',
    marketId: 'huntsville-al',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.50',
    marketShare: 27,
    audienceSize: 216000
  },
  {
    id: 'abc-xtvj-columbia',
    name: 'XTVJ-TV',
    marketId: 'columbia-sc',
    broadcasterId: 'abc',
    cpm: '$19.76',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'scripps-wjop-columbia',
    name: 'WJOP-TV',
    marketId: 'columbia-sc',
    broadcasterId: 'scripps',
    cpm: '$19.41',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'hearst-wddn-columbia',
    name: 'WDDN-TV',
    marketId: 'columbia-sc',
    broadcasterId: 'hearst',
    cpm: '$21.23',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'gray-yzni-columbia',
    name: 'YZNI-TV',
    marketId: 'columbia-sc',
    broadcasterId: 'gray',
    cpm: '$21.16',
    marketShare: 16,
    audienceSize: 144000
  },
  {
    id: 'tegna-xfpw-columbia',
    name: 'XFPW-TV',
    marketId: 'columbia-sc',
    broadcasterId: 'tegna',
    cpm: '$20.11',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'news-press-gazette-xcwr-columbia',
    name: 'XCWR-TV',
    marketId: 'columbia-sc',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.26',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'tegna-zxqb-madison',
    name: 'ZXQB-TV',
    marketId: 'madison-wi',
    broadcasterId: 'tegna',
    cpm: '$21.43',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'hearst-yfkk-madison',
    name: 'YFKK-TV',
    marketId: 'madison-wi',
    broadcasterId: 'hearst',
    cpm: '$19.75',
    marketShare: 29,
    audienceSize: 203000
  },
  {
    id: 'nbc-wzce-madison',
    name: 'WZCE-TV',
    marketId: 'madison-wi',
    broadcasterId: 'nbc',
    cpm: '$20.29',
    marketShare: 25,
    audienceSize: 175000
  },
  {
    id: 'news-press-gazette-yrry-madison',
    name: 'YRRY-TV',
    marketId: 'madison-wi',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.31',
    marketShare: 30,
    audienceSize: 210000
  },
  {
    id: 'gray-zmgb-madison',
    name: 'ZMGB-TV',
    marketId: 'madison-wi',
    broadcasterId: 'gray',
    cpm: '$21.93',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'scripps-[qcx-portland',
    name: '[QCX-TV',
    marketId: 'portland-me',
    broadcasterId: 'scripps',
    cpm: '$20.16',
    marketShare: 16,
    audienceSize: 80000
  },
  {
    id: 'tegna-xfhw-portland',
    name: 'XFHW-TV',
    marketId: 'portland-me',
    broadcasterId: 'tegna',
    cpm: '$19.26',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'abc-weqm-portland',
    name: 'WEQM-TV',
    marketId: 'portland-me',
    broadcasterId: 'abc',
    cpm: '$20.94',
    marketShare: 33,
    audienceSize: 165000
  },
  {
    id: 'entravision-zgod-portland',
    name: 'ZGOD-TV',
    marketId: 'portland-me',
    broadcasterId: 'entravision',
    cpm: '$20.01',
    marketShare: 22,
    audienceSize: 110000
  },
  {
    id: 'hearst-zxyf-portland',
    name: 'ZXYF-TV',
    marketId: 'portland-me',
    broadcasterId: 'hearst',
    cpm: '$20.28',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'news-press-gazette-[iss-portland',
    name: '[ISS-TV',
    marketId: 'portland-me',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.28',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'abc-ydsa-rochester',
    name: 'YDSA-TV',
    marketId: 'rochester-ny',
    broadcasterId: 'abc',
    cpm: '$19.16',
    marketShare: 27,
    audienceSize: 270000
  },
  {
    id: 'cbs-[mrn-rochester',
    name: '[MRN-TV',
    marketId: 'rochester-ny',
    broadcasterId: 'cbs',
    cpm: '$19.60',
    marketShare: 16,
    audienceSize: 160000
  },
  {
    id: 'nexstar-yztk-rochester',
    name: 'YZTK-TV',
    marketId: 'rochester-ny',
    broadcasterId: 'nexstar',
    cpm: '$21.22',
    marketShare: 32,
    audienceSize: 320000
  },
  {
    id: 'morgan-murphy-zcpg-rochester',
    name: 'ZCPG-TV',
    marketId: 'rochester-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.62',
    marketShare: 18,
    audienceSize: 180000
  },
  {
    id: 'morgan-murphy-wqez-harlingen',
    name: 'WQEZ-TV',
    marketId: 'harlingen-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.22',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'hubbard-broadcasting-zrsd-harlingen',
    name: 'ZRSD-TV',
    marketId: 'harlingen-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.03',
    marketShare: 27,
    audienceSize: 243000
  },
  {
    id: 'univision-wtlu-harlingen',
    name: 'WTLU-TV',
    marketId: 'harlingen-tx',
    broadcasterId: 'univision',
    cpm: '$19.76',
    marketShare: 28,
    audienceSize: 252000
  },
  {
    id: 'nexstar-[urd-harlingen',
    name: '[URD-TV',
    marketId: 'harlingen-tx',
    broadcasterId: 'nexstar',
    cpm: '$20.82',
    marketShare: 20,
    audienceSize: 180000
  },
  {
    id: 'nbc-yhrs-harlingen',
    name: 'YHRS-TV',
    marketId: 'harlingen-tx',
    broadcasterId: 'nbc',
    cpm: '$21.50',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'hearst-xhfq-toledo',
    name: 'XHFQ-TV',
    marketId: 'toledo-oh',
    broadcasterId: 'hearst',
    cpm: '$20.41',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'abc-wzgz-toledo',
    name: 'WZGZ-TV',
    marketId: 'toledo-oh',
    broadcasterId: 'abc',
    cpm: '$21.25',
    marketShare: 21,
    audienceSize: 147000
  },
  {
    id: 'univision-wxhw-toledo',
    name: 'WXHW-TV',
    marketId: 'toledo-oh',
    broadcasterId: 'univision',
    cpm: '$21.55',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'hubbard-broadcasting-xedq-toledo',
    name: 'XEDQ-TV',
    marketId: 'toledo-oh',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.37',
    marketShare: 30,
    audienceSize: 210000
  },
  {
    id: 'tegna-xhfy-toledo',
    name: 'XHFY-TV',
    marketId: 'toledo-oh',
    broadcasterId: 'tegna',
    cpm: '$19.78',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'gray-wbel-toledo',
    name: 'WBEL-TV',
    marketId: 'toledo-oh',
    broadcasterId: 'gray',
    cpm: '$19.26',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'hubbard-broadcasting-[lpe-charleston',
    name: '[LPE-TV',
    marketId: 'charleston-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.15',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'gray-xrtb-charleston',
    name: 'XRTB-TV',
    marketId: 'charleston-wv',
    broadcasterId: 'gray',
    cpm: '$20.24',
    marketShare: 18,
    audienceSize: 126000
  },
  {
    id: 'nbc-xplj-charleston',
    name: 'XPLJ-TV',
    marketId: 'charleston-wv',
    broadcasterId: 'nbc',
    cpm: '$19.60',
    marketShare: 29,
    audienceSize: 203000
  },
  {
    id: 'nexstar-wlwu-charleston',
    name: 'WLWU-TV',
    marketId: 'charleston-wv',
    broadcasterId: 'nexstar',
    cpm: '$19.98',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'scripps-zblp-charleston',
    name: 'ZBLP-TV',
    marketId: 'charleston-wv',
    broadcasterId: 'scripps',
    cpm: '$19.89',
    marketShare: 18,
    audienceSize: 126000
  },
  {
    id: 'entravision-zxbt-charleston',
    name: 'ZXBT-TV',
    marketId: 'charleston-wv',
    broadcasterId: 'entravision',
    cpm: '$20.08',
    marketShare: 16,
    audienceSize: 112000
  },
  {
    id: 'news-press-gazette-ycia-waco',
    name: 'YCIA-TV',
    marketId: 'waco-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.37',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'morgan-murphy-zobe-waco',
    name: 'ZOBE-TV',
    marketId: 'waco-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.92',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'nbc-wucm-waco',
    name: 'WUCM-TV',
    marketId: 'waco-tx',
    broadcasterId: 'nbc',
    cpm: '$19.74',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'gray-yhzt-waco',
    name: 'YHZT-TV',
    marketId: 'waco-tx',
    broadcasterId: 'gray',
    cpm: '$21.05',
    marketShare: 21,
    audienceSize: 126000
  },
  {
    id: 'entravision-ybrf-savannah',
    name: 'YBRF-TV',
    marketId: 'savannah-ga',
    broadcasterId: 'entravision',
    cpm: '$20.94',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'nbc-xjcd-savannah',
    name: 'XJCD-TV',
    marketId: 'savannah-ga',
    broadcasterId: 'nbc',
    cpm: '$19.99',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'cbs-zgxk-savannah',
    name: 'ZGXK-TV',
    marketId: 'savannah-ga',
    broadcasterId: 'cbs',
    cpm: '$20.46',
    marketShare: 20,
    audienceSize: 100000
  },
  {
    id: 'hubbard-broadcasting-ycii-savannah',
    name: 'YCII-TV',
    marketId: 'savannah-ga',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.76',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'news-press-gazette-[uae-savannah',
    name: '[UAE-TV',
    marketId: 'savannah-ga',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.72',
    marketShare: 16,
    audienceSize: 80000
  },
  {
    id: 'nexstar-zcvx-charleston',
    name: 'ZCVX-TV',
    marketId: 'charleston-sc',
    broadcasterId: 'nexstar',
    cpm: '$21.81',
    marketShare: 31,
    audienceSize: 248000
  },
  {
    id: 'univision-wfps-charleston',
    name: 'WFPS-TV',
    marketId: 'charleston-sc',
    broadcasterId: 'univision',
    cpm: '$19.16',
    marketShare: 20,
    audienceSize: 160000
  },
  {
    id: 'abc-wjvn-charleston',
    name: 'WJVN-TV',
    marketId: 'charleston-sc',
    broadcasterId: 'abc',
    cpm: '$20.80',
    marketShare: 22,
    audienceSize: 176000
  },
  {
    id: 'hearst-wkdo-charleston',
    name: 'WKDO-TV',
    marketId: 'charleston-sc',
    broadcasterId: 'hearst',
    cpm: '$20.67',
    marketShare: 16,
    audienceSize: 128000
  },
  {
    id: 'news-press-gazette-zzvx-charleston',
    name: 'ZZVX-TV',
    marketId: 'charleston-sc',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.47',
    marketShare: 29,
    audienceSize: 231999
  },
  {
    id: 'scripps-xjoo-chattanooga',
    name: 'XJOO-TV',
    marketId: 'chattanooga-tn',
    broadcasterId: 'scripps',
    cpm: '$21.41',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'univision-ydmr-chattanooga',
    name: 'YDMR-TV',
    marketId: 'chattanooga-tn',
    broadcasterId: 'univision',
    cpm: '$21.09',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'nbc-wtja-chattanooga',
    name: 'WTJA-TV',
    marketId: 'chattanooga-tn',
    broadcasterId: 'nbc',
    cpm: '$21.29',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'hubbard-broadcasting-[wji-chattanooga',
    name: '[WJI-TV',
    marketId: 'chattanooga-tn',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.96',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'hearst-wtqr-colorado',
    name: 'WTQR-TV',
    marketId: 'colorado-springs-co',
    broadcasterId: 'hearst',
    cpm: '$21.33',
    marketShare: 19,
    audienceSize: 152000
  },
  {
    id: 'scripps-znaz-colorado',
    name: 'ZNAZ-TV',
    marketId: 'colorado-springs-co',
    broadcasterId: 'scripps',
    cpm: '$21.91',
    marketShare: 17,
    audienceSize: 136000
  },
  {
    id: 'nexstar-wvwg-colorado',
    name: 'WVWG-TV',
    marketId: 'colorado-springs-co',
    broadcasterId: 'nexstar',
    cpm: '$19.40',
    marketShare: 21,
    audienceSize: 168000
  },
  {
    id: 'gray-wmpv-colorado',
    name: 'WMPV-TV',
    marketId: 'colorado-springs-co',
    broadcasterId: 'gray',
    cpm: '$21.71',
    marketShare: 23,
    audienceSize: 184000
  },
  {
    id: 'nbc-wahu-colorado',
    name: 'WAHU-TV',
    marketId: 'colorado-springs-co',
    broadcasterId: 'nbc',
    cpm: '$19.70',
    marketShare: 16,
    audienceSize: 128000
  },
  {
    id: 'gray-[usq-syracuse',
    name: '[USQ-TV',
    marketId: 'syracuse-ny',
    broadcasterId: 'gray',
    cpm: '$21.17',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'nexstar-xxhe-syracuse',
    name: 'XXHE-TV',
    marketId: 'syracuse-ny',
    broadcasterId: 'nexstar',
    cpm: '$19.70',
    marketShare: 27,
    audienceSize: 189000
  },
  {
    id: 'morgan-murphy-zbiz-syracuse',
    name: 'ZBIZ-TV',
    marketId: 'syracuse-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.08',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'univision-yrre-syracuse',
    name: 'YRRE-TV',
    marketId: 'syracuse-ny',
    broadcasterId: 'univision',
    cpm: '$20.76',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'news-press-gazette-zvdf-syracuse',
    name: 'ZVDF-TV',
    marketId: 'syracuse-ny',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.05',
    marketShare: 28,
    audienceSize: 196000
  },
  {
    id: 'hearst-xqcm-syracuse',
    name: 'XQCM-TV',
    marketId: 'syracuse-ny',
    broadcasterId: 'hearst',
    cpm: '$19.25',
    marketShare: 29,
    audienceSize: 203000
  },
  {
    id: 'abc-wnms-el',
    name: 'WNMS-TV',
    marketId: 'el-paso-tx',
    broadcasterId: 'abc',
    cpm: '$20.61',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'scripps-wach-el',
    name: 'WACH-TV',
    marketId: 'el-paso-tx',
    broadcasterId: 'scripps',
    cpm: '$20.85',
    marketShare: 33,
    audienceSize: 297000
  },
  {
    id: 'nexstar-xlte-el',
    name: 'XLTE-TV',
    marketId: 'el-paso-tx',
    broadcasterId: 'nexstar',
    cpm: '$19.66',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'univision-zcbp-el',
    name: 'ZCBP-TV',
    marketId: 'el-paso-tx',
    broadcasterId: 'univision',
    cpm: '$20.30',
    marketShare: 20,
    audienceSize: 180000
  },
  {
    id: 'tegna-wvrk-el',
    name: 'WVRK-TV',
    marketId: 'el-paso-tx',
    broadcasterId: 'tegna',
    cpm: '$20.33',
    marketShare: 16,
    audienceSize: 144000
  },
  {
    id: 'gray-ylyp-paducah',
    name: 'YLYP-TV',
    marketId: 'paducah-ky',
    broadcasterId: 'gray',
    cpm: '$21.39',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'nexstar-[dzh-paducah',
    name: '[DZH-TV',
    marketId: 'paducah-ky',
    broadcasterId: 'nexstar',
    cpm: '$19.37',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'hubbard-broadcasting-xupw-paducah',
    name: 'XUPW-TV',
    marketId: 'paducah-ky',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.89',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'abc-zgrv-shreveport',
    name: 'ZGRV-TV',
    marketId: 'shreveport-la',
    broadcasterId: 'abc',
    cpm: '$19.22',
    marketShare: 19,
    audienceSize: 114000
  },
  {
    id: 'gray-ytfs-shreveport',
    name: 'YTFS-TV',
    marketId: 'shreveport-la',
    broadcasterId: 'gray',
    cpm: '$19.11',
    marketShare: 20,
    audienceSize: 120000
  },
  {
    id: 'tegna-[jep-shreveport',
    name: '[JEP-TV',
    marketId: 'shreveport-la',
    broadcasterId: 'tegna',
    cpm: '$19.57',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'entravision-ztpm-shreveport',
    name: 'ZTPM-TV',
    marketId: 'shreveport-la',
    broadcasterId: 'entravision',
    cpm: '$21.15',
    marketShare: 26,
    audienceSize: 156000
  },
  {
    id: 'hearst-[eva-shreveport',
    name: '[EVA-TV',
    marketId: 'shreveport-la',
    broadcasterId: 'hearst',
    cpm: '$19.77',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'cbs-yyvz-champaign',
    name: 'YYVZ-TV',
    marketId: 'champaign-il',
    broadcasterId: 'cbs',
    cpm: '$20.41',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'scripps-wmwq-champaign',
    name: 'WMWQ-TV',
    marketId: 'champaign-il',
    broadcasterId: 'scripps',
    cpm: '$19.63',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'gray-zebc-champaign',
    name: 'ZEBC-TV',
    marketId: 'champaign-il',
    broadcasterId: 'gray',
    cpm: '$19.28',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'morgan-murphy-xkrc-champaign',
    name: 'XKRC-TV',
    marketId: 'champaign-il',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.32',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'abc-yjvz-champaign',
    name: 'YJVZ-TV',
    marketId: 'champaign-il',
    broadcasterId: 'abc',
    cpm: '$19.70',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'tegna-wamp-burlington',
    name: 'WAMP-TV',
    marketId: 'burlington-vt',
    broadcasterId: 'tegna',
    cpm: '$21.85',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'nbc-zily-burlington',
    name: 'ZILY-TV',
    marketId: 'burlington-vt',
    broadcasterId: 'nbc',
    cpm: '$21.03',
    marketShare: 15,
    audienceSize: 75000
  },
  {
    id: 'scripps-wiuv-burlington',
    name: 'WIUV-TV',
    marketId: 'burlington-vt',
    broadcasterId: 'scripps',
    cpm: '$21.86',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'univision-ywpq-burlington',
    name: 'YWPQ-TV',
    marketId: 'burlington-vt',
    broadcasterId: 'univision',
    cpm: '$21.94',
    marketShare: 32,
    audienceSize: 160000
  },
  {
    id: 'hearst-[vmw-burlington',
    name: '[VMW-TV',
    marketId: 'burlington-vt',
    broadcasterId: 'hearst',
    cpm: '$21.34',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'entravision-xxta-burlington',
    name: 'XXTA-TV',
    marketId: 'burlington-vt',
    broadcasterId: 'entravision',
    cpm: '$20.78',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'abc-xevo-cedar',
    name: 'XEVO-TV',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'abc',
    cpm: '$21.73',
    marketShare: 18,
    audienceSize: 144000
  },
  {
    id: 'gray-zcbh-cedar',
    name: 'ZCBH-TV',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'gray',
    cpm: '$20.50',
    marketShare: 28,
    audienceSize: 224000
  },
  {
    id: 'news-press-gazette-wccf-cedar',
    name: 'WCCF-TV',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.44',
    marketShare: 34,
    audienceSize: 272000
  },
  {
    id: 'tegna-[nib-cedar',
    name: '[NIB-TV',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'tegna',
    cpm: '$20.65',
    marketShare: 23,
    audienceSize: 184000
  },
  {
    id: 'gray-xwfw-baton',
    name: 'XWFW-TV',
    marketId: 'baton-rouge-la',
    broadcasterId: 'gray',
    cpm: '$21.48',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'tegna-wolj-baton',
    name: 'WOLJ-TV',
    marketId: 'baton-rouge-la',
    broadcasterId: 'tegna',
    cpm: '$19.03',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'abc-xxfm-baton',
    name: 'XXFM-TV',
    marketId: 'baton-rouge-la',
    broadcasterId: 'abc',
    cpm: '$20.70',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'hearst-webh-baton',
    name: 'WEBH-TV',
    marketId: 'baton-rouge-la',
    broadcasterId: 'hearst',
    cpm: '$19.58',
    marketShare: 31,
    audienceSize: 279000
  },
  {
    id: 'cbs-wsng-baton',
    name: 'WSNG-TV',
    marketId: 'baton-rouge-la',
    broadcasterId: 'cbs',
    cpm: '$21.73',
    marketShare: 15,
    audienceSize: 135000
  },
  {
    id: 'nbc-zwry-baton',
    name: 'ZWRY-TV',
    marketId: 'baton-rouge-la',
    broadcasterId: 'nbc',
    cpm: '$20.07',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'abc-xdqz-ft',
    name: 'XDQZ-TV',
    marketId: 'ft-smith-ar',
    broadcasterId: 'abc',
    cpm: '$21.08',
    marketShare: 27,
    audienceSize: 162000
  },
  {
    id: 'cbs-wrjx-ft',
    name: 'WRJX-TV',
    marketId: 'ft-smith-ar',
    broadcasterId: 'cbs',
    cpm: '$20.20',
    marketShare: 18,
    audienceSize: 108000
  },
  {
    id: 'morgan-murphy-wdld-ft',
    name: 'WDLD-TV',
    marketId: 'ft-smith-ar',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.37',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'hearst-xuiy-ft',
    name: 'XUIY-TV',
    marketId: 'ft-smith-ar',
    broadcasterId: 'hearst',
    cpm: '$20.06',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'scripps-xumo-ft',
    name: 'XUMO-TV',
    marketId: 'ft-smith-ar',
    broadcasterId: 'scripps',
    cpm: '$19.91',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'entravision-[kgs-ft',
    name: '[KGS-TV',
    marketId: 'ft-smith-ar',
    broadcasterId: 'entravision',
    cpm: '$21.21',
    marketShare: 32,
    audienceSize: 192000
  },
  {
    id: 'scripps-zard-myrtle',
    name: 'ZARD-TV',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'scripps',
    cpm: '$20.12',
    marketShare: 30,
    audienceSize: 180000
  },
  {
    id: 'entravision-waph-myrtle',
    name: 'WAPH-TV',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'entravision',
    cpm: '$20.76',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'nbc-xsyx-myrtle',
    name: 'XSYX-TV',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'nbc',
    cpm: '$19.65',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'hubbard-broadcasting-[itj-myrtle',
    name: '[ITJ-TV',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.19',
    marketShare: 22,
    audienceSize: 132000
  },
  {
    id: 'gray-ywea-myrtle',
    name: 'YWEA-TV',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'gray',
    cpm: '$20.10',
    marketShare: 17,
    audienceSize: 102000
  },
  {
    id: 'scripps-[wvq-boise',
    name: '[WVQ-TV',
    marketId: 'boise-id',
    broadcasterId: 'scripps',
    cpm: '$19.45',
    marketShare: 15,
    audienceSize: 105000
  },
  {
    id: 'univision-yvvn-boise',
    name: 'YVVN-TV',
    marketId: 'boise-id',
    broadcasterId: 'univision',
    cpm: '$19.10',
    marketShare: 26,
    audienceSize: 182000
  },
  {
    id: 'hearst-wbcb-boise',
    name: 'WBCB-TV',
    marketId: 'boise-id',
    broadcasterId: 'hearst',
    cpm: '$20.23',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'nexstar-wjhd-boise',
    name: 'WJHD-TV',
    marketId: 'boise-id',
    broadcasterId: 'nexstar',
    cpm: '$20.78',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'tegna-wikq-jackson',
    name: 'WIKQ-TV',
    marketId: 'jackson-ms',
    broadcasterId: 'tegna',
    cpm: '$20.98',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'nbc-zjtw-jackson',
    name: 'ZJTW-TV',
    marketId: 'jackson-ms',
    broadcasterId: 'nbc',
    cpm: '$20.80',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'univision-[nhq-jackson',
    name: '[NHQ-TV',
    marketId: 'jackson-ms',
    broadcasterId: 'univision',
    cpm: '$21.80',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'scripps-wkcz-jackson',
    name: 'WKCZ-TV',
    marketId: 'jackson-ms',
    broadcasterId: 'scripps',
    cpm: '$19.80',
    marketShare: 27,
    audienceSize: 162000
  },
  {
    id: 'nbc-zluo-south',
    name: 'ZLUO-TV',
    marketId: 'south-bend-in',
    broadcasterId: 'nbc',
    cpm: '$21.34',
    marketShare: 27,
    audienceSize: 189000
  },
  {
    id: 'scripps-xucr-south',
    name: 'XUCR-TV',
    marketId: 'south-bend-in',
    broadcasterId: 'scripps',
    cpm: '$19.70',
    marketShare: 24,
    audienceSize: 168000
  },
  {
    id: 'tegna-zpnl-south',
    name: 'ZPNL-TV',
    marketId: 'south-bend-in',
    broadcasterId: 'tegna',
    cpm: '$21.30',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'morgan-murphy-xfjv-south',
    name: 'XFJV-TV',
    marketId: 'south-bend-in',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.57',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'cbs-xqgn-south',
    name: 'XQGN-TV',
    marketId: 'south-bend-in',
    broadcasterId: 'cbs',
    cpm: '$19.65',
    marketShare: 33,
    audienceSize: 231000
  },
  {
    id: 'abc-[hxf-tri',
    name: '[HXF-TV',
    marketId: 'tri-cities-tn',
    broadcasterId: 'abc',
    cpm: '$19.57',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'news-press-gazette-yhkk-tri',
    name: 'YHKK-TV',
    marketId: 'tri-cities-tn',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.49',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'entravision-xdya-tri',
    name: 'XDYA-TV',
    marketId: 'tri-cities-tn',
    broadcasterId: 'entravision',
    cpm: '$17.72',
    marketShare: 22,
    audienceSize: 110000
  },
  {
    id: 'abc-ypyz-greenville',
    name: 'YPYZ-TV',
    marketId: 'greenville-nc',
    broadcasterId: 'abc',
    cpm: '$19.99',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'scripps-ykns-greenville',
    name: 'YKNS-TV',
    marketId: 'greenville-nc',
    broadcasterId: 'scripps',
    cpm: '$18.09',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'hubbard-broadcasting-ywut-greenville',
    name: 'YWUT-TV',
    marketId: 'greenville-nc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.21',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'nexstar-wiar-greenville',
    name: 'WIAR-TV',
    marketId: 'greenville-nc',
    broadcasterId: 'nexstar',
    cpm: '$18.49',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'morgan-murphy-yinx-greenville',
    name: 'YINX-TV',
    marketId: 'greenville-nc',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.43',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'nbc-[jhz-greenville',
    name: '[JHZ-TV',
    marketId: 'greenville-nc',
    broadcasterId: 'nbc',
    cpm: '$17.00',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'gray-zhbg-reno',
    name: 'ZHBG-TV',
    marketId: 'reno-nv',
    broadcasterId: 'gray',
    cpm: '$17.27',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'hubbard-broadcasting-ytxb-reno',
    name: 'YTXB-TV',
    marketId: 'reno-nv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.23',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'scripps-xfji-reno',
    name: 'XFJI-TV',
    marketId: 'reno-nv',
    broadcasterId: 'scripps',
    cpm: '$17.41',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'morgan-murphy-ysgt-reno',
    name: 'YSGT-TV',
    marketId: 'reno-nv',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.06',
    marketShare: 22,
    audienceSize: 110000
  },
  {
    id: 'abc-[yri-davenport',
    name: '[YRI-TV',
    marketId: 'davenport-ia',
    broadcasterId: 'abc',
    cpm: '$17.68',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'nbc-xgxg-davenport',
    name: 'XGXG-TV',
    marketId: 'davenport-ia',
    broadcasterId: 'nbc',
    cpm: '$19.93',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'hubbard-broadcasting-wygb-davenport',
    name: 'WYGB-TV',
    marketId: 'davenport-ia',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.65',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'entravision-yvba-davenport',
    name: 'YVBA-TV',
    marketId: 'davenport-ia',
    broadcasterId: 'entravision',
    cpm: '$17.42',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'entravision-[rfx-tallahassee',
    name: '[RFX-TV',
    marketId: 'tallahassee-fl',
    broadcasterId: 'entravision',
    cpm: '$18.68',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'nexstar-[uuj-tallahassee',
    name: '[UUJ-TV',
    marketId: 'tallahassee-fl',
    broadcasterId: 'nexstar',
    cpm: '$19.62',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'cbs-yiil-tallahassee',
    name: 'YIIL-TV',
    marketId: 'tallahassee-fl',
    broadcasterId: 'cbs',
    cpm: '$19.37',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'hearst-ybye-tallahassee',
    name: 'YBYE-TV',
    marketId: 'tallahassee-fl',
    broadcasterId: 'hearst',
    cpm: '$17.45',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'morgan-murphy-yzkg-tallahassee',
    name: 'YZKG-TV',
    marketId: 'tallahassee-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.79',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'news-press-gazette-xbtr-tallahassee',
    name: 'XBTR-TV',
    marketId: 'tallahassee-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.38',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'news-press-gazette-ydjq-tyler',
    name: 'YDJQ-TV',
    marketId: 'tyler-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.69',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'hubbard-broadcasting-[qto-tyler',
    name: '[QTO-TV',
    marketId: 'tyler-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.51',
    marketShare: 21,
    audienceSize: 126000
  },
  {
    id: 'abc-xdqo-tyler',
    name: 'XDQO-TV',
    marketId: 'tyler-tx',
    broadcasterId: 'abc',
    cpm: '$18.57',
    marketShare: 22,
    audienceSize: 132000
  },
  {
    id: 'univision-[jnw-tyler',
    name: '[JNW-TV',
    marketId: 'tyler-tx',
    broadcasterId: 'univision',
    cpm: '$19.98',
    marketShare: 26,
    audienceSize: 156000
  },
  {
    id: 'cbs-xzze-tyler',
    name: 'XZZE-TV',
    marketId: 'tyler-tx',
    broadcasterId: 'cbs',
    cpm: '$17.97',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'news-press-gazette-xvxw-lincoln',
    name: 'XVXW-TV',
    marketId: 'lincoln-ne',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.80',
    marketShare: 20,
    audienceSize: 120000
  },
  {
    id: 'nexstar-[ima-lincoln',
    name: '[IMA-TV',
    marketId: 'lincoln-ne',
    broadcasterId: 'nexstar',
    cpm: '$18.76',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'gray-[fhs-lincoln',
    name: '[FHS-TV',
    marketId: 'lincoln-ne',
    broadcasterId: 'gray',
    cpm: '$19.02',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'hearst-xplm-lincoln',
    name: 'XPLM-TV',
    marketId: 'lincoln-ne',
    broadcasterId: 'hearst',
    cpm: '$17.81',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'abc-wvep-augusta',
    name: 'WVEP-TV',
    marketId: 'augusta-ga',
    broadcasterId: 'abc',
    cpm: '$17.80',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'morgan-murphy-yigv-augusta',
    name: 'YIGV-TV',
    marketId: 'augusta-ga',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.79',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'tegna-yrmq-augusta',
    name: 'YRMQ-TV',
    marketId: 'augusta-ga',
    broadcasterId: 'tegna',
    cpm: '$18.54',
    marketShare: 22,
    audienceSize: 132000
  },
  {
    id: 'cbs-xvdh-augusta',
    name: 'XVDH-TV',
    marketId: 'augusta-ga',
    broadcasterId: 'cbs',
    cpm: '$17.10',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'nbc-ysjg-augusta',
    name: 'YSJG-TV',
    marketId: 'augusta-ga',
    broadcasterId: 'nbc',
    cpm: '$19.19',
    marketShare: 17,
    audienceSize: 102000
  },
  {
    id: 'nbc-xfnv-evansville',
    name: 'XFNV-TV',
    marketId: 'evansville-in',
    broadcasterId: 'nbc',
    cpm: '$19.02',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'news-press-gazette-[yrk-evansville',
    name: '[YRK-TV',
    marketId: 'evansville-in',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.17',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'morgan-murphy-wdpv-evansville',
    name: 'WDPV-TV',
    marketId: 'evansville-in',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.51',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'univision-xiwb-evansville',
    name: 'XIWB-TV',
    marketId: 'evansville-in',
    broadcasterId: 'univision',
    cpm: '$18.38',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'hubbard-broadcasting-zozt-evansville',
    name: 'ZOZT-TV',
    marketId: 'evansville-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.35',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'hearst-zojt-ft',
    name: 'ZOJT-TV',
    marketId: 'ft-wayne-in',
    broadcasterId: 'hearst',
    cpm: '$18.63',
    marketShare: 25,
    audienceSize: 150000
  },
  {
    id: 'nbc-ybie-ft',
    name: 'YBIE-TV',
    marketId: 'ft-wayne-in',
    broadcasterId: 'nbc',
    cpm: '$17.34',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'morgan-murphy-[urw-ft',
    name: '[URW-TV',
    marketId: 'ft-wayne-in',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.46',
    marketShare: 27,
    audienceSize: 162000
  },
  {
    id: 'tegna-ykrc-sioux',
    name: 'YKRC-TV',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'tegna',
    cpm: '$19.70',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'abc-[gqk-sioux',
    name: '[GQK-TV',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'abc',
    cpm: '$19.32',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'hubbard-broadcasting-xtrj-sioux',
    name: 'XTRJ-TV',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.39',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'univision-wrqc-sioux',
    name: 'WRQC-TV',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'univision',
    cpm: '$18.24',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'nbc-wvst-johnstown',
    name: 'WVST-TV',
    marketId: 'johnstown-pa',
    broadcasterId: 'nbc',
    cpm: '$18.09',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'cbs-[chs-johnstown',
    name: '[CHS-TV',
    marketId: 'johnstown-pa',
    broadcasterId: 'cbs',
    cpm: '$17.62',
    marketShare: 32,
    audienceSize: 160000
  },
  {
    id: 'hubbard-broadcasting-xenf-johnstown',
    name: 'XENF-TV',
    marketId: 'johnstown-pa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.54',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'univision-zahz-johnstown',
    name: 'ZAHZ-TV',
    marketId: 'johnstown-pa',
    broadcasterId: 'univision',
    cpm: '$17.45',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'nexstar-[kkl-johnstown',
    name: '[KKL-TV',
    marketId: 'johnstown-pa',
    broadcasterId: 'nexstar',
    cpm: '$19.63',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'tegna-zozr-johnstown',
    name: 'ZOZR-TV',
    marketId: 'johnstown-pa',
    broadcasterId: 'tegna',
    cpm: '$18.65',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'nbc-yryz-fargo',
    name: 'YRYZ-TV',
    marketId: 'fargo-nd',
    broadcasterId: 'nbc',
    cpm: '$19.03',
    marketShare: 30,
    audienceSize: 120000
  },
  {
    id: 'news-press-gazette-xxpb-fargo',
    name: 'XXPB-TV',
    marketId: 'fargo-nd',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.26',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'gray-xbyk-fargo',
    name: 'XBYK-TV',
    marketId: 'fargo-nd',
    broadcasterId: 'gray',
    cpm: '$19.22',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'nexstar-yusz-fargo',
    name: 'YUSZ-TV',
    marketId: 'fargo-nd',
    broadcasterId: 'nexstar',
    cpm: '$17.91',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'scripps-yevg-fargo',
    name: 'YEVG-TV',
    marketId: 'fargo-nd',
    broadcasterId: 'scripps',
    cpm: '$17.53',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'tegna-wiqp-fargo',
    name: 'WIQP-TV',
    marketId: 'fargo-nd',
    broadcasterId: 'tegna',
    cpm: '$18.02',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'tegna-zrxr-yakima',
    name: 'ZRXR-TV',
    marketId: 'yakima-wa',
    broadcasterId: 'tegna',
    cpm: '$19.23',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'cbs-xqqo-yakima',
    name: 'XQQO-TV',
    marketId: 'yakima-wa',
    broadcasterId: 'cbs',
    cpm: '$17.35',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'abc-[yom-yakima',
    name: '[YOM-TV',
    marketId: 'yakima-wa',
    broadcasterId: 'abc',
    cpm: '$19.49',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'abc-zobn-springfield',
    name: 'ZOBN-TV',
    marketId: 'springfield-ma',
    broadcasterId: 'abc',
    cpm: '$19.83',
    marketShare: 16,
    audienceSize: 112000
  },
  {
    id: 'cbs-zgyv-springfield',
    name: 'ZGYV-TV',
    marketId: 'springfield-ma',
    broadcasterId: 'cbs',
    cpm: '$17.48',
    marketShare: 24,
    audienceSize: 168000
  },
  {
    id: 'hearst-[zmp-springfield',
    name: '[ZMP-TV',
    marketId: 'springfield-ma',
    broadcasterId: 'hearst',
    cpm: '$19.52',
    marketShare: 25,
    audienceSize: 175000
  },
  {
    id: 'morgan-murphy-[arg-traverse',
    name: '[ARG-TV',
    marketId: 'traverse-city-mi',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.55',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'entravision-xyyo-traverse',
    name: 'XYYO-TV',
    marketId: 'traverse-city-mi',
    broadcasterId: 'entravision',
    cpm: '$18.12',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'scripps-wpkx-traverse',
    name: 'WPKX-TV',
    marketId: 'traverse-city-mi',
    broadcasterId: 'scripps',
    cpm: '$17.29',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'abc-xrrk-traverse',
    name: 'XRRK-TV',
    marketId: 'traverse-city-mi',
    broadcasterId: 'abc',
    cpm: '$17.52',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'univision-wlpl-lansing',
    name: 'WLPL-TV',
    marketId: 'lansing-mi',
    broadcasterId: 'univision',
    cpm: '$19.57',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'gray-xtki-lansing',
    name: 'XTKI-TV',
    marketId: 'lansing-mi',
    broadcasterId: 'gray',
    cpm: '$17.29',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'cbs-wctn-lansing',
    name: 'WCTN-TV',
    marketId: 'lansing-mi',
    broadcasterId: 'cbs',
    cpm: '$18.95',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'nbc-zquo-youngstown',
    name: 'ZQUO-TV',
    marketId: 'youngstown-oh',
    broadcasterId: 'nbc',
    cpm: '$18.62',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'entravision-[fpw-youngstown',
    name: '[FPW-TV',
    marketId: 'youngstown-oh',
    broadcasterId: 'entravision',
    cpm: '$18.67',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'gray-[anh-youngstown',
    name: '[ANH-TV',
    marketId: 'youngstown-oh',
    broadcasterId: 'gray',
    cpm: '$17.69',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'hearst-xbpn-macon',
    name: 'XBPN-TV',
    marketId: 'macon-ga',
    broadcasterId: 'hearst',
    cpm: '$19.35',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'gray-[dlk-macon',
    name: '[DLK-TV',
    marketId: 'macon-ga',
    broadcasterId: 'gray',
    cpm: '$17.25',
    marketShare: 30,
    audienceSize: 120000
  },
  {
    id: 'abc-wgyt-macon',
    name: 'WGYT-TV',
    marketId: 'macon-ga',
    broadcasterId: 'abc',
    cpm: '$18.29',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'cbs-[rxm-macon',
    name: '[RXM-TV',
    marketId: 'macon-ga',
    broadcasterId: 'cbs',
    cpm: '$18.76',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'hubbard-broadcasting-wiau-macon',
    name: 'WIAU-TV',
    marketId: 'macon-ga',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.23',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'scripps-yqan-eugene',
    name: 'YQAN-TV',
    marketId: 'eugene-or',
    broadcasterId: 'scripps',
    cpm: '$19.36',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'morgan-murphy-xdrn-eugene',
    name: 'XDRN-TV',
    marketId: 'eugene-or',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.72',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'hubbard-broadcasting-xrti-eugene',
    name: 'XRTI-TV',
    marketId: 'eugene-or',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.13',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'hubbard-broadcasting-xncm-montgomery',
    name: 'XNCM-TV',
    marketId: 'montgomery-al',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.63',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'gray-yiib-montgomery',
    name: 'YIIB-TV',
    marketId: 'montgomery-al',
    broadcasterId: 'gray',
    cpm: '$17.97',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'nbc-zfrb-montgomery',
    name: 'ZFRB-TV',
    marketId: 'montgomery-al',
    broadcasterId: 'nbc',
    cpm: '$17.77',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'morgan-murphy-[zds-montgomery',
    name: '[ZDS-TV',
    marketId: 'montgomery-al',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.25',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'tegna-[cpk-montgomery',
    name: '[CPK-TV',
    marketId: 'montgomery-al',
    broadcasterId: 'tegna',
    cpm: '$19.18',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'scripps-xknk-peoria',
    name: 'XKNK-TV',
    marketId: 'peoria-il',
    broadcasterId: 'scripps',
    cpm: '$17.37',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'nbc-weft-peoria',
    name: 'WEFT-TV',
    marketId: 'peoria-il',
    broadcasterId: 'nbc',
    cpm: '$19.05',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'hubbard-broadcasting-zdwv-peoria',
    name: 'ZDWV-TV',
    marketId: 'peoria-il',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.75',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'cbs-wtef-santa',
    name: 'WTEF-TV',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'cbs',
    cpm: '$18.00',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'scripps-zqmp-santa',
    name: 'ZQMP-TV',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'scripps',
    cpm: '$18.12',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'hubbard-broadcasting-zley-santa',
    name: 'ZLEY-TV',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.09',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'nbc-zory-santa',
    name: 'ZORY-TV',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'nbc',
    cpm: '$19.16',
    marketShare: 32,
    audienceSize: 160000
  },
  {
    id: 'tegna-wjww-santa',
    name: 'WJWW-TV',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'tegna',
    cpm: '$19.52',
    marketShare: 15,
    audienceSize: 75000
  },
  {
    id: 'hubbard-broadcasting-weqz-lafayette',
    name: 'WEQZ-TV',
    marketId: 'lafayette-la',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.20',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'nbc-wneo-lafayette',
    name: 'WNEO-TV',
    marketId: 'lafayette-la',
    broadcasterId: 'nbc',
    cpm: '$19.44',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'cbs-zkul-lafayette',
    name: 'ZKUL-TV',
    marketId: 'lafayette-la',
    broadcasterId: 'cbs',
    cpm: '$19.62',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'scripps-[wkb-lafayette',
    name: '[WKB-TV',
    marketId: 'lafayette-la',
    broadcasterId: 'scripps',
    cpm: '$19.04',
    marketShare: 16,
    audienceSize: 80000
  },
  {
    id: 'abc-wfvl-bakersfield',
    name: 'WFVL-TV',
    marketId: 'bakersfield-ca',
    broadcasterId: 'abc',
    cpm: '$17.92',
    marketShare: 21,
    audienceSize: 189000
  },
  {
    id: 'news-press-gazette-ydki-bakersfield',
    name: 'YDKI-TV',
    marketId: 'bakersfield-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.21',
    marketShare: 20,
    audienceSize: 180000
  },
  {
    id: 'univision-[hoy-bakersfield',
    name: '[HOY-TV',
    marketId: 'bakersfield-ca',
    broadcasterId: 'univision',
    cpm: '$17.19',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'cbs-xaqu-bakersfield',
    name: 'XAQU-TV',
    marketId: 'bakersfield-ca',
    broadcasterId: 'cbs',
    cpm: '$18.49',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'morgan-murphy-[mzj-bakersfield',
    name: '[MZJ-TV',
    marketId: 'bakersfield-ca',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.22',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'hearst-xcbw-wilmington',
    name: 'XCBW-TV',
    marketId: 'wilmington-nc',
    broadcasterId: 'hearst',
    cpm: '$17.93',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'tegna-ynox-wilmington',
    name: 'YNOX-TV',
    marketId: 'wilmington-nc',
    broadcasterId: 'tegna',
    cpm: '$17.27',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'nbc-[yqw-wilmington',
    name: '[YQW-TV',
    marketId: 'wilmington-nc',
    broadcasterId: 'nbc',
    cpm: '$18.78',
    marketShare: 30,
    audienceSize: 120000
  },
  {
    id: 'gray-[dea-wilmington',
    name: '[DEA-TV',
    marketId: 'wilmington-nc',
    broadcasterId: 'gray',
    cpm: '$18.05',
    marketShare: 30,
    audienceSize: 120000
  },
  {
    id: 'hubbard-broadcasting-[akj-columbus',
    name: '[AKJ-TV',
    marketId: 'columbus-ga',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.19',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'scripps-wurs-columbus',
    name: 'WURS-TV',
    marketId: 'columbus-ga',
    broadcasterId: 'scripps',
    cpm: '$17.55',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'abc-wfmf-columbus',
    name: 'WFMF-TV',
    marketId: 'columbus-ga',
    broadcasterId: 'abc',
    cpm: '$17.53',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'cbs-[axx-columbus',
    name: '[AXX-TV',
    marketId: 'columbus-ga',
    broadcasterId: 'cbs',
    cpm: '$17.88',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'nbc-[egq-columbus',
    name: '[EGQ-TV',
    marketId: 'columbus-ga',
    broadcasterId: 'nbc',
    cpm: '$18.04',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'news-press-gazette-wath-columbus',
    name: 'WATH-TV',
    marketId: 'columbus-ga',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.81',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'morgan-murphy-[qbw-monterey',
    name: '[QBW-TV',
    marketId: 'monterey-ca',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.17',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'abc-wieh-monterey',
    name: 'WIEH-TV',
    marketId: 'monterey-ca',
    broadcasterId: 'abc',
    cpm: '$19.83',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'cbs-zheo-monterey',
    name: 'ZHEO-TV',
    marketId: 'monterey-ca',
    broadcasterId: 'cbs',
    cpm: '$19.06',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'univision-[nnq-monterey',
    name: '[NNQ-TV',
    marketId: 'monterey-ca',
    broadcasterId: 'univision',
    cpm: '$18.39',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'scripps-zttc-la',
    name: 'ZTTC-TV',
    marketId: 'la-crosse-wi',
    broadcasterId: 'scripps',
    cpm: '$17.90',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'news-press-gazette-wbji-la',
    name: 'WBJI-TV',
    marketId: 'la-crosse-wi',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.99',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'hubbard-broadcasting-zmml-la',
    name: 'ZMML-TV',
    marketId: 'la-crosse-wi',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.38',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'univision-[csn-la',
    name: '[CSN-TV',
    marketId: 'la-crosse-wi',
    broadcasterId: 'univision',
    cpm: '$18.82',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'entravision-[jrf-la',
    name: '[JRF-TV',
    marketId: 'la-crosse-wi',
    broadcasterId: 'entravision',
    cpm: '$19.31',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'tegna-xhpx-la',
    name: 'XHPX-TV',
    marketId: 'la-crosse-wi',
    broadcasterId: 'tegna',
    cpm: '$18.72',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'entravision-wmrf-corpus',
    name: 'WMRF-TV',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'entravision',
    cpm: '$19.40',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'tegna-wxao-corpus',
    name: 'WXAO-TV',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'tegna',
    cpm: '$18.17',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'nbc-yzoa-corpus',
    name: 'YZOA-TV',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'nbc',
    cpm: '$18.01',
    marketShare: 32,
    audienceSize: 160000
  },
  {
    id: 'news-press-gazette-wbnl-corpus',
    name: 'WBNL-TV',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.78',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'cbs-ydvs-corpus',
    name: 'YDVS-TV',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'cbs',
    cpm: '$19.23',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'news-press-gazette-wjib-salisbury',
    name: 'WJIB-TV',
    marketId: 'salisbury-md',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.01',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'cbs-xunv-salisbury',
    name: 'XUNV-TV',
    marketId: 'salisbury-md',
    broadcasterId: 'cbs',
    cpm: '$18.25',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'nexstar-wjre-salisbury',
    name: 'WJRE-TV',
    marketId: 'salisbury-md',
    broadcasterId: 'nexstar',
    cpm: '$18.48',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'gray-xguw-amarillo',
    name: 'XGUW-TV',
    marketId: 'amarillo-tx',
    broadcasterId: 'gray',
    cpm: '$17.87',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'abc-wtwy-amarillo',
    name: 'WTWY-TV',
    marketId: 'amarillo-tx',
    broadcasterId: 'abc',
    cpm: '$19.79',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'hearst-yegr-amarillo',
    name: 'YEGR-TV',
    marketId: 'amarillo-tx',
    broadcasterId: 'hearst',
    cpm: '$19.39',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'abc-[wsw-wausau',
    name: '[WSW-TV',
    marketId: 'wausau-wi',
    broadcasterId: 'abc',
    cpm: '$17.39',
    marketShare: 15,
    audienceSize: 45000
  },
  {
    id: 'hearst-wkzl-wausau',
    name: 'WKZL-TV',
    marketId: 'wausau-wi',
    broadcasterId: 'hearst',
    cpm: '$18.27',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'cbs-[vrn-wausau',
    name: '[VRN-TV',
    marketId: 'wausau-wi',
    broadcasterId: 'cbs',
    cpm: '$19.12',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'entravision-wnxx-wausau',
    name: 'WNXX-TV',
    marketId: 'wausau-wi',
    broadcasterId: 'entravision',
    cpm: '$17.79',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'news-press-gazette-zklv-columbus',
    name: 'ZKLV-TV',
    marketId: 'columbus-ms',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.28',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'nexstar-zlua-columbus',
    name: 'ZLUA-TV',
    marketId: 'columbus-ms',
    broadcasterId: 'nexstar',
    cpm: '$18.52',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'morgan-murphy-zook-columbus',
    name: 'ZOOK-TV',
    marketId: 'columbus-ms',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.81',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'univision-wost-columbus',
    name: 'WOST-TV',
    marketId: 'columbus-ms',
    broadcasterId: 'univision',
    cpm: '$18.68',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'hubbard-broadcasting-xjic-columbus',
    name: 'XJIC-TV',
    marketId: 'columbus-ms',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.17',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'gray-xvit-columbus',
    name: 'XVIT-TV',
    marketId: 'columbus-ms',
    broadcasterId: 'gray',
    cpm: '$17.96',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'abc-zkrj-columbia',
    name: 'ZKRJ-TV',
    marketId: 'columbia-mo',
    broadcasterId: 'abc',
    cpm: '$18.19',
    marketShare: 24,
    audienceSize: 96000
  },
  {
    id: 'nexstar-[spo-columbia',
    name: '[SPO-TV',
    marketId: 'columbia-mo',
    broadcasterId: 'nexstar',
    cpm: '$17.72',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'hubbard-broadcasting-zjez-columbia',
    name: 'ZJEZ-TV',
    marketId: 'columbia-mo',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.34',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'abc-zwtf-chico',
    name: 'ZWTF-TV',
    marketId: 'chico-ca',
    broadcasterId: 'abc',
    cpm: '$19.73',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'cbs-xpqq-chico',
    name: 'XPQQ-TV',
    marketId: 'chico-ca',
    broadcasterId: 'cbs',
    cpm: '$19.13',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'news-press-gazette-yipy-chico',
    name: 'YIPY-TV',
    marketId: 'chico-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.03',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'nexstar-wsvt-chico',
    name: 'WSVT-TV',
    marketId: 'chico-ca',
    broadcasterId: 'nexstar',
    cpm: '$18.26',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'entravision-[tsp-chico',
    name: '[TSP-TV',
    marketId: 'chico-ca',
    broadcasterId: 'entravision',
    cpm: '$17.53',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'tegna-[sjh-chico',
    name: '[SJH-TV',
    marketId: 'chico-ca',
    broadcasterId: 'tegna',
    cpm: '$17.11',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'abc-[hzl-rockford',
    name: '[HZL-TV',
    marketId: 'rockford-il',
    broadcasterId: 'abc',
    cpm: '$19.99',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'hubbard-broadcasting-zvna-rockford',
    name: 'ZVNA-TV',
    marketId: 'rockford-il',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.83',
    marketShare: 28,
    audienceSize: 112000
  },
  {
    id: 'cbs-yggp-rockford',
    name: 'YGGP-TV',
    marketId: 'rockford-il',
    broadcasterId: 'cbs',
    cpm: '$18.79',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'news-press-gazette-xfsd-rockford',
    name: 'XFSD-TV',
    marketId: 'rockford-il',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.70',
    marketShare: 24,
    audienceSize: 96000
  },
  {
    id: 'morgan-murphy-wafn-rockford',
    name: 'WAFN-TV',
    marketId: 'rockford-il',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.90',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'scripps-zime-duluth',
    name: 'ZIME-TV',
    marketId: 'duluth-mn',
    broadcasterId: 'scripps',
    cpm: '$18.30',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'news-press-gazette-[cmm-duluth',
    name: '[CMM-TV',
    marketId: 'duluth-mn',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.87',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'morgan-murphy-xyat-duluth',
    name: 'XYAT-TV',
    marketId: 'duluth-mn',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.60',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'abc-whha-duluth',
    name: 'WHHA-TV',
    marketId: 'duluth-mn',
    broadcasterId: 'abc',
    cpm: '$19.70',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'entravision-xtsd-duluth',
    name: 'XTSD-TV',
    marketId: 'duluth-mn',
    broadcasterId: 'entravision',
    cpm: '$18.78',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'hearst-wmyp-duluth',
    name: 'WMYP-TV',
    marketId: 'duluth-mn',
    broadcasterId: 'hearst',
    cpm: '$19.55',
    marketShare: 15,
    audienceSize: 45000
  },
  {
    id: 'nexstar-wgfi-medford',
    name: 'WGFI-TV',
    marketId: 'medford-or',
    broadcasterId: 'nexstar',
    cpm: '$18.33',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'abc-ykgo-medford',
    name: 'YKGO-TV',
    marketId: 'medford-or',
    broadcasterId: 'abc',
    cpm: '$18.08',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'univision-[tgb-medford',
    name: '[TGB-TV',
    marketId: 'medford-or',
    broadcasterId: 'univision',
    cpm: '$17.23',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'hearst-wltk-medford',
    name: 'WLTK-TV',
    marketId: 'medford-or',
    broadcasterId: 'hearst',
    cpm: '$19.54',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'gray-xrxx-lubbock',
    name: 'XRXX-TV',
    marketId: 'lubbock-tx',
    broadcasterId: 'gray',
    cpm: '$19.27',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'scripps-yhbe-lubbock',
    name: 'YHBE-TV',
    marketId: 'lubbock-tx',
    broadcasterId: 'scripps',
    cpm: '$19.48',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'entravision-zocr-lubbock',
    name: 'ZOCR-TV',
    marketId: 'lubbock-tx',
    broadcasterId: 'entravision',
    cpm: '$19.45',
    marketShare: 31,
    audienceSize: 124000
  },
  {
    id: 'abc-yxkq-lubbock',
    name: 'YXKQ-TV',
    marketId: 'lubbock-tx',
    broadcasterId: 'abc',
    cpm: '$19.26',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'gray-[csf-topeka',
    name: '[CSF-TV',
    marketId: 'topeka-ks',
    broadcasterId: 'gray',
    cpm: '$18.09',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'nbc-zfuc-topeka',
    name: 'ZFUC-TV',
    marketId: 'topeka-ks',
    broadcasterId: 'nbc',
    cpm: '$18.08',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'nexstar-ynuv-topeka',
    name: 'YNUV-TV',
    marketId: 'topeka-ks',
    broadcasterId: 'nexstar',
    cpm: '$19.35',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'cbs-xwnz-topeka',
    name: 'XWNZ-TV',
    marketId: 'topeka-ks',
    broadcasterId: 'cbs',
    cpm: '$17.56',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'hearst-yike-topeka',
    name: 'YIKE-TV',
    marketId: 'topeka-ks',
    broadcasterId: 'hearst',
    cpm: '$17.07',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'univision-ynxr-topeka',
    name: 'YNXR-TV',
    marketId: 'topeka-ks',
    broadcasterId: 'univision',
    cpm: '$17.68',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'tegna-ylxh-monroe',
    name: 'YLXH-TV',
    marketId: 'monroe-la',
    broadcasterId: 'tegna',
    cpm: '$17.15',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'nexstar-wzpv-monroe',
    name: 'WZPV-TV',
    marketId: 'monroe-la',
    broadcasterId: 'nexstar',
    cpm: '$18.79',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'gray-[psv-monroe',
    name: '[PSV-TV',
    marketId: 'monroe-la',
    broadcasterId: 'gray',
    cpm: '$17.89',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'morgan-murphy-zjmt-monroe',
    name: 'ZJMT-TV',
    marketId: 'monroe-la',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.57',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'news-press-gazette-zifh-monroe',
    name: 'ZIFH-TV',
    marketId: 'monroe-la',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.27',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'entravision-wcru-monroe',
    name: 'WCRU-TV',
    marketId: 'monroe-la',
    broadcasterId: 'entravision',
    cpm: '$18.44',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'gray-xkfq-beaumont',
    name: 'XKFQ-TV',
    marketId: 'beaumont-tx',
    broadcasterId: 'gray',
    cpm: '$19.05',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'entravision-[skj-beaumont',
    name: '[SKJ-TV',
    marketId: 'beaumont-tx',
    broadcasterId: 'entravision',
    cpm: '$17.78',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'news-press-gazette-yeiw-beaumont',
    name: 'YEIW-TV',
    marketId: 'beaumont-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.83',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'hubbard-broadcasting-xbgy-beaumont',
    name: 'XBGY-TV',
    marketId: 'beaumont-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.57',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'entravision-xrgi-odessa',
    name: 'XRGI-TV',
    marketId: 'odessa-tx',
    broadcasterId: 'entravision',
    cpm: '$17.92',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'cbs-yrml-odessa',
    name: 'YRML-TV',
    marketId: 'odessa-tx',
    broadcasterId: 'cbs',
    cpm: '$17.41',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'nbc-[caq-odessa',
    name: '[CAQ-TV',
    marketId: 'odessa-tx',
    broadcasterId: 'nbc',
    cpm: '$19.20',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'univision-[gdm-odessa',
    name: '[GDM-TV',
    marketId: 'odessa-tx',
    broadcasterId: 'univision',
    cpm: '$19.08',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'news-press-gazette-yqov-odessa',
    name: 'YQOV-TV',
    marketId: 'odessa-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.95',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'abc-wenz-palm',
    name: 'WENZ-TV',
    marketId: 'palm-springs-ca',
    broadcasterId: 'abc',
    cpm: '$17.75',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'hubbard-broadcasting-xfzf-palm',
    name: 'XFZF-TV',
    marketId: 'palm-springs-ca',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.91',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'cbs-[hps-palm',
    name: '[HPS-TV',
    marketId: 'palm-springs-ca',
    broadcasterId: 'cbs',
    cpm: '$18.34',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'entravision-[gmp-palm',
    name: '[GMP-TV',
    marketId: 'palm-springs-ca',
    broadcasterId: 'entravision',
    cpm: '$19.18',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'nexstar-wjew-palm',
    name: 'WJEW-TV',
    marketId: 'palm-springs-ca',
    broadcasterId: 'nexstar',
    cpm: '$19.96',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'hearst-yxfl-anchorage',
    name: 'YXFL-TV',
    marketId: 'anchorage-ak',
    broadcasterId: 'hearst',
    cpm: '$19.13',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'gray-wafn-anchorage',
    name: 'WAFN-TV',
    marketId: 'anchorage-ak',
    broadcasterId: 'gray',
    cpm: '$17.04',
    marketShare: 31,
    audienceSize: 124000
  },
  {
    id: 'news-press-gazette-wctr-anchorage',
    name: 'WCTR-TV',
    marketId: 'anchorage-ak',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.25',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'abc-ztrb-bismarck',
    name: 'ZTRB-TV',
    marketId: 'bismarck-nd',
    broadcasterId: 'abc',
    cpm: '$19.55',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'hearst-wocn-bismarck',
    name: 'WOCN-TV',
    marketId: 'bismarck-nd',
    broadcasterId: 'hearst',
    cpm: '$19.59',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'univision-zhqj-bismarck',
    name: 'ZHQJ-TV',
    marketId: 'bismarck-nd',
    broadcasterId: 'univision',
    cpm: '$18.41',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'tegna-[gln-bismarck',
    name: '[GLN-TV',
    marketId: 'bismarck-nd',
    broadcasterId: 'tegna',
    cpm: '$18.25',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'news-press-gazette-xohb-panama',
    name: 'XOHB-TV',
    marketId: 'panama-city-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.67',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'gray-ximc-panama',
    name: 'XIMC-TV',
    marketId: 'panama-city-fl',
    broadcasterId: 'gray',
    cpm: '$19.73',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'nexstar-xfwy-panama',
    name: 'XFWY-TV',
    marketId: 'panama-city-fl',
    broadcasterId: 'nexstar',
    cpm: '$17.82',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'nbc-wsli-panama',
    name: 'WSLI-TV',
    marketId: 'panama-city-fl',
    broadcasterId: 'nbc',
    cpm: '$19.68',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'abc-ydwp-sioux',
    name: 'YDWP-TV',
    marketId: 'sioux-city-ia',
    broadcasterId: 'abc',
    cpm: '$19.52',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'tegna-[ojk-sioux',
    name: '[OJK-TV',
    marketId: 'sioux-city-ia',
    broadcasterId: 'tegna',
    cpm: '$17.08',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'hearst-zqbm-sioux',
    name: 'ZQBM-TV',
    marketId: 'sioux-city-ia',
    broadcasterId: 'hearst',
    cpm: '$18.86',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'morgan-murphy-yavp-sioux',
    name: 'YAVP-TV',
    marketId: 'sioux-city-ia',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.14',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'nbc-yzpc-wichita',
    name: 'YZPC-TV',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'nbc',
    cpm: '$19.37',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'scripps-xtmy-wichita',
    name: 'XTMY-TV',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'scripps',
    cpm: '$18.73',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'gray-xgxw-wichita',
    name: 'XGXW-TV',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'gray',
    cpm: '$19.11',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'abc-zihz-joplin',
    name: 'ZIHZ-TV',
    marketId: 'joplin-mo',
    broadcasterId: 'abc',
    cpm: '$17.55',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'gray-[ojm-joplin',
    name: '[OJM-TV',
    marketId: 'joplin-mo',
    broadcasterId: 'gray',
    cpm: '$17.37',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'cbs-[gyg-joplin',
    name: '[GYG-TV',
    marketId: 'joplin-mo',
    broadcasterId: 'cbs',
    cpm: '$19.26',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'gray-zvwi-albany',
    name: 'ZVWI-TV',
    marketId: 'albany-ga',
    broadcasterId: 'gray',
    cpm: '$18.82',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'scripps-wqqe-albany',
    name: 'WQQE-TV',
    marketId: 'albany-ga',
    broadcasterId: 'scripps',
    cpm: '$18.66',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'hubbard-broadcasting-yqyt-albany',
    name: 'YQYT-TV',
    marketId: 'albany-ga',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.57',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'nbc-xybb-albany',
    name: 'XYBB-TV',
    marketId: 'albany-ga',
    broadcasterId: 'nbc',
    cpm: '$18.20',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'hubbard-broadcasting-[uda-rochester',
    name: '[UDA-TV',
    marketId: 'rochester-mn',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.08',
    marketShare: 33,
    audienceSize: 99000
  },
  {
    id: 'abc-[sxo-rochester',
    name: '[SXO-TV',
    marketId: 'rochester-mn',
    broadcasterId: 'abc',
    cpm: '$18.60',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'cbs-wmhw-rochester',
    name: 'WMHW-TV',
    marketId: 'rochester-mn',
    broadcasterId: 'cbs',
    cpm: '$18.15',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'scripps-ywdb-rochester',
    name: 'YWDB-TV',
    marketId: 'rochester-mn',
    broadcasterId: 'scripps',
    cpm: '$19.59',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'entravision-xtuk-erie',
    name: 'XTUK-TV',
    marketId: 'erie-pa',
    broadcasterId: 'entravision',
    cpm: '$17.08',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'nbc-wswb-erie',
    name: 'WSWB-TV',
    marketId: 'erie-pa',
    broadcasterId: 'nbc',
    cpm: '$17.47',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'hearst-[nab-erie',
    name: '[NAB-TV',
    marketId: 'erie-pa',
    broadcasterId: 'hearst',
    cpm: '$17.47',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'univision-youl-erie',
    name: 'YOUL-TV',
    marketId: 'erie-pa',
    broadcasterId: 'univision',
    cpm: '$17.85',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'cbs-yitv-erie',
    name: 'YITV-TV',
    marketId: 'erie-pa',
    broadcasterId: 'cbs',
    cpm: '$19.79',
    marketShare: 33,
    audienceSize: 99000
  },
  {
    id: 'nexstar-[afn-erie',
    name: '[AFN-TV',
    marketId: 'erie-pa',
    broadcasterId: 'nexstar',
    cpm: '$17.39',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'cbs-yuav-idaho',
    name: 'YUAV-TV',
    marketId: 'idaho-falls-id',
    broadcasterId: 'cbs',
    cpm: '$17.37',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'morgan-murphy-zclo-idaho',
    name: 'ZCLO-TV',
    marketId: 'idaho-falls-id',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.74',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'entravision-yacq-idaho',
    name: 'YACQ-TV',
    marketId: 'idaho-falls-id',
    broadcasterId: 'entravision',
    cpm: '$17.81',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'news-press-gazette-zjrv-idaho',
    name: 'ZJRV-TV',
    marketId: 'idaho-falls-id',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.21',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'tegna-[hzt-bangor',
    name: '[HZT-TV',
    marketId: 'bangor-me',
    broadcasterId: 'tegna',
    cpm: '$18.46',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'abc-xhzg-bangor',
    name: 'XHZG-TV',
    marketId: 'bangor-me',
    broadcasterId: 'abc',
    cpm: '$18.65',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'cbs-xzwz-bangor',
    name: 'XZWZ-TV',
    marketId: 'bangor-me',
    broadcasterId: 'cbs',
    cpm: '$17.74',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'news-press-gazette-zwgn-bangor',
    name: 'ZWGN-TV',
    marketId: 'bangor-me',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.60',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'nexstar-zuec-bangor',
    name: 'ZUEC-TV',
    marketId: 'bangor-me',
    broadcasterId: 'nexstar',
    cpm: '$19.55',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'entravision-ztwd-gainesville',
    name: 'ZTWD-TV',
    marketId: 'gainesville-fl',
    broadcasterId: 'entravision',
    cpm: '$18.57',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'nbc-zjtd-gainesville',
    name: 'ZJTD-TV',
    marketId: 'gainesville-fl',
    broadcasterId: 'nbc',
    cpm: '$18.07',
    marketShare: 19,
    audienceSize: 57000
  },
  {
    id: 'gray-[qqi-gainesville',
    name: '[QQI-TV',
    marketId: 'gainesville-fl',
    broadcasterId: 'gray',
    cpm: '$18.81',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'nexstar-xhrg-gainesville',
    name: 'XHRG-TV',
    marketId: 'gainesville-fl',
    broadcasterId: 'nexstar',
    cpm: '$18.98',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'morgan-murphy-waic-gainesville',
    name: 'WAIC-TV',
    marketId: 'gainesville-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.17',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'abc-yfhb-biloxi',
    name: 'YFHB-TV',
    marketId: 'biloxi-ms',
    broadcasterId: 'abc',
    cpm: '$17.38',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'nbc-wope-biloxi',
    name: 'WOPE-TV',
    marketId: 'biloxi-ms',
    broadcasterId: 'nbc',
    cpm: '$19.69',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'univision-zkqb-biloxi',
    name: 'ZKQB-TV',
    marketId: 'biloxi-ms',
    broadcasterId: 'univision',
    cpm: '$18.15',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'tegna-zwnn-biloxi',
    name: 'ZWNN-TV',
    marketId: 'biloxi-ms',
    broadcasterId: 'tegna',
    cpm: '$17.51',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'entravision-yhaw-biloxi',
    name: 'YHAW-TV',
    marketId: 'biloxi-ms',
    broadcasterId: 'entravision',
    cpm: '$18.58',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'news-press-gazette-whdj-biloxi',
    name: 'WHDJ-TV',
    marketId: 'biloxi-ms',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.80',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'gray-wfsb-terre',
    name: 'WFSB-TV',
    marketId: 'terre-haute-in',
    broadcasterId: 'gray',
    cpm: '$17.21',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'nbc-xnte-terre',
    name: 'XNTE-TV',
    marketId: 'terre-haute-in',
    broadcasterId: 'nbc',
    cpm: '$17.87',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'news-press-gazette-xbcv-terre',
    name: 'XBCV-TV',
    marketId: 'terre-haute-in',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.37',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'entravision-yoer-sherman',
    name: 'YOER-TV',
    marketId: 'sherman-tx',
    broadcasterId: 'entravision',
    cpm: '$18.49',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'abc-xdox-sherman',
    name: 'XDOX-TV',
    marketId: 'sherman-tx',
    broadcasterId: 'abc',
    cpm: '$18.55',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'hearst-wiqr-sherman',
    name: 'WIQR-TV',
    marketId: 'sherman-tx',
    broadcasterId: 'hearst',
    cpm: '$19.42',
    marketShare: 19,
    audienceSize: 57000
  },
  {
    id: 'cbs-[hix-sherman',
    name: '[HIX-TV',
    marketId: 'sherman-tx',
    broadcasterId: 'cbs',
    cpm: '$18.98',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'univision-zolm-missoula',
    name: 'ZOLM-TV',
    marketId: 'missoula-mt',
    broadcasterId: 'univision',
    cpm: '$17.90',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'scripps-zaji-missoula',
    name: 'ZAJI-TV',
    marketId: 'missoula-mt',
    broadcasterId: 'scripps',
    cpm: '$19.03',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'tegna-zzoe-missoula',
    name: 'ZZOE-TV',
    marketId: 'missoula-mt',
    broadcasterId: 'tegna',
    cpm: '$18.78',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'morgan-murphy-[mwp-binghamton',
    name: '[MWP-TV',
    marketId: 'binghamton-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.31',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'abc-ymju-binghamton',
    name: 'YMJU-TV',
    marketId: 'binghamton-ny',
    broadcasterId: 'abc',
    cpm: '$19.04',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'cbs-xysd-binghamton',
    name: 'XYSD-TV',
    marketId: 'binghamton-ny',
    broadcasterId: 'cbs',
    cpm: '$17.77',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'news-press-gazette-ynek-binghamton',
    name: 'YNEK-TV',
    marketId: 'binghamton-ny',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.32',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'univision-ymjx-binghamton',
    name: 'YMJX-TV',
    marketId: 'binghamton-ny',
    broadcasterId: 'univision',
    cpm: '$17.29',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'scripps-wmjd-wheeling',
    name: 'WMJD-TV',
    marketId: 'wheeling-wv',
    broadcasterId: 'scripps',
    cpm: '$18.46',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'univision-wdtu-wheeling',
    name: 'WDTU-TV',
    marketId: 'wheeling-wv',
    broadcasterId: 'univision',
    cpm: '$19.81',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'hubbard-broadcasting-yoft-wheeling',
    name: 'YOFT-TV',
    marketId: 'wheeling-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.90',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'gray-xjei-wheeling',
    name: 'XJEI-TV',
    marketId: 'wheeling-wv',
    broadcasterId: 'gray',
    cpm: '$19.25',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'nbc-wobf-wheeling',
    name: 'WOBF-TV',
    marketId: 'wheeling-wv',
    broadcasterId: 'nbc',
    cpm: '$17.70',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'tegna-xlqf-wheeling',
    name: 'XLQF-TV',
    marketId: 'wheeling-wv',
    broadcasterId: 'tegna',
    cpm: '$17.11',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'cbs-zgqd-yuma',
    name: 'ZGQD-TV',
    marketId: 'yuma-az',
    broadcasterId: 'cbs',
    cpm: '$19.58',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'abc-yvkm-yuma',
    name: 'YVKM-TV',
    marketId: 'yuma-az',
    broadcasterId: 'abc',
    cpm: '$18.33',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'gray-xelf-yuma',
    name: 'XELF-TV',
    marketId: 'yuma-az',
    broadcasterId: 'gray',
    cpm: '$17.75',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'hubbard-broadcasting-xdzk-billings',
    name: 'XDZK-TV',
    marketId: 'billings-mt',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.22',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'abc-wzmz-billings',
    name: 'WZMZ-TV',
    marketId: 'billings-mt',
    broadcasterId: 'abc',
    cpm: '$17.67',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'cbs-xzit-billings',
    name: 'XZIT-TV',
    marketId: 'billings-mt',
    broadcasterId: 'cbs',
    cpm: '$17.29',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'nexstar-[xja-billings',
    name: '[XJA-TV',
    marketId: 'billings-mt',
    broadcasterId: 'nexstar',
    cpm: '$18.46',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'nbc-ymqg-billings',
    name: 'YMQG-TV',
    marketId: 'billings-mt',
    broadcasterId: 'nbc',
    cpm: '$17.20',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'univision-wrqo-billings',
    name: 'WRQO-TV',
    marketId: 'billings-mt',
    broadcasterId: 'univision',
    cpm: '$19.61',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'univision-zcbf-abilene',
    name: 'ZCBF-TV',
    marketId: 'abilene-tx',
    broadcasterId: 'univision',
    cpm: '$18.09',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'cbs-ztev-abilene',
    name: 'ZTEV-TV',
    marketId: 'abilene-tx',
    broadcasterId: 'cbs',
    cpm: '$17.32',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'hubbard-broadcasting-[vsl-abilene',
    name: '[VSL-TV',
    marketId: 'abilene-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.71',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'cbs-zpkf-bluefield',
    name: 'ZPKF-TV',
    marketId: 'bluefield-wv',
    broadcasterId: 'cbs',
    cpm: '$19.73',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'gray-[hmg-bluefield',
    name: '[HMG-TV',
    marketId: 'bluefield-wv',
    broadcasterId: 'gray',
    cpm: '$19.96',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'univision-[ucy-bluefield',
    name: '[UCY-TV',
    marketId: 'bluefield-wv',
    broadcasterId: 'univision',
    cpm: '$19.02',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'news-press-gazette-xaam-bluefield',
    name: 'XAAM-TV',
    marketId: 'bluefield-wv',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.63',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'hearst-ycwd-bluefield',
    name: 'YCWD-TV',
    marketId: 'bluefield-wv',
    broadcasterId: 'hearst',
    cpm: '$17.03',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'hubbard-broadcasting-yrfh-bluefield',
    name: 'YRFH-TV',
    marketId: 'bluefield-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.86',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'nbc-wuvp-hattiesburg',
    name: 'WUVP-TV',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'nbc',
    cpm: '$18.58',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'cbs-[kbl-hattiesburg',
    name: '[KBL-TV',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'cbs',
    cpm: '$17.15',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'hearst-[fsl-hattiesburg',
    name: '[FSL-TV',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'hearst',
    cpm: '$19.94',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'tegna-ymsk-hattiesburg',
    name: 'YMSK-TV',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'tegna',
    cpm: '$18.13',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'abc-ybik-hattiesburg',
    name: 'YBIK-TV',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'abc',
    cpm: '$17.71',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'news-press-gazette-ydqi-rapid',
    name: 'YDQI-TV',
    marketId: 'rapid-city-sd',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.00',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'tegna-xkle-rapid',
    name: 'XKLE-TV',
    marketId: 'rapid-city-sd',
    broadcasterId: 'tegna',
    cpm: '$18.07',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'gray-[gyf-rapid',
    name: '[GYF-TV',
    marketId: 'rapid-city-sd',
    broadcasterId: 'gray',
    cpm: '$17.98',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'morgan-murphy-wjjy-rapid',
    name: 'WJJY-TV',
    marketId: 'rapid-city-sd',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.30',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'cbs-zsse-dothan',
    name: 'ZSSE-TV',
    marketId: 'dothan-al',
    broadcasterId: 'cbs',
    cpm: '$18.48',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'univision-[lsh-dothan',
    name: '[LSH-TV',
    marketId: 'dothan-al',
    broadcasterId: 'univision',
    cpm: '$17.93',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'nbc-ydce-dothan',
    name: 'YDCE-TV',
    marketId: 'dothan-al',
    broadcasterId: 'nbc',
    cpm: '$18.86',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'news-press-gazette-wgim-dothan',
    name: 'WGIM-TV',
    marketId: 'dothan-al',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.05',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'scripps-zwyr-utica',
    name: 'ZWYR-TV',
    marketId: 'utica-ny',
    broadcasterId: 'scripps',
    cpm: '$19.43',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'univision-xchn-utica',
    name: 'XCHN-TV',
    marketId: 'utica-ny',
    broadcasterId: 'univision',
    cpm: '$17.49',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'gray-xiha-utica',
    name: 'XIHA-TV',
    marketId: 'utica-ny',
    broadcasterId: 'gray',
    cpm: '$17.39',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'hubbard-broadcasting-[lon-utica',
    name: '[LON-TV',
    marketId: 'utica-ny',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.76',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'cbs-xyah-clarksburg',
    name: 'XYAH-TV',
    marketId: 'clarksburg-wv',
    broadcasterId: 'cbs',
    cpm: '$18.21',
    marketShare: 29,
    audienceSize: 28999
  },
  {
    id: 'hearst-[iqb-clarksburg',
    name: '[IQB-TV',
    marketId: 'clarksburg-wv',
    broadcasterId: 'hearst',
    cpm: '$18.46',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'hubbard-broadcasting-zrnv-clarksburg',
    name: 'ZRNV-TV',
    marketId: 'clarksburg-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.14',
    marketShare: 22,
    audienceSize: 22000
  },
  {
    id: 'nbc-[uzl-harrisonburg',
    name: '[UZL-TV',
    marketId: 'harrisonburg-va',
    broadcasterId: 'nbc',
    cpm: '$19.52',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'scripps-xtug-harrisonburg',
    name: 'XTUG-TV',
    marketId: 'harrisonburg-va',
    broadcasterId: 'scripps',
    cpm: '$17.76',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'univision-wdxl-harrisonburg',
    name: 'WDXL-TV',
    marketId: 'harrisonburg-va',
    broadcasterId: 'univision',
    cpm: '$18.45',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'entravision-[oma-harrisonburg',
    name: '[OMA-TV',
    marketId: 'harrisonburg-va',
    broadcasterId: 'entravision',
    cpm: '$19.00',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'hubbard-broadcasting-[obo-harrisonburg',
    name: '[OBO-TV',
    marketId: 'harrisonburg-va',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.94',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'cbs-zkwx-harrisonburg',
    name: 'ZKWX-TV',
    marketId: 'harrisonburg-va',
    broadcasterId: 'cbs',
    cpm: '$17.55',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'nexstar-whms-jackson',
    name: 'WHMS-TV',
    marketId: 'jackson-tn',
    broadcasterId: 'nexstar',
    cpm: '$19.00',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'news-press-gazette-zrwo-jackson',
    name: 'ZRWO-TV',
    marketId: 'jackson-tn',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.32',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'abc-[sjr-jackson',
    name: '[SJR-TV',
    marketId: 'jackson-tn',
    broadcasterId: 'abc',
    cpm: '$19.88',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'abc-xjib-quincy',
    name: 'XJIB-TV',
    marketId: 'quincy-il',
    broadcasterId: 'abc',
    cpm: '$19.92',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'tegna-whjd-quincy',
    name: 'WHJD-TV',
    marketId: 'quincy-il',
    broadcasterId: 'tegna',
    cpm: '$17.97',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'univision-zyoo-quincy',
    name: 'ZYOO-TV',
    marketId: 'quincy-il',
    broadcasterId: 'univision',
    cpm: '$17.97',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'morgan-murphy-znwa-quincy',
    name: 'ZNWA-TV',
    marketId: 'quincy-il',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.00',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'abc-xdzf-charlottesville',
    name: 'XDZF-TV',
    marketId: 'charlottesville-va',
    broadcasterId: 'abc',
    cpm: '$18.55',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'news-press-gazette-xngk-charlottesville',
    name: 'XNGK-TV',
    marketId: 'charlottesville-va',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.93',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'cbs-xwoc-charlottesville',
    name: 'XWOC-TV',
    marketId: 'charlottesville-va',
    broadcasterId: 'cbs',
    cpm: '$19.24',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'hearst-xdre-charlottesville',
    name: 'XDRE-TV',
    marketId: 'charlottesville-va',
    broadcasterId: 'hearst',
    cpm: '$18.46',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'nbc-yaun-charlottesville',
    name: 'YAUN-TV',
    marketId: 'charlottesville-va',
    broadcasterId: 'nbc',
    cpm: '$18.76',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'univision-[jhl-charlottesville',
    name: '[JHL-TV',
    marketId: 'charlottesville-va',
    broadcasterId: 'univision',
    cpm: '$19.80',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'hearst-wznr-lake',
    name: 'WZNR-TV',
    marketId: 'lake-charles-la',
    broadcasterId: 'hearst',
    cpm: '$19.28',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'hubbard-broadcasting-[cnr-lake',
    name: '[CNR-TV',
    marketId: 'lake-charles-la',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.72',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'abc-xltl-lake',
    name: 'XLTL-TV',
    marketId: 'lake-charles-la',
    broadcasterId: 'abc',
    cpm: '$19.89',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'nbc-[jiv-elmira',
    name: '[JIV-TV',
    marketId: 'elmira-ny',
    broadcasterId: 'nbc',
    cpm: '$19.92',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'hubbard-broadcasting-xyad-elmira',
    name: 'XYAD-TV',
    marketId: 'elmira-ny',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.05',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'univision-zbvq-elmira',
    name: 'ZBVQ-TV',
    marketId: 'elmira-ny',
    broadcasterId: 'univision',
    cpm: '$17.99',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'hearst-ytkc-elmira',
    name: 'YTKC-TV',
    marketId: 'elmira-ny',
    broadcasterId: 'hearst',
    cpm: '$17.76',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'abc-xqop-watertown',
    name: 'XQOP-TV',
    marketId: 'watertown-ny',
    broadcasterId: 'abc',
    cpm: '$19.36',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'gray-[qna-watertown',
    name: '[QNA-TV',
    marketId: 'watertown-ny',
    broadcasterId: 'gray',
    cpm: '$17.03',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'morgan-murphy-ybsd-watertown',
    name: 'YBSD-TV',
    marketId: 'watertown-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.19',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'hearst-[ezc-bowling',
    name: '[EZC-TV',
    marketId: 'bowling-green-ky',
    broadcasterId: 'hearst',
    cpm: '$18.88',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'abc-[ykl-bowling',
    name: '[YKL-TV',
    marketId: 'bowling-green-ky',
    broadcasterId: 'abc',
    cpm: '$19.68',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'news-press-gazette-[imv-bowling',
    name: '[IMV-TV',
    marketId: 'bowling-green-ky',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.67',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'scripps-yzgv-marquette',
    name: 'YZGV-TV',
    marketId: 'marquette-mi',
    broadcasterId: 'scripps',
    cpm: '$19.96',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'univision-xvzt-marquette',
    name: 'XVZT-TV',
    marketId: 'marquette-mi',
    broadcasterId: 'univision',
    cpm: '$17.22',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'gray-zkuo-marquette',
    name: 'ZKUO-TV',
    marketId: 'marquette-mi',
    broadcasterId: 'gray',
    cpm: '$19.67',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'tegna-wxnu-marquette',
    name: 'WXNU-TV',
    marketId: 'marquette-mi',
    broadcasterId: 'tegna',
    cpm: '$19.32',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'news-press-gazette-zgha-marquette',
    name: 'ZGHA-TV',
    marketId: 'marquette-mi',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.19',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'abc-zyyu-marquette',
    name: 'ZYYU-TV',
    marketId: 'marquette-mi',
    broadcasterId: 'abc',
    cpm: '$17.44',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'tegna-wlbz-jonesboro',
    name: 'WLBZ-TV',
    marketId: 'jonesboro-ar',
    broadcasterId: 'tegna',
    cpm: '$18.38',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'scripps-[sfv-jonesboro',
    name: '[SFV-TV',
    marketId: 'jonesboro-ar',
    broadcasterId: 'scripps',
    cpm: '$18.07',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'news-press-gazette-wwpi-jonesboro',
    name: 'WWPI-TV',
    marketId: 'jonesboro-ar',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.36',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'abc-zevz-alexandria',
    name: 'ZEVZ-TV',
    marketId: 'alexandria-la',
    broadcasterId: 'abc',
    cpm: '$18.31',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'univision-xiiw-alexandria',
    name: 'XIIW-TV',
    marketId: 'alexandria-la',
    broadcasterId: 'univision',
    cpm: '$18.98',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'cbs-zhej-alexandria',
    name: 'ZHEJ-TV',
    marketId: 'alexandria-la',
    broadcasterId: 'cbs',
    cpm: '$18.85',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'news-press-gazette-yaoi-alexandria',
    name: 'YAOI-TV',
    marketId: 'alexandria-la',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.18',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'univision-[xcs-laredo',
    name: '[XCS-TV',
    marketId: 'laredo-tx',
    broadcasterId: 'univision',
    cpm: '$19.30',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'tegna-zwxm-laredo',
    name: 'ZWXM-TV',
    marketId: 'laredo-tx',
    broadcasterId: 'tegna',
    cpm: '$17.17',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'nbc-yrbf-laredo',
    name: 'YRBF-TV',
    marketId: 'laredo-tx',
    broadcasterId: 'nbc',
    cpm: '$17.29',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'nexstar-yzfj-laredo',
    name: 'YZFJ-TV',
    marketId: 'laredo-tx',
    broadcasterId: 'nexstar',
    cpm: '$18.74',
    marketShare: 19,
    audienceSize: 57000
  },
  {
    id: 'cbs-wpac-laredo',
    name: 'WPAC-TV',
    marketId: 'laredo-tx',
    broadcasterId: 'cbs',
    cpm: '$17.68',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'abc-zvil-butte',
    name: 'ZVIL-TV',
    marketId: 'butte-mt',
    broadcasterId: 'abc',
    cpm: '$17.08',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'gray-zckw-butte',
    name: 'ZCKW-TV',
    marketId: 'butte-mt',
    broadcasterId: 'gray',
    cpm: '$18.83',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'hearst-yzuf-butte',
    name: 'YZUF-TV',
    marketId: 'butte-mt',
    broadcasterId: 'hearst',
    cpm: '$19.73',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'entravision-wzzp-butte',
    name: 'WZZP-TV',
    marketId: 'butte-mt',
    broadcasterId: 'entravision',
    cpm: '$18.72',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'univision-[bmw-bend',
    name: '[BMW-TV',
    marketId: 'bend-or',
    broadcasterId: 'univision',
    cpm: '$19.17',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'entravision-wlvs-bend',
    name: 'WLVS-TV',
    marketId: 'bend-or',
    broadcasterId: 'entravision',
    cpm: '$18.12',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'tegna-[qpc-bend',
    name: '[QPC-TV',
    marketId: 'bend-or',
    broadcasterId: 'tegna',
    cpm: '$17.54',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'hearst-xgzt-bend',
    name: 'XGZT-TV',
    marketId: 'bend-or',
    broadcasterId: 'hearst',
    cpm: '$17.42',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'nexstar-wdja-bend',
    name: 'WDJA-TV',
    marketId: 'bend-or',
    broadcasterId: 'nexstar',
    cpm: '$19.05',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'gray-wghb-bend',
    name: 'WGHB-TV',
    marketId: 'bend-or',
    broadcasterId: 'gray',
    cpm: '$18.09',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'nexstar-[eow-grand',
    name: '[EOW-TV',
    marketId: 'grand-junction-co',
    broadcasterId: 'nexstar',
    cpm: '$17.39',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'tegna-[cmp-grand',
    name: '[CMP-TV',
    marketId: 'grand-junction-co',
    broadcasterId: 'tegna',
    cpm: '$18.63',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'gray-[kcr-grand',
    name: '[KCR-TV',
    marketId: 'grand-junction-co',
    broadcasterId: 'gray',
    cpm: '$18.91',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'nbc-[yxx-grand',
    name: '[YXX-TV',
    marketId: 'grand-junction-co',
    broadcasterId: 'nbc',
    cpm: '$17.98',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'cbs-xcis-twin',
    name: 'XCIS-TV',
    marketId: 'twin-falls-id',
    broadcasterId: 'cbs',
    cpm: '$17.24',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'news-press-gazette-xswg-twin',
    name: 'XSWG-TV',
    marketId: 'twin-falls-id',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.79',
    marketShare: 23,
    audienceSize: 23000
  },
  {
    id: 'hearst-wdko-twin',
    name: 'WDKO-TV',
    marketId: 'twin-falls-id',
    broadcasterId: 'hearst',
    cpm: '$19.96',
    marketShare: 17,
    audienceSize: 17000
  },
  {
    id: 'univision-[ycp-twin',
    name: '[YCP-TV',
    marketId: 'twin-falls-id',
    broadcasterId: 'univision',
    cpm: '$18.01',
    marketShare: 20,
    audienceSize: 20000
  },
  {
    id: 'scripps-yhhn-twin',
    name: 'YHHN-TV',
    marketId: 'twin-falls-id',
    broadcasterId: 'scripps',
    cpm: '$18.91',
    marketShare: 29,
    audienceSize: 28999
  },
  {
    id: 'abc-yqan-lafayette',
    name: 'YQAN-TV',
    marketId: 'lafayette-in',
    broadcasterId: 'abc',
    cpm: '$17.42',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'cbs-xswz-lafayette',
    name: 'XSWZ-TV',
    marketId: 'lafayette-in',
    broadcasterId: 'cbs',
    cpm: '$17.08',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'hearst-xuji-lafayette',
    name: 'XUJI-TV',
    marketId: 'lafayette-in',
    broadcasterId: 'hearst',
    cpm: '$17.64',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'nexstar-ybvq-lima',
    name: 'YBVQ-TV',
    marketId: 'lima-oh',
    broadcasterId: 'nexstar',
    cpm: '$17.05',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'abc-[rez-lima',
    name: '[REZ-TV',
    marketId: 'lima-oh',
    broadcasterId: 'abc',
    cpm: '$19.72',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'hearst-xniy-lima',
    name: 'XNIY-TV',
    marketId: 'lima-oh',
    broadcasterId: 'hearst',
    cpm: '$17.32',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'univision-zdxj-lima',
    name: 'ZDXJ-TV',
    marketId: 'lima-oh',
    broadcasterId: 'univision',
    cpm: '$17.12',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'cbs-wxoy-lima',
    name: 'WXOY-TV',
    marketId: 'lima-oh',
    broadcasterId: 'cbs',
    cpm: '$17.72',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'nexstar-xvtn-great',
    name: 'XVTN-TV',
    marketId: 'great-falls-mt',
    broadcasterId: 'nexstar',
    cpm: '$19.11',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'gray-yclg-great',
    name: 'YCLG-TV',
    marketId: 'great-falls-mt',
    broadcasterId: 'gray',
    cpm: '$17.21',
    marketShare: 30,
    audienceSize: 30000
  },
  {
    id: 'morgan-murphy-[yhw-great',
    name: '[YHW-TV',
    marketId: 'great-falls-mt',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.78',
    marketShare: 26,
    audienceSize: 26000
  },
  {
    id: 'nbc-[ojc-great',
    name: '[OJC-TV',
    marketId: 'great-falls-mt',
    broadcasterId: 'nbc',
    cpm: '$17.39',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'cbs-wqov-great',
    name: 'WQOV-TV',
    marketId: 'great-falls-mt',
    broadcasterId: 'cbs',
    cpm: '$17.56',
    marketShare: 16,
    audienceSize: 16000
  },
  {
    id: 'hearst-zeca-meridian',
    name: 'ZECA-TV',
    marketId: 'meridian-ms',
    broadcasterId: 'hearst',
    cpm: '$18.43',
    marketShare: 15,
    audienceSize: 15000
  },
  {
    id: 'scripps-[ast-meridian',
    name: '[AST-TV',
    marketId: 'meridian-ms',
    broadcasterId: 'scripps',
    cpm: '$17.88',
    marketShare: 32,
    audienceSize: 32000
  },
  {
    id: 'hubbard-broadcasting-wyhr-meridian',
    name: 'WYHR-TV',
    marketId: 'meridian-ms',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.61',
    marketShare: 18,
    audienceSize: 18000
  },
  {
    id: 'news-press-gazette-[iqk-meridian',
    name: '[IQK-TV',
    marketId: 'meridian-ms',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.68',
    marketShare: 30,
    audienceSize: 30000
  },
  {
    id: 'abc-wveh-cheyenne',
    name: 'WVEH-TV',
    marketId: 'cheyenne-wy',
    broadcasterId: 'abc',
    cpm: '$17.90',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'nexstar-[mrp-cheyenne',
    name: '[MRP-TV',
    marketId: 'cheyenne-wy',
    broadcasterId: 'nexstar',
    cpm: '$18.77',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'hearst-[zyp-cheyenne',
    name: '[ZYP-TV',
    marketId: 'cheyenne-wy',
    broadcasterId: 'hearst',
    cpm: '$17.95',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'hubbard-broadcasting-wcng-cheyenne',
    name: 'WCNG-TV',
    marketId: 'cheyenne-wy',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.63',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'cbs-werc-cheyenne',
    name: 'WERC-TV',
    marketId: 'cheyenne-wy',
    broadcasterId: 'cbs',
    cpm: '$19.54',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'nbc-wdnb-cheyenne',
    name: 'WDNB-TV',
    marketId: 'cheyenne-wy',
    broadcasterId: 'nbc',
    cpm: '$18.98',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'cbs-ztoz-parkersburg',
    name: 'ZTOZ-TV',
    marketId: 'parkersburg-wv',
    broadcasterId: 'cbs',
    cpm: '$18.18',
    marketShare: 33,
    audienceSize: 33000
  },
  {
    id: 'abc-xwyj-parkersburg',
    name: 'XWYJ-TV',
    marketId: 'parkersburg-wv',
    broadcasterId: 'abc',
    cpm: '$17.80',
    marketShare: 18,
    audienceSize: 18000
  },
  {
    id: 'hubbard-broadcasting-wgyj-parkersburg',
    name: 'WGYJ-TV',
    marketId: 'parkersburg-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.46',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'news-press-gazette-zipz-parkersburg',
    name: 'ZIPZ-TV',
    marketId: 'parkersburg-wv',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.55',
    marketShare: 27,
    audienceSize: 27000
  },
  {
    id: 'nbc-xopx-parkersburg',
    name: 'XOPX-TV',
    marketId: 'parkersburg-wv',
    broadcasterId: 'nbc',
    cpm: '$17.88',
    marketShare: 22,
    audienceSize: 22000
  },
  {
    id: 'tegna-zodf-parkersburg',
    name: 'ZODF-TV',
    marketId: 'parkersburg-wv',
    broadcasterId: 'tegna',
    cpm: '$17.93',
    marketShare: 17,
    audienceSize: 17000
  },
  {
    id: 'nexstar-[qbh-greenwood',
    name: '[QBH-TV',
    marketId: 'greenwood-ms',
    broadcasterId: 'nexstar',
    cpm: '$18.79',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'cbs-wwik-greenwood',
    name: 'WWIK-TV',
    marketId: 'greenwood-ms',
    broadcasterId: 'cbs',
    cpm: '$19.89',
    marketShare: 27,
    audienceSize: 27000
  },
  {
    id: 'nbc-zrdu-greenwood',
    name: 'ZRDU-TV',
    marketId: 'greenwood-ms',
    broadcasterId: 'nbc',
    cpm: '$19.58',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'nbc-zbbr-eureka',
    name: 'ZBBR-TV',
    marketId: 'eureka-ca',
    broadcasterId: 'nbc',
    cpm: '$19.31',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'abc-xzho-eureka',
    name: 'XZHO-TV',
    marketId: 'eureka-ca',
    broadcasterId: 'abc',
    cpm: '$17.77',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'nexstar-ylio-eureka',
    name: 'YLIO-TV',
    marketId: 'eureka-ca',
    broadcasterId: 'nexstar',
    cpm: '$18.31',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'cbs-[vcr-eureka',
    name: '[VCR-TV',
    marketId: 'eureka-ca',
    broadcasterId: 'cbs',
    cpm: '$19.22',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'hubbard-broadcasting-[qfs-eureka',
    name: '[QFS-TV',
    marketId: 'eureka-ca',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.51',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'gray-[pxp-eureka',
    name: '[PXP-TV',
    marketId: 'eureka-ca',
    broadcasterId: 'gray',
    cpm: '$17.40',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'gray-wpsw-san',
    name: 'WPSW-TV',
    marketId: 'san-angelo-tx',
    broadcasterId: 'gray',
    cpm: '$17.54',
    marketShare: 27,
    audienceSize: 27000
  },
  {
    id: 'news-press-gazette-xssh-san',
    name: 'XSSH-TV',
    marketId: 'san-angelo-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.94',
    marketShare: 20,
    audienceSize: 20000
  },
  {
    id: 'morgan-murphy-xmes-san',
    name: 'XMES-TV',
    marketId: 'san-angelo-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.17',
    marketShare: 33,
    audienceSize: 33000
  },
  {
    id: 'cbs-wmqx-san',
    name: 'WMQX-TV',
    marketId: 'san-angelo-tx',
    broadcasterId: 'cbs',
    cpm: '$17.80',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'abc-xxey-san',
    name: 'XXEY-TV',
    marketId: 'san-angelo-tx',
    broadcasterId: 'abc',
    cpm: '$18.90',
    marketShare: 29,
    audienceSize: 28999
  },
  {
    id: 'gray-zhnx-casper',
    name: 'ZHNX-TV',
    marketId: 'casper-wy',
    broadcasterId: 'gray',
    cpm: '$17.49',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'abc-xxvt-casper',
    name: 'XXVT-TV',
    marketId: 'casper-wy',
    broadcasterId: 'abc',
    cpm: '$18.22',
    marketShare: 32,
    audienceSize: 32000
  },
  {
    id: 'entravision-xweb-casper',
    name: 'XWEB-TV',
    marketId: 'casper-wy',
    broadcasterId: 'entravision',
    cpm: '$19.97',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'hearst-xlaq-casper',
    name: 'XLAQ-TV',
    marketId: 'casper-wy',
    broadcasterId: 'hearst',
    cpm: '$18.56',
    marketShare: 23,
    audienceSize: 23000
  },
  {
    id: 'nbc-[tkd-casper',
    name: '[TKD-TV',
    marketId: 'casper-wy',
    broadcasterId: 'nbc',
    cpm: '$17.32',
    marketShare: 32,
    audienceSize: 32000
  },
  {
    id: 'morgan-murphy-zeoj-casper',
    name: 'ZEOJ-TV',
    marketId: 'casper-wy',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.30',
    marketShare: 30,
    audienceSize: 30000
  },
  {
    id: 'entravision-yarf-mankato',
    name: 'YARF-TV',
    marketId: 'mankato-mn',
    broadcasterId: 'entravision',
    cpm: '$17.02',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'nbc-zemk-mankato',
    name: 'ZEMK-TV',
    marketId: 'mankato-mn',
    broadcasterId: 'nbc',
    cpm: '$18.15',
    marketShare: 23,
    audienceSize: 23000
  },
  {
    id: 'nexstar-winn-mankato',
    name: 'WINN-TV',
    marketId: 'mankato-mn',
    broadcasterId: 'nexstar',
    cpm: '$18.32',
    marketShare: 19,
    audienceSize: 19000
  },
  {
    id: 'tegna-zqet-mankato',
    name: 'ZQET-TV',
    marketId: 'mankato-mn',
    broadcasterId: 'tegna',
    cpm: '$18.50',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'news-press-gazette-xxoo-mankato',
    name: 'XXOO-TV',
    marketId: 'mankato-mn',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.82',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'hearst-zgji-mankato',
    name: 'ZGJI-TV',
    marketId: 'mankato-mn',
    broadcasterId: 'hearst',
    cpm: '$19.12',
    marketShare: 17,
    audienceSize: 17000
  },
  {
    id: 'hearst-zswq-ottumwa',
    name: 'ZSWQ-TV',
    marketId: 'ottumwa-ia',
    broadcasterId: 'hearst',
    cpm: '$19.59',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'hubbard-broadcasting-zpgn-ottumwa',
    name: 'ZPGN-TV',
    marketId: 'ottumwa-ia',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.75',
    marketShare: 25,
    audienceSize: 25000
  },
  {
    id: 'univision-xobm-ottumwa',
    name: 'XOBM-TV',
    marketId: 'ottumwa-ia',
    broadcasterId: 'univision',
    cpm: '$19.51',
    marketShare: 26,
    audienceSize: 26000
  },
  {
    id: 'news-press-gazette-xjap-ottumwa',
    name: 'XJAP-TV',
    marketId: 'ottumwa-ia',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.48',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'scripps-zafi-ottumwa',
    name: 'ZAFI-TV',
    marketId: 'ottumwa-ia',
    broadcasterId: 'scripps',
    cpm: '$18.22',
    marketShare: 34,
    audienceSize: 34000
  }
];

// Функции для работы со станциями

export const getStationsByMarket = (marketId: string): StationData[] => {
  return stationsData.filter(station => station.marketId === marketId);
};

export const getStationsByBroadcaster = (broadcasterId: string): StationData[] => {
  return stationsData.filter(station => station.broadcasterId === broadcasterId);
};

export const getStationsByMarketAndBroadcaster = (marketId: string, broadcasterId: string): StationData[] => {
  return stationsData.filter(station => station.marketId === marketId && station.broadcasterId === broadcasterId);
};

export const getStationById = (id: string): StationData | undefined => {
  return stationsData.find(station => station.id === id);
};

export const getAvailableMarkets = (broadcasterIds: string[]): string[] => {
  const marketIds = new Set<string>();
  stationsData.forEach(station => {
    if (broadcasterIds.includes(station.broadcasterId)) {
      marketIds.add(station.marketId);
    }
  });
  return Array.from(marketIds);
};

export const getAvailableBroadcasters = (marketIds: string[]): string[] => {
  const broadcasterIds = new Set<string>();
  stationsData.forEach(station => {
    if (marketIds.includes(station.marketId)) {
      broadcasterIds.add(station.broadcasterId);
    }
  });
  return Array.from(broadcasterIds);
};
