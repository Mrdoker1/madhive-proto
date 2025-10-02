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
    id: 'gray-zhpb-new',
    name: 'ZHPB-TV (Gray New)',
    marketId: 'new-york-ny',
    broadcasterId: 'gray',
    cpm: '$24.97',
    marketShare: 24,
    audienceSize: 2016000
  },
  {
    id: 'entravision-yciv-new',
    name: 'YCIV-TV (Entravision New)',
    marketId: 'new-york-ny',
    broadcasterId: 'entravision',
    cpm: '$23.23',
    marketShare: 29,
    audienceSize: 2436000
  },
  {
    id: 'nbc-wkqg-new',
    name: 'WKQG-TV (NBC New)',
    marketId: 'new-york-ny',
    broadcasterId: 'nbc',
    cpm: '$23.43',
    marketShare: 30,
    audienceSize: 2520000
  },
  {
    id: 'nexstar-[zyr-new',
    name: '[ZYR-TV (Nexstar New)',
    marketId: 'new-york-ny',
    broadcasterId: 'nexstar',
    cpm: '$24.88',
    marketShare: 16,
    audienceSize: 1344000
  },
  {
    id: 'nexstar-xvot-los',
    name: 'XVOT-TV (Nexstar Los)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'nexstar',
    cpm: '$25.99',
    marketShare: 26,
    audienceSize: 3432000
  },
  {
    id: 'news-press-gazette-yrny-los',
    name: 'YRNY-TV (News Press Gazette Los)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.65',
    marketShare: 19,
    audienceSize: 2508000
  },
  {
    id: 'abc-zdoe-los',
    name: 'ZDOE-TV (ABC Los)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'abc',
    cpm: '$25.10',
    marketShare: 25,
    audienceSize: 3300000
  },
  {
    id: 'hearst-zjwp-los',
    name: 'ZJWP-TV (Hearst Los)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'hearst',
    cpm: '$24.41',
    marketShare: 33,
    audienceSize: 4356000
  },
  {
    id: 'gray-ztwp-los',
    name: 'ZTWP-TV (Gray Los)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'gray',
    cpm: '$25.76',
    marketShare: 25,
    audienceSize: 3300000
  },
  {
    id: 'scripps-xsys-los',
    name: 'XSYS-TV (Scripps Los)',
    marketId: 'los-angeles-ca',
    broadcasterId: 'scripps',
    cpm: '$24.51',
    marketShare: 25,
    audienceSize: 3300000
  },
  {
    id: 'hubbard-broadcasting-wdye-chicago',
    name: 'WDYE-TV (Hubbard Broadcasting Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.71',
    marketShare: 22,
    audienceSize: 2112000
  },
  {
    id: 'gray-wyok-chicago',
    name: 'WYOK-TV (Gray Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'gray',
    cpm: '$25.95',
    marketShare: 30,
    audienceSize: 2880000
  },
  {
    id: 'univision-xohd-chicago',
    name: 'XOHD-TV (Univision Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'univision',
    cpm: '$25.34',
    marketShare: 26,
    audienceSize: 2496000
  },
  {
    id: 'hearst-ykqe-chicago',
    name: 'YKQE-TV (Hearst Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'hearst',
    cpm: '$25.54',
    marketShare: 19,
    audienceSize: 1824000
  },
  {
    id: 'nbc-xawt-chicago',
    name: 'XAWT-TV (NBC Chicago)',
    marketId: 'chicago-il',
    broadcasterId: 'nbc',
    cpm: '$24.06',
    marketShare: 31,
    audienceSize: 2976000
  },
  {
    id: 'nexstar-xytm-dallas',
    name: 'XYTM-TV (Nexstar Dallas-Ft.)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'nexstar',
    cpm: '$24.54',
    marketShare: 24,
    audienceSize: 1824000
  },
  {
    id: 'hearst-xkyq-dallas',
    name: 'XKYQ-TV (Hearst Dallas-Ft.)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'hearst',
    cpm: '$25.88',
    marketShare: 27,
    audienceSize: 2052000
  },
  {
    id: 'scripps-ypia-dallas',
    name: 'YPIA-TV (Scripps Dallas-Ft.)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'scripps',
    cpm: '$23.81',
    marketShare: 22,
    audienceSize: 1672000
  },
  {
    id: 'entravision-wqpe-dallas',
    name: 'WQPE-TV (Entravision Dallas-Ft.)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'entravision',
    cpm: '$24.55',
    marketShare: 22,
    audienceSize: 1672000
  },
  {
    id: 'univision-[ktz-dallas',
    name: '[KTZ-TV (Univision Dallas-Ft.)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'univision',
    cpm: '$23.89',
    marketShare: 27,
    audienceSize: 2052000
  },
  {
    id: 'abc-zobd-dallas',
    name: 'ZOBD-TV (ABC Dallas-Ft.)',
    marketId: 'dallas-ft-worth-tx',
    broadcasterId: 'abc',
    cpm: '$24.60',
    marketShare: 17,
    audienceSize: 1292000
  },
  {
    id: 'abc-yage-philadelphia',
    name: 'YAGE-TV (ABC Philadelph)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'abc',
    cpm: '$23.36',
    marketShare: 18,
    audienceSize: 1116000
  },
  {
    id: 'news-press-gazette-xoea-philadelphia',
    name: 'XOEA-TV (News Press Gazette Philadelph)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.82',
    marketShare: 31,
    audienceSize: 1922000
  },
  {
    id: 'scripps-yolp-philadelphia',
    name: 'YOLP-TV (Scripps Philadelph)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'scripps',
    cpm: '$25.46',
    marketShare: 26,
    audienceSize: 1612000
  },
  {
    id: 'morgan-murphy-ximo-philadelphia',
    name: 'XIMO-TV (Morgan Murphy Philadelph)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'morgan-murphy',
    cpm: '$25.52',
    marketShare: 32,
    audienceSize: 1984000
  },
  {
    id: 'entravision-[nil-philadelphia',
    name: '[NIL-TV (Entravision Philadelph)',
    marketId: 'philadelphia-pa',
    broadcasterId: 'entravision',
    cpm: '$25.24',
    marketShare: 33,
    audienceSize: 2046000
  },
  {
    id: 'nexstar-wcda-houston',
    name: 'WCDA-TV (Nexstar Houston.)',
    marketId: 'houston-tx',
    broadcasterId: 'nexstar',
    cpm: '$25.16',
    marketShare: 21,
    audienceSize: 1491000
  },
  {
    id: 'nbc-xjwp-houston',
    name: 'XJWP-TV (NBC Houston.)',
    marketId: 'houston-tx',
    broadcasterId: 'nbc',
    cpm: '$25.60',
    marketShare: 23,
    audienceSize: 1633000
  },
  {
    id: 'entravision-wszl-houston',
    name: 'WSZL-TV (Entravision Houston.)',
    marketId: 'houston-tx',
    broadcasterId: 'entravision',
    cpm: '$24.18',
    marketShare: 19,
    audienceSize: 1349000
  },
  {
    id: 'cbs-wvkv-houston',
    name: 'WVKV-TV (CBS Houston.)',
    marketId: 'houston-tx',
    broadcasterId: 'cbs',
    cpm: '$24.65',
    marketShare: 21,
    audienceSize: 1491000
  },
  {
    id: 'gray-[clm-atlanta',
    name: '[CLM-TV (Gray Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'gray',
    cpm: '$25.54',
    marketShare: 30,
    audienceSize: 1830000
  },
  {
    id: 'cbs-ywgy-atlanta',
    name: 'YWGY-TV (CBS Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'cbs',
    cpm: '$25.10',
    marketShare: 23,
    audienceSize: 1403000
  },
  {
    id: 'univision-wqiq-atlanta',
    name: 'WQIQ-TV (Univision Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'univision',
    cpm: '$23.71',
    marketShare: 18,
    audienceSize: 1098000
  },
  {
    id: 'abc-zzbs-atlanta',
    name: 'ZZBS-TV (ABC Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'abc',
    cpm: '$24.03',
    marketShare: 33,
    audienceSize: 2013000
  },
  {
    id: 'nexstar-whqj-atlanta',
    name: 'WHQJ-TV (Nexstar Atlanta)',
    marketId: 'atlanta-ga',
    broadcasterId: 'nexstar',
    cpm: '$24.02',
    marketShare: 33,
    audienceSize: 2013000
  },
  {
    id: 'scripps-xlsr-washington',
    name: 'XLSR-TV (Scripps Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'scripps',
    cpm: '$24.26',
    marketShare: 28,
    audienceSize: 1764000
  },
  {
    id: 'cbs-yiny-washington',
    name: 'YINY-TV (CBS Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'cbs',
    cpm: '$23.81',
    marketShare: 30,
    audienceSize: 1890000
  },
  {
    id: 'entravision-[zmu-washington',
    name: '[ZMU-TV (Entravision Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'entravision',
    cpm: '$23.53',
    marketShare: 27,
    audienceSize: 1701000
  },
  {
    id: 'nbc-whvj-washington',
    name: 'WHVJ-TV (NBC Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'nbc',
    cpm: '$24.84',
    marketShare: 16,
    audienceSize: 1008000
  },
  {
    id: 'tegna-zpqe-washington',
    name: 'ZPQE-TV (TEGNA Washington)',
    marketId: 'washington-dc',
    broadcasterId: 'tegna',
    cpm: '$25.65',
    marketShare: 25,
    audienceSize: 1575000
  },
  {
    id: 'hearst-xcql-boston',
    name: 'XCQL-TV (Hearst Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'hearst',
    cpm: '$23.80',
    marketShare: 18,
    audienceSize: 882000
  },
  {
    id: 'nbc-yrww-boston',
    name: 'YRWW-TV (NBC Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'nbc',
    cpm: '$24.27',
    marketShare: 22,
    audienceSize: 1078000
  },
  {
    id: 'univision-zihw-boston',
    name: 'ZIHW-TV (Univision Boston)',
    marketId: 'boston-ma',
    broadcasterId: 'univision',
    cpm: '$25.53',
    marketShare: 18,
    audienceSize: 882000
  },
  {
    id: 'cbs-ystl-san',
    name: 'YSTL-TV (CBS San)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'cbs',
    cpm: '$25.98',
    marketShare: 27,
    audienceSize: 2106000
  },
  {
    id: 'entravision-zelf-san',
    name: 'ZELF-TV (Entravision San)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'entravision',
    cpm: '$23.51',
    marketShare: 33,
    audienceSize: 2574000
  },
  {
    id: 'gray-wqiw-san',
    name: 'WQIW-TV (Gray San)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'gray',
    cpm: '$23.43',
    marketShare: 18,
    audienceSize: 1404000
  },
  {
    id: 'hubbard-broadcasting-wuca-san',
    name: 'WUCA-TV (Hubbard Broadcasting San)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.27',
    marketShare: 20,
    audienceSize: 1560000
  },
  {
    id: 'univision-xirm-san',
    name: 'XIRM-TV (Univision San)',
    marketId: 'san-francisco-ca',
    broadcasterId: 'univision',
    cpm: '$25.17',
    marketShare: 16,
    audienceSize: 1248000
  },
  {
    id: 'abc-wxlt-tampa',
    name: 'WXLT-TV (ABC Tampa-St.)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'abc',
    cpm: '$25.15',
    marketShare: 31,
    audienceSize: 992000
  },
  {
    id: 'scripps-xfdc-tampa',
    name: 'XFDC-TV (Scripps Tampa-St.)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'scripps',
    cpm: '$24.73',
    marketShare: 18,
    audienceSize: 576000
  },
  {
    id: 'news-press-gazette-xvvt-tampa',
    name: 'XVVT-TV (News Press Gazette Tampa-St.)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.29',
    marketShare: 30,
    audienceSize: 960000
  },
  {
    id: 'hubbard-broadcasting-wfsz-tampa',
    name: 'WFSZ-TV (Hubbard Broadcasting Tampa-St.)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.51',
    marketShare: 20,
    audienceSize: 640000
  },
  {
    id: 'cbs-[rlv-tampa',
    name: '[RLV-TV (CBS Tampa-St.)',
    marketId: 'tampa-st-petersburg-fl',
    broadcasterId: 'cbs',
    cpm: '$23.35',
    marketShare: 17,
    audienceSize: 544000
  },
  {
    id: 'univision-wobb-phoenix',
    name: 'WOBB-TV (Univision Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'univision',
    cpm: '$24.67',
    marketShare: 25,
    audienceSize: 1250000
  },
  {
    id: 'abc-[mgw-phoenix',
    name: '[MGW-TV (ABC Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'abc',
    cpm: '$24.41',
    marketShare: 21,
    audienceSize: 1050000
  },
  {
    id: 'cbs-wfcb-phoenix',
    name: 'WFCB-TV (CBS Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'cbs',
    cpm: '$25.46',
    marketShare: 15,
    audienceSize: 750000
  },
  {
    id: 'scripps-zbli-phoenix',
    name: 'ZBLI-TV (Scripps Phoenix)',
    marketId: 'phoenix-az',
    broadcasterId: 'scripps',
    cpm: '$24.51',
    marketShare: 33,
    audienceSize: 1650000
  },
  {
    id: 'nbc-wqkx-seattle',
    name: 'WQKX-TV (NBC Seattle-Ta)',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'nbc',
    cpm: '$23.16',
    marketShare: 16,
    audienceSize: 656000
  },
  {
    id: 'news-press-gazette-[jrb-seattle',
    name: '[JRB-TV (News Press Gazette Seattle-Ta)',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.18',
    marketShare: 21,
    audienceSize: 861000
  },
  {
    id: 'hearst-zoqn-seattle',
    name: 'ZOQN-TV (Hearst Seattle-Ta)',
    marketId: 'seattle-tacoma-wa',
    broadcasterId: 'hearst',
    cpm: '$24.72',
    marketShare: 27,
    audienceSize: 1107000
  },
  {
    id: 'gray-zdvd-detroit',
    name: 'ZDVD-TV (Gray Detroit)',
    marketId: 'detroit-mi',
    broadcasterId: 'gray',
    cpm: '$24.44',
    marketShare: 29,
    audienceSize: 1247000
  },
  {
    id: 'cbs-xbve-detroit',
    name: 'XBVE-TV (CBS Detroit)',
    marketId: 'detroit-mi',
    broadcasterId: 'cbs',
    cpm: '$23.72',
    marketShare: 20,
    audienceSize: 860000
  },
  {
    id: 'nbc-yqcu-detroit',
    name: 'YQCU-TV (NBC Detroit)',
    marketId: 'detroit-mi',
    broadcasterId: 'nbc',
    cpm: '$23.58',
    marketShare: 16,
    audienceSize: 688000
  },
  {
    id: 'scripps-yuvi-detroit',
    name: 'YUVI-TV (Scripps Detroit)',
    marketId: 'detroit-mi',
    broadcasterId: 'scripps',
    cpm: '$23.93',
    marketShare: 21,
    audienceSize: 903000
  },
  {
    id: 'entravision-ycta-detroit',
    name: 'YCTA-TV (Entravision Detroit)',
    marketId: 'detroit-mi',
    broadcasterId: 'entravision',
    cpm: '$24.61',
    marketShare: 25,
    audienceSize: 1075000
  },
  {
    id: 'tegna-[mmp-detroit',
    name: '[MMP-TV (TEGNA Detroit)',
    marketId: 'detroit-mi',
    broadcasterId: 'tegna',
    cpm: '$25.80',
    marketShare: 22,
    audienceSize: 946000
  },
  {
    id: 'hearst-yrxk-orlando',
    name: 'YRXK-TV (Hearst Orlando-Da)',
    marketId: 'orlando-fl',
    broadcasterId: 'hearst',
    cpm: '$25.57',
    marketShare: 22,
    audienceSize: 616000
  },
  {
    id: 'nexstar-zmqj-orlando',
    name: 'ZMQJ-TV (Nexstar Orlando-Da)',
    marketId: 'orlando-fl',
    broadcasterId: 'nexstar',
    cpm: '$25.29',
    marketShare: 20,
    audienceSize: 560000
  },
  {
    id: 'abc-zsjm-orlando',
    name: 'ZSJM-TV (ABC Orlando-Da)',
    marketId: 'orlando-fl',
    broadcasterId: 'abc',
    cpm: '$25.51',
    marketShare: 18,
    audienceSize: 504000
  },
  {
    id: 'tegna-[pat-orlando',
    name: '[PAT-TV (TEGNA Orlando-Da)',
    marketId: 'orlando-fl',
    broadcasterId: 'tegna',
    cpm: '$24.14',
    marketShare: 21,
    audienceSize: 588000
  },
  {
    id: 'news-press-gazette-yshp-orlando',
    name: 'YSHP-TV (News Press Gazette Orlando-Da)',
    marketId: 'orlando-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.72',
    marketShare: 20,
    audienceSize: 560000
  },
  {
    id: 'scripps-xcgp-orlando',
    name: 'XCGP-TV (Scripps Orlando-Da)',
    marketId: 'orlando-fl',
    broadcasterId: 'scripps',
    cpm: '$23.45',
    marketShare: 15,
    audienceSize: 420000
  },
  {
    id: 'tegna-yswm-minneapolis',
    name: 'YSWM-TV (TEGNA Minneapoli)',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'tegna',
    cpm: '$23.40',
    marketShare: 26,
    audienceSize: 910000
  },
  {
    id: 'gray-yysr-minneapolis',
    name: 'YYSR-TV (Gray Minneapoli)',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'gray',
    cpm: '$25.57',
    marketShare: 18,
    audienceSize: 630000
  },
  {
    id: 'nexstar-wucm-minneapolis',
    name: 'WUCM-TV (Nexstar Minneapoli)',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'nexstar',
    cpm: '$24.10',
    marketShare: 34,
    audienceSize: 1190000
  },
  {
    id: 'nbc-wlbl-minneapolis',
    name: 'WLBL-TV (NBC Minneapoli)',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'nbc',
    cpm: '$25.91',
    marketShare: 29,
    audienceSize: 1014999
  },
  {
    id: 'news-press-gazette-xnbb-minneapolis',
    name: 'XNBB-TV (News Press Gazette Minneapoli)',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.27',
    marketShare: 34,
    audienceSize: 1190000
  },
  {
    id: 'cbs-ykqc-minneapolis',
    name: 'YKQC-TV (CBS Minneapoli)',
    marketId: 'minneapolis-st-paul-mn',
    broadcasterId: 'cbs',
    cpm: '$24.24',
    marketShare: 15,
    audienceSize: 525000
  },
  {
    id: 'univision-ztpo-denver',
    name: 'ZTPO-TV (Univision Denver)',
    marketId: 'denver-co',
    broadcasterId: 'univision',
    cpm: '$23.44',
    marketShare: 34,
    audienceSize: 986000
  },
  {
    id: 'abc-[yol-denver',
    name: '[YOL-TV (ABC Denver)',
    marketId: 'denver-co',
    broadcasterId: 'abc',
    cpm: '$24.84',
    marketShare: 21,
    audienceSize: 609000
  },
  {
    id: 'hearst-ybse-denver',
    name: 'YBSE-TV (Hearst Denver)',
    marketId: 'denver-co',
    broadcasterId: 'hearst',
    cpm: '$24.96',
    marketShare: 24,
    audienceSize: 696000
  },
  {
    id: 'entravision-wexh-denver',
    name: 'WEXH-TV (Entravision Denver)',
    marketId: 'denver-co',
    broadcasterId: 'entravision',
    cpm: '$24.31',
    marketShare: 28,
    audienceSize: 812000
  },
  {
    id: 'news-press-gazette-zugr-miami',
    name: 'ZUGR-TV (News Press Gazette Miami-Ft.)',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$23.50',
    marketShare: 25,
    audienceSize: 1550000
  },
  {
    id: 'scripps-[kjo-miami',
    name: '[KJO-TV (Scripps Miami-Ft.)',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'scripps',
    cpm: '$23.25',
    marketShare: 18,
    audienceSize: 1116000
  },
  {
    id: 'tegna-xfnx-miami',
    name: 'XFNX-TV (TEGNA Miami-Ft.)',
    marketId: 'miami-ft-lauderdale-fl',
    broadcasterId: 'tegna',
    cpm: '$24.71',
    marketShare: 23,
    audienceSize: 1426000
  },
  {
    id: 'gray-xsyj-cleveland',
    name: 'XSYJ-TV (Gray Cleveland-)',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'gray',
    cpm: '$23.73',
    marketShare: 28,
    audienceSize: 812000
  },
  {
    id: 'nbc-zbvo-cleveland',
    name: 'ZBVO-TV (NBC Cleveland-)',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'nbc',
    cpm: '$23.76',
    marketShare: 23,
    audienceSize: 667000
  },
  {
    id: 'news-press-gazette-wwxj-cleveland',
    name: 'WWXJ-TV (News Press Gazette Cleveland-)',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.27',
    marketShare: 18,
    audienceSize: 522000
  },
  {
    id: 'scripps-zszq-cleveland',
    name: 'ZSZQ-TV (Scripps Cleveland-)',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'scripps',
    cpm: '$24.56',
    marketShare: 27,
    audienceSize: 783000
  },
  {
    id: 'cbs-[hqu-cleveland',
    name: '[HQU-TV (CBS Cleveland-)',
    marketId: 'cleveland-akron-oh',
    broadcasterId: 'cbs',
    cpm: '$23.85',
    marketShare: 31,
    audienceSize: 899000
  },
  {
    id: 'gray-yfhf-sacramento',
    name: 'YFHF-TV (Gray Sacramento)',
    marketId: 'sacramento-ca',
    broadcasterId: 'gray',
    cpm: '$24.89',
    marketShare: 22,
    audienceSize: 528000
  },
  {
    id: 'abc-ymdb-sacramento',
    name: 'YMDB-TV (ABC Sacramento)',
    marketId: 'sacramento-ca',
    broadcasterId: 'abc',
    cpm: '$24.85',
    marketShare: 25,
    audienceSize: 600000
  },
  {
    id: 'hubbard-broadcasting-wdgm-sacramento',
    name: 'WDGM-TV (Hubbard Broadcasting Sacramento)',
    marketId: 'sacramento-ca',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.76',
    marketShare: 22,
    audienceSize: 528000
  },
  {
    id: 'morgan-murphy-yogz-sacramento',
    name: 'YOGZ-TV (Morgan Murphy Sacramento)',
    marketId: 'sacramento-ca',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.14',
    marketShare: 31,
    audienceSize: 744000
  },
  {
    id: 'news-press-gazette-yxas-sacramento',
    name: 'YXAS-TV (News Press Gazette Sacramento)',
    marketId: 'sacramento-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.98',
    marketShare: 23,
    audienceSize: 552000
  },
  {
    id: 'entravision-xmkw-charlotte',
    name: 'XMKW-TV (Entravision Charlotte)',
    marketId: 'charlotte-nc',
    broadcasterId: 'entravision',
    cpm: '$23.90',
    marketShare: 19,
    audienceSize: 494000
  },
  {
    id: 'abc-zcyu-charlotte',
    name: 'ZCYU-TV (ABC Charlotte)',
    marketId: 'charlotte-nc',
    broadcasterId: 'abc',
    cpm: '$24.90',
    marketShare: 23,
    audienceSize: 598000
  },
  {
    id: 'hubbard-broadcasting-[lwd-charlotte',
    name: '[LWD-TV (Hubbard Broadcasting Charlotte)',
    marketId: 'charlotte-nc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.44',
    marketShare: 33,
    audienceSize: 858000
  },
  {
    id: 'scripps-zpny-raleigh',
    name: 'ZPNY-TV (Scripps Raleigh-Du)',
    marketId: 'raleigh-durham-nc',
    broadcasterId: 'scripps',
    cpm: '$25.99',
    marketShare: 22,
    audienceSize: 484000
  },
  {
    id: 'abc-yfxe-raleigh',
    name: 'YFXE-TV (ABC Raleigh-Du)',
    marketId: 'raleigh-durham-nc',
    broadcasterId: 'abc',
    cpm: '$24.82',
    marketShare: 31,
    audienceSize: 682000
  },
  {
    id: 'nexstar-wupq-raleigh',
    name: 'WUPQ-TV (Nexstar Raleigh-Du)',
    marketId: 'raleigh-durham-nc',
    broadcasterId: 'nexstar',
    cpm: '$23.44',
    marketShare: 23,
    audienceSize: 506000
  },
  {
    id: 'scripps-zypb-portland',
    name: 'ZYPB-TV (Scripps Portland)',
    marketId: 'portland-or',
    broadcasterId: 'scripps',
    cpm: '$25.17',
    marketShare: 21,
    audienceSize: 525000
  },
  {
    id: 'tegna-wbod-portland',
    name: 'WBOD-TV (TEGNA Portland)',
    marketId: 'portland-or',
    broadcasterId: 'tegna',
    cpm: '$25.24',
    marketShare: 17,
    audienceSize: 425000
  },
  {
    id: 'hearst-yxpp-portland',
    name: 'YXPP-TV (Hearst Portland)',
    marketId: 'portland-or',
    broadcasterId: 'hearst',
    cpm: '$24.41',
    marketShare: 16,
    audienceSize: 400000
  },
  {
    id: 'univision-[ddj-portland',
    name: '[DDJ-TV (Univision Portland)',
    marketId: 'portland-or',
    broadcasterId: 'univision',
    cpm: '$25.36',
    marketShare: 27,
    audienceSize: 675000
  },
  {
    id: 'nbc-xeja-portland',
    name: 'XEJA-TV (NBC Portland)',
    marketId: 'portland-or',
    broadcasterId: 'nbc',
    cpm: '$23.17',
    marketShare: 21,
    audienceSize: 525000
  },
  {
    id: 'nbc-zbcs-st',
    name: 'ZBCS-TV (NBC St.)',
    marketId: 'st-louis-mo',
    broadcasterId: 'nbc',
    cpm: '$23.03',
    marketShare: 23,
    audienceSize: 644000
  },
  {
    id: 'univision-xpao-st',
    name: 'XPAO-TV (Univision St.)',
    marketId: 'st-louis-mo',
    broadcasterId: 'univision',
    cpm: '$25.40',
    marketShare: 18,
    audienceSize: 504000
  },
  {
    id: 'nexstar-wxiu-st',
    name: 'WXIU-TV (Nexstar St.)',
    marketId: 'st-louis-mo',
    broadcasterId: 'nexstar',
    cpm: '$23.57',
    marketShare: 26,
    audienceSize: 728000
  },
  {
    id: 'tegna-waov-indianapolis',
    name: 'WAOV-TV (TEGNA Indianapol)',
    marketId: 'indianapolis-in',
    broadcasterId: 'tegna',
    cpm: '$23.93',
    marketShare: 17,
    audienceSize: 357000
  },
  {
    id: 'nexstar-xvoy-indianapolis',
    name: 'XVOY-TV (Nexstar Indianapol)',
    marketId: 'indianapolis-in',
    broadcasterId: 'nexstar',
    cpm: '$24.93',
    marketShare: 24,
    audienceSize: 504000
  },
  {
    id: 'nbc-zbwu-indianapolis',
    name: 'ZBWU-TV (NBC Indianapol)',
    marketId: 'indianapolis-in',
    broadcasterId: 'nbc',
    cpm: '$25.58',
    marketShare: 29,
    audienceSize: 609000
  },
  {
    id: 'cbs-ztzh-indianapolis',
    name: 'ZTZH-TV (CBS Indianapol)',
    marketId: 'indianapolis-in',
    broadcasterId: 'cbs',
    cpm: '$24.13',
    marketShare: 33,
    audienceSize: 693000
  },
  {
    id: 'hubbard-broadcasting-yvuo-nashville',
    name: 'YVUO-TV (Hubbard Broadcasting Nashville)',
    marketId: 'nashville-tn',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.60',
    marketShare: 24,
    audienceSize: 456000
  },
  {
    id: 'hearst-xgth-nashville',
    name: 'XGTH-TV (Hearst Nashville)',
    marketId: 'nashville-tn',
    broadcasterId: 'hearst',
    cpm: '$23.87',
    marketShare: 30,
    audienceSize: 570000
  },
  {
    id: 'univision-yaoz-nashville',
    name: 'YAOZ-TV (Univision Nashville)',
    marketId: 'nashville-tn',
    broadcasterId: 'univision',
    cpm: '$25.20',
    marketShare: 31,
    audienceSize: 589000
  },
  {
    id: 'news-press-gazette-weft-nashville',
    name: 'WEFT-TV (News Press Gazette Nashville)',
    marketId: 'nashville-tn',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.99',
    marketShare: 24,
    audienceSize: 456000
  },
  {
    id: 'tegna-yaaz-nashville',
    name: 'YAAZ-TV (TEGNA Nashville)',
    marketId: 'nashville-tn',
    broadcasterId: 'tegna',
    cpm: '$23.89',
    marketShare: 24,
    audienceSize: 456000
  },
  {
    id: 'nbc-zigd-pittsburgh',
    name: 'ZIGD-TV (NBC Pittsburgh)',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'nbc',
    cpm: '$24.64',
    marketShare: 17,
    audienceSize: 391000
  },
  {
    id: 'gray-xhxu-pittsburgh',
    name: 'XHXU-TV (Gray Pittsburgh)',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'gray',
    cpm: '$25.15',
    marketShare: 29,
    audienceSize: 667000
  },
  {
    id: 'nexstar-wsjd-pittsburgh',
    name: 'WSJD-TV (Nexstar Pittsburgh)',
    marketId: 'pittsburgh-pa',
    broadcasterId: 'nexstar',
    cpm: '$23.04',
    marketShare: 34,
    audienceSize: 782000
  },
  {
    id: 'gray-zmal-salt',
    name: 'ZMAL-TV (Gray Salt)',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'gray',
    cpm: '$24.61',
    marketShare: 18,
    audienceSize: 216000
  },
  {
    id: 'scripps-wlzw-salt',
    name: 'WLZW-TV (Scripps Salt)',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'scripps',
    cpm: '$24.90',
    marketShare: 26,
    audienceSize: 312000
  },
  {
    id: 'nexstar-yzri-salt',
    name: 'YZRI-TV (Nexstar Salt)',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'nexstar',
    cpm: '$25.26',
    marketShare: 32,
    audienceSize: 384000
  },
  {
    id: 'news-press-gazette-zcxi-salt',
    name: 'ZCXI-TV (News Press Gazette Salt)',
    marketId: 'salt-lake-city-ut',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.66',
    marketShare: 33,
    audienceSize: 396000
  },
  {
    id: 'univision-yshd-baltimore',
    name: 'YSHD-TV (Univision Baltimore)',
    marketId: 'baltimore-md',
    broadcasterId: 'univision',
    cpm: '$25.01',
    marketShare: 32,
    audienceSize: 896000
  },
  {
    id: 'scripps-[gwo-baltimore',
    name: '[GWO-TV (Scripps Baltimore)',
    marketId: 'baltimore-md',
    broadcasterId: 'scripps',
    cpm: '$23.63',
    marketShare: 16,
    audienceSize: 448000
  },
  {
    id: 'morgan-murphy-[wxw-baltimore',
    name: '[WXW-TV (Morgan Murphy Baltimore)',
    marketId: 'baltimore-md',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.23',
    marketShare: 22,
    audienceSize: 616000
  },
  {
    id: 'hubbard-broadcasting-ygpv-baltimore',
    name: 'YGPV-TV (Hubbard Broadcasting Baltimore)',
    marketId: 'baltimore-md',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.31',
    marketShare: 33,
    audienceSize: 924000
  },
  {
    id: 'hearst-xoli-baltimore',
    name: 'XOLI-TV (Hearst Baltimore)',
    marketId: 'baltimore-md',
    broadcasterId: 'hearst',
    cpm: '$25.79',
    marketShare: 26,
    audienceSize: 728000
  },
  {
    id: 'abc-[cjh-san',
    name: '[CJH-TV (ABC San)',
    marketId: 'san-diego-ca',
    broadcasterId: 'abc',
    cpm: '$23.96',
    marketShare: 16,
    audienceSize: 528000
  },
  {
    id: 'scripps-yxmj-san',
    name: 'YXMJ-TV (Scripps San)',
    marketId: 'san-diego-ca',
    broadcasterId: 'scripps',
    cpm: '$24.85',
    marketShare: 20,
    audienceSize: 660000
  },
  {
    id: 'cbs-[tqn-san',
    name: '[TQN-TV (CBS San)',
    marketId: 'san-diego-ca',
    broadcasterId: 'cbs',
    cpm: '$23.86',
    marketShare: 26,
    audienceSize: 858000
  },
  {
    id: 'univision-yxsj-san',
    name: 'YXSJ-TV (Univision San)',
    marketId: 'san-antonio-tx',
    broadcasterId: 'univision',
    cpm: '$25.56',
    marketShare: 19,
    audienceSize: 475000
  },
  {
    id: 'gray-wkjl-san',
    name: 'WKJL-TV (Gray San)',
    marketId: 'san-antonio-tx',
    broadcasterId: 'gray',
    cpm: '$23.12',
    marketShare: 29,
    audienceSize: 725000
  },
  {
    id: 'scripps-zqpl-san',
    name: 'ZQPL-TV (Scripps San)',
    marketId: 'san-antonio-tx',
    broadcasterId: 'scripps',
    cpm: '$25.21',
    marketShare: 27,
    audienceSize: 675000
  },
  {
    id: 'hubbard-broadcasting-ytve-san',
    name: 'YTVE-TV (Hubbard Broadcasting San)',
    marketId: 'san-antonio-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.18',
    marketShare: 28,
    audienceSize: 700000
  },
  {
    id: 'news-press-gazette-yguo-hartford',
    name: 'YGUO-TV (News Press Gazette Hartford)',
    marketId: 'hartford-ct',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.94',
    marketShare: 22,
    audienceSize: 396000
  },
  {
    id: 'gray-ytrl-hartford',
    name: 'YTRL-TV (Gray Hartford)',
    marketId: 'hartford-ct',
    broadcasterId: 'gray',
    cpm: '$23.34',
    marketShare: 28,
    audienceSize: 504000
  },
  {
    id: 'morgan-murphy-[xel-hartford',
    name: '[XEL-TV (Morgan Murphy Hartford)',
    marketId: 'hartford-ct',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.62',
    marketShare: 16,
    audienceSize: 288000
  },
  {
    id: 'univision-yuem-hartford',
    name: 'YUEM-TV (Univision Hartford)',
    marketId: 'hartford-ct',
    broadcasterId: 'univision',
    cpm: '$23.85',
    marketShare: 33,
    audienceSize: 594000
  },
  {
    id: 'cbs-wldr-kansas',
    name: 'WLDR-TV (CBS Kansas)',
    marketId: 'kansas-city-mo',
    broadcasterId: 'cbs',
    cpm: '$25.24',
    marketShare: 16,
    audienceSize: 336000
  },
  {
    id: 'gray-wrzg-kansas',
    name: 'WRZG-TV (Gray Kansas)',
    marketId: 'kansas-city-mo',
    broadcasterId: 'gray',
    cpm: '$23.60',
    marketShare: 19,
    audienceSize: 399000
  },
  {
    id: 'hearst-[vrp-kansas',
    name: '[VRP-TV (Hearst Kansas)',
    marketId: 'kansas-city-mo',
    broadcasterId: 'hearst',
    cpm: '$23.45',
    marketShare: 18,
    audienceSize: 378000
  },
  {
    id: 'nexstar-wjad-kansas',
    name: 'WJAD-TV (Nexstar Kansas)',
    marketId: 'kansas-city-mo',
    broadcasterId: 'nexstar',
    cpm: '$25.35',
    marketShare: 22,
    audienceSize: 462000
  },
  {
    id: 'tegna-[xvw-kansas',
    name: '[XVW-TV (TEGNA Kansas)',
    marketId: 'kansas-city-mo',
    broadcasterId: 'tegna',
    cpm: '$23.94',
    marketShare: 15,
    audienceSize: 315000
  },
  {
    id: 'scripps-[ecz-austin',
    name: '[ECZ-TV (Scripps Austin)',
    marketId: 'austin-tx',
    broadcasterId: 'scripps',
    cpm: '$25.51',
    marketShare: 27,
    audienceSize: 594000
  },
  {
    id: 'cbs-xxvn-austin',
    name: 'XXVN-TV (CBS Austin)',
    marketId: 'austin-tx',
    broadcasterId: 'cbs',
    cpm: '$23.90',
    marketShare: 21,
    audienceSize: 462000
  },
  {
    id: 'morgan-murphy-wfuj-austin',
    name: 'WFUJ-TV (Morgan Murphy Austin)',
    marketId: 'austin-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.04',
    marketShare: 20,
    audienceSize: 440000
  },
  {
    id: 'gray-xlul-austin',
    name: 'XLUL-TV (Gray Austin)',
    marketId: 'austin-tx',
    broadcasterId: 'gray',
    cpm: '$24.87',
    marketShare: 19,
    audienceSize: 418000
  },
  {
    id: 'abc-xufe-columbus',
    name: 'XUFE-TV (ABC Columbus.)',
    marketId: 'columbus-oh',
    broadcasterId: 'abc',
    cpm: '$23.91',
    marketShare: 18,
    audienceSize: 378000
  },
  {
    id: 'entravision-[ypp-columbus',
    name: '[YPP-TV (Entravision Columbus.)',
    marketId: 'columbus-oh',
    broadcasterId: 'entravision',
    cpm: '$24.42',
    marketShare: 21,
    audienceSize: 441000
  },
  {
    id: 'cbs-yxao-columbus',
    name: 'YXAO-TV (CBS Columbus.)',
    marketId: 'columbus-oh',
    broadcasterId: 'cbs',
    cpm: '$23.77',
    marketShare: 15,
    audienceSize: 315000
  },
  {
    id: 'nbc-[ras-columbus',
    name: '[RAS-TV (NBC Columbus.)',
    marketId: 'columbus-oh',
    broadcasterId: 'nbc',
    cpm: '$24.93',
    marketShare: 19,
    audienceSize: 399000
  },
  {
    id: 'morgan-murphy-xsja-columbus',
    name: 'XSJA-TV (Morgan Murphy Columbus.)',
    marketId: 'columbus-oh',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.87',
    marketShare: 32,
    audienceSize: 672000
  },
  {
    id: 'univision-xboe-columbus',
    name: 'XBOE-TV (Univision Columbus.)',
    marketId: 'columbus-oh',
    broadcasterId: 'univision',
    cpm: '$25.84',
    marketShare: 29,
    audienceSize: 609000
  },
  {
    id: 'abc-zouz-greenville',
    name: 'ZOUZ-TV (ABC Greenville)',
    marketId: 'greenville-sc',
    broadcasterId: 'abc',
    cpm: '$25.17',
    marketShare: 23,
    audienceSize: 345000
  },
  {
    id: 'morgan-murphy-xkja-greenville',
    name: 'XKJA-TV (Morgan Murphy Greenville)',
    marketId: 'greenville-sc',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.17',
    marketShare: 21,
    audienceSize: 315000
  },
  {
    id: 'hubbard-broadcasting-zwuo-greenville',
    name: 'ZWUO-TV (Hubbard Broadcasting Greenville)',
    marketId: 'greenville-sc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.54',
    marketShare: 32,
    audienceSize: 480000
  },
  {
    id: 'cbs-woeu-greenville',
    name: 'WOEU-TV (CBS Greenville)',
    marketId: 'greenville-sc',
    broadcasterId: 'cbs',
    cpm: '$23.12',
    marketShare: 30,
    audienceSize: 450000
  },
  {
    id: 'nbc-ykiz-greenville',
    name: 'YKIZ-TV (NBC Greenville)',
    marketId: 'greenville-sc',
    broadcasterId: 'nbc',
    cpm: '$25.49',
    marketShare: 15,
    audienceSize: 225000
  },
  {
    id: 'gray-[pgx-greenville',
    name: '[PGX-TV (Gray Greenville)',
    marketId: 'greenville-sc',
    broadcasterId: 'gray',
    cpm: '$23.32',
    marketShare: 21,
    audienceSize: 315000
  },
  {
    id: 'abc-xzij-cincinnati',
    name: 'XZIJ-TV (ABC Cincinnati)',
    marketId: 'cincinnati-oh',
    broadcasterId: 'abc',
    cpm: '$24.03',
    marketShare: 26,
    audienceSize: 572000
  },
  {
    id: 'cbs-wuim-cincinnati',
    name: 'WUIM-TV (CBS Cincinnati)',
    marketId: 'cincinnati-oh',
    broadcasterId: 'cbs',
    cpm: '$24.60',
    marketShare: 32,
    audienceSize: 704000
  },
  {
    id: 'nbc-zwls-cincinnati',
    name: 'ZWLS-TV (NBC Cincinnati)',
    marketId: 'cincinnati-oh',
    broadcasterId: 'nbc',
    cpm: '$25.60',
    marketShare: 23,
    audienceSize: 506000
  },
  {
    id: 'news-press-gazette-wtyp-milwaukee',
    name: 'WTYP-TV (News Press Gazette Milwaukee)',
    marketId: 'milwaukee-wi',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.37',
    marketShare: 15,
    audienceSize: 240000
  },
  {
    id: 'nexstar-yytj-milwaukee',
    name: 'YYTJ-TV (Nexstar Milwaukee)',
    marketId: 'milwaukee-wi',
    broadcasterId: 'nexstar',
    cpm: '$24.81',
    marketShare: 30,
    audienceSize: 480000
  },
  {
    id: 'scripps-yovc-milwaukee',
    name: 'YOVC-TV (Scripps Milwaukee)',
    marketId: 'milwaukee-wi',
    broadcasterId: 'scripps',
    cpm: '$25.24',
    marketShare: 26,
    audienceSize: 416000
  },
  {
    id: 'morgan-murphy-xcfd-west',
    name: 'XCFD-TV (Morgan Murphy West)',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.36',
    marketShare: 17,
    audienceSize: 255000
  },
  {
    id: 'univision-wmoj-west',
    name: 'WMOJ-TV (Univision West)',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'univision',
    cpm: '$25.34',
    marketShare: 23,
    audienceSize: 345000
  },
  {
    id: 'entravision-zlef-west',
    name: 'ZLEF-TV (Entravision West)',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'entravision',
    cpm: '$25.73',
    marketShare: 28,
    audienceSize: 420000
  },
  {
    id: 'abc-[gxg-west',
    name: '[GXG-TV (ABC West)',
    marketId: 'west-palm-beach-fl',
    broadcasterId: 'abc',
    cpm: '$24.01',
    marketShare: 29,
    audienceSize: 434999
  },
  {
    id: 'morgan-murphy-yitn-las',
    name: 'YITN-TV (Morgan Murphy Las)',
    marketId: 'las-vegas-nv',
    broadcasterId: 'morgan-murphy',
    cpm: '$24.35',
    marketShare: 22,
    audienceSize: 484000
  },
  {
    id: 'nexstar-wshn-las',
    name: 'WSHN-TV (Nexstar Las)',
    marketId: 'las-vegas-nv',
    broadcasterId: 'nexstar',
    cpm: '$25.34',
    marketShare: 18,
    audienceSize: 396000
  },
  {
    id: 'scripps-yhgw-las',
    name: 'YHGW-TV (Scripps Las)',
    marketId: 'las-vegas-nv',
    broadcasterId: 'scripps',
    cpm: '$25.10',
    marketShare: 17,
    audienceSize: 374000
  },
  {
    id: 'nbc-wlfr-jacksonville',
    name: 'WLFR-TV (NBC Jacksonvil)',
    marketId: 'jacksonville-fl',
    broadcasterId: 'nbc',
    cpm: '$23.19',
    marketShare: 28,
    audienceSize: 420000
  },
  {
    id: 'hubbard-broadcasting-wveg-jacksonville',
    name: 'WVEG-TV (Hubbard Broadcasting Jacksonvil)',
    marketId: 'jacksonville-fl',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$23.49',
    marketShare: 21,
    audienceSize: 315000
  },
  {
    id: 'morgan-murphy-yulz-jacksonville',
    name: 'YULZ-TV (Morgan Murphy Jacksonvil)',
    marketId: 'jacksonville-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.40',
    marketShare: 26,
    audienceSize: 390000
  },
  {
    id: 'tegna-wjoc-harrisburg',
    name: 'WJOC-TV (TEGNA Harrisburg)',
    marketId: 'harrisburg-pa',
    broadcasterId: 'tegna',
    cpm: '$25.99',
    marketShare: 25,
    audienceSize: 300000
  },
  {
    id: 'hubbard-broadcasting-[wjg-harrisburg',
    name: '[WJG-TV (Hubbard Broadcasting Harrisburg)',
    marketId: 'harrisburg-pa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$25.29',
    marketShare: 23,
    audienceSize: 276000
  },
  {
    id: 'news-press-gazette-zqay-harrisburg',
    name: 'ZQAY-TV (News Press Gazette Harrisburg)',
    marketId: 'harrisburg-pa',
    broadcasterId: 'news-press-gazette',
    cpm: '$24.19',
    marketShare: 25,
    audienceSize: 300000
  },
  {
    id: 'morgan-murphy-zytg-harrisburg',
    name: 'ZYTG-TV (Morgan Murphy Harrisburg)',
    marketId: 'harrisburg-pa',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.26',
    marketShare: 24,
    audienceSize: 288000
  },
  {
    id: 'entravision-[lch-harrisburg',
    name: '[LCH-TV (Entravision Harrisburg)',
    marketId: 'harrisburg-pa',
    broadcasterId: 'entravision',
    cpm: '$24.35',
    marketShare: 23,
    audienceSize: 276000
  },
  {
    id: 'abc-[lcb-harrisburg',
    name: '[LCB-TV (ABC Harrisburg)',
    marketId: 'harrisburg-pa',
    broadcasterId: 'abc',
    cpm: '$24.96',
    marketShare: 33,
    audienceSize: 396000
  },
  {
    id: 'gray-yope-grand',
    name: 'YOPE-TV (Gray Grand)',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'gray',
    cpm: '$25.04',
    marketShare: 29,
    audienceSize: 406000
  },
  {
    id: 'nbc-[etg-grand',
    name: '[ETG-TV (NBC Grand)',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'nbc',
    cpm: '$25.70',
    marketShare: 21,
    audienceSize: 294000
  },
  {
    id: 'cbs-[top-grand',
    name: '[TOP-TV (CBS Grand)',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'cbs',
    cpm: '$23.47',
    marketShare: 17,
    audienceSize: 238000
  },
  {
    id: 'univision-ydws-grand',
    name: 'YDWS-TV (Univision Grand)',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'univision',
    cpm: '$24.68',
    marketShare: 15,
    audienceSize: 210000
  },
  {
    id: 'morgan-murphy-wnzh-grand',
    name: 'WNZH-TV (Morgan Murphy Grand)',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'morgan-murphy',
    cpm: '$25.65',
    marketShare: 16,
    audienceSize: 224000
  },
  {
    id: 'scripps-xxft-grand',
    name: 'XXFT-TV (Scripps Grand)',
    marketId: 'grand-rapids-mi',
    broadcasterId: 'scripps',
    cpm: '$24.84',
    marketShare: 30,
    audienceSize: 420000
  },
  {
    id: 'nbc-xrhs-norfolk',
    name: 'XRHS-TV (NBC Norfolk-Po)',
    marketId: 'norfolk-va',
    broadcasterId: 'nbc',
    cpm: '$23.18',
    marketShare: 25,
    audienceSize: 425000
  },
  {
    id: 'tegna-[ikx-norfolk',
    name: '[IKX-TV (TEGNA Norfolk-Po)',
    marketId: 'norfolk-va',
    broadcasterId: 'tegna',
    cpm: '$23.89',
    marketShare: 32,
    audienceSize: 544000
  },
  {
    id: 'news-press-gazette-ylek-norfolk',
    name: 'YLEK-TV (News Press Gazette Norfolk-Po)',
    marketId: 'norfolk-va',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.11',
    marketShare: 34,
    audienceSize: 578000
  },
  {
    id: 'morgan-murphy-xjef-norfolk',
    name: 'XJEF-TV (Morgan Murphy Norfolk-Po)',
    marketId: 'norfolk-va',
    broadcasterId: 'morgan-murphy',
    cpm: '$23.90',
    marketShare: 16,
    audienceSize: 272000
  },
  {
    id: 'nexstar-zykc-norfolk',
    name: 'ZYKC-TV (Nexstar Norfolk-Po)',
    marketId: 'norfolk-va',
    broadcasterId: 'nexstar',
    cpm: '$24.71',
    marketShare: 29,
    audienceSize: 492999
  },
  {
    id: 'entravision-xgxe-birmingham',
    name: 'XGXE-TV (Entravision Birmingham)',
    marketId: 'birmingham-al',
    broadcasterId: 'entravision',
    cpm: '$25.56',
    marketShare: 15,
    audienceSize: 180000
  },
  {
    id: 'abc-xhce-birmingham',
    name: 'XHCE-TV (ABC Birmingham)',
    marketId: 'birmingham-al',
    broadcasterId: 'abc',
    cpm: '$23.26',
    marketShare: 22,
    audienceSize: 264000
  },
  {
    id: 'hearst-zbqb-birmingham',
    name: 'ZBQB-TV (Hearst Birmingham)',
    marketId: 'birmingham-al',
    broadcasterId: 'hearst',
    cpm: '$25.45',
    marketShare: 19,
    audienceSize: 228000
  },
  {
    id: 'gray-yimn-greensboro',
    name: 'YIMN-TV (Gray Greensboro)',
    marketId: 'greensboro-nc',
    broadcasterId: 'gray',
    cpm: '$23.33',
    marketShare: 33,
    audienceSize: 462000
  },
  {
    id: 'entravision-zvyt-greensboro',
    name: 'ZVYT-TV (Entravision Greensboro)',
    marketId: 'greensboro-nc',
    broadcasterId: 'entravision',
    cpm: '$25.45',
    marketShare: 31,
    audienceSize: 434000
  },
  {
    id: 'cbs-yxix-greensboro',
    name: 'YXIX-TV (CBS Greensboro)',
    marketId: 'greensboro-nc',
    broadcasterId: 'cbs',
    cpm: '$24.48',
    marketShare: 33,
    audienceSize: 462000
  },
  {
    id: 'univision-xddf-greensboro',
    name: 'XDDF-TV (Univision Greensboro)',
    marketId: 'greensboro-nc',
    broadcasterId: 'univision',
    cpm: '$24.30',
    marketShare: 22,
    audienceSize: 308000
  },
  {
    id: 'abc-whqe-oklahoma',
    name: 'WHQE-TV (ABC Oklahoma)',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'abc',
    cpm: '$25.66',
    marketShare: 31,
    audienceSize: 434000
  },
  {
    id: 'scripps-[fih-oklahoma',
    name: '[FIH-TV (Scripps Oklahoma)',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'scripps',
    cpm: '$24.17',
    marketShare: 22,
    audienceSize: 308000
  },
  {
    id: 'tegna-wscw-oklahoma',
    name: 'WSCW-TV (TEGNA Oklahoma)',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'tegna',
    cpm: '$24.32',
    marketShare: 30,
    audienceSize: 420000
  },
  {
    id: 'univision-ytbh-oklahoma',
    name: 'YTBH-TV (Univision Oklahoma)',
    marketId: 'oklahoma-city-ok',
    broadcasterId: 'univision',
    cpm: '$25.83',
    marketShare: 22,
    audienceSize: 308000
  },
  {
    id: 'hearst-zzbi-albuquerque',
    name: 'ZZBI-TV (Hearst Albuquerqu)',
    marketId: 'albuquerque-nm',
    broadcasterId: 'hearst',
    cpm: '$25.51',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'abc-wbzc-albuquerque',
    name: 'WBZC-TV (ABC Albuquerqu)',
    marketId: 'albuquerque-nm',
    broadcasterId: 'abc',
    cpm: '$25.25',
    marketShare: 23,
    audienceSize: 207000
  },
  {
    id: 'news-press-gazette-yree-albuquerque',
    name: 'YREE-TV (News Press Gazette Albuquerqu)',
    marketId: 'albuquerque-nm',
    broadcasterId: 'news-press-gazette',
    cpm: '$25.82',
    marketShare: 33,
    audienceSize: 297000
  },
  {
    id: 'tegna-zfca-albuquerque',
    name: 'ZFCA-TV (TEGNA Albuquerqu)',
    marketId: 'albuquerque-nm',
    broadcasterId: 'tegna',
    cpm: '$24.50',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'cbs-xoxw-albuquerque',
    name: 'XOXW-TV (CBS Albuquerqu)',
    marketId: 'albuquerque-nm',
    broadcasterId: 'cbs',
    cpm: '$24.48',
    marketShare: 16,
    audienceSize: 144000
  },
  {
    id: 'nbc-wlhj-louisville',
    name: 'WLHJ-TV (NBC Louisville)',
    marketId: 'louisville-ky',
    broadcasterId: 'nbc',
    cpm: '$24.02',
    marketShare: 32,
    audienceSize: 416000
  },
  {
    id: 'cbs-xecy-louisville',
    name: 'XECY-TV (CBS Louisville)',
    marketId: 'louisville-ky',
    broadcasterId: 'cbs',
    cpm: '$23.06',
    marketShare: 20,
    audienceSize: 260000
  },
  {
    id: 'hubbard-broadcasting-xmsx-louisville',
    name: 'XMSX-TV (Hubbard Broadcasting Louisville)',
    marketId: 'louisville-ky',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$24.42',
    marketShare: 15,
    audienceSize: 195000
  },
  {
    id: 'morgan-murphy-zzom-louisville',
    name: 'ZZOM-TV (Morgan Murphy Louisville)',
    marketId: 'louisville-ky',
    broadcasterId: 'morgan-murphy',
    cpm: '$25.71',
    marketShare: 34,
    audienceSize: 442000
  },
  {
    id: 'univision-yxjv-louisville',
    name: 'YXJV-TV (Univision Louisville)',
    marketId: 'louisville-ky',
    broadcasterId: 'univision',
    cpm: '$23.45',
    marketShare: 17,
    audienceSize: 221000
  },
  {
    id: 'tegna-zhal-louisville',
    name: 'ZHAL-TV (TEGNA Louisville)',
    marketId: 'louisville-ky',
    broadcasterId: 'tegna',
    cpm: '$23.56',
    marketShare: 22,
    audienceSize: 286000
  },
  {
    id: 'univision-yxto-new',
    name: 'YXTO-TV (Univision New)',
    marketId: 'new-orleans-la',
    broadcasterId: 'univision',
    cpm: '$25.27',
    marketShare: 29,
    audienceSize: 377000
  },
  {
    id: 'abc-[nrj-new',
    name: '[NRJ-TV (ABC New)',
    marketId: 'new-orleans-la',
    broadcasterId: 'abc',
    cpm: '$24.19',
    marketShare: 16,
    audienceSize: 208000
  },
  {
    id: 'scripps-xigk-new',
    name: 'XIGK-TV (Scripps New)',
    marketId: 'new-orleans-la',
    broadcasterId: 'scripps',
    cpm: '$25.53',
    marketShare: 34,
    audienceSize: 442000
  },
  {
    id: 'cbs-[tfn-new',
    name: '[TFN-TV (CBS New)',
    marketId: 'new-orleans-la',
    broadcasterId: 'cbs',
    cpm: '$24.23',
    marketShare: 24,
    audienceSize: 312000
  },
  {
    id: 'gray-yuih-memphis',
    name: 'YUIH-TV (Gray Memphis)',
    marketId: 'memphis-tn',
    broadcasterId: 'gray',
    cpm: '$19.92',
    marketShare: 29,
    audienceSize: 377000
  },
  {
    id: 'tegna-ytmk-memphis',
    name: 'YTMK-TV (TEGNA Memphis)',
    marketId: 'memphis-tn',
    broadcasterId: 'tegna',
    cpm: '$21.95',
    marketShare: 22,
    audienceSize: 286000
  },
  {
    id: 'univision-yvem-memphis',
    name: 'YVEM-TV (Univision Memphis)',
    marketId: 'memphis-tn',
    broadcasterId: 'univision',
    cpm: '$20.67',
    marketShare: 17,
    audienceSize: 221000
  },
  {
    id: 'scripps-wmrm-memphis',
    name: 'WMRM-TV (Scripps Memphis)',
    marketId: 'memphis-tn',
    broadcasterId: 'scripps',
    cpm: '$21.93',
    marketShare: 29,
    audienceSize: 377000
  },
  {
    id: 'abc-yajw-providence',
    name: 'YAJW-TV (ABC Providence)',
    marketId: 'providence-ri',
    broadcasterId: 'abc',
    cpm: '$21.18',
    marketShare: 26,
    audienceSize: 416000
  },
  {
    id: 'morgan-murphy-ztte-providence',
    name: 'ZTTE-TV (Morgan Murphy Providence)',
    marketId: 'providence-ri',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.83',
    marketShare: 25,
    audienceSize: 400000
  },
  {
    id: 'cbs-[uos-providence',
    name: '[UOS-TV (CBS Providence)',
    marketId: 'providence-ri',
    broadcasterId: 'cbs',
    cpm: '$21.50',
    marketShare: 16,
    audienceSize: 256000
  },
  {
    id: 'gray-zdhb-providence',
    name: 'ZDHB-TV (Gray Providence)',
    marketId: 'providence-ri',
    broadcasterId: 'gray',
    cpm: '$21.27',
    marketShare: 27,
    audienceSize: 432000
  },
  {
    id: 'hubbard-broadcasting-[glr-providence',
    name: '[GLR-TV (Hubbard Broadcasting Providence)',
    marketId: 'providence-ri',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.00',
    marketShare: 23,
    audienceSize: 368000
  },
  {
    id: 'univision-xfnk-providence',
    name: 'XFNK-TV (Univision Providence)',
    marketId: 'providence-ri',
    broadcasterId: 'univision',
    cpm: '$19.23',
    marketShare: 31,
    audienceSize: 496000
  },
  {
    id: 'nbc-ylbz-ft',
    name: 'YLBZ-TV (NBC Ft.)',
    marketId: 'ft-myers-fl',
    broadcasterId: 'nbc',
    cpm: '$21.78',
    marketShare: 33,
    audienceSize: 330000
  },
  {
    id: 'cbs-yiig-ft',
    name: 'YIIG-TV (CBS Ft.)',
    marketId: 'ft-myers-fl',
    broadcasterId: 'cbs',
    cpm: '$19.36',
    marketShare: 28,
    audienceSize: 280000
  },
  {
    id: 'tegna-zudh-ft',
    name: 'ZUDH-TV (TEGNA Ft.)',
    marketId: 'ft-myers-fl',
    broadcasterId: 'tegna',
    cpm: '$20.40',
    marketShare: 16,
    audienceSize: 160000
  },
  {
    id: 'morgan-murphy-yydo-ft',
    name: 'YYDO-TV (Morgan Murphy Ft.)',
    marketId: 'ft-myers-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.39',
    marketShare: 15,
    audienceSize: 150000
  },
  {
    id: 'abc-[gju-buffalo',
    name: '[GJU-TV (ABC Buffalo)',
    marketId: 'buffalo-ny',
    broadcasterId: 'abc',
    cpm: '$21.71',
    marketShare: 27,
    audienceSize: 297000
  },
  {
    id: 'news-press-gazette-[oxe-buffalo',
    name: '[OXE-TV (News Press Gazette Buffalo)',
    marketId: 'buffalo-ny',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.22',
    marketShare: 23,
    audienceSize: 253000
  },
  {
    id: 'hearst-xwhh-buffalo',
    name: 'XWHH-TV (Hearst Buffalo)',
    marketId: 'buffalo-ny',
    broadcasterId: 'hearst',
    cpm: '$20.44',
    marketShare: 24,
    audienceSize: 264000
  },
  {
    id: 'tegna-[uxl-fresno',
    name: '[UXL-TV (TEGNA Fresno-Vis)',
    marketId: 'fresno-ca',
    broadcasterId: 'tegna',
    cpm: '$21.53',
    marketShare: 32,
    audienceSize: 352000
  },
  {
    id: 'hearst-[znu-fresno',
    name: '[ZNU-TV (Hearst Fresno-Vis)',
    marketId: 'fresno-ca',
    broadcasterId: 'hearst',
    cpm: '$20.07',
    marketShare: 28,
    audienceSize: 308000
  },
  {
    id: 'univision-ytxf-fresno',
    name: 'YTXF-TV (Univision Fresno-Vis)',
    marketId: 'fresno-ca',
    broadcasterId: 'univision',
    cpm: '$19.97',
    marketShare: 32,
    audienceSize: 352000
  },
  {
    id: 'entravision-wsnw-richmond',
    name: 'WSNW-TV (Entravision Richmond-P)',
    marketId: 'richmond-va',
    broadcasterId: 'entravision',
    cpm: '$20.35',
    marketShare: 16,
    audienceSize: 208000
  },
  {
    id: 'hearst-xbzy-richmond',
    name: 'XBZY-TV (Hearst Richmond-P)',
    marketId: 'richmond-va',
    broadcasterId: 'hearst',
    cpm: '$21.66',
    marketShare: 31,
    audienceSize: 403000
  },
  {
    id: 'hubbard-broadcasting-ycdd-richmond',
    name: 'YCDD-TV (Hubbard Broadcasting Richmond-P)',
    marketId: 'richmond-va',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.40',
    marketShare: 21,
    audienceSize: 273000
  },
  {
    id: 'gray-znul-richmond',
    name: 'ZNUL-TV (Gray Richmond-P)',
    marketId: 'richmond-va',
    broadcasterId: 'gray',
    cpm: '$19.84',
    marketShare: 24,
    audienceSize: 312000
  },
  {
    id: 'nbc-ylvq-richmond',
    name: 'YLVQ-TV (NBC Richmond-P)',
    marketId: 'richmond-va',
    broadcasterId: 'nbc',
    cpm: '$21.23',
    marketShare: 27,
    audienceSize: 351000
  },
  {
    id: 'abc-zskp-mobile',
    name: 'ZSKP-TV (ABC Mobile)',
    marketId: 'mobile-al',
    broadcasterId: 'abc',
    cpm: '$19.88',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'cbs-xvlm-mobile',
    name: 'XVLM-TV (CBS Mobile)',
    marketId: 'mobile-al',
    broadcasterId: 'cbs',
    cpm: '$20.39',
    marketShare: 18,
    audienceSize: 162000
  },
  {
    id: 'hubbard-broadcasting-zxhr-mobile',
    name: 'ZXHR-TV (Hubbard Broadcasting Mobile)',
    marketId: 'mobile-al',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.77',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'abc-[pun-little',
    name: '[PUN-TV (ABC Little)',
    marketId: 'little-rock-ar',
    broadcasterId: 'abc',
    cpm: '$19.74',
    marketShare: 18,
    audienceSize: 144000
  },
  {
    id: 'hearst-xemd-little',
    name: 'XEMD-TV (Hearst Little)',
    marketId: 'little-rock-ar',
    broadcasterId: 'hearst',
    cpm: '$19.64',
    marketShare: 33,
    audienceSize: 264000
  },
  {
    id: 'univision-xiye-little',
    name: 'XIYE-TV (Univision Little)',
    marketId: 'little-rock-ar',
    broadcasterId: 'univision',
    cpm: '$20.31',
    marketShare: 15,
    audienceSize: 120000
  },
  {
    id: 'gray-wfbo-wilkes',
    name: 'WFBO-TV (Gray Wilkes)',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'gray',
    cpm: '$20.69',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'hearst-zjfh-wilkes',
    name: 'ZJFH-TV (Hearst Wilkes)',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'hearst',
    cpm: '$20.50',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'scripps-yput-wilkes',
    name: 'YPUT-TV (Scripps Wilkes)',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'scripps',
    cpm: '$19.34',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'hubbard-broadcasting-xxlx-wilkes',
    name: 'XXLX-TV (Hubbard Broadcasting Wilkes)',
    marketId: 'wilkes-barre-pa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.93',
    marketShare: 20,
    audienceSize: 180000
  },
  {
    id: 'nexstar-xinq-knoxville',
    name: 'XINQ-TV (Nexstar Knoxville)',
    marketId: 'knoxville-tn',
    broadcasterId: 'nexstar',
    cpm: '$20.89',
    marketShare: 15,
    audienceSize: 150000
  },
  {
    id: 'gray-[ajr-knoxville',
    name: '[AJR-TV (Gray Knoxville)',
    marketId: 'knoxville-tn',
    broadcasterId: 'gray',
    cpm: '$20.70',
    marketShare: 31,
    audienceSize: 310000
  },
  {
    id: 'nbc-yxje-knoxville',
    name: 'YXJE-TV (NBC Knoxville)',
    marketId: 'knoxville-tn',
    broadcasterId: 'nbc',
    cpm: '$19.62',
    marketShare: 21,
    audienceSize: 210000
  },
  {
    id: 'morgan-murphy-zzjg-knoxville',
    name: 'ZZJG-TV (Morgan Murphy Knoxville)',
    marketId: 'knoxville-tn',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.44',
    marketShare: 26,
    audienceSize: 260000
  },
  {
    id: 'cbs-zepu-knoxville',
    name: 'ZEPU-TV (CBS Knoxville)',
    marketId: 'knoxville-tn',
    broadcasterId: 'cbs',
    cpm: '$21.50',
    marketShare: 17,
    audienceSize: 170000
  },
  {
    id: 'univision-wraq-knoxville',
    name: 'WRAQ-TV (Univision Knoxville)',
    marketId: 'knoxville-tn',
    broadcasterId: 'univision',
    cpm: '$20.34',
    marketShare: 20,
    audienceSize: 200000
  },
  {
    id: 'scripps-zpec-tulsa',
    name: 'ZPEC-TV (Scripps Tuisa)',
    marketId: 'tulsa-ok',
    broadcasterId: 'scripps',
    cpm: '$19.31',
    marketShare: 30,
    audienceSize: 300000
  },
  {
    id: 'hubbard-broadcasting-wbkb-tulsa',
    name: 'WBKB-TV (Hubbard Broadcasting Tuisa)',
    marketId: 'tulsa-ok',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.74',
    marketShare: 27,
    audienceSize: 270000
  },
  {
    id: 'abc-wjwl-tulsa',
    name: 'WJWL-TV (ABC Tuisa)',
    marketId: 'tulsa-ok',
    broadcasterId: 'abc',
    cpm: '$20.09',
    marketShare: 22,
    audienceSize: 220000
  },
  {
    id: 'cbs-ybko-tulsa',
    name: 'YBKO-TV (CBS Tuisa)',
    marketId: 'tulsa-ok',
    broadcasterId: 'cbs',
    cpm: '$20.64',
    marketShare: 19,
    audienceSize: 190000
  },
  {
    id: 'abc-wsbp-albany',
    name: 'WSBP-TV (ABC Albany-Sch)',
    marketId: 'albany-ny',
    broadcasterId: 'abc',
    cpm: '$21.18',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'entravision-xxtm-albany',
    name: 'XXTM-TV (Entravision Albany-Sch)',
    marketId: 'albany-ny',
    broadcasterId: 'entravision',
    cpm: '$20.37',
    marketShare: 23,
    audienceSize: 207000
  },
  {
    id: 'cbs-yhxs-albany',
    name: 'YHXS-TV (CBS Albany-Sch)',
    marketId: 'albany-ny',
    broadcasterId: 'cbs',
    cpm: '$19.55',
    marketShare: 33,
    audienceSize: 297000
  },
  {
    id: 'scripps-zgfr-albany',
    name: 'ZGFR-TV (Scripps Albany-Sch)',
    marketId: 'albany-ny',
    broadcasterId: 'scripps',
    cpm: '$21.75',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'nexstar-wftc-lexington',
    name: 'WFTC-TV (Nexstar Lexington)',
    marketId: 'lexington-ky',
    broadcasterId: 'nexstar',
    cpm: '$20.12',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'hearst-wqcl-lexington',
    name: 'WQCL-TV (Hearst Lexington)',
    marketId: 'lexington-ky',
    broadcasterId: 'hearst',
    cpm: '$21.49',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'scripps-[swa-lexington',
    name: '[SWA-TV (Scripps Lexington)',
    marketId: 'lexington-ky',
    broadcasterId: 'scripps',
    cpm: '$19.99',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'abc-[jee-dayton',
    name: '[JEE-TV (ABC Dayton)',
    marketId: 'dayton-oh',
    broadcasterId: 'abc',
    cpm: '$21.99',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'scripps-xguc-dayton',
    name: 'XGUC-TV (Scripps Dayton)',
    marketId: 'dayton-oh',
    broadcasterId: 'scripps',
    cpm: '$20.58',
    marketShare: 28,
    audienceSize: 252000
  },
  {
    id: 'morgan-murphy-wtyc-dayton',
    name: 'WTYC-TV (Morgan Murphy Dayton)',
    marketId: 'dayton-oh',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.59',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'news-press-gazette-yrer-dayton',
    name: 'YRER-TV (News Press Gazette Dayton)',
    marketId: 'dayton-oh',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.46',
    marketShare: 16,
    audienceSize: 144000
  },
  {
    id: 'cbs-yzar-dayton',
    name: 'YZAR-TV (CBS Dayton)',
    marketId: 'dayton-oh',
    broadcasterId: 'cbs',
    cpm: '$19.74',
    marketShare: 34,
    audienceSize: 306000
  },
  {
    id: 'hearst-[juu-dayton',
    name: '[JUU-TV (Hearst Dayton)',
    marketId: 'dayton-oh',
    broadcasterId: 'hearst',
    cpm: '$20.90',
    marketShare: 21,
    audienceSize: 189000
  },
  {
    id: 'abc-[kvm-tucson',
    name: '[KVM-TV (ABC Tucson)',
    marketId: 'tucson-az',
    broadcasterId: 'abc',
    cpm: '$19.91',
    marketShare: 32,
    audienceSize: 320000
  },
  {
    id: 'morgan-murphy-yeoc-tucson',
    name: 'YEOC-TV (Morgan Murphy Tucson)',
    marketId: 'tucson-az',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.29',
    marketShare: 19,
    audienceSize: 190000
  },
  {
    id: 'nexstar-[qqt-tucson',
    name: '[QQT-TV (Nexstar Tucson)',
    marketId: 'tucson-az',
    broadcasterId: 'nexstar',
    cpm: '$21.97',
    marketShare: 22,
    audienceSize: 220000
  },
  {
    id: 'cbs-xwcm-tucson',
    name: 'XWCM-TV (CBS Tucson)',
    marketId: 'tucson-az',
    broadcasterId: 'cbs',
    cpm: '$20.54',
    marketShare: 31,
    audienceSize: 310000
  },
  {
    id: 'abc-zvqw-spokane',
    name: 'ZVQW-TV (ABC Spokane)',
    marketId: 'spokane-wa',
    broadcasterId: 'abc',
    cpm: '$20.98',
    marketShare: 33,
    audienceSize: 198000
  },
  {
    id: 'nexstar-yovl-spokane',
    name: 'YOVL-TV (Nexstar Spokane)',
    marketId: 'spokane-wa',
    broadcasterId: 'nexstar',
    cpm: '$19.98',
    marketShare: 22,
    audienceSize: 132000
  },
  {
    id: 'univision-wqjp-spokane',
    name: 'WQJP-TV (Univision Spokane)',
    marketId: 'spokane-wa',
    broadcasterId: 'univision',
    cpm: '$20.35',
    marketShare: 23,
    audienceSize: 138000
  },
  {
    id: 'hearst-zseq-spokane',
    name: 'ZSEQ-TV (Hearst Spokane)',
    marketId: 'spokane-wa',
    broadcasterId: 'hearst',
    cpm: '$21.58',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'morgan-murphy-wmhd-spokane',
    name: 'WMHD-TV (Morgan Murphy Spokane)',
    marketId: 'spokane-wa',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.43',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'abc-wcim-des',
    name: 'WCIM-TV (ABC Des)',
    marketId: 'des-moines-ia',
    broadcasterId: 'abc',
    cpm: '$21.90',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'hearst-zugm-des',
    name: 'ZUGM-TV (Hearst Des)',
    marketId: 'des-moines-ia',
    broadcasterId: 'hearst',
    cpm: '$21.57',
    marketShare: 33,
    audienceSize: 231000
  },
  {
    id: 'cbs-[cbl-des',
    name: '[CBL-TV (CBS Des)',
    marketId: 'des-moines-ia',
    broadcasterId: 'cbs',
    cpm: '$21.62',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'univision-xnxo-des',
    name: 'XNXO-TV (Univision Des)',
    marketId: 'des-moines-ia',
    broadcasterId: 'univision',
    cpm: '$19.28',
    marketShare: 31,
    audienceSize: 217000
  },
  {
    id: 'nbc-wmpc-green',
    name: 'WMPC-TV (NBC Green)',
    marketId: 'green-bay-wi',
    broadcasterId: 'nbc',
    cpm: '$19.53',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'univision-wcll-green',
    name: 'WCLL-TV (Univision Green)',
    marketId: 'green-bay-wi',
    broadcasterId: 'univision',
    cpm: '$21.79',
    marketShare: 23,
    audienceSize: 161000
  },
  {
    id: 'abc-ylnp-green',
    name: 'YLNP-TV (ABC Green)',
    marketId: 'green-bay-wi',
    broadcasterId: 'abc',
    cpm: '$19.90',
    marketShare: 29,
    audienceSize: 203000
  },
  {
    id: 'scripps-zixn-green',
    name: 'ZIXN-TV (Scripps Green)',
    marketId: 'green-bay-wi',
    broadcasterId: 'scripps',
    cpm: '$21.69',
    marketShare: 30,
    audienceSize: 210000
  },
  {
    id: 'hubbard-broadcasting-wfio-green',
    name: 'WFIO-TV (Hubbard Broadcasting Green)',
    marketId: 'green-bay-wi',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.48',
    marketShare: 25,
    audienceSize: 175000
  },
  {
    id: 'scripps-[qqr-honolulu',
    name: '[QQR-TV (Scripps Honolulu)',
    marketId: 'honolulu-hi',
    broadcasterId: 'scripps',
    cpm: '$19.74',
    marketShare: 22,
    audienceSize: 220000
  },
  {
    id: 'tegna-yvpo-honolulu',
    name: 'YVPO-TV (TEGNA Honolulu)',
    marketId: 'honolulu-hi',
    broadcasterId: 'tegna',
    cpm: '$19.32',
    marketShare: 32,
    audienceSize: 320000
  },
  {
    id: 'hearst-yohv-honolulu',
    name: 'YOHV-TV (Hearst Honolulu)',
    marketId: 'honolulu-hi',
    broadcasterId: 'hearst',
    cpm: '$20.99',
    marketShare: 18,
    audienceSize: 180000
  },
  {
    id: 'nexstar-wsuw-roanoke',
    name: 'WSUW-TV (Nexstar Roanoke-Ly)',
    marketId: 'roanoke-va',
    broadcasterId: 'nexstar',
    cpm: '$21.71',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'gray-xdbw-roanoke',
    name: 'XDBW-TV (Gray Roanoke-Ly)',
    marketId: 'roanoke-va',
    broadcasterId: 'gray',
    cpm: '$20.98',
    marketShare: 27,
    audienceSize: 189000
  },
  {
    id: 'hearst-[jrt-roanoke',
    name: '[JRT-TV (Hearst Roanoke-Ly)',
    marketId: 'roanoke-va',
    broadcasterId: 'hearst',
    cpm: '$19.52',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'scripps-xarx-wichita',
    name: 'XARX-TV (Scripps Wichita-Hu)',
    marketId: 'wichita-ks',
    broadcasterId: 'scripps',
    cpm: '$21.45',
    marketShare: 28,
    audienceSize: 196000
  },
  {
    id: 'cbs-[rnd-wichita',
    name: '[RND-TV (CBS Wichita-Hu)',
    marketId: 'wichita-ks',
    broadcasterId: 'cbs',
    cpm: '$21.35',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'entravision-ydfi-wichita',
    name: 'YDFI-TV (Entravision Wichita-Hu)',
    marketId: 'wichita-ks',
    broadcasterId: 'entravision',
    cpm: '$19.08',
    marketShare: 18,
    audienceSize: 126000
  },
  {
    id: 'nbc-wkmx-wichita',
    name: 'WKMX-TV (NBC Wichita-Hu)',
    marketId: 'wichita-ks',
    broadcasterId: 'nbc',
    cpm: '$21.59',
    marketShare: 28,
    audienceSize: 196000
  },
  {
    id: 'abc-xwwq-flint',
    name: 'XWWQ-TV (ABC Flint-Sagi)',
    marketId: 'flint-mi',
    broadcasterId: 'abc',
    cpm: '$21.00',
    marketShare: 30,
    audienceSize: 240000
  },
  {
    id: 'tegna-xbpw-flint',
    name: 'XBPW-TV (TEGNA Flint-Sagi)',
    marketId: 'flint-mi',
    broadcasterId: 'tegna',
    cpm: '$20.78',
    marketShare: 20,
    audienceSize: 160000
  },
  {
    id: 'news-press-gazette-[pyg-flint',
    name: '[PYG-TV (News Press Gazette Flint-Sagi)',
    marketId: 'flint-mi',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.61',
    marketShare: 27,
    audienceSize: 216000
  },
  {
    id: 'morgan-murphy-walb-omaha',
    name: 'WALB-TV (Morgan Murphy Omaha)',
    marketId: 'omaha-ne',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.01',
    marketShare: 31,
    audienceSize: 279000
  },
  {
    id: 'cbs-[tei-omaha',
    name: '[TEI-TV (CBS Omaha)',
    marketId: 'omaha-ne',
    broadcasterId: 'cbs',
    cpm: '$20.84',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'gray-wwci-omaha',
    name: 'WWCI-TV (Gray Omaha)',
    marketId: 'omaha-ne',
    broadcasterId: 'gray',
    cpm: '$21.65',
    marketShare: 20,
    audienceSize: 180000
  },
  {
    id: 'news-press-gazette-wvzo-omaha',
    name: 'WVZO-TV (News Press Gazette Omaha)',
    marketId: 'omaha-ne',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.72',
    marketShare: 21,
    audienceSize: 189000
  },
  {
    id: 'tegna-whum-omaha',
    name: 'WHUM-TV (TEGNA Omaha)',
    marketId: 'omaha-ne',
    broadcasterId: 'tegna',
    cpm: '$21.28',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'nbc-[efr-springfield',
    name: '[EFR-TV (NBC Springfiel)',
    marketId: 'springfield-mo',
    broadcasterId: 'nbc',
    cpm: '$20.19',
    marketShare: 26,
    audienceSize: 130000
  },
  {
    id: 'cbs-wkyv-springfield',
    name: 'WKYV-TV (CBS Springfiel)',
    marketId: 'springfield-mo',
    broadcasterId: 'cbs',
    cpm: '$20.61',
    marketShare: 15,
    audienceSize: 75000
  },
  {
    id: 'univision-wgag-springfield',
    name: 'WGAG-TV (Univision Springfiel)',
    marketId: 'springfield-mo',
    broadcasterId: 'univision',
    cpm: '$19.07',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'abc-wgud-springfield',
    name: 'WGUD-TV (ABC Springfiel)',
    marketId: 'springfield-mo',
    broadcasterId: 'abc',
    cpm: '$20.89',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'tegna-xfit-huntsville',
    name: 'XFIT-TV (TEGNA Huntsville)',
    marketId: 'huntsville-al',
    broadcasterId: 'tegna',
    cpm: '$20.35',
    marketShare: 21,
    audienceSize: 168000
  },
  {
    id: 'nbc-[wzy-huntsville',
    name: '[WZY-TV (NBC Huntsville)',
    marketId: 'huntsville-al',
    broadcasterId: 'nbc',
    cpm: '$19.20',
    marketShare: 32,
    audienceSize: 256000
  },
  {
    id: 'hubbard-broadcasting-wjat-huntsville',
    name: 'WJAT-TV (Hubbard Broadcasting Huntsville)',
    marketId: 'huntsville-al',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.03',
    marketShare: 17,
    audienceSize: 136000
  },
  {
    id: 'entravision-whvm-huntsville',
    name: 'WHVM-TV (Entravision Huntsville)',
    marketId: 'huntsville-al',
    broadcasterId: 'entravision',
    cpm: '$19.95',
    marketShare: 33,
    audienceSize: 264000
  },
  {
    id: 'abc-zsgs-columbia',
    name: 'ZSGS-TV (ABC Columbia)',
    marketId: 'columbia-sc',
    broadcasterId: 'abc',
    cpm: '$20.64',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'univision-wkaq-columbia',
    name: 'WKAQ-TV (Univision Columbia)',
    marketId: 'columbia-sc',
    broadcasterId: 'univision',
    cpm: '$21.54',
    marketShare: 22,
    audienceSize: 198000
  },
  {
    id: 'cbs-[thr-columbia',
    name: '[THR-TV (CBS Columbia)',
    marketId: 'columbia-sc',
    broadcasterId: 'cbs',
    cpm: '$20.24',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'news-press-gazette-yujh-columbia',
    name: 'YUJH-TV (News Press Gazette Columbia)',
    marketId: 'columbia-sc',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.73',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'nbc-wacz-columbia',
    name: 'WACZ-TV (NBC Columbia)',
    marketId: 'columbia-sc',
    broadcasterId: 'nbc',
    cpm: '$20.27',
    marketShare: 25,
    audienceSize: 225000
  },
  {
    id: 'morgan-murphy-xvqo-columbia',
    name: 'XVQO-TV (Morgan Murphy Columbia)',
    marketId: 'columbia-sc',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.09',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'abc-xkdu-madison',
    name: 'XKDU-TV (ABC Madison)',
    marketId: 'madison-wi',
    broadcasterId: 'abc',
    cpm: '$19.58',
    marketShare: 21,
    audienceSize: 147000
  },
  {
    id: 'hubbard-broadcasting-xelt-madison',
    name: 'XELT-TV (Hubbard Broadcasting Madison)',
    marketId: 'madison-wi',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.53',
    marketShare: 31,
    audienceSize: 217000
  },
  {
    id: 'cbs-[xbs-madison',
    name: '[XBS-TV (CBS Madison)',
    marketId: 'madison-wi',
    broadcasterId: 'cbs',
    cpm: '$21.56',
    marketShare: 23,
    audienceSize: 161000
  },
  {
    id: 'news-press-gazette-[axj-madison',
    name: '[AXJ-TV (News Press Gazette Madison)',
    marketId: 'madison-wi',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.82',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'nbc-wrmi-madison',
    name: 'WRMI-TV (NBC Madison)',
    marketId: 'madison-wi',
    broadcasterId: 'nbc',
    cpm: '$21.90',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'tegna-xojo-madison',
    name: 'XOJO-TV (TEGNA Madison)',
    marketId: 'madison-wi',
    broadcasterId: 'tegna',
    cpm: '$19.82',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'nbc-ytwg-portland',
    name: 'YTWG-TV (NBC Portland-A)',
    marketId: 'portland-me',
    broadcasterId: 'nbc',
    cpm: '$21.27',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'gray-wnbh-portland',
    name: 'WNBH-TV (Gray Portland-A)',
    marketId: 'portland-me',
    broadcasterId: 'gray',
    cpm: '$20.67',
    marketShare: 15,
    audienceSize: 75000
  },
  {
    id: 'univision-[cgs-portland',
    name: '[CGS-TV (Univision Portland-A)',
    marketId: 'portland-me',
    broadcasterId: 'univision',
    cpm: '$19.48',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'news-press-gazette-[qmr-portland',
    name: '[QMR-TV (News Press Gazette Portland-A)',
    marketId: 'portland-me',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.18',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'abc-wjco-rochester',
    name: 'WJCO-TV (ABC Rochester)',
    marketId: 'rochester-ny',
    broadcasterId: 'abc',
    cpm: '$19.03',
    marketShare: 20,
    audienceSize: 200000
  },
  {
    id: 'scripps-xtme-rochester',
    name: 'XTME-TV (Scripps Rochester)',
    marketId: 'rochester-ny',
    broadcasterId: 'scripps',
    cpm: '$20.44',
    marketShare: 22,
    audienceSize: 220000
  },
  {
    id: 'tegna-wpfx-rochester',
    name: 'WPFX-TV (TEGNA Rochester)',
    marketId: 'rochester-ny',
    broadcasterId: 'tegna',
    cpm: '$21.09',
    marketShare: 29,
    audienceSize: 290000
  },
  {
    id: 'hearst-wixg-harlingen',
    name: 'WIXG-TV (Hearst Harlingen-)',
    marketId: 'harlingen-tx',
    broadcasterId: 'hearst',
    cpm: '$20.83',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'abc-wmzs-harlingen',
    name: 'WMZS-TV (ABC Harlingen-)',
    marketId: 'harlingen-tx',
    broadcasterId: 'abc',
    cpm: '$19.18',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'tegna-[grt-harlingen',
    name: '[GRT-TV (TEGNA Harlingen-)',
    marketId: 'harlingen-tx',
    broadcasterId: 'tegna',
    cpm: '$21.10',
    marketShare: 29,
    audienceSize: 260999
  },
  {
    id: 'cbs-ytaw-harlingen',
    name: 'YTAW-TV (CBS Harlingen-)',
    marketId: 'harlingen-tx',
    broadcasterId: 'cbs',
    cpm: '$21.55',
    marketShare: 26,
    audienceSize: 234000
  },
  {
    id: 'gray-zfcy-harlingen',
    name: 'ZFCY-TV (Gray Harlingen-)',
    marketId: 'harlingen-tx',
    broadcasterId: 'gray',
    cpm: '$19.28',
    marketShare: 34,
    audienceSize: 306000
  },
  {
    id: 'hubbard-broadcasting-[nje-harlingen',
    name: '[NJE-TV (Hubbard Broadcasting Harlingen-)',
    marketId: 'harlingen-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.84',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'scripps-zeqg-toledo',
    name: 'ZEQG-TV (Scripps Toledo)',
    marketId: 'toledo-oh',
    broadcasterId: 'scripps',
    cpm: '$21.59',
    marketShare: 19,
    audienceSize: 133000
  },
  {
    id: 'morgan-murphy-zric-toledo',
    name: 'ZRIC-TV (Morgan Murphy Toledo)',
    marketId: 'toledo-oh',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.31',
    marketShare: 23,
    audienceSize: 161000
  },
  {
    id: 'abc-yuzy-toledo',
    name: 'YUZY-TV (ABC Toledo)',
    marketId: 'toledo-oh',
    broadcasterId: 'abc',
    cpm: '$19.17',
    marketShare: 26,
    audienceSize: 182000
  },
  {
    id: 'scripps-[llc-charleston',
    name: '[LLC-TV (Scripps Charleston)',
    marketId: 'charleston-wv',
    broadcasterId: 'scripps',
    cpm: '$19.96',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'nexstar-yfoz-charleston',
    name: 'YFOZ-TV (Nexstar Charleston)',
    marketId: 'charleston-wv',
    broadcasterId: 'nexstar',
    cpm: '$20.77',
    marketShare: 32,
    audienceSize: 224000
  },
  {
    id: 'univision-ziua-charleston',
    name: 'ZIUA-TV (Univision Charleston)',
    marketId: 'charleston-wv',
    broadcasterId: 'univision',
    cpm: '$19.51',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'morgan-murphy-zcwv-charleston',
    name: 'ZCWV-TV (Morgan Murphy Charleston)',
    marketId: 'charleston-wv',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.88',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'abc-ymek-charleston',
    name: 'YMEK-TV (ABC Charleston)',
    marketId: 'charleston-wv',
    broadcasterId: 'abc',
    cpm: '$21.04',
    marketShare: 21,
    audienceSize: 147000
  },
  {
    id: 'hubbard-broadcasting-wbjh-charleston',
    name: 'WBJH-TV (Hubbard Broadcasting Charleston)',
    marketId: 'charleston-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.42',
    marketShare: 31,
    audienceSize: 217000
  },
  {
    id: 'scripps-zhvy-waco',
    name: 'ZHVY-TV (Scripps Waco-Templ)',
    marketId: 'waco-tx',
    broadcasterId: 'scripps',
    cpm: '$19.71',
    marketShare: 20,
    audienceSize: 120000
  },
  {
    id: 'entravision-zmkg-waco',
    name: 'ZMKG-TV (Entravision Waco-Templ)',
    marketId: 'waco-tx',
    broadcasterId: 'entravision',
    cpm: '$21.32',
    marketShare: 28,
    audienceSize: 168000
  },
  {
    id: 'univision-xnhq-waco',
    name: 'XNHQ-TV (Univision Waco-Templ)',
    marketId: 'waco-tx',
    broadcasterId: 'univision',
    cpm: '$21.73',
    marketShare: 28,
    audienceSize: 168000
  },
  {
    id: 'scripps-zhex-savannah',
    name: 'ZHEX-TV (Scripps Savannah)',
    marketId: 'savannah-ga',
    broadcasterId: 'scripps',
    cpm: '$19.04',
    marketShare: 33,
    audienceSize: 165000
  },
  {
    id: 'hearst-xblt-savannah',
    name: 'XBLT-TV (Hearst Savannah)',
    marketId: 'savannah-ga',
    broadcasterId: 'hearst',
    cpm: '$21.48',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'news-press-gazette-yiah-savannah',
    name: 'YIAH-TV (News Press Gazette Savannah)',
    marketId: 'savannah-ga',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.64',
    marketShare: 26,
    audienceSize: 130000
  },
  {
    id: 'gray-xmcm-savannah',
    name: 'XMCM-TV (Gray Savannah)',
    marketId: 'savannah-ga',
    broadcasterId: 'gray',
    cpm: '$19.30',
    marketShare: 21,
    audienceSize: 105000
  },
  {
    id: 'nbc-[fwh-savannah',
    name: '[FWH-TV (NBC Savannah)',
    marketId: 'savannah-ga',
    broadcasterId: 'nbc',
    cpm: '$20.83',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'cbs-wrsa-savannah',
    name: 'WRSA-TV (CBS Savannah)',
    marketId: 'savannah-ga',
    broadcasterId: 'cbs',
    cpm: '$20.45',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'tegna-witj-charleston',
    name: 'WITJ-TV (TEGNA Charleston)',
    marketId: 'charleston-sc',
    broadcasterId: 'tegna',
    cpm: '$21.03',
    marketShare: 17,
    audienceSize: 136000
  },
  {
    id: 'cbs-[mzt-charleston',
    name: '[MZT-TV (CBS Charleston)',
    marketId: 'charleston-sc',
    broadcasterId: 'cbs',
    cpm: '$20.64',
    marketShare: 32,
    audienceSize: 256000
  },
  {
    id: 'nbc-xzys-charleston',
    name: 'XZYS-TV (NBC Charleston)',
    marketId: 'charleston-sc',
    broadcasterId: 'nbc',
    cpm: '$19.50',
    marketShare: 29,
    audienceSize: 231999
  },
  {
    id: 'hearst-[ajd-charleston',
    name: '[AJD-TV (Hearst Charleston)',
    marketId: 'charleston-sc',
    broadcasterId: 'hearst',
    cpm: '$21.60',
    marketShare: 33,
    audienceSize: 264000
  },
  {
    id: 'morgan-murphy-ysfy-charleston',
    name: 'YSFY-TV (Morgan Murphy Charleston)',
    marketId: 'charleston-sc',
    broadcasterId: 'morgan-murphy',
    cpm: '$20.61',
    marketShare: 15,
    audienceSize: 120000
  },
  {
    id: 'nexstar-wyqe-chattanooga',
    name: 'WYQE-TV (Nexstar Chattanoog)',
    marketId: 'chattanooga-tn',
    broadcasterId: 'nexstar',
    cpm: '$21.37',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'abc-xtfz-chattanooga',
    name: 'XTFZ-TV (ABC Chattanoog)',
    marketId: 'chattanooga-tn',
    broadcasterId: 'abc',
    cpm: '$20.73',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'univision-ynxm-chattanooga',
    name: 'YNXM-TV (Univision Chattanoog)',
    marketId: 'chattanooga-tn',
    broadcasterId: 'univision',
    cpm: '$20.26',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'news-press-gazette-zeia-chattanooga',
    name: 'ZEIA-TV (News Press Gazette Chattanoog)',
    marketId: 'chattanooga-tn',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.88',
    marketShare: 22,
    audienceSize: 132000
  },
  {
    id: 'tegna-xrmx-chattanooga',
    name: 'XRMX-TV (TEGNA Chattanoog)',
    marketId: 'chattanooga-tn',
    broadcasterId: 'tegna',
    cpm: '$19.58',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'hubbard-broadcasting-ynbg-colorado',
    name: 'YNBG-TV (Hubbard Broadcasting Colorado)',
    marketId: 'colorado-springs-co',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.71',
    marketShare: 25,
    audienceSize: 200000
  },
  {
    id: 'abc-[pvv-colorado',
    name: '[PVV-TV (ABC Colorado)',
    marketId: 'colorado-springs-co',
    broadcasterId: 'abc',
    cpm: '$20.61',
    marketShare: 28,
    audienceSize: 224000
  },
  {
    id: 'univision-xoyx-colorado',
    name: 'XOYX-TV (Univision Colorado)',
    marketId: 'colorado-springs-co',
    broadcasterId: 'univision',
    cpm: '$21.76',
    marketShare: 17,
    audienceSize: 136000
  },
  {
    id: 'morgan-murphy-wfps-colorado',
    name: 'WFPS-TV (Morgan Murphy Colorado)',
    marketId: 'colorado-springs-co',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.93',
    marketShare: 18,
    audienceSize: 144000
  },
  {
    id: 'tegna-[yoi-colorado',
    name: '[YOI-TV (TEGNA Colorado)',
    marketId: 'colorado-springs-co',
    broadcasterId: 'tegna',
    cpm: '$21.58',
    marketShare: 16,
    audienceSize: 128000
  },
  {
    id: 'cbs-zdwa-colorado',
    name: 'ZDWA-TV (CBS Colorado)',
    marketId: 'colorado-springs-co',
    broadcasterId: 'cbs',
    cpm: '$20.09',
    marketShare: 21,
    audienceSize: 168000
  },
  {
    id: 'abc-ztza-syracuse',
    name: 'ZTZA-TV (ABC Syracuse)',
    marketId: 'syracuse-ny',
    broadcasterId: 'abc',
    cpm: '$19.38',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'cbs-wdao-syracuse',
    name: 'WDAO-TV (CBS Syracuse)',
    marketId: 'syracuse-ny',
    broadcasterId: 'cbs',
    cpm: '$21.26',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'univision-[xlp-syracuse',
    name: '[XLP-TV (Univision Syracuse)',
    marketId: 'syracuse-ny',
    broadcasterId: 'univision',
    cpm: '$21.39',
    marketShare: 23,
    audienceSize: 161000
  },
  {
    id: 'hubbard-broadcasting-xdpg-syracuse',
    name: 'XDPG-TV (Hubbard Broadcasting Syracuse)',
    marketId: 'syracuse-ny',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.64',
    marketShare: 22,
    audienceSize: 154000
  },
  {
    id: 'cbs-whqd-el',
    name: 'WHQD-TV (CBS El)',
    marketId: 'el-paso-tx',
    broadcasterId: 'cbs',
    cpm: '$20.43',
    marketShare: 28,
    audienceSize: 252000
  },
  {
    id: 'nexstar-ymvx-el',
    name: 'YMVX-TV (Nexstar El)',
    marketId: 'el-paso-tx',
    broadcasterId: 'nexstar',
    cpm: '$20.95',
    marketShare: 20,
    audienceSize: 180000
  },
  {
    id: 'news-press-gazette-wqyg-el',
    name: 'WQYG-TV (News Press Gazette El)',
    marketId: 'el-paso-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$20.99',
    marketShare: 32,
    audienceSize: 288000
  },
  {
    id: 'scripps-zkif-el',
    name: 'ZKIF-TV (Scripps El)',
    marketId: 'el-paso-tx',
    broadcasterId: 'scripps',
    cpm: '$19.83',
    marketShare: 18,
    audienceSize: 162000
  },
  {
    id: 'morgan-murphy-zgol-el',
    name: 'ZGOL-TV (Morgan Murphy El)',
    marketId: 'el-paso-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.87',
    marketShare: 16,
    audienceSize: 144000
  },
  {
    id: 'univision-yczy-el',
    name: 'YCZY-TV (Univision El)',
    marketId: 'el-paso-tx',
    broadcasterId: 'univision',
    cpm: '$19.94',
    marketShare: 24,
    audienceSize: 216000
  },
  {
    id: 'tegna-yinb-paducah',
    name: 'YINB-TV (TEGNA Paducah)',
    marketId: 'paducah-ky',
    broadcasterId: 'tegna',
    cpm: '$20.33',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'entravision-zmde-paducah',
    name: 'ZMDE-TV (Entravision Paducah)',
    marketId: 'paducah-ky',
    broadcasterId: 'entravision',
    cpm: '$20.01',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'univision-zrzv-paducah',
    name: 'ZRZV-TV (Univision Paducah)',
    marketId: 'paducah-ky',
    broadcasterId: 'univision',
    cpm: '$21.85',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'abc-yhyk-paducah',
    name: 'YHYK-TV (ABC Paducah)',
    marketId: 'paducah-ky',
    broadcasterId: 'abc',
    cpm: '$20.92',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'news-press-gazette-zmdi-shreveport',
    name: 'ZMDI-TV (News Press Gazette Shreveport)',
    marketId: 'shreveport-la',
    broadcasterId: 'news-press-gazette',
    cpm: '$21.15',
    marketShare: 33,
    audienceSize: 198000
  },
  {
    id: 'gray-yzsl-shreveport',
    name: 'YZSL-TV (Gray Shreveport)',
    marketId: 'shreveport-la',
    broadcasterId: 'gray',
    cpm: '$20.17',
    marketShare: 28,
    audienceSize: 168000
  },
  {
    id: 'abc-zzel-shreveport',
    name: 'ZZEL-TV (ABC Shreveport)',
    marketId: 'shreveport-la',
    broadcasterId: 'abc',
    cpm: '$21.94',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'univision-[ken-shreveport',
    name: '[KEN-TV (Univision Shreveport)',
    marketId: 'shreveport-la',
    broadcasterId: 'univision',
    cpm: '$19.40',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'tegna-xclw-champaign',
    name: 'XCLW-TV (TEGNA Champaign)',
    marketId: 'champaign-il',
    broadcasterId: 'tegna',
    cpm: '$21.99',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'abc-ycob-champaign',
    name: 'YCOB-TV (ABC Champaign)',
    marketId: 'champaign-il',
    broadcasterId: 'abc',
    cpm: '$19.08',
    marketShare: 32,
    audienceSize: 192000
  },
  {
    id: 'scripps-yfoa-champaign',
    name: 'YFOA-TV (Scripps Champaign)',
    marketId: 'champaign-il',
    broadcasterId: 'scripps',
    cpm: '$21.22',
    marketShare: 20,
    audienceSize: 120000
  },
  {
    id: 'morgan-murphy-wzpy-champaign',
    name: 'WZPY-TV (Morgan Murphy Champaign)',
    marketId: 'champaign-il',
    broadcasterId: 'morgan-murphy',
    cpm: '$21.23',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'cbs-[ofu-champaign',
    name: '[OFU-TV (CBS Champaign)',
    marketId: 'champaign-il',
    broadcasterId: 'cbs',
    cpm: '$21.56',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'gray-xleg-burlington',
    name: 'XLEG-TV (Gray Burlington)',
    marketId: 'burlington-vt',
    broadcasterId: 'gray',
    cpm: '$19.13',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'univision-xdco-burlington',
    name: 'XDCO-TV (Univision Burlington)',
    marketId: 'burlington-vt',
    broadcasterId: 'univision',
    cpm: '$19.68',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'nbc-xshk-burlington',
    name: 'XSHK-TV (NBC Burlington)',
    marketId: 'burlington-vt',
    broadcasterId: 'nbc',
    cpm: '$20.07',
    marketShare: 20,
    audienceSize: 100000
  },
  {
    id: 'scripps-xnbx-burlington',
    name: 'XNBX-TV (Scripps Burlington)',
    marketId: 'burlington-vt',
    broadcasterId: 'scripps',
    cpm: '$21.15',
    marketShare: 21,
    audienceSize: 105000
  },
  {
    id: 'cbs-[eel-burlington',
    name: '[EEL-TV (CBS Burlington)',
    marketId: 'burlington-vt',
    broadcasterId: 'cbs',
    cpm: '$21.96',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'nexstar-zzrf-burlington',
    name: 'ZZRF-TV (Nexstar Burlington)',
    marketId: 'burlington-vt',
    broadcasterId: 'nexstar',
    cpm: '$20.74',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'gray-[xxw-cedar',
    name: '[XXW-TV (Gray Cedar)',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'gray',
    cpm: '$21.91',
    marketShare: 26,
    audienceSize: 208000
  },
  {
    id: 'univision-[zbo-cedar',
    name: '[ZBO-TV (Univision Cedar)',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'univision',
    cpm: '$19.32',
    marketShare: 21,
    audienceSize: 168000
  },
  {
    id: 'scripps-ybjs-cedar',
    name: 'YBJS-TV (Scripps Cedar)',
    marketId: 'cedar-rapids-ia',
    broadcasterId: 'scripps',
    cpm: '$19.55',
    marketShare: 29,
    audienceSize: 231999
  },
  {
    id: 'tegna-yumf-baton',
    name: 'YUMF-TV (TEGNA Baton)',
    marketId: 'baton-rouge-la',
    broadcasterId: 'tegna',
    cpm: '$21.88',
    marketShare: 33,
    audienceSize: 297000
  },
  {
    id: 'hearst-zygn-baton',
    name: 'ZYGN-TV (Hearst Baton)',
    marketId: 'baton-rouge-la',
    broadcasterId: 'hearst',
    cpm: '$21.65',
    marketShare: 18,
    audienceSize: 162000
  },
  {
    id: 'cbs-[gzs-baton',
    name: '[GZS-TV (CBS Baton)',
    marketId: 'baton-rouge-la',
    broadcasterId: 'cbs',
    cpm: '$21.42',
    marketShare: 17,
    audienceSize: 153000
  },
  {
    id: 'nexstar-wlzv-baton',
    name: 'WLZV-TV (Nexstar Baton)',
    marketId: 'baton-rouge-la',
    broadcasterId: 'nexstar',
    cpm: '$21.02',
    marketShare: 33,
    audienceSize: 297000
  },
  {
    id: 'univision-zuln-ft',
    name: 'ZULN-TV (Univision Ft.)',
    marketId: 'ft-smith-ar',
    broadcasterId: 'univision',
    cpm: '$21.37',
    marketShare: 22,
    audienceSize: 132000
  },
  {
    id: 'scripps-xtll-ft',
    name: 'XTLL-TV (Scripps Ft.)',
    marketId: 'ft-smith-ar',
    broadcasterId: 'scripps',
    cpm: '$21.06',
    marketShare: 26,
    audienceSize: 156000
  },
  {
    id: 'entravision-[xig-ft',
    name: '[XIG-TV (Entravision Ft.)',
    marketId: 'ft-smith-ar',
    broadcasterId: 'entravision',
    cpm: '$19.22',
    marketShare: 20,
    audienceSize: 120000
  },
  {
    id: 'abc-xpql-ft',
    name: 'XPQL-TV (ABC Ft.)',
    marketId: 'ft-smith-ar',
    broadcasterId: 'abc',
    cpm: '$20.48',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'cbs-zglr-ft',
    name: 'ZGLR-TV (CBS Ft.)',
    marketId: 'ft-smith-ar',
    broadcasterId: 'cbs',
    cpm: '$21.45',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'nbc-zumf-ft',
    name: 'ZUMF-TV (NBC Ft.)',
    marketId: 'ft-smith-ar',
    broadcasterId: 'nbc',
    cpm: '$21.12',
    marketShare: 32,
    audienceSize: 192000
  },
  {
    id: 'abc-wkkg-myrtle',
    name: 'WKKG-TV (ABC Myrtie)',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'abc',
    cpm: '$21.51',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'cbs-wgfm-myrtle',
    name: 'WGFM-TV (CBS Myrtie)',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'cbs',
    cpm: '$20.78',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'hubbard-broadcasting-ykcj-myrtle',
    name: 'YKCJ-TV (Hubbard Broadcasting Myrtie)',
    marketId: 'myrtle-beach-sc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$21.01',
    marketShare: 19,
    audienceSize: 114000
  },
  {
    id: 'gray-wdmt-boise',
    name: 'WDMT-TV (Gray Boise)',
    marketId: 'boise-id',
    broadcasterId: 'gray',
    cpm: '$20.32',
    marketShare: 21,
    audienceSize: 147000
  },
  {
    id: 'nexstar-zlqo-boise',
    name: 'ZLQO-TV (Nexstar Boise)',
    marketId: 'boise-id',
    broadcasterId: 'nexstar',
    cpm: '$21.64',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'entravision-[akq-boise',
    name: '[AKQ-TV (Entravision Boise)',
    marketId: 'boise-id',
    broadcasterId: 'entravision',
    cpm: '$21.85',
    marketShare: 17,
    audienceSize: 119000
  },
  {
    id: 'univision-xcdu-boise',
    name: 'XCDU-TV (Univision Boise)',
    marketId: 'boise-id',
    broadcasterId: 'univision',
    cpm: '$20.37',
    marketShare: 15,
    audienceSize: 105000
  },
  {
    id: 'gray-[imj-jackson',
    name: '[IMJ-TV (Gray Jackson)',
    marketId: 'jackson-ms',
    broadcasterId: 'gray',
    cpm: '$21.94',
    marketShare: 21,
    audienceSize: 126000
  },
  {
    id: 'nbc-wkff-jackson',
    name: 'WKFF-TV (NBC Jackson)',
    marketId: 'jackson-ms',
    broadcasterId: 'nbc',
    cpm: '$21.48',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'scripps-wulz-jackson',
    name: 'WULZ-TV (Scripps Jackson)',
    marketId: 'jackson-ms',
    broadcasterId: 'scripps',
    cpm: '$21.61',
    marketShare: 26,
    audienceSize: 156000
  },
  {
    id: 'nbc-wyko-south',
    name: 'WYKO-TV (NBC South)',
    marketId: 'south-bend-in',
    broadcasterId: 'nbc',
    cpm: '$21.00',
    marketShare: 30,
    audienceSize: 210000
  },
  {
    id: 'entravision-xyfg-south',
    name: 'XYFG-TV (Entravision South)',
    marketId: 'south-bend-in',
    broadcasterId: 'entravision',
    cpm: '$19.92',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'hearst-[toh-south',
    name: '[TOH-TV (Hearst South)',
    marketId: 'south-bend-in',
    broadcasterId: 'hearst',
    cpm: '$21.98',
    marketShare: 26,
    audienceSize: 182000
  },
  {
    id: 'abc-zkzz-south',
    name: 'ZKZZ-TV (ABC South)',
    marketId: 'south-bend-in',
    broadcasterId: 'abc',
    cpm: '$21.95',
    marketShare: 34,
    audienceSize: 238000
  },
  {
    id: 'morgan-murphy-yoby-south',
    name: 'YOBY-TV (Morgan Murphy South)',
    marketId: 'south-bend-in',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.82',
    marketShare: 26,
    audienceSize: 182000
  },
  {
    id: 'hubbard-broadcasting-xynn-south',
    name: 'XYNN-TV (Hubbard Broadcasting South)',
    marketId: 'south-bend-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$20.05',
    marketShare: 20,
    audienceSize: 140000
  },
  {
    id: 'entravision-[qit-tri',
    name: '[QIT-TV (Entravision Tri-Cities)',
    marketId: 'tri-cities-tn',
    broadcasterId: 'entravision',
    cpm: '$18.58',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'univision-wtfr-tri',
    name: 'WTFR-TV (Univision Tri-Cities)',
    marketId: 'tri-cities-tn',
    broadcasterId: 'univision',
    cpm: '$18.74',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'news-press-gazette-wnrb-tri',
    name: 'WNRB-TV (News Press Gazette Tri-Cities)',
    marketId: 'tri-cities-tn',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.90',
    marketShare: 20,
    audienceSize: 100000
  },
  {
    id: 'scripps-wyka-tri',
    name: 'WYKA-TV (Scripps Tri-Cities)',
    marketId: 'tri-cities-tn',
    broadcasterId: 'scripps',
    cpm: '$19.49',
    marketShare: 24,
    audienceSize: 120000
  },
  {
    id: 'morgan-murphy-ygxf-greenville',
    name: 'YGXF-TV (Morgan Murphy Greenville)',
    marketId: 'greenville-nc',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.66',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'scripps-xmjd-greenville',
    name: 'XMJD-TV (Scripps Greenville)',
    marketId: 'greenville-nc',
    broadcasterId: 'scripps',
    cpm: '$19.68',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'hubbard-broadcasting-xmqh-greenville',
    name: 'XMQH-TV (Hubbard Broadcasting Greenville)',
    marketId: 'greenville-nc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.91',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'abc-yfpq-greenville',
    name: 'YFPQ-TV (ABC Greenville)',
    marketId: 'greenville-nc',
    broadcasterId: 'abc',
    cpm: '$18.63',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'gray-xezr-greenville',
    name: 'XEZR-TV (Gray Greenville)',
    marketId: 'greenville-nc',
    broadcasterId: 'gray',
    cpm: '$17.28',
    marketShare: 24,
    audienceSize: 96000
  },
  {
    id: 'hearst-ytwt-greenville',
    name: 'YTWT-TV (Hearst Greenville)',
    marketId: 'greenville-nc',
    broadcasterId: 'hearst',
    cpm: '$17.69',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'news-press-gazette-xvuz-reno',
    name: 'XVUZ-TV (News Press Gazette Reno)',
    marketId: 'reno-nv',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.78',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'abc-ypbj-reno',
    name: 'YPBJ-TV (ABC Reno)',
    marketId: 'reno-nv',
    broadcasterId: 'abc',
    cpm: '$18.63',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'morgan-murphy-xghj-reno',
    name: 'XGHJ-TV (Morgan Murphy Reno)',
    marketId: 'reno-nv',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.96',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'hubbard-broadcasting-wkup-reno',
    name: 'WKUP-TV (Hubbard Broadcasting Reno)',
    marketId: 'reno-nv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.04',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'nexstar-[dmu-davenport',
    name: '[DMU-TV (Nexstar Davenport)',
    marketId: 'davenport-ia',
    broadcasterId: 'nexstar',
    cpm: '$19.40',
    marketShare: 28,
    audienceSize: 112000
  },
  {
    id: 'gray-wowq-davenport',
    name: 'WOWQ-TV (Gray Davenport)',
    marketId: 'davenport-ia',
    broadcasterId: 'gray',
    cpm: '$19.01',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'nbc-xozq-davenport',
    name: 'XOZQ-TV (NBC Davenport)',
    marketId: 'davenport-ia',
    broadcasterId: 'nbc',
    cpm: '$17.24',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'morgan-murphy-xaep-davenport',
    name: 'XAEP-TV (Morgan Murphy Davenport)',
    marketId: 'davenport-ia',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.21',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'cbs-yzyf-davenport',
    name: 'YZYF-TV (CBS Davenport)',
    marketId: 'davenport-ia',
    broadcasterId: 'cbs',
    cpm: '$17.05',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'news-press-gazette-wdhx-tallahassee',
    name: 'WDHX-TV (News Press Gazette Tallahasse)',
    marketId: 'tallahassee-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.81',
    marketShare: 23,
    audienceSize: 115000
  },
  {
    id: 'tegna-wcci-tallahassee',
    name: 'WCCI-TV (TEGNA Tallahasse)',
    marketId: 'tallahassee-fl',
    broadcasterId: 'tegna',
    cpm: '$17.00',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'hubbard-broadcasting-[ada-tallahassee',
    name: '[ADA-TV (Hubbard Broadcasting Tallahasse)',
    marketId: 'tallahassee-fl',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.77',
    marketShare: 33,
    audienceSize: 165000
  },
  {
    id: 'morgan-murphy-zlke-tallahassee',
    name: 'ZLKE-TV (Morgan Murphy Tallahasse)',
    marketId: 'tallahassee-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.74',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'abc-wloz-tallahassee',
    name: 'WLOZ-TV (ABC Tallahasse)',
    marketId: 'tallahassee-fl',
    broadcasterId: 'abc',
    cpm: '$17.72',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'cbs-wiwg-tallahassee',
    name: 'WIWG-TV (CBS Tallahasse)',
    marketId: 'tallahassee-fl',
    broadcasterId: 'cbs',
    cpm: '$18.94',
    marketShare: 15,
    audienceSize: 75000
  },
  {
    id: 'univision-wcqo-tyler',
    name: 'WCQO-TV (Univision Tyler-Long)',
    marketId: 'tyler-tx',
    broadcasterId: 'univision',
    cpm: '$18.50',
    marketShare: 30,
    audienceSize: 180000
  },
  {
    id: 'gray-ylpl-tyler',
    name: 'YLPL-TV (Gray Tyler-Long)',
    marketId: 'tyler-tx',
    broadcasterId: 'gray',
    cpm: '$19.32',
    marketShare: 25,
    audienceSize: 150000
  },
  {
    id: 'nbc-zvyh-tyler',
    name: 'ZVYH-TV (NBC Tyler-Long)',
    marketId: 'tyler-tx',
    broadcasterId: 'nbc',
    cpm: '$17.73',
    marketShare: 20,
    audienceSize: 120000
  },
  {
    id: 'nexstar-zdbb-tyler',
    name: 'ZDBB-TV (Nexstar Tyler-Long)',
    marketId: 'tyler-tx',
    broadcasterId: 'nexstar',
    cpm: '$18.62',
    marketShare: 27,
    audienceSize: 162000
  },
  {
    id: 'morgan-murphy-xfor-lincoln',
    name: 'XFOR-TV (Morgan Murphy Lincoln)',
    marketId: 'lincoln-ne',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.59',
    marketShare: 34,
    audienceSize: 204000
  },
  {
    id: 'news-press-gazette-zahf-lincoln',
    name: 'ZAHF-TV (News Press Gazette Lincoln)',
    marketId: 'lincoln-ne',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.04',
    marketShare: 26,
    audienceSize: 156000
  },
  {
    id: 'gray-zolp-lincoln',
    name: 'ZOLP-TV (Gray Lincoln)',
    marketId: 'lincoln-ne',
    broadcasterId: 'gray',
    cpm: '$17.49',
    marketShare: 29,
    audienceSize: 174000
  },
  {
    id: 'abc-zpfw-lincoln',
    name: 'ZPFW-TV (ABC Lincoln)',
    marketId: 'lincoln-ne',
    broadcasterId: 'abc',
    cpm: '$18.06',
    marketShare: 18,
    audienceSize: 108000
  },
  {
    id: 'entravision-xuvi-lincoln',
    name: 'XUVI-TV (Entravision Lincoln)',
    marketId: 'lincoln-ne',
    broadcasterId: 'entravision',
    cpm: '$18.65',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'nexstar-zajq-augusta',
    name: 'ZAJQ-TV (Nexstar Augusta)',
    marketId: 'augusta-ga',
    broadcasterId: 'nexstar',
    cpm: '$19.95',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'tegna-zcip-augusta',
    name: 'ZCIP-TV (TEGNA Augusta)',
    marketId: 'augusta-ga',
    broadcasterId: 'tegna',
    cpm: '$19.28',
    marketShare: 16,
    audienceSize: 96000
  },
  {
    id: 'morgan-murphy-yazy-augusta',
    name: 'YAZY-TV (Morgan Murphy Augusta)',
    marketId: 'augusta-ga',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.01',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'entravision-zvcm-augusta',
    name: 'ZVCM-TV (Entravision Augusta)',
    marketId: 'augusta-ga',
    broadcasterId: 'entravision',
    cpm: '$19.50',
    marketShare: 28,
    audienceSize: 168000
  },
  {
    id: 'univision-[pwj-augusta',
    name: '[PWJ-TV (Univision Augusta)',
    marketId: 'augusta-ga',
    broadcasterId: 'univision',
    cpm: '$19.58',
    marketShare: 18,
    audienceSize: 108000
  },
  {
    id: 'gray-zyje-evansville',
    name: 'ZYJE-TV (Gray Evansville)',
    marketId: 'evansville-in',
    broadcasterId: 'gray',
    cpm: '$18.32',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'nbc-watq-evansville',
    name: 'WATQ-TV (NBC Evansville)',
    marketId: 'evansville-in',
    broadcasterId: 'nbc',
    cpm: '$17.38',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'nexstar-yvmz-evansville',
    name: 'YVMZ-TV (Nexstar Evansville)',
    marketId: 'evansville-in',
    broadcasterId: 'nexstar',
    cpm: '$17.52',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'tegna-[dnx-evansville',
    name: '[DNX-TV (TEGNA Evansville)',
    marketId: 'evansville-in',
    broadcasterId: 'tegna',
    cpm: '$17.33',
    marketShare: 28,
    audienceSize: 112000
  },
  {
    id: 'hubbard-broadcasting-zodr-evansville',
    name: 'ZODR-TV (Hubbard Broadcasting Evansville)',
    marketId: 'evansville-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.74',
    marketShare: 28,
    audienceSize: 112000
  },
  {
    id: 'univision-xpno-evansville',
    name: 'XPNO-TV (Univision Evansville)',
    marketId: 'evansville-in',
    broadcasterId: 'univision',
    cpm: '$17.26',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'hubbard-broadcasting-yoav-ft',
    name: 'YOAV-TV (Hubbard Broadcasting Ft.)',
    marketId: 'ft-wayne-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.02',
    marketShare: 33,
    audienceSize: 198000
  },
  {
    id: 'scripps-wtcs-ft',
    name: 'WTCS-TV (Scripps Ft.)',
    marketId: 'ft-wayne-in',
    broadcasterId: 'scripps',
    cpm: '$18.25',
    marketShare: 28,
    audienceSize: 168000
  },
  {
    id: 'hearst-[riq-ft',
    name: '[RIQ-TV (Hearst Ft.)',
    marketId: 'ft-wayne-in',
    broadcasterId: 'hearst',
    cpm: '$19.97',
    marketShare: 15,
    audienceSize: 90000
  },
  {
    id: 'abc-znkb-sioux',
    name: 'ZNKB-TV (ABC Sioux)',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'abc',
    cpm: '$18.96',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'gray-ywzx-sioux',
    name: 'YWZX-TV (Gray Sioux)',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'gray',
    cpm: '$19.29',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'hubbard-broadcasting-wvzx-sioux',
    name: 'WVZX-TV (Hubbard Broadcasting Sioux)',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.68',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'scripps-yiwp-sioux',
    name: 'YIWP-TV (Scripps Sioux)',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'scripps',
    cpm: '$19.41',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'entravision-xrro-sioux',
    name: 'XRRO-TV (Entravision Sioux)',
    marketId: 'sioux-falls-sd',
    broadcasterId: 'entravision',
    cpm: '$19.47',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'scripps-wace-johnstown',
    name: 'WACE-TV (Scripps Johnstown-)',
    marketId: 'johnstown-pa',
    broadcasterId: 'scripps',
    cpm: '$17.94',
    marketShare: 22,
    audienceSize: 110000
  },
  {
    id: 'news-press-gazette-zvcc-johnstown',
    name: 'ZVCC-TV (News Press Gazette Johnstown-)',
    marketId: 'johnstown-pa',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.18',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'gray-wmxr-johnstown',
    name: 'WMXR-TV (Gray Johnstown-)',
    marketId: 'johnstown-pa',
    broadcasterId: 'gray',
    cpm: '$19.44',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'entravision-znxm-johnstown',
    name: 'ZNXM-TV (Entravision Johnstown-)',
    marketId: 'johnstown-pa',
    broadcasterId: 'entravision',
    cpm: '$17.58',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'tegna-[uqr-johnstown',
    name: '[UQR-TV (TEGNA Johnstown-)',
    marketId: 'johnstown-pa',
    broadcasterId: 'tegna',
    cpm: '$17.97',
    marketShare: 19,
    audienceSize: 95000
  },
  {
    id: 'gray-wctg-fargo',
    name: 'WCTG-TV (Gray Fargo)',
    marketId: 'fargo-nd',
    broadcasterId: 'gray',
    cpm: '$19.05',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'morgan-murphy-yybe-fargo',
    name: 'YYBE-TV (Morgan Murphy Fargo)',
    marketId: 'fargo-nd',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.21',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'nbc-yjgk-fargo',
    name: 'YJGK-TV (NBC Fargo)',
    marketId: 'fargo-nd',
    broadcasterId: 'nbc',
    cpm: '$17.19',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'cbs-[hhe-fargo',
    name: '[HHE-TV (CBS Fargo)',
    marketId: 'fargo-nd',
    broadcasterId: 'cbs',
    cpm: '$18.79',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'nexstar-[ifc-fargo',
    name: '[IFC-TV (Nexstar Fargo)',
    marketId: 'fargo-nd',
    broadcasterId: 'nexstar',
    cpm: '$19.70',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'tegna-wnfl-yakima',
    name: 'WNFL-TV (TEGNA Yakima-Pas)',
    marketId: 'yakima-wa',
    broadcasterId: 'tegna',
    cpm: '$18.87',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'gray-wged-yakima',
    name: 'WGED-TV (Gray Yakima-Pas)',
    marketId: 'yakima-wa',
    broadcasterId: 'gray',
    cpm: '$18.86',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'hubbard-broadcasting-ytoi-yakima',
    name: 'YTOI-TV (Hubbard Broadcasting Yakima-Pas)',
    marketId: 'yakima-wa',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.81',
    marketShare: 24,
    audienceSize: 96000
  },
  {
    id: 'nexstar-[dzy-yakima',
    name: '[DZY-TV (Nexstar Yakima-Pas)',
    marketId: 'yakima-wa',
    broadcasterId: 'nexstar',
    cpm: '$19.10',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'nbc-xanq-yakima',
    name: 'XANQ-TV (NBC Yakima-Pas)',
    marketId: 'yakima-wa',
    broadcasterId: 'nbc',
    cpm: '$18.71',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'news-press-gazette-youd-yakima',
    name: 'YOUD-TV (News Press Gazette Yakima-Pas)',
    marketId: 'yakima-wa',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.61',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'univision-zymv-springfield',
    name: 'ZYMV-TV (Univision Springfiel)',
    marketId: 'springfield-ma',
    broadcasterId: 'univision',
    cpm: '$17.40',
    marketShare: 29,
    audienceSize: 203000
  },
  {
    id: 'tegna-xwls-springfield',
    name: 'XWLS-TV (TEGNA Springfiel)',
    marketId: 'springfield-ma',
    broadcasterId: 'tegna',
    cpm: '$19.91',
    marketShare: 15,
    audienceSize: 105000
  },
  {
    id: 'hubbard-broadcasting-[zdq-springfield',
    name: '[ZDQ-TV (Hubbard Broadcasting Springfiel)',
    marketId: 'springfield-ma',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.22',
    marketShare: 30,
    audienceSize: 210000
  },
  {
    id: 'hearst-[pxw-springfield',
    name: '[PXW-TV (Hearst Springfiel)',
    marketId: 'springfield-ma',
    broadcasterId: 'hearst',
    cpm: '$18.11',
    marketShare: 24,
    audienceSize: 168000
  },
  {
    id: 'news-press-gazette-[aiy-springfield',
    name: '[AIY-TV (News Press Gazette Springfiel)',
    marketId: 'springfield-ma',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.25',
    marketShare: 16,
    audienceSize: 112000
  },
  {
    id: 'gray-wfbn-traverse',
    name: 'WFBN-TV (Gray Traverse)',
    marketId: 'traverse-city-mi',
    broadcasterId: 'gray',
    cpm: '$18.16',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'hearst-[dag-traverse',
    name: '[DAG-TV (Hearst Traverse)',
    marketId: 'traverse-city-mi',
    broadcasterId: 'hearst',
    cpm: '$17.29',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'morgan-murphy-[xxr-traverse',
    name: '[XXR-TV (Morgan Murphy Traverse)',
    marketId: 'traverse-city-mi',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.11',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'scripps-wthw-traverse',
    name: 'WTHW-TV (Scripps Traverse)',
    marketId: 'traverse-city-mi',
    broadcasterId: 'scripps',
    cpm: '$19.20',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'cbs-wevb-traverse',
    name: 'WEVB-TV (CBS Traverse)',
    marketId: 'traverse-city-mi',
    broadcasterId: 'cbs',
    cpm: '$17.22',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'nexstar-ywph-lansing',
    name: 'YWPH-TV (Nexstar Lansing)',
    marketId: 'lansing-mi',
    broadcasterId: 'nexstar',
    cpm: '$19.34',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'abc-xkso-lansing',
    name: 'XKSO-TV (ABC Lansing)',
    marketId: 'lansing-mi',
    broadcasterId: 'abc',
    cpm: '$17.14',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'news-press-gazette-ypjs-lansing',
    name: 'YPJS-TV (News Press Gazette Lansing)',
    marketId: 'lansing-mi',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.01',
    marketShare: 16,
    audienceSize: 80000
  },
  {
    id: 'cbs-xnie-lansing',
    name: 'XNIE-TV (CBS Lansing)',
    marketId: 'lansing-mi',
    broadcasterId: 'cbs',
    cpm: '$19.40',
    marketShare: 21,
    audienceSize: 105000
  },
  {
    id: 'cbs-zdpt-youngstown',
    name: 'ZDPT-TV (CBS Youngstown)',
    marketId: 'youngstown-oh',
    broadcasterId: 'cbs',
    cpm: '$19.12',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'univision-wxdv-youngstown',
    name: 'WXDV-TV (Univision Youngstown)',
    marketId: 'youngstown-oh',
    broadcasterId: 'univision',
    cpm: '$18.63',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'tegna-xwgd-youngstown',
    name: 'XWGD-TV (TEGNA Youngstown)',
    marketId: 'youngstown-oh',
    broadcasterId: 'tegna',
    cpm: '$19.28',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'nexstar-yieh-youngstown',
    name: 'YIEH-TV (Nexstar Youngstown)',
    marketId: 'youngstown-oh',
    broadcasterId: 'nexstar',
    cpm: '$19.56',
    marketShare: 20,
    audienceSize: 100000
  },
  {
    id: 'scripps-[wfv-youngstown',
    name: '[WFV-TV (Scripps Youngstown)',
    marketId: 'youngstown-oh',
    broadcasterId: 'scripps',
    cpm: '$18.10',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'hearst-wwnt-macon',
    name: 'WWNT-TV (Hearst Macon)',
    marketId: 'macon-ga',
    broadcasterId: 'hearst',
    cpm: '$18.10',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'cbs-yhvn-macon',
    name: 'YHVN-TV (CBS Macon)',
    marketId: 'macon-ga',
    broadcasterId: 'cbs',
    cpm: '$18.40',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'entravision-zmng-macon',
    name: 'ZMNG-TV (Entravision Macon)',
    marketId: 'macon-ga',
    broadcasterId: 'entravision',
    cpm: '$19.28',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'nbc-yqrk-macon',
    name: 'YQRK-TV (NBC Macon)',
    marketId: 'macon-ga',
    broadcasterId: 'nbc',
    cpm: '$18.32',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'morgan-murphy-wcvy-macon',
    name: 'WCVY-TV (Morgan Murphy Macon)',
    marketId: 'macon-ga',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.66',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'nbc-yqhr-eugene',
    name: 'YQHR-TV (NBC Eugene)',
    marketId: 'eugene-or',
    broadcasterId: 'nbc',
    cpm: '$18.50',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'gray-xkrj-eugene',
    name: 'XKRJ-TV (Gray Eugene)',
    marketId: 'eugene-or',
    broadcasterId: 'gray',
    cpm: '$19.14',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'news-press-gazette-xhfe-eugene',
    name: 'XHFE-TV (News Press Gazette Eugene)',
    marketId: 'eugene-or',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.19',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'hubbard-broadcasting-yqgu-eugene',
    name: 'YQGU-TV (Hubbard Broadcasting Eugene)',
    marketId: 'eugene-or',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.80',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'tegna-zgel-montgomery',
    name: 'ZGEL-TV (TEGNA Montgomery)',
    marketId: 'montgomery-al',
    broadcasterId: 'tegna',
    cpm: '$17.50',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'news-press-gazette-[faq-montgomery',
    name: '[FAQ-TV (News Press Gazette Montgomery)',
    marketId: 'montgomery-al',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.29',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'nbc-wwwn-montgomery',
    name: 'WWWN-TV (NBC Montgomery)',
    marketId: 'montgomery-al',
    broadcasterId: 'nbc',
    cpm: '$19.77',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'scripps-xtib-montgomery',
    name: 'XTIB-TV (Scripps Montgomery)',
    marketId: 'montgomery-al',
    broadcasterId: 'scripps',
    cpm: '$18.33',
    marketShare: 31,
    audienceSize: 124000
  },
  {
    id: 'cbs-yots-montgomery',
    name: 'YOTS-TV (CBS Montgomery)',
    marketId: 'montgomery-al',
    broadcasterId: 'cbs',
    cpm: '$17.74',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'hearst-yfyq-montgomery',
    name: 'YFYQ-TV (Hearst Montgomery)',
    marketId: 'montgomery-al',
    broadcasterId: 'hearst',
    cpm: '$18.30',
    marketShare: 25,
    audienceSize: 100000
  },
  {
    id: 'nbc-xbhs-peoria',
    name: 'XBHS-TV (NBC Peoria-Blo)',
    marketId: 'peoria-il',
    broadcasterId: 'nbc',
    cpm: '$17.22',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'entravision-wmpy-peoria',
    name: 'WMPY-TV (Entravision Peoria-Blo)',
    marketId: 'peoria-il',
    broadcasterId: 'entravision',
    cpm: '$18.23',
    marketShare: 31,
    audienceSize: 186000
  },
  {
    id: 'news-press-gazette-[gte-peoria',
    name: '[GTE-TV (News Press Gazette Peoria-Blo)',
    marketId: 'peoria-il',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.90',
    marketShare: 24,
    audienceSize: 144000
  },
  {
    id: 'gray-xbek-santa',
    name: 'XBEK-TV (Gray Santa)',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'gray',
    cpm: '$18.48',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'news-press-gazette-wegq-santa',
    name: 'WEGQ-TV (News Press Gazette Santa)',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.69',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'univision-zggj-santa',
    name: 'ZGGJ-TV (Univision Santa)',
    marketId: 'santa-barbara-ca',
    broadcasterId: 'univision',
    cpm: '$18.08',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'cbs-yhcr-lafayette',
    name: 'YHCR-TV (CBS Lafayette)',
    marketId: 'lafayette-la',
    broadcasterId: 'cbs',
    cpm: '$18.28',
    marketShare: 26,
    audienceSize: 130000
  },
  {
    id: 'abc-wyyp-lafayette',
    name: 'WYYP-TV (ABC Lafayette)',
    marketId: 'lafayette-la',
    broadcasterId: 'abc',
    cpm: '$18.23',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'hubbard-broadcasting-yjdm-lafayette',
    name: 'YJDM-TV (Hubbard Broadcasting Lafayette)',
    marketId: 'lafayette-la',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.88',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'entravision-ygwa-lafayette',
    name: 'YGWA-TV (Entravision Lafayette)',
    marketId: 'lafayette-la',
    broadcasterId: 'entravision',
    cpm: '$18.61',
    marketShare: 22,
    audienceSize: 110000
  },
  {
    id: 'nbc-yspi-lafayette',
    name: 'YSPI-TV (NBC Lafayette)',
    marketId: 'lafayette-la',
    broadcasterId: 'nbc',
    cpm: '$18.59',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'hubbard-broadcasting-wpue-bakersfield',
    name: 'WPUE-TV (Hubbard Broadcasting Bakersfiel)',
    marketId: 'bakersfield-ca',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.12',
    marketShare: 15,
    audienceSize: 135000
  },
  {
    id: 'univision-zijg-bakersfield',
    name: 'ZIJG-TV (Univision Bakersfiel)',
    marketId: 'bakersfield-ca',
    broadcasterId: 'univision',
    cpm: '$19.55',
    marketShare: 19,
    audienceSize: 171000
  },
  {
    id: 'nbc-waqm-bakersfield',
    name: 'WAQM-TV (NBC Bakersfiel)',
    marketId: 'bakersfield-ca',
    broadcasterId: 'nbc',
    cpm: '$17.79',
    marketShare: 16,
    audienceSize: 144000
  },
  {
    id: 'nexstar-xsvb-bakersfield',
    name: 'XSVB-TV (Nexstar Bakersfiel)',
    marketId: 'bakersfield-ca',
    broadcasterId: 'nexstar',
    cpm: '$17.30',
    marketShare: 32,
    audienceSize: 288000
  },
  {
    id: 'tegna-yycu-bakersfield',
    name: 'YYCU-TV (TEGNA Bakersfiel)',
    marketId: 'bakersfield-ca',
    broadcasterId: 'tegna',
    cpm: '$19.19',
    marketShare: 30,
    audienceSize: 270000
  },
  {
    id: 'cbs-xjre-bakersfield',
    name: 'XJRE-TV (CBS Bakersfiel)',
    marketId: 'bakersfield-ca',
    broadcasterId: 'cbs',
    cpm: '$17.67',
    marketShare: 27,
    audienceSize: 243000
  },
  {
    id: 'scripps-zbtf-wilmington',
    name: 'ZBTF-TV (Scripps Wilmington)',
    marketId: 'wilmington-nc',
    broadcasterId: 'scripps',
    cpm: '$18.26',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'hubbard-broadcasting-xxmw-wilmington',
    name: 'XXMW-TV (Hubbard Broadcasting Wilmington)',
    marketId: 'wilmington-nc',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.54',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'news-press-gazette-xjmz-wilmington',
    name: 'XJMZ-TV (News Press Gazette Wilmington)',
    marketId: 'wilmington-nc',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.67',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'gray-[djy-wilmington',
    name: '[DJY-TV (Gray Wilmington)',
    marketId: 'wilmington-nc',
    broadcasterId: 'gray',
    cpm: '$17.94',
    marketShare: 24,
    audienceSize: 96000
  },
  {
    id: 'cbs-ycms-wilmington',
    name: 'YCMS-TV (CBS Wilmington)',
    marketId: 'wilmington-nc',
    broadcasterId: 'cbs',
    cpm: '$18.08',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'abc-wyjp-wilmington',
    name: 'WYJP-TV (ABC Wilmington)',
    marketId: 'wilmington-nc',
    broadcasterId: 'abc',
    cpm: '$18.46',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'univision-zdrs-columbus',
    name: 'ZDRS-TV (Univision Columbus)',
    marketId: 'columbus-ga',
    broadcasterId: 'univision',
    cpm: '$17.71',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'scripps-zgtv-columbus',
    name: 'ZGTV-TV (Scripps Columbus)',
    marketId: 'columbus-ga',
    broadcasterId: 'scripps',
    cpm: '$18.16',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'nexstar-zvse-columbus',
    name: 'ZVSE-TV (Nexstar Columbus)',
    marketId: 'columbus-ga',
    broadcasterId: 'nexstar',
    cpm: '$18.29',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'cbs-zthp-monterey',
    name: 'ZTHP-TV (CBS Monterey-S)',
    marketId: 'monterey-ca',
    broadcasterId: 'cbs',
    cpm: '$17.77',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'morgan-murphy-[oqp-monterey',
    name: '[OQP-TV (Morgan Murphy Monterey-S)',
    marketId: 'monterey-ca',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.19',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'gray-zijs-monterey',
    name: 'ZIJS-TV (Gray Monterey-S)',
    marketId: 'monterey-ca',
    broadcasterId: 'gray',
    cpm: '$18.89',
    marketShare: 29,
    audienceSize: 145000
  },
  {
    id: 'nexstar-zzna-monterey',
    name: 'ZZNA-TV (Nexstar Monterey-S)',
    marketId: 'monterey-ca',
    broadcasterId: 'nexstar',
    cpm: '$17.83',
    marketShare: 33,
    audienceSize: 165000
  },
  {
    id: 'nbc-[jox-monterey',
    name: '[JOX-TV (NBC Monterey-S)',
    marketId: 'monterey-ca',
    broadcasterId: 'nbc',
    cpm: '$19.24',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'univision-[rtp-monterey',
    name: '[RTP-TV (Univision Monterey-S)',
    marketId: 'monterey-ca',
    broadcasterId: 'univision',
    cpm: '$18.56',
    marketShare: 33,
    audienceSize: 165000
  },
  {
    id: 'nbc-ylyg-la',
    name: 'YLYG-TV (NBC La)',
    marketId: 'la-crosse-wi',
    broadcasterId: 'nbc',
    cpm: '$19.06',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'scripps-wdye-la',
    name: 'WDYE-TV (Scripps La)',
    marketId: 'la-crosse-wi',
    broadcasterId: 'scripps',
    cpm: '$17.64',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'entravision-woef-la',
    name: 'WOEF-TV (Entravision La)',
    marketId: 'la-crosse-wi',
    broadcasterId: 'entravision',
    cpm: '$19.27',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'tegna-[tqx-la',
    name: '[TQX-TV (TEGNA La)',
    marketId: 'la-crosse-wi',
    broadcasterId: 'tegna',
    cpm: '$19.76',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'cbs-xexe-la',
    name: 'XEXE-TV (CBS La)',
    marketId: 'la-crosse-wi',
    broadcasterId: 'cbs',
    cpm: '$18.95',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'gray-xsrg-la',
    name: 'XSRG-TV (Gray La)',
    marketId: 'la-crosse-wi',
    broadcasterId: 'gray',
    cpm: '$19.53',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'abc-xmyh-corpus',
    name: 'XMYH-TV (ABC Corpus)',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'abc',
    cpm: '$18.38',
    marketShare: 28,
    audienceSize: 140000
  },
  {
    id: 'news-press-gazette-zyxg-corpus',
    name: 'ZYXG-TV (News Press Gazette Corpus)',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.92',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'gray-zozf-corpus',
    name: 'ZOZF-TV (Gray Corpus)',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'gray',
    cpm: '$17.96',
    marketShare: 15,
    audienceSize: 75000
  },
  {
    id: 'nexstar-zwyc-corpus',
    name: 'ZWYC-TV (Nexstar Corpus)',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'nexstar',
    cpm: '$18.40',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'hubbard-broadcasting-zuuq-corpus',
    name: 'ZUUQ-TV (Hubbard Broadcasting Corpus)',
    marketId: 'corpus-christi-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.90',
    marketShare: 34,
    audienceSize: 170000
  },
  {
    id: 'nexstar-zbzl-salisbury',
    name: 'ZBZL-TV (Nexstar Salis)',
    marketId: 'salisbury-md',
    broadcasterId: 'nexstar',
    cpm: '$18.70',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'news-press-gazette-xzvy-salisbury',
    name: 'XZVY-TV (News Press Gazette Salis)',
    marketId: 'salisbury-md',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.98',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'hubbard-broadcasting-zgzt-salisbury',
    name: 'ZGZT-TV (Hubbard Broadcasting Salis)',
    marketId: 'salisbury-md',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.99',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'morgan-murphy-xnbm-salisbury',
    name: 'XNBM-TV (Morgan Murphy Salis)',
    marketId: 'salisbury-md',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.47',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'gray-zhbe-salisbury',
    name: 'ZHBE-TV (Gray Salis)',
    marketId: 'salisbury-md',
    broadcasterId: 'gray',
    cpm: '$17.57',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'abc-xwto-amarillo',
    name: 'XWTO-TV (ABC Amarillo)',
    marketId: 'amarillo-tx',
    broadcasterId: 'abc',
    cpm: '$19.60',
    marketShare: 15,
    audienceSize: 45000
  },
  {
    id: 'cbs-[xpd-amarillo',
    name: '[XPD-TV (CBS Amarillo)',
    marketId: 'amarillo-tx',
    broadcasterId: 'cbs',
    cpm: '$19.70',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'news-press-gazette-xeiq-amarillo',
    name: 'XEIQ-TV (News Press Gazette Amarillo)',
    marketId: 'amarillo-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.91',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'tegna-wekd-amarillo',
    name: 'WEKD-TV (TEGNA Amarillo)',
    marketId: 'amarillo-tx',
    broadcasterId: 'tegna',
    cpm: '$18.27',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'nbc-ylpd-amarillo',
    name: 'YLPD-TV (NBC Amarillo)',
    marketId: 'amarillo-tx',
    broadcasterId: 'nbc',
    cpm: '$17.34',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'cbs-[xnk-wausau',
    name: '[XNK-TV (CBS Wausau-Rhi)',
    marketId: 'wausau-wi',
    broadcasterId: 'cbs',
    cpm: '$19.37',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'abc-xwac-wausau',
    name: 'XWAC-TV (ABC Wausau-Rhi)',
    marketId: 'wausau-wi',
    broadcasterId: 'abc',
    cpm: '$19.56',
    marketShare: 15,
    audienceSize: 45000
  },
  {
    id: 'univision-xill-wausau',
    name: 'XILL-TV (Univision Wausau-Rhi)',
    marketId: 'wausau-wi',
    broadcasterId: 'univision',
    cpm: '$19.00',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'nexstar-xgic-columbus',
    name: 'XGIC-TV (Nexstar Columbus-T)',
    marketId: 'columbus-ms',
    broadcasterId: 'nexstar',
    cpm: '$17.76',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'nbc-wtrb-columbus',
    name: 'WTRB-TV (NBC Columbus-T)',
    marketId: 'columbus-ms',
    broadcasterId: 'nbc',
    cpm: '$17.80',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'cbs-wvgx-columbus',
    name: 'WVGX-TV (CBS Columbus-T)',
    marketId: 'columbus-ms',
    broadcasterId: 'cbs',
    cpm: '$17.91',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'news-press-gazette-xvbk-columbus',
    name: 'XVBK-TV (News Press Gazette Columbus-T)',
    marketId: 'columbus-ms',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.12',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'gray-zknb-columbus',
    name: 'ZKNB-TV (Gray Columbus-T)',
    marketId: 'columbus-ms',
    broadcasterId: 'gray',
    cpm: '$17.35',
    marketShare: 33,
    audienceSize: 99000
  },
  {
    id: 'abc-wexh-columbia',
    name: 'WEXH-TV (ABC Columbia-J)',
    marketId: 'columbia-mo',
    broadcasterId: 'abc',
    cpm: '$17.52',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'cbs-[kpg-columbia',
    name: '[KPG-TV (CBS Columbia-J)',
    marketId: 'columbia-mo',
    broadcasterId: 'cbs',
    cpm: '$18.50',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'nbc-yjmo-columbia',
    name: 'YJMO-TV (NBC Columbia-J)',
    marketId: 'columbia-mo',
    broadcasterId: 'nbc',
    cpm: '$17.52',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'gray-[rmx-columbia',
    name: '[RMX-TV (Gray Columbia-J)',
    marketId: 'columbia-mo',
    broadcasterId: 'gray',
    cpm: '$19.04',
    marketShare: 34,
    audienceSize: 136000
  },
  {
    id: 'abc-ylmi-chico',
    name: 'YLMI-TV (ABC Chico-Redd)',
    marketId: 'chico-ca',
    broadcasterId: 'abc',
    cpm: '$18.56',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'entravision-zgqp-chico',
    name: 'ZGQP-TV (Entravision Chico-Redd)',
    marketId: 'chico-ca',
    broadcasterId: 'entravision',
    cpm: '$17.61',
    marketShare: 33,
    audienceSize: 99000
  },
  {
    id: 'nexstar-zbvf-chico',
    name: 'ZBVF-TV (Nexstar Chico-Redd)',
    marketId: 'chico-ca',
    broadcasterId: 'nexstar',
    cpm: '$18.21',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'cbs-ynrp-chico',
    name: 'YNRP-TV (CBS Chico-Redd)',
    marketId: 'chico-ca',
    broadcasterId: 'cbs',
    cpm: '$17.09',
    marketShare: 15,
    audienceSize: 45000
  },
  {
    id: 'tegna-zpke-chico',
    name: 'ZPKE-TV (TEGNA Chico-Redd)',
    marketId: 'chico-ca',
    broadcasterId: 'tegna',
    cpm: '$19.25',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'hearst-zyfq-rockford',
    name: 'ZYFQ-TV (Hearst Rockford)',
    marketId: 'rockford-il',
    broadcasterId: 'hearst',
    cpm: '$17.61',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'scripps-wqsf-rockford',
    name: 'WQSF-TV (Scripps Rockford)',
    marketId: 'rockford-il',
    broadcasterId: 'scripps',
    cpm: '$17.87',
    marketShare: 20,
    audienceSize: 80000
  },
  {
    id: 'gray-[nwe-rockford',
    name: '[NWE-TV (Gray Rockford)',
    marketId: 'rockford-il',
    broadcasterId: 'gray',
    cpm: '$18.17',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'cbs-zklm-rockford',
    name: 'ZKLM-TV (CBS Rockford)',
    marketId: 'rockford-il',
    broadcasterId: 'cbs',
    cpm: '$17.25',
    marketShare: 30,
    audienceSize: 120000
  },
  {
    id: 'morgan-murphy-wtxy-rockford',
    name: 'WTXY-TV (Morgan Murphy Rockford)',
    marketId: 'rockford-il',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.49',
    marketShare: 17,
    audienceSize: 68000
  },
  {
    id: 'abc-zylf-duluth',
    name: 'ZYLF-TV (ABC Duluth)',
    marketId: 'duluth-mn',
    broadcasterId: 'abc',
    cpm: '$17.09',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'tegna-ylaj-duluth',
    name: 'YLAJ-TV (TEGNA Duluth)',
    marketId: 'duluth-mn',
    broadcasterId: 'tegna',
    cpm: '$18.42',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'univision-xffg-duluth',
    name: 'XFFG-TV (Univision Duluth)',
    marketId: 'duluth-mn',
    broadcasterId: 'univision',
    cpm: '$17.03',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'hubbard-broadcasting-xxpm-duluth',
    name: 'XXPM-TV (Hubbard Broadcasting Duluth)',
    marketId: 'duluth-mn',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.41',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'hearst-[vjw-medford',
    name: '[VJW-TV (Hearst Medford-Kl)',
    marketId: 'medford-or',
    broadcasterId: 'hearst',
    cpm: '$19.67',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'hubbard-broadcasting-[ftl-medford',
    name: '[FTL-TV (Hubbard Broadcasting Medford-Kl)',
    marketId: 'medford-or',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.78',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'morgan-murphy-wogl-medford',
    name: 'WOGL-TV (Morgan Murphy Medford-Kl)',
    marketId: 'medford-or',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.78',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'tegna-wygs-medford',
    name: 'WYGS-TV (TEGNA Medford-Kl)',
    marketId: 'medford-or',
    broadcasterId: 'tegna',
    cpm: '$17.83',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'news-press-gazette-yzuu-medford',
    name: 'YZUU-TV (News Press Gazette Medford-Kl)',
    marketId: 'medford-or',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.27',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'news-press-gazette-zged-lubbock',
    name: 'ZGED-TV (News Press Gazette Lubbock)',
    marketId: 'lubbock-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.19',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'morgan-murphy-[sdq-lubbock',
    name: '[SDQ-TV (Morgan Murphy Lubbock)',
    marketId: 'lubbock-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.39',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'nbc-zqxv-lubbock',
    name: 'ZQXV-TV (NBC Lubbock)',
    marketId: 'lubbock-tx',
    broadcasterId: 'nbc',
    cpm: '$18.47',
    marketShare: 26,
    audienceSize: 104000
  },
  {
    id: 'nexstar-wqfy-lubbock',
    name: 'WQFY-TV (Nexstar Lubbock)',
    marketId: 'lubbock-tx',
    broadcasterId: 'nexstar',
    cpm: '$18.67',
    marketShare: 33,
    audienceSize: 132000
  },
  {
    id: 'gray-xqaq-lubbock',
    name: 'XQAQ-TV (Gray Lubbock)',
    marketId: 'lubbock-tx',
    broadcasterId: 'gray',
    cpm: '$17.14',
    marketShare: 29,
    audienceSize: 115999
  },
  {
    id: 'abc-whpj-topeka',
    name: 'WHPJ-TV (ABC Topeka)',
    marketId: 'topeka-ks',
    broadcasterId: 'abc',
    cpm: '$18.43',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'cbs-[hdj-topeka',
    name: '[HDJ-TV (CBS Topeka)',
    marketId: 'topeka-ks',
    broadcasterId: 'cbs',
    cpm: '$19.32',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'hubbard-broadcasting-yqtr-topeka',
    name: 'YQTR-TV (Hubbard Broadcasting Topeka)',
    marketId: 'topeka-ks',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.31',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'scripps-[fyl-topeka',
    name: '[FYL-TV (Scripps Topeka)',
    marketId: 'topeka-ks',
    broadcasterId: 'scripps',
    cpm: '$17.68',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'nbc-wcyn-topeka',
    name: 'WCYN-TV (NBC Topeka)',
    marketId: 'topeka-ks',
    broadcasterId: 'nbc',
    cpm: '$19.98',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'univision-xbzy-topeka',
    name: 'XBZY-TV (Univision Topeka)',
    marketId: 'topeka-ks',
    broadcasterId: 'univision',
    cpm: '$17.29',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'hubbard-broadcasting-womo-monroe',
    name: 'WOMO-TV (Hubbard Broadcasting Monroe)',
    marketId: 'monroe-la',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.18',
    marketShare: 19,
    audienceSize: 57000
  },
  {
    id: 'abc-wcam-monroe',
    name: 'WCAM-TV (ABC Monroe)',
    marketId: 'monroe-la',
    broadcasterId: 'abc',
    cpm: '$17.85',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'univision-zrfn-monroe',
    name: 'ZRFN-TV (Univision Monroe)',
    marketId: 'monroe-la',
    broadcasterId: 'univision',
    cpm: '$17.84',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'nbc-xcbj-beaumont',
    name: 'XCBJ-TV (NBC Beaumont-P)',
    marketId: 'beaumont-tx',
    broadcasterId: 'nbc',
    cpm: '$19.72',
    marketShare: 22,
    audienceSize: 88000
  },
  {
    id: 'news-press-gazette-ywlb-beaumont',
    name: 'YWLB-TV (News Press Gazette Beaumont-P)',
    marketId: 'beaumont-tx',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.68',
    marketShare: 27,
    audienceSize: 108000
  },
  {
    id: 'cbs-[mlv-beaumont',
    name: '[MLV-TV (CBS Beaumont-P)',
    marketId: 'beaumont-tx',
    broadcasterId: 'cbs',
    cpm: '$17.27',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'morgan-murphy-wuhb-beaumont',
    name: 'WUHB-TV (Morgan Murphy Beaumont-P)',
    marketId: 'beaumont-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.74',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'entravision-zzct-beaumont',
    name: 'ZZCT-TV (Entravision Beaumont-P)',
    marketId: 'beaumont-tx',
    broadcasterId: 'entravision',
    cpm: '$18.89',
    marketShare: 23,
    audienceSize: 92000
  },
  {
    id: 'scripps-ydou-beaumont',
    name: 'YDOU-TV (Scripps Beaumont-P)',
    marketId: 'beaumont-tx',
    broadcasterId: 'scripps',
    cpm: '$19.78',
    marketShare: 16,
    audienceSize: 64000
  },
  {
    id: 'entravision-zyyg-odessa',
    name: 'ZYYG-TV (Entravision Odessa-Mid)',
    marketId: 'odessa-tx',
    broadcasterId: 'entravision',
    cpm: '$19.88',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'nexstar-xuib-odessa',
    name: 'XUIB-TV (Nexstar Odessa-Mid)',
    marketId: 'odessa-tx',
    broadcasterId: 'nexstar',
    cpm: '$18.13',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'hearst-wxzj-odessa',
    name: 'WXZJ-TV (Hearst Odessa-Mid)',
    marketId: 'odessa-tx',
    broadcasterId: 'hearst',
    cpm: '$17.49',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'hubbard-broadcasting-wtqi-odessa',
    name: 'WTQI-TV (Hubbard Broadcasting Odessa-Mid)',
    marketId: 'odessa-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.81',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'tegna-zfvf-palm',
    name: 'ZFVF-TV (TEGNA Palm)',
    marketId: 'palm-springs-ca',
    broadcasterId: 'tegna',
    cpm: '$19.91',
    marketShare: 17,
    audienceSize: 85000
  },
  {
    id: 'morgan-murphy-yrct-palm',
    name: 'YRCT-TV (Morgan Murphy Palm)',
    marketId: 'palm-springs-ca',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.14',
    marketShare: 18,
    audienceSize: 90000
  },
  {
    id: 'univision-xqkz-palm',
    name: 'XQKZ-TV (Univision Palm)',
    marketId: 'palm-springs-ca',
    broadcasterId: 'univision',
    cpm: '$17.92',
    marketShare: 25,
    audienceSize: 125000
  },
  {
    id: 'cbs-ygaj-palm',
    name: 'YGAJ-TV (CBS Palm)',
    marketId: 'palm-springs-ca',
    broadcasterId: 'cbs',
    cpm: '$19.22',
    marketShare: 27,
    audienceSize: 135000
  },
  {
    id: 'news-press-gazette-ykcx-palm',
    name: 'YKCX-TV (News Press Gazette Palm)',
    marketId: 'palm-springs-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.25',
    marketShare: 30,
    audienceSize: 150000
  },
  {
    id: 'abc-zihf-palm',
    name: 'ZIHF-TV (ABC Palm)',
    marketId: 'palm-springs-ca',
    broadcasterId: 'abc',
    cpm: '$17.11',
    marketShare: 31,
    audienceSize: 155000
  },
  {
    id: 'abc-[rdo-anchorage',
    name: '[RDO-TV (ABC Anchorage)',
    marketId: 'anchorage-ak',
    broadcasterId: 'abc',
    cpm: '$17.34',
    marketShare: 21,
    audienceSize: 84000
  },
  {
    id: 'cbs-wfvo-anchorage',
    name: 'WFVO-TV (CBS Anchorage)',
    marketId: 'anchorage-ak',
    broadcasterId: 'cbs',
    cpm: '$18.48',
    marketShare: 18,
    audienceSize: 72000
  },
  {
    id: 'univision-ykaa-anchorage',
    name: 'YKAA-TV (Univision Anchorage)',
    marketId: 'anchorage-ak',
    broadcasterId: 'univision',
    cpm: '$19.90',
    marketShare: 30,
    audienceSize: 120000
  },
  {
    id: 'news-press-gazette-[por-anchorage',
    name: '[POR-TV (News Press Gazette Anchorage)',
    marketId: 'anchorage-ak',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.64',
    marketShare: 15,
    audienceSize: 60000
  },
  {
    id: 'morgan-murphy-yjif-anchorage',
    name: 'YJIF-TV (Morgan Murphy Anchorage)',
    marketId: 'anchorage-ak',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.14',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'gray-xjda-bismarck',
    name: 'XJDA-TV (Gray Bismarck-M)',
    marketId: 'bismarck-nd',
    broadcasterId: 'gray',
    cpm: '$17.95',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'morgan-murphy-zvrj-bismarck',
    name: 'ZVRJ-TV (Morgan Murphy Bismarck-M)',
    marketId: 'bismarck-nd',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.08',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'tegna-yalv-bismarck',
    name: 'YALV-TV (TEGNA Bismarck-M)',
    marketId: 'bismarck-nd',
    broadcasterId: 'tegna',
    cpm: '$19.39',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'cbs-yduy-bismarck',
    name: 'YDUY-TV (CBS Bismarck-M)',
    marketId: 'bismarck-nd',
    broadcasterId: 'cbs',
    cpm: '$17.33',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'univision-[nxp-panama',
    name: '[NXP-TV (Univision Panama)',
    marketId: 'panama-city-fl',
    broadcasterId: 'univision',
    cpm: '$19.45',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'abc-ybeo-panama',
    name: 'YBEO-TV (ABC Panama)',
    marketId: 'panama-city-fl',
    broadcasterId: 'abc',
    cpm: '$17.77',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'news-press-gazette-wnaf-panama',
    name: 'WNAF-TV (News Press Gazette Panama)',
    marketId: 'panama-city-fl',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.52',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'morgan-murphy-[sdo-panama',
    name: '[SDO-TV (Morgan Murphy Panama)',
    marketId: 'panama-city-fl',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.93',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'nexstar-xfil-panama',
    name: 'XFIL-TV (Nexstar Panama)',
    marketId: 'panama-city-fl',
    broadcasterId: 'nexstar',
    cpm: '$19.84',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'tegna-[kzm-panama',
    name: '[KZM-TV (TEGNA Panama)',
    marketId: 'panama-city-fl',
    broadcasterId: 'tegna',
    cpm: '$17.50',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'abc-wntw-sioux',
    name: 'WNTW-TV (ABC Sioux)',
    marketId: 'sioux-city-ia',
    broadcasterId: 'abc',
    cpm: '$19.64',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'hearst-[yid-sioux',
    name: '[YID-TV (Hearst Sioux)',
    marketId: 'sioux-city-ia',
    broadcasterId: 'hearst',
    cpm: '$18.78',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'cbs-ycjd-sioux',
    name: 'YCJD-TV (CBS Sioux)',
    marketId: 'sioux-city-ia',
    broadcasterId: 'cbs',
    cpm: '$17.10',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'morgan-murphy-[enf-wichita',
    name: '[ENF-TV (Morgan Murphy Wichita)',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.46',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'nbc-[ohy-wichita',
    name: '[OHY-TV (NBC Wichita)',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'nbc',
    cpm: '$19.41',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'hubbard-broadcasting-whye-wichita',
    name: 'WHYE-TV (Hubbard Broadcasting Wichita)',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.91',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'abc-xkdb-wichita',
    name: 'XKDB-TV (ABC Wichita)',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'abc',
    cpm: '$17.15',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'gray-wlum-wichita',
    name: 'WLUM-TV (Gray Wichita)',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'gray',
    cpm: '$19.27',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'entravision-ybrv-wichita',
    name: 'YBRV-TV (Entravision Wichita)',
    marketId: 'wichita-falls-tx',
    broadcasterId: 'entravision',
    cpm: '$17.64',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'entravision-ydrh-joplin',
    name: 'YDRH-TV (Entravision Joplin)',
    marketId: 'joplin-mo',
    broadcasterId: 'entravision',
    cpm: '$18.66',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'gray-zwzl-joplin',
    name: 'ZWZL-TV (Gray Joplin)',
    marketId: 'joplin-mo',
    broadcasterId: 'gray',
    cpm: '$18.51',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'hearst-xblo-joplin',
    name: 'XBLO-TV (Hearst Joplin)',
    marketId: 'joplin-mo',
    broadcasterId: 'hearst',
    cpm: '$18.00',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'cbs-yvii-joplin',
    name: 'YVII-TV (CBS Joplin)',
    marketId: 'joplin-mo',
    broadcasterId: 'cbs',
    cpm: '$19.61',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'univision-xaea-joplin',
    name: 'XAEA-TV (Univision Joplin)',
    marketId: 'joplin-mo',
    broadcasterId: 'univision',
    cpm: '$19.84',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'nexstar-zajp-joplin',
    name: 'ZAJP-TV (Nexstar Joplin)',
    marketId: 'joplin-mo',
    broadcasterId: 'nexstar',
    cpm: '$19.85',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'gray-yngf-albany',
    name: 'YNGF-TV (Gray Albany)',
    marketId: 'albany-ga',
    broadcasterId: 'gray',
    cpm: '$17.12',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'abc-[bde-albany',
    name: '[BDE-TV (ABC Albany)',
    marketId: 'albany-ga',
    broadcasterId: 'abc',
    cpm: '$18.37',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'news-press-gazette-zkcu-albany',
    name: 'ZKCU-TV (News Press Gazette Albany)',
    marketId: 'albany-ga',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.17',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'univision-ybzr-albany',
    name: 'YBZR-TV (Univision Albany)',
    marketId: 'albany-ga',
    broadcasterId: 'univision',
    cpm: '$17.51',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'hubbard-broadcasting-xeft-albany',
    name: 'XEFT-TV (Hubbard Broadcasting Albany)',
    marketId: 'albany-ga',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.10',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'abc-xltf-rochester',
    name: 'XLTF-TV (ABC Rochester)',
    marketId: 'rochester-mn',
    broadcasterId: 'abc',
    cpm: '$17.41',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'cbs-wqfw-rochester',
    name: 'WQFW-TV (CBS Rochester)',
    marketId: 'rochester-mn',
    broadcasterId: 'cbs',
    cpm: '$18.95',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'nexstar-zkyb-rochester',
    name: 'ZKYB-TV (Nexstar Rochester)',
    marketId: 'rochester-mn',
    broadcasterId: 'nexstar',
    cpm: '$19.75',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'news-press-gazette-wazv-rochester',
    name: 'WAZV-TV (News Press Gazette Rochester)',
    marketId: 'rochester-mn',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.12',
    marketShare: 17,
    audienceSize: 51000
  },
  {
    id: 'morgan-murphy-[xnm-rochester',
    name: '[XNM-TV (Morgan Murphy Rochester)',
    marketId: 'rochester-mn',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.09',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'tegna-zseq-erie',
    name: 'ZSEQ-TV (TEGNA Erie)',
    marketId: 'erie-pa',
    broadcasterId: 'tegna',
    cpm: '$17.12',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'cbs-yxux-erie',
    name: 'YXUX-TV (CBS Erie)',
    marketId: 'erie-pa',
    broadcasterId: 'cbs',
    cpm: '$19.88',
    marketShare: 34,
    audienceSize: 102000
  },
  {
    id: 'news-press-gazette-zgwg-erie',
    name: 'ZGWG-TV (News Press Gazette Erie)',
    marketId: 'erie-pa',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.74',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'scripps-wurt-erie',
    name: 'WURT-TV (Scripps Erie)',
    marketId: 'erie-pa',
    broadcasterId: 'scripps',
    cpm: '$18.03',
    marketShare: 18,
    audienceSize: 54000
  },
  {
    id: 'nbc-yxcf-erie',
    name: 'YXCF-TV (NBC Erie)',
    marketId: 'erie-pa',
    broadcasterId: 'nbc',
    cpm: '$19.35',
    marketShare: 15,
    audienceSize: 45000
  },
  {
    id: 'morgan-murphy-wnll-idaho',
    name: 'WNLL-TV (Morgan Murphy Idaho)',
    marketId: 'idaho-falls-id',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.82',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'entravision-wscm-idaho',
    name: 'WSCM-TV (Entravision Idaho)',
    marketId: 'idaho-falls-id',
    broadcasterId: 'entravision',
    cpm: '$19.53',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'abc-xdvr-idaho',
    name: 'XDVR-TV (ABC Idaho)',
    marketId: 'idaho-falls-id',
    broadcasterId: 'abc',
    cpm: '$18.01',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'hearst-yhhk-idaho',
    name: 'YHHK-TV (Hearst Idaho)',
    marketId: 'idaho-falls-id',
    broadcasterId: 'hearst',
    cpm: '$17.50',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'univision-xdmi-idaho',
    name: 'XDMI-TV (Univision Idaho)',
    marketId: 'idaho-falls-id',
    broadcasterId: 'univision',
    cpm: '$19.35',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'nbc-yftc-bangor',
    name: 'YFTC-TV (NBC Bangor)',
    marketId: 'bangor-me',
    broadcasterId: 'nbc',
    cpm: '$17.21',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'hearst-[pyu-bangor',
    name: '[PYU-TV (Hearst Bangor)',
    marketId: 'bangor-me',
    broadcasterId: 'hearst',
    cpm: '$18.30',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'scripps-zgku-bangor',
    name: 'ZGKU-TV (Scripps Bangor)',
    marketId: 'bangor-me',
    broadcasterId: 'scripps',
    cpm: '$19.00',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'cbs-[awz-bangor',
    name: '[AWZ-TV (CBS Bangor)',
    marketId: 'bangor-me',
    broadcasterId: 'cbs',
    cpm: '$19.01',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'entravision-ydxv-bangor',
    name: 'YDXV-TV (Entravision Bangor)',
    marketId: 'bangor-me',
    broadcasterId: 'entravision',
    cpm: '$18.59',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'univision-xwzz-gainesville',
    name: 'XWZZ-TV (Univision Gainesvill)',
    marketId: 'gainesville-fl',
    broadcasterId: 'univision',
    cpm: '$18.83',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'gray-wgiu-gainesville',
    name: 'WGIU-TV (Gray Gainesvill)',
    marketId: 'gainesville-fl',
    broadcasterId: 'gray',
    cpm: '$17.12',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'nbc-yfuu-gainesville',
    name: 'YFUU-TV (NBC Gainesvill)',
    marketId: 'gainesville-fl',
    broadcasterId: 'nbc',
    cpm: '$18.20',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'tegna-zcvc-gainesville',
    name: 'ZCVC-TV (TEGNA Gainesvill)',
    marketId: 'gainesville-fl',
    broadcasterId: 'tegna',
    cpm: '$19.72',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'tegna-yjsb-biloxi',
    name: 'YJSB-TV (TEGNA Biloxi-Gul)',
    marketId: 'biloxi-ms',
    broadcasterId: 'tegna',
    cpm: '$17.15',
    marketShare: 32,
    audienceSize: 128000
  },
  {
    id: 'hubbard-broadcasting-xdah-biloxi',
    name: 'XDAH-TV (Hubbard Broadcasting Biloxi-Gul)',
    marketId: 'biloxi-ms',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.78',
    marketShare: 19,
    audienceSize: 76000
  },
  {
    id: 'nbc-yasp-biloxi',
    name: 'YASP-TV (NBC Biloxi-Gul)',
    marketId: 'biloxi-ms',
    broadcasterId: 'nbc',
    cpm: '$18.08',
    marketShare: 28,
    audienceSize: 112000
  },
  {
    id: 'abc-wryi-terre',
    name: 'WRYI-TV (ABC Terre)',
    marketId: 'terre-haute-in',
    broadcasterId: 'abc',
    cpm: '$18.75',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'cbs-yrtm-terre',
    name: 'YRTM-TV (CBS Terre)',
    marketId: 'terre-haute-in',
    broadcasterId: 'cbs',
    cpm: '$18.13',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'hubbard-broadcasting-xook-terre',
    name: 'XOOK-TV (Hubbard Broadcasting Terre)',
    marketId: 'terre-haute-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.72',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'nbc-wxij-terre',
    name: 'WXIJ-TV (NBC Terre)',
    marketId: 'terre-haute-in',
    broadcasterId: 'nbc',
    cpm: '$18.18',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'nexstar-[lgc-terre',
    name: '[LGC-TV (Nexstar Terre)',
    marketId: 'terre-haute-in',
    broadcasterId: 'nexstar',
    cpm: '$17.15',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'tegna-xryx-terre',
    name: 'XRYX-TV (TEGNA Terre)',
    marketId: 'terre-haute-in',
    broadcasterId: 'tegna',
    cpm: '$17.31',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'abc-yxss-sherman',
    name: 'YXSS-TV (ABC Sherman)',
    marketId: 'sherman-tx',
    broadcasterId: 'abc',
    cpm: '$17.30',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'scripps-zuhi-sherman',
    name: 'ZUHI-TV (Scripps Sherman)',
    marketId: 'sherman-tx',
    broadcasterId: 'scripps',
    cpm: '$17.41',
    marketShare: 21,
    audienceSize: 63000
  },
  {
    id: 'hubbard-broadcasting-zypr-sherman',
    name: 'ZYPR-TV (Hubbard Broadcasting Sherman)',
    marketId: 'sherman-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.37',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'hearst-[vpv-sherman',
    name: '[VPV-TV (Hearst Sherman)',
    marketId: 'sherman-tx',
    broadcasterId: 'hearst',
    cpm: '$19.88',
    marketShare: 33,
    audienceSize: 99000
  },
  {
    id: 'nexstar-wjrv-sherman',
    name: 'WJRV-TV (Nexstar Sherman)',
    marketId: 'sherman-tx',
    broadcasterId: 'nexstar',
    cpm: '$17.78',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'entravision-wdli-sherman',
    name: 'WDLI-TV (Entravision Sherman)',
    marketId: 'sherman-tx',
    broadcasterId: 'entravision',
    cpm: '$18.10',
    marketShare: 27,
    audienceSize: 81000
  },
  {
    id: 'abc-xuss-missoula',
    name: 'XUSS-TV (ABC Missoula)',
    marketId: 'missoula-mt',
    broadcasterId: 'abc',
    cpm: '$19.31',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'cbs-yyzt-missoula',
    name: 'YYZT-TV (CBS Missoula)',
    marketId: 'missoula-mt',
    broadcasterId: 'cbs',
    cpm: '$18.28',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'hubbard-broadcasting-zvrk-missoula',
    name: 'ZVRK-TV (Hubbard Broadcasting Missoula)',
    marketId: 'missoula-mt',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.92',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'tegna-zxzj-missoula',
    name: 'ZXZJ-TV (TEGNA Missoula)',
    marketId: 'missoula-mt',
    broadcasterId: 'tegna',
    cpm: '$18.39',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'abc-[zoq-binghamton',
    name: '[ZOQ-TV (ABC Binghamton)',
    marketId: 'binghamton-ny',
    broadcasterId: 'abc',
    cpm: '$17.53',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'tegna-xuqg-binghamton',
    name: 'XUQG-TV (TEGNA Binghamton)',
    marketId: 'binghamton-ny',
    broadcasterId: 'tegna',
    cpm: '$19.23',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'news-press-gazette-zadd-binghamton',
    name: 'ZADD-TV (News Press Gazette Binghamton)',
    marketId: 'binghamton-ny',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.94',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'hubbard-broadcasting-waws-binghamton',
    name: 'WAWS-TV (Hubbard Broadcasting Binghamton)',
    marketId: 'binghamton-ny',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.07',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'hearst-[sfs-binghamton',
    name: '[SFS-TV (Hearst Binghamton)',
    marketId: 'binghamton-ny',
    broadcasterId: 'hearst',
    cpm: '$17.65',
    marketShare: 31,
    audienceSize: 93000
  },
  {
    id: 'morgan-murphy-wmwm-binghamton',
    name: 'WMWM-TV (Morgan Murphy Binghamton)',
    marketId: 'binghamton-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.26',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'morgan-murphy-ydfi-wheeling',
    name: 'YDFI-TV (Morgan Murphy Wheeling)',
    marketId: 'wheeling-wv',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.66',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'nbc-[rap-wheeling',
    name: '[RAP-TV (NBC Wheeling)',
    marketId: 'wheeling-wv',
    broadcasterId: 'nbc',
    cpm: '$18.61',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'cbs-[rue-wheeling',
    name: '[RUE-TV (CBS Wheeling)',
    marketId: 'wheeling-wv',
    broadcasterId: 'cbs',
    cpm: '$18.78',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'abc-[ulo-wheeling',
    name: '[ULO-TV (ABC Wheeling)',
    marketId: 'wheeling-wv',
    broadcasterId: 'abc',
    cpm: '$18.27',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'news-press-gazette-[tci-yuma',
    name: '[TCI-TV (News Press Gazette Yuma)',
    marketId: 'yuma-az',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.11',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'hearst-xabt-yuma',
    name: 'XABT-TV (Hearst Yuma)',
    marketId: 'yuma-az',
    broadcasterId: 'hearst',
    cpm: '$17.66',
    marketShare: 29,
    audienceSize: 87000
  },
  {
    id: 'scripps-xvwj-yuma',
    name: 'XVWJ-TV (Scripps Yuma)',
    marketId: 'yuma-az',
    broadcasterId: 'scripps',
    cpm: '$19.45',
    marketShare: 24,
    audienceSize: 72000
  },
  {
    id: 'nexstar-[dqe-billings',
    name: '[DQE-TV (Nexstar Billings)',
    marketId: 'billings-mt',
    broadcasterId: 'nexstar',
    cpm: '$19.70',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'gray-zovu-billings',
    name: 'ZOVU-TV (Gray Billings)',
    marketId: 'billings-mt',
    broadcasterId: 'gray',
    cpm: '$19.15',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'nbc-xorl-billings',
    name: 'XORL-TV (NBC Billings)',
    marketId: 'billings-mt',
    broadcasterId: 'nbc',
    cpm: '$17.49',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'scripps-xuvt-billings',
    name: 'XUVT-TV (Scripps Billings)',
    marketId: 'billings-mt',
    broadcasterId: 'scripps',
    cpm: '$19.90',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'morgan-murphy-ykpp-billings',
    name: 'YKPP-TV (Morgan Murphy Billings)',
    marketId: 'billings-mt',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.38',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'tegna-[awj-abilene',
    name: '[AWJ-TV (TEGNA Abilene-Sw)',
    marketId: 'abilene-tx',
    broadcasterId: 'tegna',
    cpm: '$19.48',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'scripps-xpha-abilene',
    name: 'XPHA-TV (Scripps Abilene-Sw)',
    marketId: 'abilene-tx',
    broadcasterId: 'scripps',
    cpm: '$18.26',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'univision-[gaq-abilene',
    name: '[GAQ-TV (Univision Abilene-Sw)',
    marketId: 'abilene-tx',
    broadcasterId: 'univision',
    cpm: '$18.33',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'hubbard-broadcasting-wtoc-abilene',
    name: 'WTOC-TV (Hubbard Broadcasting Abilene-Sw)',
    marketId: 'abilene-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.14',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'gray-xtfb-abilene',
    name: 'XTFB-TV (Gray Abilene-Sw)',
    marketId: 'abilene-tx',
    broadcasterId: 'gray',
    cpm: '$18.52',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'cbs-yaar-bluefield',
    name: 'YAAR-TV (CBS Bluefield-)',
    marketId: 'bluefield-wv',
    broadcasterId: 'cbs',
    cpm: '$18.87',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'entravision-wuov-bluefield',
    name: 'WUOV-TV (Entravision Bluefield-)',
    marketId: 'bluefield-wv',
    broadcasterId: 'entravision',
    cpm: '$18.83',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'hubbard-broadcasting-yjsm-bluefield',
    name: 'YJSM-TV (Hubbard Broadcasting Bluefield-)',
    marketId: 'bluefield-wv',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.31',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'tegna-ylbo-bluefield',
    name: 'YLBO-TV (TEGNA Bluefield-)',
    marketId: 'bluefield-wv',
    broadcasterId: 'tegna',
    cpm: '$18.40',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'nexstar-[oax-bluefield',
    name: '[OAX-TV (Nexstar Bluefield-)',
    marketId: 'bluefield-wv',
    broadcasterId: 'nexstar',
    cpm: '$17.23',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'entravision-xwxe-hattiesburg',
    name: 'XWXE-TV (Entravision Hatties)',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'entravision',
    cpm: '$17.54',
    marketShare: 28,
    audienceSize: 84000
  },
  {
    id: 'news-press-gazette-zjkj-hattiesburg',
    name: 'ZJKJ-TV (News Press Gazette Hatties)',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.37',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'scripps-[aei-hattiesburg',
    name: '[AEI-TV (Scripps Hatties)',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'scripps',
    cpm: '$18.21',
    marketShare: 20,
    audienceSize: 60000
  },
  {
    id: 'hubbard-broadcasting-yksp-hattiesburg',
    name: 'YKSP-TV (Hubbard Broadcasting Hatties)',
    marketId: 'hattiesburg-ms',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.50',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'entravision-zwug-rapid',
    name: 'ZWUG-TV (Entravision Rapid)',
    marketId: 'rapid-city-sd',
    broadcasterId: 'entravision',
    cpm: '$17.17',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'scripps-xnbp-rapid',
    name: 'XNBP-TV (Scripps Rapid)',
    marketId: 'rapid-city-sd',
    broadcasterId: 'scripps',
    cpm: '$17.38',
    marketShare: 24,
    audienceSize: 48000
  },
  {
    id: 'gray-wlbe-rapid',
    name: 'WLBE-TV (Gray Rapid)',
    marketId: 'rapid-city-sd',
    broadcasterId: 'gray',
    cpm: '$17.98',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'tegna-[bcc-rapid',
    name: '[BCC-TV (TEGNA Rapid)',
    marketId: 'rapid-city-sd',
    broadcasterId: 'tegna',
    cpm: '$19.55',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'news-press-gazette-[uqp-rapid',
    name: '[UQP-TV (News Press Gazette Rapid)',
    marketId: 'rapid-city-sd',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.55',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'nexstar-xoha-dothan',
    name: 'XOHA-TV (Nexstar Dothan)',
    marketId: 'dothan-al',
    broadcasterId: 'nexstar',
    cpm: '$19.28',
    marketShare: 29,
    audienceSize: 57999
  },
  {
    id: 'gray-ybiv-dothan',
    name: 'YBIV-TV (Gray Dothan)',
    marketId: 'dothan-al',
    broadcasterId: 'gray',
    cpm: '$17.40',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'morgan-murphy-zjlb-dothan',
    name: 'ZJLB-TV (Morgan Murphy Dothan)',
    marketId: 'dothan-al',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.79',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'tegna-yafv-utica',
    name: 'YAFV-TV (TEGNA Utica)',
    marketId: 'utica-ny',
    broadcasterId: 'tegna',
    cpm: '$17.16',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'abc-wbdi-utica',
    name: 'WBDI-TV (ABC Utica)',
    marketId: 'utica-ny',
    broadcasterId: 'abc',
    cpm: '$17.63',
    marketShare: 33,
    audienceSize: 99000
  },
  {
    id: 'cbs-yjru-utica',
    name: 'YJRU-TV (CBS Utica)',
    marketId: 'utica-ny',
    broadcasterId: 'cbs',
    cpm: '$19.70',
    marketShare: 16,
    audienceSize: 48000
  },
  {
    id: 'morgan-murphy-xfhg-utica',
    name: 'XFHG-TV (Morgan Murphy Utica)',
    marketId: 'utica-ny',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.58',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'nexstar-[vuj-utica',
    name: '[VUJ-TV (Nexstar Utica)',
    marketId: 'utica-ny',
    broadcasterId: 'nexstar',
    cpm: '$18.91',
    marketShare: 22,
    audienceSize: 66000
  },
  {
    id: 'gray-[rma-utica',
    name: '[RMA-TV (Gray Utica)',
    marketId: 'utica-ny',
    broadcasterId: 'gray',
    cpm: '$17.87',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'tegna-wrbe-clarksburg',
    name: 'WRBE-TV (TEGNA Clarksburg)',
    marketId: 'clarksburg-wv',
    broadcasterId: 'tegna',
    cpm: '$17.20',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'univision-ysxs-clarksburg',
    name: 'YSXS-TV (Univision Clarksburg)',
    marketId: 'clarksburg-wv',
    broadcasterId: 'univision',
    cpm: '$18.52',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'hearst-zfkx-clarksburg',
    name: 'ZFKX-TV (Hearst Clarksburg)',
    marketId: 'clarksburg-wv',
    broadcasterId: 'hearst',
    cpm: '$19.38',
    marketShare: 22,
    audienceSize: 22000
  },
  {
    id: 'nexstar-wika-clarksburg',
    name: 'WIKA-TV (Nexstar Clarksburg)',
    marketId: 'clarksburg-wv',
    broadcasterId: 'nexstar',
    cpm: '$17.32',
    marketShare: 17,
    audienceSize: 17000
  },
  {
    id: 'entravision-xxaj-clarksburg',
    name: 'XXAJ-TV (Entravision Clarksburg)',
    marketId: 'clarksburg-wv',
    broadcasterId: 'entravision',
    cpm: '$18.81',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'gray-[iyw-harrisonburg',
    name: '[IYW-TV (Gray Harrisonbu)',
    marketId: 'harrisonburg-va',
    broadcasterId: 'gray',
    cpm: '$19.87',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'morgan-murphy-[tsp-harrisonburg',
    name: '[TSP-TV (Morgan Murphy Harrisonbu)',
    marketId: 'harrisonburg-va',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.80',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'hubbard-broadcasting-xhqy-harrisonburg',
    name: 'XHQY-TV (Hubbard Broadcasting Harrisonbu)',
    marketId: 'harrisonburg-va',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.79',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'morgan-murphy-znvw-jackson',
    name: 'ZNVW-TV (Morgan Murphy Jackson)',
    marketId: 'jackson-tn',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.25',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'nbc-zkvo-jackson',
    name: 'ZKVO-TV (NBC Jackson)',
    marketId: 'jackson-tn',
    broadcasterId: 'nbc',
    cpm: '$19.19',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'univision-xswu-jackson',
    name: 'XSWU-TV (Univision Jackson)',
    marketId: 'jackson-tn',
    broadcasterId: 'univision',
    cpm: '$18.71',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'hubbard-broadcasting-xfoy-jackson',
    name: 'XFOY-TV (Hubbard Broadcasting Jackson)',
    marketId: 'jackson-tn',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.55',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'cbs-[wmv-jackson',
    name: '[WMV-TV (CBS Jackson)',
    marketId: 'jackson-tn',
    broadcasterId: 'cbs',
    cpm: '$18.84',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'hearst-yqsm-jackson',
    name: 'YQSM-TV (Hearst Jackson)',
    marketId: 'jackson-tn',
    broadcasterId: 'hearst',
    cpm: '$18.46',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'nexstar-xttz-quincy',
    name: 'XTTZ-TV (Nexstar Quincy)',
    marketId: 'quincy-il',
    broadcasterId: 'nexstar',
    cpm: '$18.38',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'tegna-xmkc-quincy',
    name: 'XMKC-TV (TEGNA Quincy)',
    marketId: 'quincy-il',
    broadcasterId: 'tegna',
    cpm: '$18.89',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'abc-xedq-quincy',
    name: 'XEDQ-TV (ABC Quincy)',
    marketId: 'quincy-il',
    broadcasterId: 'abc',
    cpm: '$17.65',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'morgan-murphy-xuoq-quincy',
    name: 'XUOQ-TV (Morgan Murphy Quincy)',
    marketId: 'quincy-il',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.39',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'univision-xurb-quincy',
    name: 'XURB-TV (Univision Quincy)',
    marketId: 'quincy-il',
    broadcasterId: 'univision',
    cpm: '$18.83',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'cbs-[zru-quincy',
    name: '[ZRU-TV (CBS Quincy)',
    marketId: 'quincy-il',
    broadcasterId: 'cbs',
    cpm: '$18.73',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'abc-zrhj-charlottesville',
    name: 'ZRHJ-TV (ABC Charlottes)',
    marketId: 'charlottesville-va',
    broadcasterId: 'abc',
    cpm: '$18.75',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'gray-ytyl-charlottesville',
    name: 'YTYL-TV (Gray Charlottes)',
    marketId: 'charlottesville-va',
    broadcasterId: 'gray',
    cpm: '$19.16',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'univision-[lez-charlottesville',
    name: '[LEZ-TV (Univision Charlottes)',
    marketId: 'charlottesville-va',
    broadcasterId: 'univision',
    cpm: '$18.16',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'scripps-[vlc-charlottesville',
    name: '[VLC-TV (Scripps Charlottes)',
    marketId: 'charlottesville-va',
    broadcasterId: 'scripps',
    cpm: '$18.83',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'morgan-murphy-wapv-charlottesville',
    name: 'WAPV-TV (Morgan Murphy Charlottes)',
    marketId: 'charlottesville-va',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.34',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'scripps-wlzq-lake',
    name: 'WLZQ-TV (Scripps Lake)',
    marketId: 'lake-charles-la',
    broadcasterId: 'scripps',
    cpm: '$17.90',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'morgan-murphy-yelb-lake',
    name: 'YELB-TV (Morgan Murphy Lake)',
    marketId: 'lake-charles-la',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.38',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'abc-wpll-lake',
    name: 'WPLL-TV (ABC Lake)',
    marketId: 'lake-charles-la',
    broadcasterId: 'abc',
    cpm: '$19.44',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'abc-zwli-elmira',
    name: 'ZWLI-TV (ABC Elmira)',
    marketId: 'elmira-ny',
    broadcasterId: 'abc',
    cpm: '$18.63',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'scripps-wsjf-elmira',
    name: 'WSJF-TV (Scripps Elmira)',
    marketId: 'elmira-ny',
    broadcasterId: 'scripps',
    cpm: '$19.97',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'entravision-ycod-elmira',
    name: 'YCOD-TV (Entravision Elmira)',
    marketId: 'elmira-ny',
    broadcasterId: 'entravision',
    cpm: '$17.06',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'hearst-ykmx-watertown',
    name: 'YKMX-TV (Hearst Watertown)',
    marketId: 'watertown-ny',
    broadcasterId: 'hearst',
    cpm: '$17.78',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'abc-wkdb-watertown',
    name: 'WKDB-TV (ABC Watertown)',
    marketId: 'watertown-ny',
    broadcasterId: 'abc',
    cpm: '$18.09',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'gray-zdhe-watertown',
    name: 'ZDHE-TV (Gray Watertown)',
    marketId: 'watertown-ny',
    broadcasterId: 'gray',
    cpm: '$17.49',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'nexstar-[uva-watertown',
    name: '[UVA-TV (Nexstar Watertown)',
    marketId: 'watertown-ny',
    broadcasterId: 'nexstar',
    cpm: '$18.39',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'news-press-gazette-ywid-watertown',
    name: 'YWID-TV (News Press Gazette Watertown)',
    marketId: 'watertown-ny',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.59',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'news-press-gazette-xtvn-bowling',
    name: 'XTVN-TV (News Press Gazette Bowling)',
    marketId: 'bowling-green-ky',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.74',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'hearst-xptk-bowling',
    name: 'XPTK-TV (Hearst Bowling)',
    marketId: 'bowling-green-ky',
    broadcasterId: 'hearst',
    cpm: '$17.77',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'univision-zigp-bowling',
    name: 'ZIGP-TV (Univision Bowling)',
    marketId: 'bowling-green-ky',
    broadcasterId: 'univision',
    cpm: '$17.17',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'cbs-ybmm-bowling',
    name: 'YBMM-TV (CBS Bowling)',
    marketId: 'bowling-green-ky',
    broadcasterId: 'cbs',
    cpm: '$18.71',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'nbc-ymig-marquette',
    name: 'YMIG-TV (NBC Marquette)',
    marketId: 'marquette-mi',
    broadcasterId: 'nbc',
    cpm: '$18.64',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'scripps-wzqg-marquette',
    name: 'WZQG-TV (Scripps Marquette)',
    marketId: 'marquette-mi',
    broadcasterId: 'scripps',
    cpm: '$18.66',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'morgan-murphy-[nly-marquette',
    name: '[NLY-TV (Morgan Murphy Marquette)',
    marketId: 'marquette-mi',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.36',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'cbs-znni-marquette',
    name: 'ZNNI-TV (CBS Marquette)',
    marketId: 'marquette-mi',
    broadcasterId: 'cbs',
    cpm: '$19.95',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'hearst-wgll-marquette',
    name: 'WGLL-TV (Hearst Marquette)',
    marketId: 'marquette-mi',
    broadcasterId: 'hearst',
    cpm: '$19.30',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'scripps-zyxz-jonesboro',
    name: 'ZYXZ-TV (Scripps Jonesboro)',
    marketId: 'jonesboro-ar',
    broadcasterId: 'scripps',
    cpm: '$17.99',
    marketShare: 33,
    audienceSize: 66000
  },
  {
    id: 'cbs-xitx-jonesboro',
    name: 'XITX-TV (CBS Jonesboro)',
    marketId: 'jonesboro-ar',
    broadcasterId: 'cbs',
    cpm: '$17.25',
    marketShare: 22,
    audienceSize: 44000
  },
  {
    id: 'tegna-[duj-jonesboro',
    name: '[DUJ-TV (TEGNA Jonesboro)',
    marketId: 'jonesboro-ar',
    broadcasterId: 'tegna',
    cpm: '$17.80',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'hearst-yeej-jonesboro',
    name: 'YEEJ-TV (Hearst Jonesboro)',
    marketId: 'jonesboro-ar',
    broadcasterId: 'hearst',
    cpm: '$18.18',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'abc-wpoj-jonesboro',
    name: 'WPOJ-TV (ABC Jonesboro)',
    marketId: 'jonesboro-ar',
    broadcasterId: 'abc',
    cpm: '$18.01',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'hubbard-broadcasting-xelt-alexandria',
    name: 'XELT-TV (Hubbard Broadcasting Alexandria)',
    marketId: 'alexandria-la',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.67',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'tegna-zgmm-alexandria',
    name: 'ZGMM-TV (TEGNA Alexandria)',
    marketId: 'alexandria-la',
    broadcasterId: 'tegna',
    cpm: '$19.40',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'abc-wwms-alexandria',
    name: 'WWMS-TV (ABC Alexandria)',
    marketId: 'alexandria-la',
    broadcasterId: 'abc',
    cpm: '$18.75',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'entravision-xlhk-alexandria',
    name: 'XLHK-TV (Entravision Alexandria)',
    marketId: 'alexandria-la',
    broadcasterId: 'entravision',
    cpm: '$17.70',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'news-press-gazette-zssz-alexandria',
    name: 'ZSSZ-TV (News Press Gazette Alexandria)',
    marketId: 'alexandria-la',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.15',
    marketShare: 25,
    audienceSize: 50000
  },
  {
    id: 'tegna-[lsu-laredo',
    name: '[LSU-TV (TEGNA Laredo)',
    marketId: 'laredo-tx',
    broadcasterId: 'tegna',
    cpm: '$19.16',
    marketShare: 23,
    audienceSize: 69000
  },
  {
    id: 'entravision-[cth-laredo',
    name: '[CTH-TV (Entravision Laredo)',
    marketId: 'laredo-tx',
    broadcasterId: 'entravision',
    cpm: '$17.36',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'morgan-murphy-yxss-laredo',
    name: 'YXSS-TV (Morgan Murphy Laredo)',
    marketId: 'laredo-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.54',
    marketShare: 26,
    audienceSize: 78000
  },
  {
    id: 'nbc-xwyi-laredo',
    name: 'XWYI-TV (NBC Laredo)',
    marketId: 'laredo-tx',
    broadcasterId: 'nbc',
    cpm: '$18.24',
    marketShare: 30,
    audienceSize: 90000
  },
  {
    id: 'scripps-[qts-laredo',
    name: '[QTS-TV (Scripps Laredo)',
    marketId: 'laredo-tx',
    broadcasterId: 'scripps',
    cpm: '$19.00',
    marketShare: 25,
    audienceSize: 75000
  },
  {
    id: 'univision-zzbu-laredo',
    name: 'ZZBU-TV (Univision Laredo)',
    marketId: 'laredo-tx',
    broadcasterId: 'univision',
    cpm: '$17.06',
    marketShare: 32,
    audienceSize: 96000
  },
  {
    id: 'cbs-zukf-butte',
    name: 'ZUKF-TV (CBS Butte-Boze)',
    marketId: 'butte-mt',
    broadcasterId: 'cbs',
    cpm: '$18.94',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'gray-wcrd-butte',
    name: 'WCRD-TV (Gray Butte-Boze)',
    marketId: 'butte-mt',
    broadcasterId: 'gray',
    cpm: '$17.60',
    marketShare: 23,
    audienceSize: 46000
  },
  {
    id: 'news-press-gazette-youe-butte',
    name: 'YOUE-TV (News Press Gazette Butte-Boze)',
    marketId: 'butte-mt',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.71',
    marketShare: 34,
    audienceSize: 68000
  },
  {
    id: 'abc-[bpd-bend',
    name: '[BPD-TV (ABC Bend)',
    marketId: 'bend-or',
    broadcasterId: 'abc',
    cpm: '$19.83',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'cbs-ylvm-bend',
    name: 'YLVM-TV (CBS Bend)',
    marketId: 'bend-or',
    broadcasterId: 'cbs',
    cpm: '$17.92',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'morgan-murphy-[wws-bend',
    name: '[WWS-TV (Morgan Murphy Bend)',
    marketId: 'bend-or',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.77',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'news-press-gazette-ysnm-bend',
    name: 'YSNM-TV (News Press Gazette Bend)',
    marketId: 'bend-or',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.51',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'scripps-wfye-bend',
    name: 'WFYE-TV (Scripps Bend)',
    marketId: 'bend-or',
    broadcasterId: 'scripps',
    cpm: '$19.98',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'hubbard-broadcasting-wvfz-grand',
    name: 'WVFZ-TV (Hubbard Broadcasting Grand)',
    marketId: 'grand-junction-co',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.43',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'tegna-ykbq-grand',
    name: 'YKBQ-TV (TEGNA Grand)',
    marketId: 'grand-junction-co',
    broadcasterId: 'tegna',
    cpm: '$17.65',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'abc-yztq-grand',
    name: 'YZTQ-TV (ABC Grand)',
    marketId: 'grand-junction-co',
    broadcasterId: 'abc',
    cpm: '$19.91',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'entravision-[jiy-twin',
    name: '[JIY-TV (Entravision Twin)',
    marketId: 'twin-falls-id',
    broadcasterId: 'entravision',
    cpm: '$17.05',
    marketShare: 22,
    audienceSize: 22000
  },
  {
    id: 'hearst-wkxp-twin',
    name: 'WKXP-TV (Hearst Twin)',
    marketId: 'twin-falls-id',
    broadcasterId: 'hearst',
    cpm: '$18.06',
    marketShare: 20,
    audienceSize: 20000
  },
  {
    id: 'hubbard-broadcasting-zjek-twin',
    name: 'ZJEK-TV (Hubbard Broadcasting Twin)',
    marketId: 'twin-falls-id',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.27',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'nbc-wubx-twin',
    name: 'WUBX-TV (NBC Twin)',
    marketId: 'twin-falls-id',
    broadcasterId: 'nbc',
    cpm: '$19.71',
    marketShare: 16,
    audienceSize: 16000
  },
  {
    id: 'gray-weqb-twin',
    name: 'WEQB-TV (Gray Twin)',
    marketId: 'twin-falls-id',
    broadcasterId: 'gray',
    cpm: '$19.36',
    marketShare: 29,
    audienceSize: 28999
  },
  {
    id: 'tegna-xtiz-twin',
    name: 'XTIZ-TV (TEGNA Twin)',
    marketId: 'twin-falls-id',
    broadcasterId: 'tegna',
    cpm: '$19.00',
    marketShare: 19,
    audienceSize: 19000
  },
  {
    id: 'tegna-yvla-lafayette',
    name: 'YVLA-TV (TEGNA Lafayette)',
    marketId: 'lafayette-in',
    broadcasterId: 'tegna',
    cpm: '$18.64',
    marketShare: 27,
    audienceSize: 54000
  },
  {
    id: 'entravision-[krj-lafayette',
    name: '[KRJ-TV (Entravision Lafayette)',
    marketId: 'lafayette-in',
    broadcasterId: 'entravision',
    cpm: '$18.30',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'nexstar-wcir-lafayette',
    name: 'WCIR-TV (Nexstar Lafayette)',
    marketId: 'lafayette-in',
    broadcasterId: 'nexstar',
    cpm: '$17.51',
    marketShare: 17,
    audienceSize: 34000
  },
  {
    id: 'cbs-[cev-lafayette',
    name: '[CEV-TV (CBS Lafayette)',
    marketId: 'lafayette-in',
    broadcasterId: 'cbs',
    cpm: '$17.95',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'hubbard-broadcasting-wjcg-lafayette',
    name: 'WJCG-TV (Hubbard Broadcasting Lafayette)',
    marketId: 'lafayette-in',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.42',
    marketShare: 32,
    audienceSize: 64000
  },
  {
    id: 'scripps-zuzt-lima',
    name: 'ZUZT-TV (Scripps Lima)',
    marketId: 'lima-oh',
    broadcasterId: 'scripps',
    cpm: '$17.97',
    marketShare: 18,
    audienceSize: 36000
  },
  {
    id: 'hubbard-broadcasting-zsse-lima',
    name: 'ZSSE-TV (Hubbard Broadcasting Lima)',
    marketId: 'lima-oh',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$17.41',
    marketShare: 31,
    audienceSize: 62000
  },
  {
    id: 'gray-[qlu-lima',
    name: '[QLU-TV (Gray Lima)',
    marketId: 'lima-oh',
    broadcasterId: 'gray',
    cpm: '$19.18',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'news-press-gazette-xwyo-lima',
    name: 'XWYO-TV (News Press Gazette Lima)',
    marketId: 'lima-oh',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.45',
    marketShare: 26,
    audienceSize: 52000
  },
  {
    id: 'tegna-zody-lima',
    name: 'ZODY-TV (TEGNA Lima)',
    marketId: 'lima-oh',
    broadcasterId: 'tegna',
    cpm: '$18.67',
    marketShare: 28,
    audienceSize: 56000
  },
  {
    id: 'entravision-xdwr-great',
    name: 'XDWR-TV (Entravision Great)',
    marketId: 'great-falls-mt',
    broadcasterId: 'entravision',
    cpm: '$18.06',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'abc-wlee-great',
    name: 'WLEE-TV (ABC Great)',
    marketId: 'great-falls-mt',
    broadcasterId: 'abc',
    cpm: '$19.50',
    marketShare: 19,
    audienceSize: 19000
  },
  {
    id: 'cbs-yuyj-great',
    name: 'YUYJ-TV (CBS Great)',
    marketId: 'great-falls-mt',
    broadcasterId: 'cbs',
    cpm: '$19.29',
    marketShare: 30,
    audienceSize: 30000
  },
  {
    id: 'univision-wpdg-great',
    name: 'WPDG-TV (Univision Great)',
    marketId: 'great-falls-mt',
    broadcasterId: 'univision',
    cpm: '$17.05',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'hearst-xrrb-great',
    name: 'XRRB-TV (Hearst Great)',
    marketId: 'great-falls-mt',
    broadcasterId: 'hearst',
    cpm: '$18.15',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'entravision-xobr-meridian',
    name: 'XOBR-TV (Entravision Meridian)',
    marketId: 'meridian-ms',
    broadcasterId: 'entravision',
    cpm: '$19.18',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'morgan-murphy-xkcw-meridian',
    name: 'XKCW-TV (Morgan Murphy Meridian)',
    marketId: 'meridian-ms',
    broadcasterId: 'morgan-murphy',
    cpm: '$17.84',
    marketShare: 17,
    audienceSize: 17000
  },
  {
    id: 'hubbard-broadcasting-xnwb-meridian',
    name: 'XNWB-TV (Hubbard Broadcasting Meridian)',
    marketId: 'meridian-ms',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$18.97',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'univision-xoqa-meridian',
    name: 'XOQA-TV (Univision Meridian)',
    marketId: 'meridian-ms',
    broadcasterId: 'univision',
    cpm: '$17.88',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'cbs-xqjx-cheyenne',
    name: 'XQJX-TV (CBS Cheyenne)',
    marketId: 'cheyenne-wy',
    broadcasterId: 'cbs',
    cpm: '$19.96',
    marketShare: 15,
    audienceSize: 30000
  },
  {
    id: 'morgan-murphy-wxhl-cheyenne',
    name: 'WXHL-TV (Morgan Murphy Cheyenne)',
    marketId: 'cheyenne-wy',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.52',
    marketShare: 20,
    audienceSize: 40000
  },
  {
    id: 'abc-yogd-cheyenne',
    name: 'YOGD-TV (ABC Cheyenne)',
    marketId: 'cheyenne-wy',
    broadcasterId: 'abc',
    cpm: '$18.59',
    marketShare: 16,
    audienceSize: 32000
  },
  {
    id: 'scripps-wwfw-parkersburg',
    name: 'WWFW-TV (Scripps Parkersbur)',
    marketId: 'parkersburg-wv',
    broadcasterId: 'scripps',
    cpm: '$17.80',
    marketShare: 23,
    audienceSize: 23000
  },
  {
    id: 'abc-ymeg-parkersburg',
    name: 'YMEG-TV (ABC Parkersbur)',
    marketId: 'parkersburg-wv',
    broadcasterId: 'abc',
    cpm: '$18.11',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'univision-wbiv-parkersburg',
    name: 'WBIV-TV (Univision Parkersbur)',
    marketId: 'parkersburg-wv',
    broadcasterId: 'univision',
    cpm: '$19.42',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'tegna-wfoy-parkersburg',
    name: 'WFOY-TV (TEGNA Parkersbur)',
    marketId: 'parkersburg-wv',
    broadcasterId: 'tegna',
    cpm: '$18.58',
    marketShare: 19,
    audienceSize: 19000
  },
  {
    id: 'morgan-murphy-[oam-parkersburg',
    name: '[OAM-TV (Morgan Murphy Parkersbur)',
    marketId: 'parkersburg-wv',
    broadcasterId: 'morgan-murphy',
    cpm: '$19.48',
    marketShare: 26,
    audienceSize: 26000
  },
  {
    id: 'entravision-wkfb-greenwood',
    name: 'WKFB-TV (Entravision Greenwood-)',
    marketId: 'greenwood-ms',
    broadcasterId: 'entravision',
    cpm: '$18.49',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'tegna-[wuj-greenwood',
    name: '[WUJ-TV (TEGNA Greenwood-)',
    marketId: 'greenwood-ms',
    broadcasterId: 'tegna',
    cpm: '$17.56',
    marketShare: 27,
    audienceSize: 27000
  },
  {
    id: 'hubbard-broadcasting-wzcv-greenwood',
    name: 'WZCV-TV (Hubbard Broadcasting Greenwood-)',
    marketId: 'greenwood-ms',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.39',
    marketShare: 18,
    audienceSize: 18000
  },
  {
    id: 'cbs-[gop-eureka',
    name: '[GOP-TV (CBS Eureka)',
    marketId: 'eureka-ca',
    broadcasterId: 'cbs',
    cpm: '$19.82',
    marketShare: 21,
    audienceSize: 42000
  },
  {
    id: 'scripps-xmdt-eureka',
    name: 'XMDT-TV (Scripps Eureka)',
    marketId: 'eureka-ca',
    broadcasterId: 'scripps',
    cpm: '$19.58',
    marketShare: 30,
    audienceSize: 60000
  },
  {
    id: 'news-press-gazette-whna-eureka',
    name: 'WHNA-TV (News Press Gazette Eureka)',
    marketId: 'eureka-ca',
    broadcasterId: 'news-press-gazette',
    cpm: '$18.79',
    marketShare: 19,
    audienceSize: 38000
  },
  {
    id: 'gray-yzkb-san',
    name: 'YZKB-TV (Gray San)',
    marketId: 'san-angelo-tx',
    broadcasterId: 'gray',
    cpm: '$19.28',
    marketShare: 17,
    audienceSize: 17000
  },
  {
    id: 'hearst-xbut-san',
    name: 'XBUT-TV (Hearst San)',
    marketId: 'san-angelo-tx',
    broadcasterId: 'hearst',
    cpm: '$19.89',
    marketShare: 20,
    audienceSize: 20000
  },
  {
    id: 'morgan-murphy-[vym-san',
    name: '[VYM-TV (Morgan Murphy San)',
    marketId: 'san-angelo-tx',
    broadcasterId: 'morgan-murphy',
    cpm: '$18.89',
    marketShare: 23,
    audienceSize: 23000
  },
  {
    id: 'hubbard-broadcasting-[jlx-san',
    name: '[JLX-TV (Hubbard Broadcasting San)',
    marketId: 'san-angelo-tx',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.18',
    marketShare: 27,
    audienceSize: 27000
  },
  {
    id: 'univision-wqhr-san',
    name: 'WQHR-TV (Univision San)',
    marketId: 'san-angelo-tx',
    broadcasterId: 'univision',
    cpm: '$17.94',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'scripps-zqmy-casper',
    name: 'ZQMY-TV (Scripps Casper-Riv)',
    marketId: 'casper-wy',
    broadcasterId: 'scripps',
    cpm: '$17.52',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'tegna-whdd-casper',
    name: 'WHDD-TV (TEGNA Casper-Riv)',
    marketId: 'casper-wy',
    broadcasterId: 'tegna',
    cpm: '$17.22',
    marketShare: 25,
    audienceSize: 25000
  },
  {
    id: 'hearst-zmrc-casper',
    name: 'ZMRC-TV (Hearst Casper-Riv)',
    marketId: 'casper-wy',
    broadcasterId: 'hearst',
    cpm: '$17.82',
    marketShare: 28,
    audienceSize: 28000
  },
  {
    id: 'news-press-gazette-zgkp-casper',
    name: 'ZGKP-TV (News Press Gazette Casper-Riv)',
    marketId: 'casper-wy',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.69',
    marketShare: 18,
    audienceSize: 18000
  },
  {
    id: 'univision-zhcc-casper',
    name: 'ZHCC-TV (Univision Casper-Riv)',
    marketId: 'casper-wy',
    broadcasterId: 'univision',
    cpm: '$17.49',
    marketShare: 26,
    audienceSize: 26000
  },
  {
    id: 'univision-[oqg-mankato',
    name: '[OQG-TV (Univision Mankato)',
    marketId: 'mankato-mn',
    broadcasterId: 'univision',
    cpm: '$17.72',
    marketShare: 26,
    audienceSize: 26000
  },
  {
    id: 'news-press-gazette-[hsb-mankato',
    name: '[HSB-TV (News Press Gazette Mankato)',
    marketId: 'mankato-mn',
    broadcasterId: 'news-press-gazette',
    cpm: '$17.33',
    marketShare: 21,
    audienceSize: 21000
  },
  {
    id: 'abc-zzzi-mankato',
    name: 'ZZZI-TV (ABC Mankato)',
    marketId: 'mankato-mn',
    broadcasterId: 'abc',
    cpm: '$17.70',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'entravision-xfuz-mankato',
    name: 'XFUZ-TV (Entravision Mankato)',
    marketId: 'mankato-mn',
    broadcasterId: 'entravision',
    cpm: '$18.19',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'nbc-zjbx-mankato',
    name: 'ZJBX-TV (NBC Mankato)',
    marketId: 'mankato-mn',
    broadcasterId: 'nbc',
    cpm: '$18.08',
    marketShare: 29,
    audienceSize: 28999
  },
  {
    id: 'tegna-ydvt-ottumwa',
    name: 'YDVT-TV (TEGNA Ottumwa)',
    marketId: 'ottumwa-ia',
    broadcasterId: 'tegna',
    cpm: '$17.68',
    marketShare: 31,
    audienceSize: 31000
  },
  {
    id: 'scripps-[uph-ottumwa',
    name: '[UPH-TV (Scripps Ottumwa)',
    marketId: 'ottumwa-ia',
    broadcasterId: 'scripps',
    cpm: '$19.44',
    marketShare: 34,
    audienceSize: 34000
  },
  {
    id: 'gray-yddv-ottumwa',
    name: 'YDDV-TV (Gray Ottumwa)',
    marketId: 'ottumwa-ia',
    broadcasterId: 'gray',
    cpm: '$18.04',
    marketShare: 15,
    audienceSize: 15000
  },
  {
    id: 'nbc-[wbm-ottumwa',
    name: '[WBM-TV (NBC Ottumwa)',
    marketId: 'ottumwa-ia',
    broadcasterId: 'nbc',
    cpm: '$19.66',
    marketShare: 22,
    audienceSize: 22000
  },
  {
    id: 'hubbard-broadcasting-[izd-ottumwa',
    name: '[IZD-TV (Hubbard Broadcasting Ottumwa)',
    marketId: 'ottumwa-ia',
    broadcasterId: 'hubbard-broadcasting',
    cpm: '$19.37',
    marketShare: 24,
    audienceSize: 24000
  },
  {
    id: 'news-press-gazette-zeds-ottumwa',
    name: 'ZEDS-TV (News Press Gazette Ottumwa)',
    marketId: 'ottumwa-ia',
    broadcasterId: 'news-press-gazette',
    cpm: '$19.69',
    marketShare: 28,
    audienceSize: 28000
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
