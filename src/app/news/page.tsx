'use client';

import { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '@/types/news';
import { getTopHeadlines, searchNews, getNewsByCategory } from '@/lib/services/newsService';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import NewsCard from '@/components/NewsCard';
import SearchBar from '@/components/SearchBar';
import '../page.css';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [selectedCountry, setSelectedCountry] = useState<string>('us');

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

  // Load top headlines on mount
  useEffect(() => {
    loadHeadlines();
  }, []);

  const loadHeadlines = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTopHeadlines(selectedCountry, selectedCategory);
      setArticles(data.articles);
      setSearchQuery('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry, selectedCategory]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadHeadlines();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await searchNews(query);
      setArticles(data.articles);
      setSearchQuery(query);
    } catch (err: any) {
      setError(err.message || 'Failed to search news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [loadHeadlines]);

  const handleCategoryChange = useCallback(async (category: string) => {
    setSelectedCategory(category);
    try {
      setLoading(true);
      setError('');
      const data = await getNewsByCategory(category, selectedCountry);
      setArticles(data.articles);
      setSearchQuery('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news by category');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry]);

  const handleCountryChange = useCallback(async (country: string) => {
    setSelectedCountry(country);
    try {
      setLoading(true);
      setError('');
      const data = await getTopHeadlines(country, selectedCategory);
      setArticles(data.articles);
      setSearchQuery('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'in', name: 'India' },
    { code: 'jp', name: 'Japan' },
  ];

  return (
    <main className="main-container" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <header className="header">
          <h1>📰 News Reader</h1>
          <div className="header-controls">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <Navigation />

        <SearchBar onSearch={handleSearch} placeholder="Search news articles..." showSuggestions={false} />

        <div className="filters-container">
          <div className="filter-container">
            <label htmlFor="category-filter" className="filter-label">
              Category:
            </label>
            <select
              id="category-filter"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-container">
            <label htmlFor="country-filter" className="filter-label">
              Country:
            </label>
            <select
              id="country-filter"
              className="filter-select"
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <LoadingSkeleton />}

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError('')} />
        )}

        {!loading && !error && (
          <>
            <div className="results-info">
              <p>
                {articles.length > 0
                  ? `Found ${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`
                  : 'No articles found'}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <div className="news-grid">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          </>
        )}

        <footer className="info-footer">
          <p>Data provided by NewsAPI.org</p>
          <p>Stay updated with the latest news from around the world</p>
        </footer>
      </div>
    </main>
  );
}

