'use client';

import { Country } from '@/types/countries';
import './CountryCard.css';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getCurrencies = () => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map((curr) => `${curr.name} (${curr.symbol})`)
      .join(', ');
  };

  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  return (
    <div className="country-card glass-card">
      <div className="country-flag-container">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `${country.name.common} flag`}
          className="country-flag"
        />
      </div>

      <div className="country-info">
        <h2 className="country-name">{country.name.common}</h2>
        <p className="country-official">{country.name.official}</p>

        <div className="country-details">
          <div className="detail-item">
            <span className="detail-label">📍 Capital:</span>
            <span className="detail-value">
              {country.capital ? country.capital.join(', ') : 'N/A'}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">🌍 Region:</span>
            <span className="detail-value">
              {country.region}
              {country.subregion && ` - ${country.subregion}`}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">👥 Population:</span>
            <span className="detail-value">{formatNumber(country.population)}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">📐 Area:</span>
            <span className="detail-value">
              {formatNumber(country.area)} km²
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">💱 Currency:</span>
            <span className="detail-value">{getCurrencies()}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">🗣️ Languages:</span>
            <span className="detail-value">{getLanguages()}</span>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="detail-item">
              <span className="detail-label">🔲 Borders:</span>
              <span className="detail-value">{country.borders.length} countries</span>
            </div>
          )}

          <div className="detail-item">
            <span className="detail-label">🕐 Timezones:</span>
            <span className="detail-value">{country.timezones.length}</span>
          </div>
        </div>

        <div className="country-actions">
          <a
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
          >
            🗺️ View on Map
          </a>
        </div>
      </div>
    </div>
  );
}

