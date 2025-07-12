import { FC } from "react";
import Films from "@/components/films";
import { getFilms } from "@/scripts/backend";
import { NOT_NULL, PAGE_SIZE, TYPE } from "@/constants/films.params";
import parseRangeParam from "@/scripts/parse.range.param";

const HomePage: FC<{ searchParams: any }> = async ({ searchParams }) => {

  const [ratingFrom, ratingTo] = parseRangeParam(searchParams?.['rating.imdb'], 0, 10);
  const [yearFrom, yearTo] = parseRangeParam(searchParams?.year, 1990, new Date().getFullYear());

  const filters = {

    genres: searchParams?.['genres.name'] 
      ? Array.isArray(searchParams['genres.name']) 
        ? searchParams['genres.name'] 
        : [searchParams['genres.name']] 
      : [],

    ratingFrom: ratingFrom,
    ratingTo: ratingTo,
    yearFrom: yearFrom,
    yearTo: yearTo,

  };

  let films = [];

  try {

    const response = await getFilms('1', PAGE_SIZE, NOT_NULL, TYPE, filters);
    films = response.docs || [];

  } catch (error) {

    console.error('SSR error:', error);

  }

  return (
  
    <Films 
    
      films = { films } 
      page = { 1 } 
      ssrFilters = { filters } 
    
    />

  );

};

export default HomePage;