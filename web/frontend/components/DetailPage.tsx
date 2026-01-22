'use client';

import { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useLang } from '@/lib/language-context';
import type { CityDetail, PosterItem } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

interface DetailPageProps {
  citySlug: string;
  onBack: () => void;
}

export default function DetailPage({ citySlug, onBack }: DetailPageProps) {
  const { t } = useLang();
  const [cityData, setCityData] = useState<CityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get translated theme name
  const getTranslatedThemeName = (themeName: string): string => {
    const key = `theme.${themeName}` as any;
    return t(key) || themeName;
  };

  useEffect(() => {
    fetchCityDetail();
  }, [citySlug]);

  const fetchCityDetail = async () => {
    try {
      const response = await fetch(`${API_BASE}/city/${citySlug}`);
      const data = await response.json();
      setCityData(data);
    } catch (error) {
      console.error('Failed to fetch city detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (poster: PosterItem) => {
    try {
      // Fetch the file as a blob to ensure proper download behavior
      const response = await fetch(`${API_BASE}${poster.poster_url}`);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${citySlug}_${poster.theme}.${poster.format}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link if fetch fails
      const link = document.createElement('a');
      link.href = `${API_BASE}${poster.poster_url}`;
      link.download = `${citySlug}_${poster.theme}.${poster.format}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadPng = async (poster: PosterItem) => {
    try {
      // Force download as PNG (for SVG posters, user might want PNG version)
      const url = poster.poster_url.replace('.svg', '.png');
      const response = await fetch(`${API_BASE}${url}`);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${citySlug}_${poster.theme}.png`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('PNG download failed:', error);
      // Fallback to direct link
      const link = document.createElement('a');
      const url = poster.poster_url.replace('.svg', '.png');
      link.href = `${API_BASE}${url}`;
      link.download = `${citySlug}_${poster.theme}.png`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async (poster: PosterItem) => {
    const url = `${window.location.origin}?city=${citySlug}&theme=${poster.theme}`;
    const translatedThemeName = getTranslatedThemeName(poster.theme_display_name);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cityData?.city} - ${translatedThemeName}`,
          url: url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
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

  if (!cityData) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="font-mono text-sm uppercase tracking-widest">
            City not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 font-mono text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
      >
        {t('backToGallery')}
      </button>

      {/* City Title */}
      <div className="text-center mb-16 border-b-2 border-ink pb-12">
        <h2 className="font-serif text-6xl font-black mb-4">
          {cityData.city}
        </h2>
        <p className="font-body text-lg opacity-70">
          {t('posterVariations')}
        </p>
      </div>

      {/* Poster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cityData.posters.map((poster) => (
          <div
            key={`${poster.theme}_${poster.created_at}`}
            className="border-4 border-ink bg-newsprint overflow-hidden"
          >
            {/* Poster Image with Zoom - Show thumbnail, zoom to original */}
            <div className="relative aspect-[3/4] overflow-hidden bg-white">
              <Zoom>
                <img
                  src={`${API_BASE}${poster.thumbnail_url || poster.poster_url}`}
                  alt={`${cityData.city} - ${getTranslatedThemeName(poster.theme_display_name)}`}
                  className="w-full h-full object-contain transition-all duration-300 cursor-zoom-in"
                  style={{ display: 'block' }}
                />
              </Zoom>
            </div>

            {/* Poster Info */}
            <div className="p-6 border-t-4 border-ink">
              <h3 className="font-serif text-xl font-bold mb-2">
                {getTranslatedThemeName(poster.theme_display_name)}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">
                {poster.format.toUpperCase()} • {(poster.file_size / 1024 / 1024).toFixed(1)} MB
                {poster.size_label && (
                  <>
                    <br />
                    {poster.size_label}
                  </>
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(poster)}
                  className="flex-1 px-4 py-3 bg-ink text-newsprint font-mono text-xs uppercase tracking-widest hover:bg-opacity-80 transition-all"
                >
                  {t('download')}
                </button>

                {poster.format === 'svg' && (
                  <button
                    onClick={() => handleDownloadPng(poster)}
                    className="flex-1 px-4 py-3 border-2 border-ink text-ink font-mono text-xs uppercase tracking-widest hover:bg-ink hover:text-newsprint transition-all"
                  >
                    {t('downloadPng')}
                  </button>
                )}

                <button
                  onClick={() => handleShare(poster)}
                  className="px-4 py-3 border-2 border-ink text-ink font-mono text-xs uppercase tracking-widest hover:bg-ink hover:text-newsprint transition-all"
                >
                  {t('share')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
