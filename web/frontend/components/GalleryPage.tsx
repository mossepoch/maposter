'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/lib/language-context';
import type { CityGalleryItem } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

interface GalleryPageProps {
  onCityClick: (slug: string) => void;
}

export default function GalleryPage({ onCityClick }: GalleryPageProps) {
  const { t } = useLang();
  const [cities, setCities] = useState<CityGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE}/gallery`);
      const data = await response.json();
      setCities(data.cities);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="font-mono text-sm uppercase tracking-widest">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16 border-b-2 border-ink pb-12">
        <h2 className="font-serif text-6xl font-black mb-4">
          {t('mapGallery')}
        </h2>
        <p className="font-body text-lg opacity-70">
          {t('explorePosters')}
        </p>
      </div>

      {/* City Grid */}
      {cities.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-mono text-sm uppercase tracking-widest opacity-60">
            {t('noPostersmsg')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {cities.map((city) => (
            <div
              key={city.slug}
              onClick={() => onCityClick(city.slug)}
              className="border-4 border-ink bg-newsprint cursor-pointer hard-shadow-hover overflow-hidden"
            >
              {/* City Preview Image - using thumbnail if available */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                <img
                  src={`${API_BASE}${city.preview_image}`}
                  alt={city.city}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>

              {/* City Info */}
              <div className="p-4 border-t-4 border-ink">
                <h3 className="font-serif text-lg font-bold mb-1">
                  {city.city}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest opacity-60">
                  {city.theme_count} {t('themes')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
