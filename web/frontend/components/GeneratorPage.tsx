'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/lib/language-context';
import {
  globalCitiesData,
  getCountryNames,
  getCitiesByCountryName,
  findCityByName,
  type CityOption
} from '@/lib/global-cities-data';
import type { Theme, TaskStatusResponse } from '@/types';
import CustomSelect from './CustomSelect';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

export default function GeneratorPage() {
  const { t, lang } = useLang();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [posterSizes, setPosterSizes] = useState<Array<{value: string, label: string, width: number, height: number}>>([]);
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    latitude: '',
    longitude: '',
    theme: 'autumn',
    distance: 12000,
    network_type: 'drive',
    format: 'png',
    thumbnail: true,
    hide_attribution: true,
    poster_size: 'A3'
  });
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<TaskStatusResponse | null>(null);
  const [useCoords, setUseCoords] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [selectedCountryEnglishName, setSelectedCountryEnglishName] = useState<string>('');
  const [availableCities, setAvailableCities] = useState<CityOption[]>([]);

  // Load themes
  useEffect(() => {
    fetch(`${API_BASE}/themes`)
      .then(res => res.json())
      .then(data => {
        setThemes(data.themes);
        // Auto-select first theme if available
        if (data.themes && data.themes.length > 0) {
          setFormData(prev => ({ ...prev, theme: data.themes[0].name }));
        }
      })
      .catch(err => console.error('Failed to load themes:', err));
  }, []);

  // Load poster sizes
  useEffect(() => {
    fetch(`${API_BASE}/poster-sizes`)
      .then(res => res.json())
      .then(data => {
        setPosterSizes(data.sizes);
        if (data.default) {
          setFormData(prev => ({ ...prev, poster_size: data.default }));
        }
      })
      .catch(err => console.error('Failed to load poster sizes:', err));
  }, []);

  // Handle country selection
  const handleCountryChange = (displayName: string) => {
    // Find the country data
    const country = globalCitiesData.find(c =>
      c.name === displayName || c.nameZh === displayName
    );

    if (country) {
      setSelectedCountryEnglishName(country.name);
      setAvailableCities(country.cities);
      setSelectedCity(null);
      setFormData({ ...formData, country: country.name, city: '' });
    }
  };

  // Handle city selection
  const handleCityChange = (cityDisplayName: string) => {
    const city = availableCities.find(c =>
      c.name === cityDisplayName || c.nameZh === cityDisplayName
    );

    if (city) {
      setSelectedCity(city);
      setFormData({
        ...formData,
        city: city.name,
        latitude: city.latitude.toString(),
        longitude: city.longitude.toString()
      });
    }
  };

  // Poll task status
  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/task/${taskId}`);
        const data: TaskStatusResponse = await res.json();
        setTaskStatus(data);

        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Failed to fetch task status:', err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // When using city dropdown, always send coordinates
    const latitude = useCoords
      ? parseFloat(formData.latitude)
      : (selectedCity ? selectedCity.latitude : undefined);
    const longitude = useCoords
      ? parseFloat(formData.longitude)
      : (selectedCity ? selectedCity.longitude : undefined);

    const payload = {
      city: formData.city,
      country: formData.country,
      latitude,
      longitude,
      theme: formData.theme,
      distance: parseInt(formData.distance.toString()),
      network_type: formData.network_type,
      format: formData.format,
      thumbnail: formData.thumbnail,
      hide_attribution: formData.hide_attribution,
      poster_size: formData.poster_size
    };

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setTaskId(data.task_id);
      setTaskStatus({ task_id: data.task_id, status: 'pending', progress: 0 });
    } catch (err) {
      alert('Failed to create task: ' + (err as Error).message);
    }
  };

  const handleDownload = () => {
    if (!taskStatus?.result) return;
    const link = document.createElement('a');
    link.href = `${API_BASE}${taskStatus.result.poster_url}`;
    link.download = `${taskStatus.result.city}_${taskStatus.result.theme}.${formData.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePublishToGallery = () => {
    setShowPasswordDialog(true);
  };

  const handlePublishConfirm = async () => {
    if (!taskStatus?.result) return;

    setPublishing(true);
    try {
      // Extract poster path from URL (remove /temp_posters/ prefix)
      const posterPath = taskStatus.result.poster_url.replace('/temp_posters/', '');

      const response = await fetch(`${API_BASE}/publish-to-gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: password,
          poster_path: posterPath
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(t('publishSuccess'));
        setShowPasswordDialog(false);
        setPassword('');
      } else {
        // Show detailed error message from backend
        const errorMsg = data.detail || data.message || t('publishFailed');
        alert(`${t('publishFailed')}: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Failed to publish:', error);
      alert(`${t('publishFailed')}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration */}
        <div className="lg:col-span-5 border-4 border-ink p-8">
          <h2 className="font-serif text-3xl font-bold mb-8">{t('configuration')}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest block mb-4">
                {t('location')}
              </label>

              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUseCoords(false)}
                  className={`flex-1 border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    !useCoords ? 'bg-ink text-newsprint' : 'bg-newsprint text-ink hover:bg-muted'
                  }`}
                >
                  {t('city')}
                </button>
                <button
                  type="button"
                  onClick={() => setUseCoords(true)}
                  className={`flex-1 border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    useCoords ? 'bg-ink text-newsprint' : 'bg-newsprint text-ink hover:bg-muted'
                  }`}
                >
                  {t('coordinates')}
                </button>
              </div>

              {!useCoords ? (
                <div className="space-y-4">
                  {/* Country Select */}
                  <CustomSelect
                    value={lang === 'zh' && selectedCountryEnglishName
                      ? globalCitiesData.find(c => c.name === selectedCountryEnglishName)?.nameZh || ''
                      : selectedCountryEnglishName}
                    onChange={handleCountryChange}
                    options={globalCitiesData.map(country => ({
                      value: lang === 'zh' ? country.nameZh : country.name,
                      label: lang === 'zh' ? country.nameZh : country.name
                    }))}
                    placeholder={t('countryPlaceholder')}
                  />

                  {/* City Select */}
                  <CustomSelect
                    value={lang === 'zh' && selectedCity?.nameZh
                      ? selectedCity.nameZh
                      : selectedCity?.name || ''}
                    onChange={handleCityChange}
                    options={availableCities.map(city => ({
                      value: lang === 'zh' && city.nameZh ? city.nameZh : city.name,
                      label: lang === 'zh' && city.nameZh ? city.nameZh : city.name
                    }))}
                    placeholder={t('cityPlaceholder')}
                    disabled={!selectedCountryEnglishName}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="number"
                    step="0.0001"
                    placeholder={t('latitudePlaceholder')}
                    value={formData.latitude}
                    onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                    required
                    className="w-full border-b-2 border-ink bg-transparent px-3 py-2 font-mono text-sm focus:bg-muted focus:outline-none"
                  />
                  <input
                    type="number"
                    step="0.0001"
                    placeholder={t('longitudePlaceholder')}
                    value={formData.longitude}
                    onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                    required
                    className="w-full border-b-2 border-ink bg-transparent px-3 py-2 font-mono text-sm focus:bg-muted focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Theme */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest block mb-4">
                {t('theme')}
              </label>
              <CustomSelect
                value={formData.theme}
                onChange={(value) => setFormData({ ...formData, theme: value })}
                options={themes.map(theme => ({
                  value: theme.name,
                  label: theme.display_name
                }))}
              />
            </div>

            {/* Poster Size */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest block mb-4">
                {t('posterSize')}
              </label>
              <CustomSelect
                value={formData.poster_size}
                onChange={(value) => setFormData({ ...formData, poster_size: value })}
                options={posterSizes.map(size => ({
                  value: size.value,
                  label: size.label
                }))}
              />
            </div>

            {/* Distance */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest block mb-4">
                {t('distance')}: {formData.distance}m
              </label>
              <input
                type="range"
                min="4000"
                max="20000"
                step="1000"
                value={formData.distance}
                onChange={e => setFormData({ ...formData, distance: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="mt-3 p-3 bg-muted border border-ink">
                <div className="font-mono text-xs text-ink opacity-75">
                  <div className="mb-1"><strong>4000-6000m:</strong> {t('distanceGuide1')}</div>
                  <div className="mb-1"><strong>8000-12000m:</strong> {t('distanceGuide2')}</div>
                  <div className="mb-1"><strong>15000-20000m:</strong> {t('distanceGuide3')}</div>
                </div>
              </div>
            </div>

            {/* Network Type */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest block mb-4">
                {t('networkType')}
              </label>
              <CustomSelect
                value={formData.network_type}
                onChange={(value) => setFormData({ ...formData, network_type: value })}
                options={[
                  { value: 'drive', label: 'Drive' },
                  { value: 'walk', label: 'Walk' },
                  { value: 'bike', label: 'Bike' },
                  { value: 'all', label: 'All' }
                ]}
              />
            </div>

            {/* Output Format */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest block mb-4">
                {t('outputFormat')}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="png"
                    checked={formData.format === 'png'}
                    onChange={e => setFormData({ ...formData, format: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="font-mono text-sm">PNG</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="svg"
                    checked={formData.format === 'svg'}
                    onChange={e => setFormData({ ...formData, format: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="font-mono text-sm">SVG</span>
                </label>
              </div>

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.thumbnail}
                    onChange={e => setFormData({ ...formData, thumbnail: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="font-mono text-sm">{t('generateThumbnail')}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hide_attribution}
                    onChange={e => setFormData({ ...formData, hide_attribution: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="font-mono text-sm">{t('hideAttribution')}</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={taskStatus?.status === 'processing'}
              className="w-full bg-ink text-newsprint border border-transparent hover:bg-newsprint hover:text-ink hover:border-ink py-4 font-mono text-sm uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {taskStatus?.status === 'processing' ? t('generating') : t('generateMap')}
            </button>
          </form>
        </div>

        {/* Right: Status / Result */}
        <div className="lg:col-span-7 border-4 border-ink p-8">
          <h2 className="font-serif text-3xl font-bold mb-8">{t('status')}</h2>

          {!taskStatus && (
            <div className="text-center py-16">
              <p className="font-mono text-sm text-ink opacity-60">{t('fillForm')}</p>
            </div>
          )}

          {taskStatus && taskStatus.status === 'processing' && (
            <div className="space-y-4">
              <div className="font-mono text-sm">{t('progress')}: {taskStatus.progress}%</div>
              <div className="w-full h-4 border-2 border-ink">
                <div
                  className="h-full bg-ink transition-all duration-300"
                  style={{ width: `${taskStatus.progress}%` }}
                ></div>
              </div>
              <p className="font-mono text-xs text-ink opacity-60">
                {t('generatingMsg')}
              </p>
            </div>
          )}

          {taskStatus && taskStatus.status === 'failed' && (
            <div className="p-6 border-2 border-red-600 bg-red-50">
              <p className="font-mono text-sm text-red-700 font-bold mb-2">
                {lang === 'zh' ? '生成失败' : 'Generation Failed'}
              </p>
              <p className="font-mono text-xs text-red-600">
                {taskStatus.error || (lang === 'zh' ? '发生未知错误' : 'Unknown error occurred')}
              </p>
            </div>
          )}

          {taskStatus && taskStatus.status === 'completed' && taskStatus.result && (
            <div className="space-y-6">
              <div className="border-4 border-ink p-4 bg-white">
                <img
                  src={`${API_BASE}${taskStatus.result.poster_url}`}
                  alt="Generated Poster"
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <p className="font-mono text-sm">
                  <strong>{t('cityLabel')}:</strong> {taskStatus.result.city}, {taskStatus.result.country}
                </p>
                <p className="font-mono text-sm">
                  <strong>{t('themeLabel')}:</strong> {taskStatus.result.theme}
                </p>
                <p className="font-mono text-sm">
                  <strong>{t('coordsLabel')}:</strong> {taskStatus.result.coords[0].toFixed(4)}°, {taskStatus.result.coords[1].toFixed(4)}°
                </p>

                <div className="space-y-3">
                  <div className="flex gap-4">
                    <button
                      onClick={handleDownload}
                      className="flex-1 text-center bg-ink text-newsprint border border-transparent hover:bg-newsprint hover:text-ink hover:border-ink py-3 font-mono text-xs uppercase tracking-widest transition-all duration-200"
                    >
                      {t('download')}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + API_BASE + taskStatus.result!.poster_url);
                        alert('Link copied to clipboard!');
                      }}
                      className="flex-1 border-2 border-ink bg-transparent hover:bg-ink hover:text-newsprint py-3 font-mono text-xs uppercase tracking-widest transition-all duration-200"
                    >
                      {t('share')}
                    </button>
                  </div>
                  <button
                    onClick={handlePublishToGallery}
                    className="w-full text-center bg-accent text-newsprint border border-transparent hover:bg-newsprint hover:text-accent hover:border-accent py-3 font-mono text-xs uppercase tracking-widest transition-all duration-200"
                  >
                    {t('publishToGallery')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {taskStatus && taskStatus.status === 'failed' && (
            <div className="border-4 border-accent p-6">
              <h3 className="font-serif text-2xl font-bold text-accent mb-4">{t('error')}</h3>
              <p className="font-mono text-sm text-ink">{taskStatus.error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Password Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-newsprint border-4 border-ink p-8 max-w-md w-full mx-4">
            <h3 className="font-serif text-2xl font-bold mb-4">{t('enterAdminPassword')}</h3>
            <div className="mb-6">
              <label className="font-mono text-xs uppercase tracking-widest block mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePublishConfirm()}
                className="w-full border-2 border-ink px-4 py-2 font-mono"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowPasswordDialog(false);
                  setPassword('');
                }}
                disabled={publishing}
                className="flex-1 border-2 border-ink px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-ink hover:text-newsprint transition-all disabled:opacity-50"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handlePublishConfirm}
                disabled={publishing || !password}
                className="flex-1 bg-ink text-newsprint px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-opacity-80 transition-all disabled:opacity-50"
              >
                {publishing ? t('publishing') : t('publish')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
