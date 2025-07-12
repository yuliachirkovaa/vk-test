import API from "@/constants/api";
import { Filters } from "@/types/filters";
import axios from "axios";

async function getFilms(

  page: string,
  limit: string,
  notNullFields: string,
  type: string,
  filters?: Filters

) {
  
  try {

    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    params.append('notNullFields', notNullFields);
    params.append('type', type);

    if (filters) {

      filters.genres.forEach(genre => params.append('genres.name', genre));

      if (filters.ratingFrom !== undefined && filters.ratingTo !== undefined) {
        params.append('rating.imdb', `${filters.ratingFrom}-${filters.ratingTo}`);
      } else if (filters.ratingFrom !== undefined && filters.ratingTo === undefined) {
        params.append('rating.imdb', `${filters.ratingFrom}-10`);
      } else if (filters.ratingFrom === undefined && filters.ratingTo !== undefined) {
        params.append('rating.imdb', `0-${filters.ratingTo}`);
      }

      if (filters.yearFrom !== undefined && filters.yearTo !== undefined) {
        params.append('year', `${filters.yearFrom}-${filters.yearTo}`);
      } else if (filters.yearFrom !== undefined && filters.yearTo === undefined) {
        params.append('year', `${filters.yearFrom}-${new Date().getFullYear()}`);
      } else if (filters.yearFrom === undefined && filters.yearTo !== undefined) {
        params.append('year', `1990-${filters.yearTo}`);
      }

    }

    const url = `${API.FILMS}?${params.toString()}`;

    const { data, status } = await axios.get(url, {

      headers: {
        accept: 'application/json',
        'X-API-KEY': '6GS2239-4C3456F-NQ422KZ-YMN61WZ',
      },

    });

    console.log('!!!!!', data);

    if (status !== 200) throw data;
    return data;

  } catch (error) {

    console.error(`getFilms error:`, error);
    return { films: [] };

  }

}

async function getGenres() {
  
  try {

    const params = new URLSearchParams();
    params.append('field', 'genres.name');

    const url = `${API.GENRES}?${params.toString()}`;

    const { data, status } = await axios.get(url, {

      headers: {
        accept: 'application/json',
        'X-API-KEY': '6GS2239-4C3456F-NQ422KZ-YMN61WZ',
      },

    });

    if (status !== 200) throw data;
    return data;

  } catch (error) {

    console.error(`getGenres error:`, error);
    return { films: [] };

  }

}

export {

  getFilms,
  getGenres,

}