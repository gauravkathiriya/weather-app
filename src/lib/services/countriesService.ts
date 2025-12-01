import axios from 'axios';
import { Country } from '@/types/countries';

const BASE_URL = 'https://restcountries.com/v3.1';

// Get all countries
export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(
      `${BASE_URL}/all?fields=name,cca2,cca3,capital,region,subregion,population,area,flags,currencies,languages,latlng,timezones,continents,maps,coatOfArms,car,startOfWeek,postalCode`
    );
    return response.data;
  } catch (error: any) {
    throw new Error('Failed to fetch countries data. Please try again later.');
  }
};

// Get country by name
export const getCountryByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(
      `${BASE_URL}/name/${encodeURIComponent(name)}?fields=name,cca2,cca3,capital,region,subregion,population,area,flags,currencies,languages,latlng,timezones,continents,maps,coatOfArms,car,startOfWeek,postalCode,borders,demonyms,gini,idd,independent,status,unMember`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Country not found. Please try a different country name.');
    }
    throw new Error('Failed to fetch country data. Please try again later.');
  }
};

// Get country by code
export const getCountryByCode = async (code: string): Promise<Country> => {
  try {
    const response = await axios.get<Country[]>(
      `${BASE_URL}/alpha/${encodeURIComponent(code)}?fields=name,cca2,cca3,capital,region,subregion,population,area,flags,currencies,languages,latlng,timezones,continents,maps,coatOfArms,car,startOfWeek,postalCode,borders,demonyms,gini,idd,independent,status,unMember`
    );
    if (response.data.length === 0) {
      throw new Error('Country not found.');
    }
    return response.data[0];
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Country not found. Please check the country code.');
    }
    throw new Error('Failed to fetch country data. Please try again later.');
  }
};

// Get countries by region
export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(
      `${BASE_URL}/region/${encodeURIComponent(region)}?fields=name,cca2,cca3,capital,region,subregion,population,area,flags,currencies,languages,latlng,timezones,continents,maps,coatOfArms,car,startOfWeek,postalCode`
    );
    return response.data;
  } catch (error: any) {
    throw new Error('Failed to fetch countries by region. Please try again later.');
  }
};

