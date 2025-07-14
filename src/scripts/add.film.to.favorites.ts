import { FilmItem } from "@/types/films";

const favoriteKey = 'favoriteFilms';

function addFilmToFavorites(id: number, url: string, name: string, rating: number, year: number) {

  let favorites: FilmItem[] = [];

  try {

    const stored = localStorage.getItem(favoriteKey);

    if (stored) {
      favorites = JSON.parse(stored);
    }

  } catch (e) {

    favorites = [];

  }

  favorites.push({
    id,
    url,
    name,
    rating,
    year,
  });

  localStorage.setItem(favoriteKey, JSON.stringify(favorites));

}

function removeFilmFromFavorites(id: number) {

  let favorites: FilmItem[] = [];

  try {

    const stored = localStorage.getItem(favoriteKey);

    if (stored) {
      favorites = JSON.parse(stored);
    }

  } catch (e) {

    favorites = [];

  }

  let newFavorites = favorites.filter(item => item.id != id);

  localStorage.setItem(favoriteKey, JSON.stringify(newFavorites));

}

export {
  
  addFilmToFavorites,
  removeFilmFromFavorites

}