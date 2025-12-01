"use client";

import { useState, useRef, useEffect } from "react";
import { searchCities } from "@/lib/services/weatherService";
import { WeatherSearchResponse } from "@/types/weather";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

export default function SearchBar({ onSearch, placeholder = "Search for a city...", showSuggestions: enableSuggestions = true }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<WeatherSearchResponse[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!enableSuggestions) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.trim().length >= 2) {
      debounceTimer.current = setTimeout(async () => {
        setIsSearching(true);
        try {
          const results = await searchCities(query);
          setSuggestions(results.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error searching cities:", error);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, enableSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: WeatherSearchResponse) => {
    onSearch(`${city.name}, ${city.country}`);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoComplete="off"
        />
        <button
          type="submit"
          className="search-button"
          disabled={!query.trim()}
        >
          🔍 Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((city) => (
            <div
              key={city.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              <span className="suggestion-name">{city.name}</span>
              <span className="suggestion-location">
                {city.region && `${city.region}, `}
                {city.country}
              </span>
            </div>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}
