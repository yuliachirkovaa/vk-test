import Film from "@/components/film";
import { getFilmById } from "@/scripts/backend";

export default async function FilmPage({ params }: any) {

  let film;

  try {

    const id = params.id;
    film = await getFilmById(Number(id));
    console.log('FILM INFO', film);

  } catch (error) {

    console.error('SSR error:', error);

  }

  return (

    <Film
    
      id = { film.id }
      url = { film.poster?.url }
      name = { film.name }
      description = { film.description }
      rating = { film.rating?.imdb }
      date = { film.premiere?.world }
      genres = { film.genres }
      year = { film.year }

    />

  );

};
