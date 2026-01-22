// Popular cities with their coordinates for map generation
export interface CityOption {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  nameZh?: string; // Optional Chinese name
}

export const popularCities: CityOption[] = [
  // United States
  { name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, nameZh: '纽约' },
  { name: 'Los Angeles', country: 'United States', latitude: 34.0522, longitude: -118.2437, nameZh: '洛杉矶' },
  { name: 'Chicago', country: 'United States', latitude: 41.8781, longitude: -87.6298, nameZh: '芝加哥' },
  { name: 'San Francisco', country: 'United States', latitude: 37.7749, longitude: -122.4194, nameZh: '旧金山' },
  { name: 'Seattle', country: 'United States', latitude: 47.6062, longitude: -122.3321, nameZh: '西雅图' },
  { name: 'Miami', country: 'United States', latitude: 25.7617, longitude: -80.1918, nameZh: '迈阿密' },
  { name: 'Boston', country: 'United States', latitude: 42.3601, longitude: -71.0589, nameZh: '波士顿' },

  // Europe
  { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, nameZh: '伦敦' },
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, nameZh: '巴黎' },
  { name: 'Berlin', country: 'Germany', latitude: 52.5200, longitude: 13.4050, nameZh: '柏林' },
  { name: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964, nameZh: '罗马' },
  { name: 'Madrid', country: 'Spain', latitude: 40.4168, longitude: -3.7038, nameZh: '马德里' },
  { name: 'Barcelona', country: 'Spain', latitude: 41.3851, longitude: 2.1734, nameZh: '巴塞罗那' },
  { name: 'Amsterdam', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041, nameZh: '阿姆斯特丹' },
  { name: 'Vienna', country: 'Austria', latitude: 48.2082, longitude: 16.3738, nameZh: '维也纳' },
  { name: 'Prague', country: 'Czech Republic', latitude: 50.0755, longitude: 14.4378, nameZh: '布拉格' },
  { name: 'Lisbon', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, nameZh: '里斯本' },

  // Asia
  { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, nameZh: '东京' },
  { name: 'Beijing', country: 'China', latitude: 39.9042, longitude: 116.4074, nameZh: '北京' },
  { name: 'Shanghai', country: 'China', latitude: 31.2304, longitude: 121.4737, nameZh: '上海' },
  { name: 'Hong Kong', country: 'China', latitude: 22.3193, longitude: 114.1694, nameZh: '香港' },
  { name: 'Seoul', country: 'South Korea', latitude: 37.5665, longitude: 126.9780, nameZh: '首尔' },
  { name: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, nameZh: '新加坡' },
  { name: 'Bangkok', country: 'Thailand', latitude: 13.7563, longitude: 100.5018, nameZh: '曼谷' },
  { name: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, nameZh: '迪拜' },
  { name: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777, nameZh: '孟买' },
  { name: 'Delhi', country: 'India', latitude: 28.7041, longitude: 77.1025, nameZh: '德里' },

  // Oceania
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, nameZh: '悉尼' },
  { name: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631, nameZh: '墨尔本' },
  { name: 'Auckland', country: 'New Zealand', latitude: -36.8485, longitude: 174.7633, nameZh: '奥克兰' },

  // South America
  { name: 'São Paulo', country: 'Brazil', latitude: -23.5505, longitude: -46.6333, nameZh: '圣保罗' },
  { name: 'Rio de Janeiro', country: 'Brazil', latitude: -22.9068, longitude: -43.1729, nameZh: '里约热内卢' },
  { name: 'Buenos Aires', country: 'Argentina', latitude: -34.6037, longitude: -58.3816, nameZh: '布宜诺斯艾利斯' },

  // Canada
  { name: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, nameZh: '多伦多' },
  { name: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207, nameZh: '温哥华' },
  { name: 'Montreal', country: 'Canada', latitude: 45.5017, longitude: -73.5673, nameZh: '蒙特利尔' },

  // Africa
  { name: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, nameZh: '开罗' },
  { name: 'Cape Town', country: 'South Africa', latitude: -33.9249, longitude: 18.4241, nameZh: '开普敦' },
];

// Group cities by country
export function getCitiesByCountry(): Record<string, CityOption[]> {
  const grouped: Record<string, CityOption[]> = {};

  popularCities.forEach(city => {
    if (!grouped[city.country]) {
      grouped[city.country] = [];
    }
    grouped[city.country].push(city);
  });

  return grouped;
}

// Get all unique countries
export function getCountries(): string[] {
  const countries = new Set(popularCities.map(city => city.country));
  return Array.from(countries).sort();
}
