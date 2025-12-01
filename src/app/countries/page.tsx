'use client';

import { useState, useEffect, useCallback } from 'react';
import { Country } from '@/types/countries';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '@/lib/services/countriesService';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import CountryCard from '@/components/CountryCard';
import SearchBar from '@/components/SearchBar';
import '../page.css';

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Update theme when changed
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load all countries on mount
  useEffect(() => {
    loadAllCountries();
  }, []);

  const loadAllCountries = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllCountries();
      setCountries(data);
      setSearchQuery('');
      setSelectedRegion('all');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadAllCountries();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await getCountryByName(query);
      setCountries(data);
      setSearchQuery(query);
      setSelectedRegion('all');
    } catch (err: any) {
      setError(err.message || 'Failed to search countries');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, [loadAllCountries]);

  const handleRegionFilter = useCallback(async (region: string) => {
    if (region === 'all') {
      loadAllCountries();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await getCountriesByRegion(region);
      setCountries(data);
      setSelectedRegion(region);
      setSearchQuery('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch countries by region');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, [loadAllCountries]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <main className="main-container" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <header className="header">
          <h1>🌍 Countries Explorer</h1>
          <div className="header-controls">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <Navigation />

        <SearchBar onSearch={handleSearch} placeholder="Search countries..." showSuggestions={false} />

        <div className="filter-container">
          <label htmlFor="region-filter" className="filter-label">
            Filter by Region:
          </label>
          <select
            id="region-filter"
            className="filter-select"
            value={selectedRegion}
            onChange={(e) => handleRegionFilter(e.target.value)}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>

        {loading && <LoadingSkeleton />}

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError('')} />
        )}

        {!loading && !error && (
          <>
            <div className="results-info">
              <p>
                {countries.length > 0
                  ? `Found ${countries.length} ${countries.length === 1 ? 'country' : 'countries'}`
                  : 'No countries found'}
              </p>
            </div>

            <div className="countries-grid">
              {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          </>
        )}

        <footer className="info-footer">
          <p>Data provided by REST Countries API</p>
          <p>Explore information about countries around the world</p>
        </footer>
      </div>
    </main>
  );
}

