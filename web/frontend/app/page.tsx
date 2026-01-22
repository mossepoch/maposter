'use client';

import { useState } from 'react';
import { LanguageProvider } from '@/lib/language-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import GeneratorPage from '@/components/GeneratorPage';
import GalleryPage from '@/components/GalleryPage';
import DetailPage from '@/components/DetailPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'generate' | 'gallery' | 'detail'>('gallery');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    if (page === 'generate' || page === 'gallery') {
      setCurrentPage(page);
    }
  };

  const handleCityClick = (slug: string) => {
    setSelectedCity(slug);
    setCurrentPage('detail');
  };

  const handleBackToGallery = () => {
    setSelectedCity(null);
    setCurrentPage('gallery');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />

        <main className="flex-1">
          {currentPage === 'generate' && <GeneratorPage />}
          {currentPage === 'gallery' && <GalleryPage onCityClick={handleCityClick} />}
          {currentPage === 'detail' && selectedCity && (
            <DetailPage citySlug={selectedCity} onBack={handleBackToGallery} />
          )}
        </main>

        <Footer />
        <LanguageSwitcher />
      </div>
    </LanguageProvider>
  );
}
