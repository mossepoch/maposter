// Global cities database with coordinates
// Note: Sensitive regions are handled carefully to respect different perspectives

export interface CityOption {
  name: string;
  nameZh?: string;
  latitude: number;
  longitude: number;
}

export interface CountryData {
  name: string;
  nameZh: string;
  cities: CityOption[];
}

export const globalCitiesData: CountryData[] = [
  // Asia
  {
    name: 'China',
    nameZh: '中国',
    cities: [
      { name: 'Beijing', nameZh: '北京', latitude: 39.9042, longitude: 116.4074 },
      { name: 'Shanghai', nameZh: '上海', latitude: 31.2304, longitude: 121.4737 },
      { name: 'Guangzhou', nameZh: '广州', latitude: 23.1291, longitude: 113.2644 },
      { name: 'Shenzhen', nameZh: '深圳', latitude: 22.5431, longitude: 114.0579 },
      { name: 'Chengdu', nameZh: '成都', latitude: 30.5728, longitude: 104.0668 },
      { name: 'Hangzhou', nameZh: '杭州', latitude: 30.2741, longitude: 120.1551 },
      { name: 'Chongqing', nameZh: '重庆', latitude: 29.4316, longitude: 106.9123 },
      { name: 'Xian', nameZh: '西安', latitude: 34.3416, longitude: 108.9398 },
      { name: 'Wuhan', nameZh: '武汉', latitude: 30.5928, longitude: 114.3055 },
      { name: 'Nanjing', nameZh: '南京', latitude: 32.0603, longitude: 118.7969 },
      { name: 'Tianjin', nameZh: '天津', latitude: 39.3434, longitude: 117.3616 },
      { name: 'Suzhou', nameZh: '苏州', latitude: 31.2989, longitude: 120.5853 },
      { name: 'Qingdao', nameZh: '青岛', latitude: 36.0671, longitude: 120.3826 },
      { name: 'Dalian', nameZh: '大连', latitude: 38.9140, longitude: 121.6147 },
      { name: 'Hong Kong', nameZh: '香港', latitude: 22.3193, longitude: 114.1694 },
      { name: 'Macau', nameZh: '澳门', latitude: 22.1987, longitude: 113.5439 },
      { name: 'Harbin', nameZh: '哈尔滨', latitude: 45.8038, longitude: 126.5340 },
      { name: 'Changchun', nameZh: '长春', latitude: 43.8171, longitude: 125.3235 },
      { name: 'Shenyang', nameZh: '沈阳', latitude: 41.8057, longitude: 123.4328 },
      { name: 'Jinan', nameZh: '济南', latitude: 36.6512, longitude: 117.1210 },
      { name: 'Zhengzhou', nameZh: '郑州', latitude: 34.7466, longitude: 113.6254 },
      { name: 'Taiyuan', nameZh: '太原', latitude: 37.8706, longitude: 112.5489 },
      { name: 'Shijiazhuang', nameZh: '石家庄', latitude: 38.0428, longitude: 114.5149 },
      { name: 'Hohhot', nameZh: '呼和浩特', latitude: 40.8414, longitude: 111.7519 },
      { name: 'Urumqi', nameZh: '乌鲁木齐', latitude: 43.8256, longitude: 87.6168 },
      { name: 'Lanzhou', nameZh: '兰州', latitude: 36.0611, longitude: 103.8343 },
      { name: 'Xining', nameZh: '西宁', latitude: 36.6171, longitude: 101.7782 },
      { name: 'Yinchuan', nameZh: '银川', latitude: 38.4681, longitude: 106.2731 },
      { name: 'Lhasa', nameZh: '拉萨', latitude: 29.6500, longitude: 91.1000 },
      { name: 'Kunming', nameZh: '昆明', latitude: 25.0406, longitude: 102.7129 },
      { name: 'Guiyang', nameZh: '贵阳', latitude: 26.6470, longitude: 106.6302 },
      { name: 'Nanning', nameZh: '南宁', latitude: 22.8170, longitude: 108.3665 },
      { name: 'Changsha', nameZh: '长沙', latitude: 28.2282, longitude: 112.9388 },
      { name: 'Nanchang', nameZh: '南昌', latitude: 28.6829, longitude: 115.8579 },
      { name: 'Hefei', nameZh: '合肥', latitude: 31.8206, longitude: 117.2272 },
      { name: 'Fuzhou', nameZh: '福州', latitude: 26.0745, longitude: 119.2965 },
      { name: 'Haikou', nameZh: '海口', latitude: 20.0444, longitude: 110.1999 },
      { name: 'Xiamen', nameZh: '厦门', latitude: 24.4798, longitude: 118.0894 },
      { name: 'Ningbo', nameZh: '宁波', latitude: 29.8683, longitude: 121.5440 },
    ]
  },
  {
    name: 'Taiwan, China',
    nameZh: '中国台湾',
    cities: [
      { name: 'Taipei', nameZh: '台北', latitude: 25.0330, longitude: 121.5654 },
      { name: 'Kaohsiung', nameZh: '高雄', latitude: 22.6273, longitude: 120.3014 },
      { name: 'Taichung', nameZh: '台中', latitude: 24.1477, longitude: 120.6736 },
      { name: 'Tainan', nameZh: '台南', latitude: 22.9997, longitude: 120.2270 },
    ]
  },
  {
    name: 'Japan',
    nameZh: '日本',
    cities: [
      { name: 'Tokyo', nameZh: '东京', latitude: 35.6762, longitude: 139.6503 },
      { name: 'Osaka', nameZh: '大阪', latitude: 34.6937, longitude: 135.5023 },
      { name: 'Kyoto', nameZh: '京都', latitude: 35.0116, longitude: 135.7681 },
      { name: 'Yokohama', nameZh: '横滨', latitude: 35.4437, longitude: 139.6380 },
      { name: 'Nagoya', nameZh: '名古屋', latitude: 35.1815, longitude: 136.9066 },
      { name: 'Sapporo', nameZh: '札幌', latitude: 43.0642, longitude: 141.3469 },
      { name: 'Fukuoka', nameZh: '福冈', latitude: 33.5904, longitude: 130.4017 },
      { name: 'Kobe', nameZh: '神户', latitude: 34.6901, longitude: 135.1955 },
      { name: 'Hiroshima', nameZh: '广岛', latitude: 34.3853, longitude: 132.4553 },
      { name: 'Sendai', nameZh: '仙台', latitude: 38.2682, longitude: 140.8694 },
      { name: 'Nara', nameZh: '奈良', latitude: 34.6851, longitude: 135.8050 },
      { name: 'Kawasaki', nameZh: '川崎', latitude: 35.5309, longitude: 139.7028 },
    ]
  },
  {
    name: 'South Korea',
    nameZh: '韩国',
    cities: [
      { name: 'Seoul', nameZh: '首尔', latitude: 37.5665, longitude: 126.9780 },
      { name: 'Busan', nameZh: '釜山', latitude: 35.1796, longitude: 129.0756 },
      { name: 'Incheon', nameZh: '仁川', latitude: 37.4563, longitude: 126.7052 },
      { name: 'Daegu', nameZh: '大邱', latitude: 35.8714, longitude: 128.6014 },
      { name: 'Daejeon', nameZh: '大田', latitude: 36.3504, longitude: 127.3845 },
      { name: 'Gwangju', nameZh: '光州', latitude: 35.1595, longitude: 126.8526 },
      { name: 'Suwon', nameZh: '水原', latitude: 37.2636, longitude: 127.0286 },
      { name: 'Jeju', nameZh: '济州', latitude: 33.4996, longitude: 126.5312 },
    ]
  },
  {
    name: 'Singapore',
    nameZh: '新加坡',
    cities: [
      { name: 'Singapore', nameZh: '新加坡', latitude: 1.3521, longitude: 103.8198 },
    ]
  },
  {
    name: 'Thailand',
    nameZh: '泰国',
    cities: [
      { name: 'Bangkok', nameZh: '曼谷', latitude: 13.7563, longitude: 100.5018 },
      { name: 'Chiang Mai', nameZh: '清迈', latitude: 18.7883, longitude: 98.9853 },
      { name: 'Phuket', nameZh: '普吉', latitude: 7.8804, longitude: 98.3923 },
      { name: 'Pattaya', nameZh: '芭堤雅', latitude: 12.9236, longitude: 100.8825 },
      { name: 'Krabi', nameZh: '甲米', latitude: 8.0863, longitude: 98.9063 },
      { name: 'Ayutthaya', nameZh: '大城', latitude: 14.3532, longitude: 100.5776 },
    ]
  },
  {
    name: 'Malaysia',
    nameZh: '马来西亚',
    cities: [
      { name: 'Kuala Lumpur', nameZh: '吉隆坡', latitude: 3.1390, longitude: 101.6869 },
      { name: 'Penang', nameZh: '槟城', latitude: 5.4164, longitude: 100.3327 },
      { name: 'Johor Bahru', nameZh: '新山', latitude: 1.4927, longitude: 103.7414 },
      { name: 'Malacca', nameZh: '马六甲', latitude: 2.1896, longitude: 102.2501 },
      { name: 'Kuching', nameZh: '古晋', latitude: 1.5535, longitude: 110.3593 },
      { name: 'Kota Kinabalu', nameZh: '亚庇', latitude: 5.9804, longitude: 116.0735 },
    ]
  },
  {
    name: 'Indonesia',
    nameZh: '印度尼西亚',
    cities: [
      { name: 'Jakarta', nameZh: '雅加达', latitude: -6.2088, longitude: 106.8456 },
      { name: 'Bali', nameZh: '巴厘岛', latitude: -8.4095, longitude: 115.1889 },
      { name: 'Surabaya', nameZh: '泗水', latitude: -7.2575, longitude: 112.7521 },
      { name: 'Bandung', nameZh: '万隆', latitude: -6.9175, longitude: 107.6191 },
      { name: 'Medan', nameZh: '棉兰', latitude: 3.5952, longitude: 98.6722 },
      { name: 'Yogyakarta', nameZh: '日惹', latitude: -7.7956, longitude: 110.3695 },
    ]
  },
  {
    name: 'Vietnam',
    nameZh: '越南',
    cities: [
      { name: 'Ho Chi Minh City', nameZh: '胡志明市', latitude: 10.8231, longitude: 106.6297 },
      { name: 'Hanoi', nameZh: '河内', latitude: 21.0285, longitude: 105.8542 },
      { name: 'Da Nang', nameZh: '岘港', latitude: 16.0544, longitude: 108.2022 },
      { name: 'Hue', nameZh: '顺化', latitude: 16.4637, longitude: 107.5909 },
      { name: 'Nha Trang', nameZh: '芽庄', latitude: 12.2388, longitude: 109.1967 },
      { name: 'Hoi An', nameZh: '会安', latitude: 15.8801, longitude: 108.3380 },
    ]
  },
  {
    name: 'Philippines',
    nameZh: '菲律宾',
    cities: [
      { name: 'Manila', nameZh: '马尼拉', latitude: 14.5995, longitude: 120.9842 },
      { name: 'Cebu', nameZh: '宿务', latitude: 10.3157, longitude: 123.8854 },
      { name: 'Davao', nameZh: '达沃', latitude: 7.1907, longitude: 125.4553 },
      { name: 'Boracay', nameZh: '长滩岛', latitude: 11.9674, longitude: 121.9248 },
    ]
  },
  {
    name: 'India',
    nameZh: '印度',
    cities: [
      { name: 'Mumbai', nameZh: '孟买', latitude: 19.0760, longitude: 72.8777 },
      { name: 'Delhi', nameZh: '德里', latitude: 28.7041, longitude: 77.1025 },
      { name: 'Bangalore', nameZh: '班加罗尔', latitude: 12.9716, longitude: 77.5946 },
      { name: 'Kolkata', nameZh: '加尔各答', latitude: 22.5726, longitude: 88.3639 },
      { name: 'Chennai', nameZh: '钦奈', latitude: 13.0827, longitude: 80.2707 },
      { name: 'Hyderabad', nameZh: '海得拉巴', latitude: 17.3850, longitude: 78.4867 },
      { name: 'Pune', nameZh: '浦那', latitude: 18.5204, longitude: 73.8567 },
      { name: 'Ahmedabad', nameZh: '艾哈迈达巴德', latitude: 23.0225, longitude: 72.5714 },
      { name: 'Jaipur', nameZh: '斋浦尔', latitude: 26.9124, longitude: 75.7873 },
      { name: 'Lucknow', nameZh: '勒克瑙', latitude: 26.8467, longitude: 80.9462 },
      { name: 'Chandigarh', nameZh: '昌迪加尔', latitude: 30.7333, longitude: 76.7794 },
      { name: 'Bhopal', nameZh: '博帕尔', latitude: 23.2599, longitude: 77.4126 },
      { name: 'Agra', nameZh: '阿格拉', latitude: 27.1767, longitude: 78.0081 },
      { name: 'Goa', nameZh: '果阿', latitude: 15.2993, longitude: 74.1240 },
    ]
  },
  {
    name: 'United Arab Emirates',
    nameZh: '阿联酋',
    cities: [
      { name: 'Dubai', nameZh: '迪拜', latitude: 25.2048, longitude: 55.2708 },
      { name: 'Abu Dhabi', nameZh: '阿布扎比', latitude: 24.4539, longitude: 54.3773 },
      { name: 'Sharjah', nameZh: '沙迦', latitude: 25.3463, longitude: 55.4209 },
      { name: 'Ajman', nameZh: '阿治曼', latitude: 25.4052, longitude: 55.5136 },
    ]
  },
  {
    name: 'Israel',
    nameZh: '以色列',
    cities: [
      { name: 'Tel Aviv', nameZh: '特拉维夫', latitude: 32.0853, longitude: 34.7818 },
      { name: 'Jerusalem', nameZh: '耶路撒冷', latitude: 31.7683, longitude: 35.2137 },
      { name: 'Haifa', nameZh: '海法', latitude: 32.7940, longitude: 34.9896 },
    ]
  },
  {
    name: 'Turkey',
    nameZh: '土耳其',
    cities: [
      { name: 'Istanbul', nameZh: '伊斯坦布尔', latitude: 41.0082, longitude: 28.9784 },
      { name: 'Ankara', nameZh: '安卡拉', latitude: 39.9334, longitude: 32.8597 },
      { name: 'Izmir', nameZh: '伊兹密尔', latitude: 38.4237, longitude: 27.1428 },
      { name: 'Antalya', nameZh: '安塔利亚', latitude: 36.8969, longitude: 30.7133 },
      { name: 'Bursa', nameZh: '布尔萨', latitude: 40.1828, longitude: 29.0665 },
    ]
  },

  // Europe
  {
    name: 'United Kingdom',
    nameZh: '英国',
    cities: [
      { name: 'London', nameZh: '伦敦', latitude: 51.5074, longitude: -0.1278 },
      { name: 'Manchester', nameZh: '曼彻斯特', latitude: 53.4808, longitude: -2.2426 },
      { name: 'Edinburgh', nameZh: '爱丁堡', latitude: 55.9533, longitude: -3.1883 },
      { name: 'Birmingham', nameZh: '伯明翰', latitude: 52.4862, longitude: -1.8904 },
      { name: 'Liverpool', nameZh: '利物浦', latitude: 53.4084, longitude: -2.9916 },
      { name: 'Glasgow', nameZh: '格拉斯哥', latitude: 55.8642, longitude: -4.2518 },
      { name: 'Bristol', nameZh: '布里斯托尔', latitude: 51.4545, longitude: -2.5879 },
      { name: 'Leeds', nameZh: '利兹', latitude: 53.8008, longitude: -1.5491 },
      { name: 'Cardiff', nameZh: '加的夫', latitude: 51.4816, longitude: -3.1791 },
      { name: 'Belfast', nameZh: '贝尔法斯特', latitude: 54.5973, longitude: -5.9301 },
      { name: 'Oxford', nameZh: '牛津', latitude: 51.7520, longitude: -1.2577 },
      { name: 'Cambridge', nameZh: '剑桥', latitude: 52.2053, longitude: 0.1218 },
    ]
  },
  {
    name: 'France',
    nameZh: '法国',
    cities: [
      { name: 'Paris', nameZh: '巴黎', latitude: 48.8566, longitude: 2.3522 },
      { name: 'Marseille', nameZh: '马赛', latitude: 43.2965, longitude: 5.3698 },
      { name: 'Lyon', nameZh: '里昂', latitude: 45.7640, longitude: 4.8357 },
      { name: 'Nice', nameZh: '尼斯', latitude: 43.7102, longitude: 7.2620 },
      { name: 'Bordeaux', nameZh: '波尔多', latitude: 44.8378, longitude: -0.5792 },
      { name: 'Toulouse', nameZh: '图卢兹', latitude: 43.6047, longitude: 1.4442 },
      { name: 'Strasbourg', nameZh: '斯特拉斯堡', latitude: 48.5734, longitude: 7.7521 },
      { name: 'Nantes', nameZh: '南特', latitude: 47.2184, longitude: -1.5536 },
      { name: 'Lille', nameZh: '里尔', latitude: 50.6292, longitude: 3.0573 },
      { name: 'Cannes', nameZh: '戛纳', latitude: 43.5528, longitude: 7.0174 },
    ]
  },
  {
    name: 'Germany',
    nameZh: '德国',
    cities: [
      { name: 'Berlin', nameZh: '柏林', latitude: 52.5200, longitude: 13.4050 },
      { name: 'Munich', nameZh: '慕尼黑', latitude: 48.1351, longitude: 11.5820 },
      { name: 'Hamburg', nameZh: '汉堡', latitude: 53.5511, longitude: 9.9937 },
      { name: 'Frankfurt', nameZh: '法兰克福', latitude: 50.1109, longitude: 8.6821 },
      { name: 'Cologne', nameZh: '科隆', latitude: 50.9375, longitude: 6.9603 },
      { name: 'Stuttgart', nameZh: '斯图加特', latitude: 48.7758, longitude: 9.1829 },
      { name: 'Düsseldorf', nameZh: '杜塞尔多夫', latitude: 51.2277, longitude: 6.7735 },
      { name: 'Dortmund', nameZh: '多特蒙德', latitude: 51.5136, longitude: 7.4653 },
      { name: 'Dresden', nameZh: '德累斯顿', latitude: 51.0504, longitude: 13.7373 },
      { name: 'Heidelberg', nameZh: '海德堡', latitude: 49.3988, longitude: 8.6724 },
    ]
  },
  {
    name: 'Italy',
    nameZh: '意大利',
    cities: [
      { name: 'Rome', nameZh: '罗马', latitude: 41.9028, longitude: 12.4964 },
      { name: 'Milan', nameZh: '米兰', latitude: 45.4642, longitude: 9.1900 },
      { name: 'Venice', nameZh: '威尼斯', latitude: 45.4408, longitude: 12.3155 },
      { name: 'Florence', nameZh: '佛罗伦萨', latitude: 43.7696, longitude: 11.2558 },
      { name: 'Naples', nameZh: '那不勒斯', latitude: 40.8518, longitude: 14.2681 },
      { name: 'Turin', nameZh: '都灵', latitude: 45.0703, longitude: 7.6869 },
      { name: 'Bologna', nameZh: '博洛尼亚', latitude: 44.4949, longitude: 11.3426 },
      { name: 'Genoa', nameZh: '热那亚', latitude: 44.4056, longitude: 8.9463 },
      { name: 'Verona', nameZh: '维罗纳', latitude: 45.4384, longitude: 10.9916 },
      { name: 'Palermo', nameZh: '巴勒莫', latitude: 38.1157, longitude: 13.3615 },
    ]
  },
  {
    name: 'Spain',
    nameZh: '西班牙',
    cities: [
      { name: 'Madrid', nameZh: '马德里', latitude: 40.4168, longitude: -3.7038 },
      { name: 'Barcelona', nameZh: '巴塞罗那', latitude: 41.3851, longitude: 2.1734 },
      { name: 'Valencia', nameZh: '瓦伦西亚', latitude: 39.4699, longitude: -0.3763 },
      { name: 'Seville', nameZh: '塞维利亚', latitude: 37.3891, longitude: -5.9845 },
      { name: 'Bilbao', nameZh: '毕尔巴鄂', latitude: 43.2630, longitude: -2.9350 },
      { name: 'Málaga', nameZh: '马拉加', latitude: 36.7213, longitude: -4.4214 },
      { name: 'Granada', nameZh: '格拉纳达', latitude: 37.1773, longitude: -3.5986 },
      { name: 'Zaragoza', nameZh: '萨拉戈萨', latitude: 41.6488, longitude: -0.8891 },
    ]
  },
  {
    name: 'Netherlands',
    nameZh: '荷兰',
    cities: [
      { name: 'Amsterdam', nameZh: '阿姆斯特丹', latitude: 52.3676, longitude: 4.9041 },
      { name: 'Rotterdam', nameZh: '鹿特丹', latitude: 51.9244, longitude: 4.4777 },
      { name: 'The Hague', nameZh: '海牙', latitude: 52.0705, longitude: 4.3007 },
    ]
  },
  {
    name: 'Belgium',
    nameZh: '比利时',
    cities: [
      { name: 'Brussels', nameZh: '布鲁塞尔', latitude: 50.8503, longitude: 4.3517 },
      { name: 'Bruges', nameZh: '布鲁日', latitude: 51.2093, longitude: 3.2247 },
    ]
  },
  {
    name: 'Switzerland',
    nameZh: '瑞士',
    cities: [
      { name: 'Zurich', nameZh: '苏黎世', latitude: 47.3769, longitude: 8.5417 },
      { name: 'Geneva', nameZh: '日内瓦', latitude: 46.2044, longitude: 6.1432 },
      { name: 'Bern', nameZh: '伯尔尼', latitude: 46.9480, longitude: 7.4474 },
    ]
  },
  {
    name: 'Austria',
    nameZh: '奥地利',
    cities: [
      { name: 'Vienna', nameZh: '维也纳', latitude: 48.2082, longitude: 16.3738 },
      { name: 'Salzburg', nameZh: '萨尔茨堡', latitude: 47.8095, longitude: 13.0550 },
    ]
  },
  {
    name: 'Czech Republic',
    nameZh: '捷克',
    cities: [
      { name: 'Prague', nameZh: '布拉格', latitude: 50.0755, longitude: 14.4378 },
    ]
  },
  {
    name: 'Poland',
    nameZh: '波兰',
    cities: [
      { name: 'Warsaw', nameZh: '华沙', latitude: 52.2297, longitude: 21.0122 },
      { name: 'Krakow', nameZh: '克拉科夫', latitude: 50.0647, longitude: 19.9450 },
    ]
  },
  {
    name: 'Russia',
    nameZh: '俄罗斯',
    cities: [
      { name: 'Moscow', nameZh: '莫斯科', latitude: 55.7558, longitude: 37.6173 },
      { name: 'Saint Petersburg', nameZh: '圣彼得堡', latitude: 59.9343, longitude: 30.3351 },
      { name: 'Novosibirsk', nameZh: '新西伯利亚', latitude: 55.0084, longitude: 82.9357 },
      { name: 'Yekaterinburg', nameZh: '叶卡捷琳堡', latitude: 56.8389, longitude: 60.6057 },
      { name: 'Kazan', nameZh: '喀山', latitude: 55.7887, longitude: 49.1221 },
      { name: 'Vladivostok', nameZh: '符拉迪沃斯托克', latitude: 43.1332, longitude: 131.9113 },
      { name: 'Sochi', nameZh: '索契', latitude: 43.6028, longitude: 39.7342 },
    ]
  },
  {
    name: 'Greece',
    nameZh: '希腊',
    cities: [
      { name: 'Athens', nameZh: '雅典', latitude: 37.9838, longitude: 23.7275 },
      { name: 'Santorini', nameZh: '圣托里尼', latitude: 36.3932, longitude: 25.4615 },
    ]
  },
  {
    name: 'Portugal',
    nameZh: '葡萄牙',
    cities: [
      { name: 'Lisbon', nameZh: '里斯本', latitude: 38.7223, longitude: -9.1393 },
      { name: 'Porto', nameZh: '波尔图', latitude: 41.1579, longitude: -8.6291 },
    ]
  },
  {
    name: 'Sweden',
    nameZh: '瑞典',
    cities: [
      { name: 'Stockholm', nameZh: '斯德哥尔摩', latitude: 59.3293, longitude: 18.0686 },
    ]
  },
  {
    name: 'Norway',
    nameZh: '挪威',
    cities: [
      { name: 'Oslo', nameZh: '奥斯陆', latitude: 59.9139, longitude: 10.7522 },
      { name: 'Bergen', nameZh: '卑尔根', latitude: 60.3913, longitude: 5.3221 },
    ]
  },
  {
    name: 'Denmark',
    nameZh: '丹麦',
    cities: [
      { name: 'Copenhagen', nameZh: '哥本哈根', latitude: 55.6761, longitude: 12.5683 },
    ]
  },
  {
    name: 'Finland',
    nameZh: '芬兰',
    cities: [
      { name: 'Helsinki', nameZh: '赫尔辛基', latitude: 60.1699, longitude: 24.9384 },
    ]
  },

  // North America
  {
    name: 'United States',
    nameZh: '美国',
    cities: [
      { name: 'New York', nameZh: '纽约', latitude: 40.7128, longitude: -74.0060 },
      { name: 'Los Angeles', nameZh: '洛杉矶', latitude: 34.0522, longitude: -118.2437 },
      { name: 'Chicago', nameZh: '芝加哥', latitude: 41.8781, longitude: -87.6298 },
      { name: 'San Francisco', nameZh: '旧金山', latitude: 37.7749, longitude: -122.4194 },
      { name: 'Seattle', nameZh: '西雅图', latitude: 47.6062, longitude: -122.3321 },
      { name: 'Miami', nameZh: '迈阿密', latitude: 25.7617, longitude: -80.1918 },
      { name: 'Boston', nameZh: '波士顿', latitude: 42.3601, longitude: -71.0589 },
      { name: 'Las Vegas', nameZh: '拉斯维加斯', latitude: 36.1699, longitude: -115.1398 },
      { name: 'Washington DC', nameZh: '华盛顿', latitude: 38.9072, longitude: -77.0369 },
      { name: 'Philadelphia', nameZh: '费城', latitude: 39.9526, longitude: -75.1652 },
      { name: 'Phoenix', nameZh: '凤凰城', latitude: 33.4484, longitude: -112.0740 },
      { name: 'San Diego', nameZh: '圣地亚哥', latitude: 32.7157, longitude: -117.1611 },
      { name: 'Dallas', nameZh: '达拉斯', latitude: 32.7767, longitude: -96.7970 },
      { name: 'Austin', nameZh: '奥斯汀', latitude: 30.2672, longitude: -97.7431 },
      { name: 'Denver', nameZh: '丹佛', latitude: 39.7392, longitude: -104.9903 },
      { name: 'Portland', nameZh: '波特兰', latitude: 45.5152, longitude: -122.6784 },
      { name: 'Atlanta', nameZh: '亚特兰大', latitude: 33.7490, longitude: -84.3880 },
      { name: 'Houston', nameZh: '休斯顿', latitude: 29.7604, longitude: -95.3698 },
      { name: 'Minneapolis', nameZh: '明尼阿波利斯', latitude: 44.9778, longitude: -93.2650 },
      { name: 'Detroit', nameZh: '底特律', latitude: 42.3314, longitude: -83.0458 },
      { name: 'New Orleans', nameZh: '新奥尔良', latitude: 29.9511, longitude: -90.0715 },
      { name: 'Nashville', nameZh: '纳什维尔', latitude: 36.1627, longitude: -86.7816 },
      { name: 'Charlotte', nameZh: '夏洛特', latitude: 35.2271, longitude: -80.8431 },
      { name: 'Salt Lake City', nameZh: '盐湖城', latitude: 40.7608, longitude: -111.8910 },
      { name: 'Honolulu', nameZh: '檀香山', latitude: 21.3099, longitude: -157.8581 },
      { name: 'Anchorage', nameZh: '安克雷奇', latitude: 61.2181, longitude: -149.9003 },
      { name: 'Columbus', nameZh: '哥伦布', latitude: 39.9612, longitude: -82.9988 },
      { name: 'Indianapolis', nameZh: '印第安纳波利斯', latitude: 39.7684, longitude: -86.1581 },
      { name: 'San Antonio', nameZh: '圣安东尼奥', latitude: 29.4241, longitude: -98.4936 },
      { name: 'San Jose', nameZh: '圣何塞', latitude: 37.3382, longitude: -121.8863 },
      { name: 'Tampa', nameZh: '坦帕', latitude: 27.9506, longitude: -82.4572 },
      { name: 'Orlando', nameZh: '奥兰多', latitude: 28.5383, longitude: -81.3792 },
    ]
  },
  {
    name: 'Canada',
    nameZh: '加拿大',
    cities: [
      { name: 'Toronto', nameZh: '多伦多', latitude: 43.6532, longitude: -79.3832 },
      { name: 'Vancouver', nameZh: '温哥华', latitude: 49.2827, longitude: -123.1207 },
      { name: 'Montreal', nameZh: '蒙特利尔', latitude: 45.5017, longitude: -73.5673 },
      { name: 'Ottawa', nameZh: '渥太华', latitude: 45.4215, longitude: -75.6972 },
      { name: 'Calgary', nameZh: '卡尔加里', latitude: 51.0447, longitude: -114.0719 },
      { name: 'Edmonton', nameZh: '埃德蒙顿', latitude: 53.5461, longitude: -113.4938 },
      { name: 'Winnipeg', nameZh: '温尼伯', latitude: 49.8951, longitude: -97.1384 },
      { name: 'Quebec City', nameZh: '魁北克城', latitude: 46.8139, longitude: -71.2080 },
      { name: 'Halifax', nameZh: '哈利法克斯', latitude: 44.6488, longitude: -63.5752 },
      { name: 'Victoria', nameZh: '维多利亚', latitude: 48.4284, longitude: -123.3656 },
      { name: 'Regina', nameZh: '里贾纳', latitude: 50.4452, longitude: -104.6189 },
      { name: 'Saskatoon', nameZh: '萨斯卡通', latitude: 52.1332, longitude: -106.6700 },
    ]
  },
  {
    name: 'Mexico',
    nameZh: '墨西哥',
    cities: [
      { name: 'Mexico City', nameZh: '墨西哥城', latitude: 19.4326, longitude: -99.1332 },
      { name: 'Cancun', nameZh: '坎昆', latitude: 21.1619, longitude: -86.8515 },
      { name: 'Guadalajara', nameZh: '瓜达拉哈拉', latitude: 20.6597, longitude: -103.3496 },
      { name: 'Monterrey', nameZh: '蒙特雷', latitude: 25.6866, longitude: -100.3161 },
      { name: 'Puebla', nameZh: '普埃布拉', latitude: 19.0414, longitude: -98.2063 },
      { name: 'Tijuana', nameZh: '蒂华纳', latitude: 32.5149, longitude: -117.0382 },
      { name: 'Playa del Carmen', nameZh: '普拉亚德尔卡曼', latitude: 20.6296, longitude: -87.0739 },
    ]
  },

  // South America
  {
    name: 'Brazil',
    nameZh: '巴西',
    cities: [
      { name: 'São Paulo', nameZh: '圣保罗', latitude: -23.5505, longitude: -46.6333 },
      { name: 'Rio de Janeiro', nameZh: '里约热内卢', latitude: -22.9068, longitude: -43.1729 },
      { name: 'Brasília', nameZh: '巴西利亚', latitude: -15.8267, longitude: -47.9218 },
      { name: 'Salvador', nameZh: '萨尔瓦多', latitude: -12.9714, longitude: -38.5014 },
      { name: 'Fortaleza', nameZh: '福塔雷萨', latitude: -3.7172, longitude: -38.5434 },
      { name: 'Belo Horizonte', nameZh: '贝洛奥里藏特', latitude: -19.9167, longitude: -43.9345 },
      { name: 'Manaus', nameZh: '马瑙斯', latitude: -3.1190, longitude: -60.0217 },
      { name: 'Curitiba', nameZh: '库里蒂巴', latitude: -25.4284, longitude: -49.2733 },
      { name: 'Recife', nameZh: '累西腓', latitude: -8.0476, longitude: -34.8770 },
    ]
  },
  {
    name: 'Argentina',
    nameZh: '阿根廷',
    cities: [
      { name: 'Buenos Aires', nameZh: '布宜诺斯艾利斯', latitude: -34.6037, longitude: -58.3816 },
      { name: 'Córdoba', nameZh: '科尔多瓦', latitude: -31.4201, longitude: -64.1888 },
      { name: 'Rosario', nameZh: '罗萨里奥', latitude: -32.9442, longitude: -60.6505 },
      { name: 'Mendoza', nameZh: '门多萨', latitude: -32.8895, longitude: -68.8458 },
    ]
  },
  {
    name: 'Chile',
    nameZh: '智利',
    cities: [
      { name: 'Santiago', nameZh: '圣地亚哥', latitude: -33.4489, longitude: -70.6693 },
    ]
  },
  {
    name: 'Peru',
    nameZh: '秘鲁',
    cities: [
      { name: 'Lima', nameZh: '利马', latitude: -12.0464, longitude: -77.0428 },
    ]
  },
  {
    name: 'Colombia',
    nameZh: '哥伦比亚',
    cities: [
      { name: 'Bogotá', nameZh: '波哥大', latitude: 4.7110, longitude: -74.0721 },
    ]
  },

  // Oceania
  {
    name: 'Australia',
    nameZh: '澳大利亚',
    cities: [
      { name: 'Sydney', nameZh: '悉尼', latitude: -33.8688, longitude: 151.2093 },
      { name: 'Melbourne', nameZh: '墨尔本', latitude: -37.8136, longitude: 144.9631 },
      { name: 'Brisbane', nameZh: '布里斯班', latitude: -27.4698, longitude: 153.0251 },
      { name: 'Perth', nameZh: '珀斯', latitude: -31.9505, longitude: 115.8605 },
      { name: 'Adelaide', nameZh: '阿德莱德', latitude: -34.9285, longitude: 138.6007 },
      { name: 'Canberra', nameZh: '堪培拉', latitude: -35.2809, longitude: 149.1300 },
      { name: 'Gold Coast', nameZh: '黄金海岸', latitude: -28.0167, longitude: 153.4000 },
      { name: 'Hobart', nameZh: '霍巴特', latitude: -42.8821, longitude: 147.3272 },
      { name: 'Darwin', nameZh: '达尔文', latitude: -12.4634, longitude: 130.8456 },
      { name: 'Cairns', nameZh: '凯恩斯', latitude: -16.9186, longitude: 145.7781 },
    ]
  },
  {
    name: 'New Zealand',
    nameZh: '新西兰',
    cities: [
      { name: 'Auckland', nameZh: '奥克兰', latitude: -36.8485, longitude: 174.7633 },
      { name: 'Wellington', nameZh: '惠灵顿', latitude: -41.2865, longitude: 174.7762 },
      { name: 'Christchurch', nameZh: '基督城', latitude: -43.5321, longitude: 172.6362 },
    ]
  },

  // Africa
  {
    name: 'Egypt',
    nameZh: '埃及',
    cities: [
      { name: 'Cairo', nameZh: '开罗', latitude: 30.0444, longitude: 31.2357 },
      { name: 'Alexandria', nameZh: '亚历山大', latitude: 31.2001, longitude: 29.9187 },
    ]
  },
  {
    name: 'South Africa',
    nameZh: '南非',
    cities: [
      { name: 'Cape Town', nameZh: '开普敦', latitude: -33.9249, longitude: 18.4241 },
      { name: 'Johannesburg', nameZh: '约翰内斯堡', latitude: -26.2041, longitude: 28.0473 },
    ]
  },
  {
    name: 'Morocco',
    nameZh: '摩洛哥',
    cities: [
      { name: 'Marrakech', nameZh: '马拉喀什', latitude: 31.6295, longitude: -7.9811 },
      { name: 'Casablanca', nameZh: '卡萨布兰卡', latitude: 33.5731, longitude: -7.5898 },
    ]
  },
  {
    name: 'Kenya',
    nameZh: '肯尼亚',
    cities: [
      { name: 'Nairobi', nameZh: '内罗毕', latitude: -1.2921, longitude: 36.8219 },
    ]
  },
  {
    name: 'Nigeria',
    nameZh: '尼日利亚',
    cities: [
      { name: 'Lagos', nameZh: '拉各斯', latitude: 6.5244, longitude: 3.3792 },
      { name: 'Abuja', nameZh: '阿布贾', latitude: 9.0765, longitude: 7.3986 },
    ]
  },
  {
    name: 'Ghana',
    nameZh: '加纳',
    cities: [
      { name: 'Accra', nameZh: '阿克拉', latitude: 5.6037, longitude: -0.1870 },
    ]
  },
  {
    name: 'Ethiopia',
    nameZh: '埃塞俄比亚',
    cities: [
      { name: 'Addis Ababa', nameZh: '亚的斯亚贝巴', latitude: 9.0320, longitude: 38.7469 },
    ]
  },
  {
    name: 'Tunisia',
    nameZh: '突尼斯',
    cities: [
      { name: 'Tunis', nameZh: '突尼斯市', latitude: 36.8065, longitude: 10.1815 },
    ]
  },

  // Middle East (Additional)
  {
    name: 'Saudi Arabia',
    nameZh: '沙特阿拉伯',
    cities: [
      { name: 'Riyadh', nameZh: '利雅得', latitude: 24.7136, longitude: 46.6753 },
      { name: 'Jeddah', nameZh: '吉达', latitude: 21.4858, longitude: 39.1925 },
      { name: 'Mecca', nameZh: '麦加', latitude: 21.3891, longitude: 39.8579 },
      { name: 'Medina', nameZh: '麦地那', latitude: 24.5247, longitude: 39.5692 },
      { name: 'Dammam', nameZh: '达曼', latitude: 26.4367, longitude: 50.1039 },
    ]
  },
  {
    name: 'Qatar',
    nameZh: '卡塔尔',
    cities: [
      { name: 'Doha', nameZh: '多哈', latitude: 25.2854, longitude: 51.5310 },
    ]
  },
  {
    name: 'Kuwait',
    nameZh: '科威特',
    cities: [
      { name: 'Kuwait City', nameZh: '科威特城', latitude: 29.3759, longitude: 47.9774 },
    ]
  },
  {
    name: 'Bahrain',
    nameZh: '巴林',
    cities: [
      { name: 'Manama', nameZh: '麦纳麦', latitude: 26.2285, longitude: 50.5860 },
    ]
  },
  {
    name: 'Oman',
    nameZh: '阿曼',
    cities: [
      { name: 'Muscat', nameZh: '马斯喀特', latitude: 23.5880, longitude: 58.3829 },
    ]
  },
  {
    name: 'Jordan',
    nameZh: '约旦',
    cities: [
      { name: 'Amman', nameZh: '安曼', latitude: 31.9454, longitude: 35.9284 },
    ]
  },
  {
    name: 'Lebanon',
    nameZh: '黎巴嫩',
    cities: [
      { name: 'Beirut', nameZh: '贝鲁特', latitude: 33.8886, longitude: 35.4955 },
    ]
  },
  {
    name: 'Iran',
    nameZh: '伊朗',
    cities: [
      { name: 'Tehran', nameZh: '德黑兰', latitude: 35.6892, longitude: 51.3890 },
    ]
  },
  {
    name: 'Iraq',
    nameZh: '伊拉克',
    cities: [
      { name: 'Baghdad', nameZh: '巴格达', latitude: 33.3152, longitude: 44.3661 },
    ]
  },

  // Asia (Additional)
  {
    name: 'Pakistan',
    nameZh: '巴基斯坦',
    cities: [
      { name: 'Karachi', nameZh: '卡拉奇', latitude: 24.8607, longitude: 67.0011 },
      { name: 'Lahore', nameZh: '拉合尔', latitude: 31.5497, longitude: 74.3436 },
      { name: 'Islamabad', nameZh: '伊斯兰堡', latitude: 33.6844, longitude: 73.0479 },
      { name: 'Rawalpindi', nameZh: '拉瓦尔品第', latitude: 33.5651, longitude: 73.0169 },
      { name: 'Faisalabad', nameZh: '费萨拉巴德', latitude: 31.4504, longitude: 73.1350 },
      { name: 'Peshawar', nameZh: '白沙瓦', latitude: 34.0151, longitude: 71.5249 },
    ]
  },
  {
    name: 'Bangladesh',
    nameZh: '孟加拉国',
    cities: [
      { name: 'Dhaka', nameZh: '达卡', latitude: 23.8103, longitude: 90.4125 },
    ]
  },
  {
    name: 'Sri Lanka',
    nameZh: '斯里兰卡',
    cities: [
      { name: 'Colombo', nameZh: '科伦坡', latitude: 6.9271, longitude: 79.8612 },
    ]
  },
  {
    name: 'Myanmar',
    nameZh: '缅甸',
    cities: [
      { name: 'Yangon', nameZh: '仰光', latitude: 16.8661, longitude: 96.1951 },
    ]
  },
  {
    name: 'Cambodia',
    nameZh: '柬埔寨',
    cities: [
      { name: 'Phnom Penh', nameZh: '金边', latitude: 11.5564, longitude: 104.9282 },
      { name: 'Siem Reap', nameZh: '暹粒', latitude: 13.3671, longitude: 103.8448 },
    ]
  },
  {
    name: 'Laos',
    nameZh: '老挝',
    cities: [
      { name: 'Vientiane', nameZh: '万象', latitude: 17.9757, longitude: 102.6331 },
    ]
  },
  {
    name: 'Nepal',
    nameZh: '尼泊尔',
    cities: [
      { name: 'Kathmandu', nameZh: '加德满都', latitude: 27.7172, longitude: 85.3240 },
    ]
  },
  {
    name: 'Maldives',
    nameZh: '马尔代夫',
    cities: [
      { name: 'Malé', nameZh: '马累', latitude: 4.1755, longitude: 73.5093 },
    ]
  },
  {
    name: 'Brunei',
    nameZh: '文莱',
    cities: [
      { name: 'Bandar Seri Begawan', nameZh: '斯里巴加湾市', latitude: 4.9031, longitude: 114.9398 },
    ]
  },
  {
    name: 'Mongolia',
    nameZh: '蒙古',
    cities: [
      { name: 'Ulaanbaatar', nameZh: '乌兰巴托', latitude: 47.8864, longitude: 106.9057 },
    ]
  },
  {
    name: 'Kazakhstan',
    nameZh: '哈萨克斯坦',
    cities: [
      { name: 'Almaty', nameZh: '阿拉木图', latitude: 43.2220, longitude: 76.8512 },
      { name: 'Nur-Sultan', nameZh: '努尔苏丹', latitude: 51.1694, longitude: 71.4491 },
    ]
  },
  {
    name: 'Uzbekistan',
    nameZh: '乌兹别克斯坦',
    cities: [
      { name: 'Tashkent', nameZh: '塔什干', latitude: 41.2995, longitude: 69.2401 },
    ]
  },

  // Europe (Additional)
  {
    name: 'Ireland',
    nameZh: '爱尔兰',
    cities: [
      { name: 'Dublin', nameZh: '都柏林', latitude: 53.3498, longitude: -6.2603 },
    ]
  },
  {
    name: 'Iceland',
    nameZh: '冰岛',
    cities: [
      { name: 'Reykjavik', nameZh: '雷克雅未克', latitude: 64.1466, longitude: -21.9426 },
    ]
  },
  {
    name: 'Croatia',
    nameZh: '克罗地亚',
    cities: [
      { name: 'Zagreb', nameZh: '萨格勒布', latitude: 45.8150, longitude: 15.9819 },
      { name: 'Dubrovnik', nameZh: '杜布罗夫尼克', latitude: 42.6507, longitude: 18.0944 },
    ]
  },
  {
    name: 'Romania',
    nameZh: '罗马尼亚',
    cities: [
      { name: 'Bucharest', nameZh: '布加勒斯特', latitude: 44.4268, longitude: 26.1025 },
    ]
  },
  {
    name: 'Bulgaria',
    nameZh: '保加利亚',
    cities: [
      { name: 'Sofia', nameZh: '索非亚', latitude: 42.6977, longitude: 23.3219 },
    ]
  },
  {
    name: 'Hungary',
    nameZh: '匈牙利',
    cities: [
      { name: 'Budapest', nameZh: '布达佩斯', latitude: 47.4979, longitude: 19.0402 },
    ]
  },
  {
    name: 'Serbia',
    nameZh: '塞尔维亚',
    cities: [
      { name: 'Belgrade', nameZh: '贝尔格莱德', latitude: 44.7866, longitude: 20.4489 },
    ]
  },
  {
    name: 'Slovakia',
    nameZh: '斯洛伐克',
    cities: [
      { name: 'Bratislava', nameZh: '布拉迪斯拉发', latitude: 48.1486, longitude: 17.1077 },
    ]
  },
  {
    name: 'Slovenia',
    nameZh: '斯洛文尼亚',
    cities: [
      { name: 'Ljubljana', nameZh: '卢布尔雅那', latitude: 46.0569, longitude: 14.5058 },
    ]
  },
  {
    name: 'Estonia',
    nameZh: '爱沙尼亚',
    cities: [
      { name: 'Tallinn', nameZh: '塔林', latitude: 59.4370, longitude: 24.7536 },
    ]
  },
  {
    name: 'Latvia',
    nameZh: '拉脱维亚',
    cities: [
      { name: 'Riga', nameZh: '里加', latitude: 56.9496, longitude: 24.1052 },
    ]
  },
  {
    name: 'Lithuania',
    nameZh: '立陶宛',
    cities: [
      { name: 'Vilnius', nameZh: '维尔纽斯', latitude: 54.6872, longitude: 25.2797 },
    ]
  },
  {
    name: 'Ukraine',
    nameZh: '乌克兰',
    cities: [
      { name: 'Kyiv', nameZh: '基辅', latitude: 50.4501, longitude: 30.5234 },
      { name: 'Lviv', nameZh: '利沃夫', latitude: 49.8397, longitude: 24.0297 },
    ]
  },
  {
    name: 'Belarus',
    nameZh: '白俄罗斯',
    cities: [
      { name: 'Minsk', nameZh: '明斯克', latitude: 53.9006, longitude: 27.5590 },
    ]
  },
  {
    name: 'Luxembourg',
    nameZh: '卢森堡',
    cities: [
      { name: 'Luxembourg City', nameZh: '卢森堡市', latitude: 49.6116, longitude: 6.1319 },
    ]
  },
  {
    name: 'Malta',
    nameZh: '马耳他',
    cities: [
      { name: 'Valletta', nameZh: '瓦莱塔', latitude: 35.8989, longitude: 14.5146 },
    ]
  },
  {
    name: 'Cyprus',
    nameZh: '塞浦路斯',
    cities: [
      { name: 'Nicosia', nameZh: '尼科西亚', latitude: 35.1856, longitude: 33.3823 },
    ]
  },

  // Central & South America (Additional)
  {
    name: 'Venezuela',
    nameZh: '委内瑞拉',
    cities: [
      { name: 'Caracas', nameZh: '加拉加斯', latitude: 10.4806, longitude: -66.9036 },
    ]
  },
  {
    name: 'Ecuador',
    nameZh: '厄瓜多尔',
    cities: [
      { name: 'Quito', nameZh: '基多', latitude: -0.1807, longitude: -78.4678 },
      { name: 'Guayaquil', nameZh: '瓜亚基尔', latitude: -2.1709, longitude: -79.9224 },
    ]
  },
  {
    name: 'Bolivia',
    nameZh: '玻利维亚',
    cities: [
      { name: 'La Paz', nameZh: '拉巴斯', latitude: -16.5000, longitude: -68.1500 },
    ]
  },
  {
    name: 'Paraguay',
    nameZh: '巴拉圭',
    cities: [
      { name: 'Asunción', nameZh: '亚松森', latitude: -25.2637, longitude: -57.5759 },
    ]
  },
  {
    name: 'Uruguay',
    nameZh: '乌拉圭',
    cities: [
      { name: 'Montevideo', nameZh: '蒙得维的亚', latitude: -34.9011, longitude: -56.1645 },
    ]
  },
  {
    name: 'Costa Rica',
    nameZh: '哥斯达黎加',
    cities: [
      { name: 'San José', nameZh: '圣何塞', latitude: 9.9281, longitude: -84.0907 },
    ]
  },
  {
    name: 'Panama',
    nameZh: '巴拿马',
    cities: [
      { name: 'Panama City', nameZh: '巴拿马城', latitude: 8.9824, longitude: -79.5199 },
    ]
  },
  {
    name: 'Guatemala',
    nameZh: '危地马拉',
    cities: [
      { name: 'Guatemala City', nameZh: '危地马拉城', latitude: 14.6349, longitude: -90.5069 },
    ]
  },
  {
    name: 'Jamaica',
    nameZh: '牙买加',
    cities: [
      { name: 'Kingston', nameZh: '金斯敦', latitude: 17.9712, longitude: -76.7936 },
    ]
  },
  {
    name: 'Cuba',
    nameZh: '古巴',
    cities: [
      { name: 'Havana', nameZh: '哈瓦那', latitude: 23.1136, longitude: -82.3666 },
    ]
  },
  {
    name: 'Dominican Republic',
    nameZh: '多米尼加',
    cities: [
      { name: 'Santo Domingo', nameZh: '圣多明各', latitude: 18.4861, longitude: -69.9312 },
    ]
  },
  {
    name: 'Puerto Rico',
    nameZh: '波多黎各',
    cities: [
      { name: 'San Juan', nameZh: '圣胡安', latitude: 18.4655, longitude: -66.1057 },
    ]
  },

  // Oceania (Additional)
  {
    name: 'Fiji',
    nameZh: '斐济',
    cities: [
      { name: 'Suva', nameZh: '苏瓦', latitude: -18.1416, longitude: 178.4419 },
    ]
  },
  {
    name: 'Papua New Guinea',
    nameZh: '巴布亚新几内亚',
    cities: [
      { name: 'Port Moresby', nameZh: '莫尔兹比港', latitude: -9.4438, longitude: 147.1803 },
    ]
  },
  {
    name: 'Samoa',
    nameZh: '萨摩亚',
    cities: [
      { name: 'Apia', nameZh: '阿皮亚', latitude: -13.8506, longitude: -171.7513 },
    ]
  },
  {
    name: 'Tonga',
    nameZh: '汤加',
    cities: [
      { name: 'Nukualofa', nameZh: '努库阿洛法', latitude: -21.1393, longitude: -175.2216 },
    ]
  },
  {
    name: 'Vanuatu',
    nameZh: '瓦努阿图',
    cities: [
      { name: 'Port Vila', nameZh: '维拉港', latitude: -17.7334, longitude: 168.3273 },
    ]
  },
  {
    name: 'Solomon Islands',
    nameZh: '所罗门群岛',
    cities: [
      { name: 'Honiara', nameZh: '霍尼亚拉', latitude: -9.4280, longitude: 159.9550 },
    ]
  },
  {
    name: 'Micronesia',
    nameZh: '密克罗尼西亚',
    cities: [
      { name: 'Palikir', nameZh: '帕利基尔', latitude: 6.9178, longitude: 158.1850 },
    ]
  },
  {
    name: 'Palau',
    nameZh: '帕劳',
    cities: [
      { name: 'Ngerulmud', nameZh: '恩吉鲁穆德', latitude: 7.5007, longitude: 134.6242 },
    ]
  },
  {
    name: 'Marshall Islands',
    nameZh: '马绍尔群岛',
    cities: [
      { name: 'Majuro', nameZh: '马朱罗', latitude: 7.1315, longitude: 171.1845 },
    ]
  },
  {
    name: 'Kiribati',
    nameZh: '基里巴斯',
    cities: [
      { name: 'Tarawa', nameZh: '塔拉瓦', latitude: 1.3382, longitude: 173.0176 },
    ]
  },
  {
    name: 'Nauru',
    nameZh: '瑙鲁',
    cities: [
      { name: 'Yaren', nameZh: '亚伦', latitude: -0.5477, longitude: 166.9209 },
    ]
  },
  {
    name: 'Tuvalu',
    nameZh: '图瓦卢',
    cities: [
      { name: 'Funafuti', nameZh: '富纳富提', latitude: -8.5211, longitude: 179.1962 },
    ]
  },

  // Africa (Additional)
  {
    name: 'Algeria',
    nameZh: '阿尔及利亚',
    cities: [
      { name: 'Algiers', nameZh: '阿尔及尔', latitude: 36.7538, longitude: 3.0588 },
    ]
  },
  {
    name: 'Libya',
    nameZh: '利比亚',
    cities: [
      { name: 'Tripoli', nameZh: '的黎波里', latitude: 32.8872, longitude: 13.1913 },
    ]
  },
  {
    name: 'Sudan',
    nameZh: '苏丹',
    cities: [
      { name: 'Khartoum', nameZh: '喀土穆', latitude: 15.5007, longitude: 32.5599 },
    ]
  },
  {
    name: 'Tanzania',
    nameZh: '坦桑尼亚',
    cities: [
      { name: 'Dar es Salaam', nameZh: '达累斯萨拉姆', latitude: -6.7924, longitude: 39.2083 },
    ]
  },
  {
    name: 'Uganda',
    nameZh: '乌干达',
    cities: [
      { name: 'Kampala', nameZh: '坎帕拉', latitude: 0.3476, longitude: 32.5825 },
    ]
  },
  {
    name: 'Rwanda',
    nameZh: '卢旺达',
    cities: [
      { name: 'Kigali', nameZh: '基加利', latitude: -1.9441, longitude: 30.0619 },
    ]
  },
  {
    name: 'Burundi',
    nameZh: '布隆迪',
    cities: [
      { name: 'Bujumbura', nameZh: '布琼布拉', latitude: -3.3614, longitude: 29.3599 },
    ]
  },
  {
    name: 'Zambia',
    nameZh: '赞比亚',
    cities: [
      { name: 'Lusaka', nameZh: '卢萨卡', latitude: -15.3875, longitude: 28.3228 },
    ]
  },
  {
    name: 'Zimbabwe',
    nameZh: '津巴布韦',
    cities: [
      { name: 'Harare', nameZh: '哈拉雷', latitude: -17.8252, longitude: 31.0335 },
    ]
  },
  {
    name: 'Mozambique',
    nameZh: '莫桑比克',
    cities: [
      { name: 'Maputo', nameZh: '马普托', latitude: -25.9655, longitude: 32.5832 },
    ]
  },
  {
    name: 'Botswana',
    nameZh: '博茨瓦纳',
    cities: [
      { name: 'Gaborone', nameZh: '哈博罗内', latitude: -24.6282, longitude: 25.9231 },
    ]
  },
  {
    name: 'Namibia',
    nameZh: '纳米比亚',
    cities: [
      { name: 'Windhoek', nameZh: '温得和克', latitude: -22.5597, longitude: 17.0832 },
    ]
  },
  {
    name: 'Angola',
    nameZh: '安哥拉',
    cities: [
      { name: 'Luanda', nameZh: '罗安达', latitude: -8.8390, longitude: 13.2894 },
    ]
  },
  {
    name: 'Cameroon',
    nameZh: '喀麦隆',
    cities: [
      { name: 'Yaoundé', nameZh: '雅温得', latitude: 3.8480, longitude: 11.5021 },
    ]
  },
  {
    name: 'Senegal',
    nameZh: '塞内加尔',
    cities: [
      { name: 'Dakar', nameZh: '达喀尔', latitude: 14.7167, longitude: -17.4677 },
    ]
  },
  {
    name: 'Ivory Coast',
    nameZh: '科特迪瓦',
    cities: [
      { name: 'Abidjan', nameZh: '阿比让', latitude: 5.3600, longitude: -4.0083 },
    ]
  },
  {
    name: 'Mali',
    nameZh: '马里',
    cities: [
      { name: 'Bamako', nameZh: '巴马科', latitude: 12.6392, longitude: -8.0029 },
    ]
  },
  {
    name: 'Burkina Faso',
    nameZh: '布基纳法索',
    cities: [
      { name: 'Ouagadougou', nameZh: '瓦加杜古', latitude: 12.3714, longitude: -1.5197 },
    ]
  },
  {
    name: 'Niger',
    nameZh: '尼日尔',
    cities: [
      { name: 'Niamey', nameZh: '尼亚美', latitude: 13.5127, longitude: 2.1128 },
    ]
  },
  {
    name: 'Chad',
    nameZh: '乍得',
    cities: [
      { name: "N'Djamena", nameZh: '恩贾梅纳', latitude: 12.1348, longitude: 15.0557 },
    ]
  },
  {
    name: 'Benin',
    nameZh: '贝宁',
    cities: [
      { name: 'Porto-Novo', nameZh: '波多诺伏', latitude: 6.4969, longitude: 2.6289 },
    ]
  },
  {
    name: 'Togo',
    nameZh: '多哥',
    cities: [
      { name: 'Lomé', nameZh: '洛美', latitude: 6.1256, longitude: 1.2318 },
    ]
  },
  {
    name: 'Guinea',
    nameZh: '几内亚',
    cities: [
      { name: 'Conakry', nameZh: '科纳克里', latitude: 9.6412, longitude: -13.5784 },
    ]
  },
  {
    name: 'Sierra Leone',
    nameZh: '塞拉利昂',
    cities: [
      { name: 'Freetown', nameZh: '弗里敦', latitude: 8.4657, longitude: -13.2317 },
    ]
  },
  {
    name: 'Liberia',
    nameZh: '利比里亚',
    cities: [
      { name: 'Monrovia', nameZh: '蒙罗维亚', latitude: 6.3156, longitude: -10.8074 },
    ]
  },
  {
    name: 'Mauritania',
    nameZh: '毛里塔尼亚',
    cities: [
      { name: 'Nouakchott', nameZh: '努瓦克肖特', latitude: 18.0735, longitude: -15.9582 },
    ]
  },
  {
    name: 'Gambia',
    nameZh: '冈比亚',
    cities: [
      { name: 'Banjul', nameZh: '班珠尔', latitude: 13.4549, longitude: -16.5790 },
    ]
  },
  {
    name: 'Guinea-Bissau',
    nameZh: '几内亚比绍',
    cities: [
      { name: 'Bissau', nameZh: '比绍', latitude: 11.8636, longitude: -15.5989 },
    ]
  },
  {
    name: 'Gabon',
    nameZh: '加蓬',
    cities: [
      { name: 'Libreville', nameZh: '利伯维尔', latitude: 0.4162, longitude: 9.4673 },
    ]
  },
  {
    name: 'Equatorial Guinea',
    nameZh: '赤道几内亚',
    cities: [
      { name: 'Malabo', nameZh: '马拉博', latitude: 3.7504, longitude: 8.7371 },
    ]
  },
  {
    name: 'Republic of the Congo',
    nameZh: '刚果共和国',
    cities: [
      { name: 'Brazzaville', nameZh: '布拉柴维尔', latitude: 4.2634, longitude: 15.2429 },
    ]
  },
  {
    name: 'Democratic Republic of the Congo',
    nameZh: '刚果民主共和国',
    cities: [
      { name: 'Kinshasa', nameZh: '金沙萨', latitude: -4.4419, longitude: 15.2663 },
    ]
  },
  {
    name: 'Central African Republic',
    nameZh: '中非共和国',
    cities: [
      { name: 'Bangui', nameZh: '班吉', latitude: 4.3947, longitude: 18.5582 },
    ]
  },
  {
    name: 'Malawi',
    nameZh: '马拉维',
    cities: [
      { name: 'Lilongwe', nameZh: '利隆圭', latitude: -13.9626, longitude: 33.7741 },
    ]
  },
  {
    name: 'Madagascar',
    nameZh: '马达加斯加',
    cities: [
      { name: 'Antananarivo', nameZh: '塔那那利佛', latitude: -18.8792, longitude: 47.5079 },
    ]
  },
  {
    name: 'Mauritius',
    nameZh: '毛里求斯',
    cities: [
      { name: 'Port Louis', nameZh: '路易港', latitude: -20.1609, longitude: 57.5012 },
    ]
  },
  {
    name: 'Seychelles',
    nameZh: '塞舌尔',
    cities: [
      { name: 'Victoria', nameZh: '维多利亚', latitude: -4.6191, longitude: 55.4513 },
    ]
  },
  {
    name: 'Comoros',
    nameZh: '科摩罗',
    cities: [
      { name: 'Moroni', nameZh: '莫罗尼', latitude: -11.7172, longitude: 43.2473 },
    ]
  },
  {
    name: 'Cabo Verde',
    nameZh: '佛得角',
    cities: [
      { name: 'Praia', nameZh: '普拉亚', latitude: 14.9330, longitude: -23.5133 },
    ]
  },
  {
    name: 'São Tomé and Príncipe',
    nameZh: '圣多美和普林西比',
    cities: [
      { name: 'São Tomé', nameZh: '圣多美', latitude: 0.3365, longitude: 6.7273 },
    ]
  },
  {
    name: 'Eritrea',
    nameZh: '厄立特里亚',
    cities: [
      { name: 'Asmara', nameZh: '阿斯马拉', latitude: 15.3229, longitude: 38.9251 },
    ]
  },
  {
    name: 'Djibouti',
    nameZh: '吉布提',
    cities: [
      { name: 'Djibouti City', nameZh: '吉布提市', latitude: 11.8251, longitude: 42.5903 },
    ]
  },
  {
    name: 'Somalia',
    nameZh: '索马里',
    cities: [
      { name: 'Mogadishu', nameZh: '摩加迪沙', latitude: 2.0469, longitude: 45.3182 },
    ]
  },
  {
    name: 'South Sudan',
    nameZh: '南苏丹',
    cities: [
      { name: 'Juba', nameZh: '朱巴', latitude: 4.8517, longitude: 31.5825 },
    ]
  },
  {
    name: 'Lesotho',
    nameZh: '莱索托',
    cities: [
      { name: 'Maseru', nameZh: '马塞卢', latitude: -29.3167, longitude: 27.4833 },
    ]
  },
  {
    name: 'Eswatini',
    nameZh: '斯威士兰',
    cities: [
      { name: 'Mbabane', nameZh: '姆巴巴内', latitude: -26.3054, longitude: 31.1367 },
    ]
  },

  // Central & South America (Additional)
  {
    name: 'Honduras',
    nameZh: '洪都拉斯',
    cities: [
      { name: 'Tegucigalpa', nameZh: '特古西加尔巴', latitude: 14.0723, longitude: -87.1921 },
    ]
  },
  {
    name: 'Nicaragua',
    nameZh: '尼加拉瓜',
    cities: [
      { name: 'Managua', nameZh: '马那瓜', latitude: 12.1364, longitude: -86.2514 },
    ]
  },
  {
    name: 'El Salvador',
    nameZh: '萨尔瓦多',
    cities: [
      { name: 'San Salvador', nameZh: '圣萨尔瓦多', latitude: 13.6929, longitude: -89.2182 },
    ]
  },
  {
    name: 'Belize',
    nameZh: '伯利兹',
    cities: [
      { name: 'Belmopan', nameZh: '贝尔莫潘', latitude: 17.2510, longitude: -88.7590 },
    ]
  },
  {
    name: 'Haiti',
    nameZh: '海地',
    cities: [
      { name: 'Port-au-Prince', nameZh: '太子港', latitude: 18.5944, longitude: -72.3074 },
    ]
  },
  {
    name: 'Bahamas',
    nameZh: '巴哈马',
    cities: [
      { name: 'Nassau', nameZh: '拿骚', latitude: 25.0443, longitude: -77.3504 },
    ]
  },
  {
    name: 'Barbados',
    nameZh: '巴巴多斯',
    cities: [
      { name: 'Bridgetown', nameZh: '布里奇敦', latitude: 13.0969, longitude: -59.6145 },
    ]
  },
  {
    name: 'Trinidad and Tobago',
    nameZh: '特立尼达和多巴哥',
    cities: [
      { name: 'Port of Spain', nameZh: '西班牙港', latitude: 10.6549, longitude: -61.5019 },
    ]
  },
  {
    name: 'Guyana',
    nameZh: '圭亚那',
    cities: [
      { name: 'Georgetown', nameZh: '乔治敦', latitude: 6.8013, longitude: -58.1551 },
    ]
  },
  {
    name: 'Suriname',
    nameZh: '苏里南',
    cities: [
      { name: 'Paramaribo', nameZh: '帕拉马里博', latitude: 5.8520, longitude: -55.2038 },
    ]
  },
  {
    name: 'French Guiana',
    nameZh: '法属圭亚那',
    cities: [
      { name: 'Cayenne', nameZh: '卡宴', latitude: 4.9380, longitude: -52.3260 },
    ]
  },
  {
    name: 'Saint Lucia',
    nameZh: '圣卢西亚',
    cities: [
      { name: 'Castries', nameZh: '卡斯特里', latitude: 14.0101, longitude: -60.9875 },
    ]
  },
  {
    name: 'Grenada',
    nameZh: '格林纳达',
    cities: [
      { name: "Saint George's", nameZh: '圣乔治', latitude: 12.0561, longitude: -61.7488 },
    ]
  },
  {
    name: 'Saint Vincent and the Grenadines',
    nameZh: '圣文森特和格林纳丁斯',
    cities: [
      { name: 'Kingstown', nameZh: '金斯敦', latitude: 13.1600, longitude: -61.2248 },
    ]
  },
  {
    name: 'Antigua and Barbuda',
    nameZh: '安提瓜和巴布达',
    cities: [
      { name: "Saint John's", nameZh: '圣约翰', latitude: 17.1175, longitude: -61.8456 },
    ]
  },
  {
    name: 'Dominica',
    nameZh: '多米尼克',
    cities: [
      { name: 'Roseau', nameZh: '罗索', latitude: 15.3017, longitude: -61.3870 },
    ]
  },
  {
    name: 'Saint Kitts and Nevis',
    nameZh: '圣基茨和尼维斯',
    cities: [
      { name: 'Basseterre', nameZh: '巴斯特尔', latitude: 17.2955, longitude: -62.7258 },
    ]
  },

  // Asia (Additional)
  {
    name: 'Kyrgyzstan',
    nameZh: '吉尔吉斯斯坦',
    cities: [
      { name: 'Bishkek', nameZh: '比什凯克', latitude: 42.8746, longitude: 74.5698 },
    ]
  },
  {
    name: 'Tajikistan',
    nameZh: '塔吉克斯坦',
    cities: [
      { name: 'Dushanbe', nameZh: '杜尚别', latitude: 38.5598, longitude: 68.7738 },
    ]
  },
  {
    name: 'Turkmenistan',
    nameZh: '土库曼斯坦',
    cities: [
      { name: 'Ashgabat', nameZh: '阿什哈巴德', latitude: 37.9601, longitude: 58.3261 },
    ]
  },
  {
    name: 'Afghanistan',
    nameZh: '阿富汗',
    cities: [
      { name: 'Kabul', nameZh: '喀布尔', latitude: 34.5553, longitude: 69.2075 },
    ]
  },
  {
    name: 'Yemen',
    nameZh: '也门',
    cities: [
      { name: 'Sana\'a', nameZh: '萨那', latitude: 15.3694, longitude: 44.1910 },
    ]
  },
  {
    name: 'Syria',
    nameZh: '叙利亚',
    cities: [
      { name: 'Damascus', nameZh: '大马士革', latitude: 33.5138, longitude: 36.2765 },
    ]
  },
  {
    name: 'Armenia',
    nameZh: '亚美尼亚',
    cities: [
      { name: 'Yerevan', nameZh: '埃里温', latitude: 40.1792, longitude: 44.4991 },
    ]
  },
  {
    name: 'Azerbaijan',
    nameZh: '阿塞拜疆',
    cities: [
      { name: 'Baku', nameZh: '巴库', latitude: 40.4093, longitude: 49.8671 },
    ]
  },
  {
    name: 'Georgia',
    nameZh: '格鲁吉亚',
    cities: [
      { name: 'Tbilisi', nameZh: '第比利斯', latitude: 41.7151, longitude: 44.8271 },
    ]
  },
  {
    name: 'Bhutan',
    nameZh: '不丹',
    cities: [
      { name: 'Thimphu', nameZh: '廷布', latitude: 27.4716, longitude: 89.6386 },
    ]
  },
  {
    name: 'Timor-Leste',
    nameZh: '东帝汶',
    cities: [
      { name: 'Dili', nameZh: '帝力', latitude: -8.5569, longitude: 125.5603 },
    ]
  },

  // Europe (Additional)
  {
    name: 'North Macedonia',
    nameZh: '北马其顿',
    cities: [
      { name: 'Skopje', nameZh: '斯科普里', latitude: 42.0024, longitude: 21.4361 },
    ]
  },
  {
    name: 'Albania',
    nameZh: '阿尔巴尼亚',
    cities: [
      { name: 'Tirana', nameZh: '地拉那', latitude: 41.3275, longitude: 19.8187 },
    ]
  },
  {
    name: 'Bosnia and Herzegovina',
    nameZh: '波黑',
    cities: [
      { name: 'Sarajevo', nameZh: '萨拉热窝', latitude: 43.8564, longitude: 18.4131 },
    ]
  },
  {
    name: 'Montenegro',
    nameZh: '黑山',
    cities: [
      { name: 'Podgorica', nameZh: '波德戈里察', latitude: 42.4304, longitude: 19.2594 },
    ]
  },
  {
    name: 'Kosovo',
    nameZh: '科索沃',
    cities: [
      { name: 'Pristina', nameZh: '普里什蒂纳', latitude: 42.6629, longitude: 21.1655 },
    ]
  },
  {
    name: 'Moldova',
    nameZh: '摩尔多瓦',
    cities: [
      { name: 'Chișinău', nameZh: '基希讷乌', latitude: 47.0105, longitude: 28.8638 },
    ]
  },
  {
    name: 'Andorra',
    nameZh: '安道尔',
    cities: [
      { name: 'Andorra la Vella', nameZh: '安道尔城', latitude: 42.5063, longitude: 1.5218 },
    ]
  },
  {
    name: 'Monaco',
    nameZh: '摩纳哥',
    cities: [
      { name: 'Monaco', nameZh: '摩纳哥城', latitude: 43.7384, longitude: 7.4246 },
    ]
  },
  {
    name: 'Liechtenstein',
    nameZh: '列支敦士登',
    cities: [
      { name: 'Vaduz', nameZh: '瓦杜兹', latitude: 47.1410, longitude: 9.5209 },
    ]
  },
  {
    name: 'San Marino',
    nameZh: '圣马力诺',
    cities: [
      { name: 'San Marino', nameZh: '圣马力诺市', latitude: 43.9424, longitude: 12.4578 },
    ]
  },
  {
    name: 'Vatican City',
    nameZh: '梵蒂冈',
    cities: [
      { name: 'Vatican City', nameZh: '梵蒂冈城', latitude: 41.9029, longitude: 12.4534 },
    ]
  },

  // Special Administrative Regions and Territories
  {
    name: 'Greenland',
    nameZh: '格陵兰',
    cities: [
      { name: 'Nuuk', nameZh: '努克', latitude: 64.1814, longitude: -51.6941 },
    ]
  },
];

// Helper functions
export function getCountryNames(language: 'en' | 'zh' = 'en'): string[] {
  if (language === 'zh') {
    return globalCitiesData.map(country => country.nameZh);
  }
  return globalCitiesData.map(country => country.name);
}

export function getCitiesByCountryName(countryName: string, language: 'en' | 'zh' = 'en'): CityOption[] {
  const country = globalCitiesData.find(c =>
    c.name === countryName || c.nameZh === countryName
  );
  return country?.cities || [];
}

export function findCityByName(countryName: string, cityName: string): CityOption | null {
  const country = globalCitiesData.find(c =>
    c.name === countryName || c.nameZh === countryName
  );
  if (!country) return null;

  return country.cities.find(city =>
    city.name === cityName || city.nameZh === cityName
  ) || null;
}

export function getCountryByName(countryName: string): CountryData | null {
  return globalCitiesData.find(c =>
    c.name === countryName || c.nameZh === countryName
  ) || null;
}
