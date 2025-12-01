import axios from 'axios';
import { NewsResponse } from '@/types/news';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';
const BASE_URL = 'https://newsapi.org/v2';

// Get top headlines
export const getTopHeadlines = async (
  country?: string,
  category?: string,
  pageSize: number = 20
): Promise<NewsResponse> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('News API key is not configured. Please set NEXT_PUBLIC_NEWS_API_KEY in your .env.local file');
  }

  try {
    const params: any = {
      apiKey: API_KEY,
      pageSize,
    };
    
    if (country) params.country = country;
    if (category) params.category = category;

    const response = await axios.get<NewsResponse>(`${BASE_URL}/top-headlines`, { params });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your NewsAPI.org API key.');
    }
    throw new Error('Failed to fetch news. Please try again later.');
  }
};

// Search news articles
export const searchNews = async (
  query: string,
  pageSize: number = 20,
  sortBy: 'relevancy' | 'popularity' | 'publishedAt' = 'publishedAt'
): Promise<NewsResponse> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('News API key is not configured. Please set NEXT_PUBLIC_NEWS_API_KEY in your .env.local file');
  }

  try {
    const response = await axios.get<NewsResponse>(`${BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        q: query,
        pageSize,
        sortBy,
        language: 'en',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your NewsAPI.org API key.');
    }
    throw new Error('Failed to search news. Please try again later.');
  }
};

// Get news by category
export const getNewsByCategory = async (
  category: string,
  country?: string,
  pageSize: number = 20
): Promise<NewsResponse> => {
  return getTopHeadlines(country, category, pageSize);
};

