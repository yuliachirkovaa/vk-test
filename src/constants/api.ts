const BACKEND = `https://api.kinopoisk.dev`;

const API = {

  FILMS: `${ BACKEND }/v1.4/movie`,
  GENRES: `${ BACKEND }/v1/movie/possible-values-by-field`,
  FILM: (id: number) => `${ BACKEND }/v1.4/movie/${id}`,

}

export default API;