export type Rating = {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export type Vote = {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export type Genre = {
  name: string;
}

export type Country = {
  name: string;
}

export type ReleaseYear = {
  start: number;
  end: number;
}

export type Poster = {
  url: string;
  previewUrl: string;
}

export type Film = {
  id: number;
  name: string;
  alternativeName: string;
  type: string;
  typeNumber: number;
  year: number;
  description: string | null;
  shortDescription: string | null;
  status: string | null;
  rating: Rating;
  votes: Vote;
  movieLength: number | null;
  totalSeriesLength: number | null;
  seriesLength: number | null;
  ratingMpaa: string | null;
  ageRating: string | null;
  genres: Genre[];
  countries: Country[];
  releaseYears: ReleaseYear[];
  top10: null | string;
  top250: null | string;
  isSeries: boolean;
  ticketsOnSale: boolean;
  poster?: Poster;
}

export type FilmItem = {
  url?: string;
  name: string;
  year: number;
  rating: number;
  id: number;
}