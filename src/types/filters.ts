export type Filters = {
  genres: string[]; 
  ratingFrom: number;
  ratingTo: number;
  yearFrom: number;
  yearTo: number;
};

export type Genres = {
  name: string; 
  slug: string;
};