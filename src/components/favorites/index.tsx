'use client'

import FilmCard from "@/components/films/film.card";
import { FilmItem } from "@/types/films";
import { FC, useEffect, useState } from "react";

const favoriteKey = "favoriteFilms";

const Favorites: FC = () => {

  const [ films, setFilms ] = useState<FilmItem[]>([]);

  useEffect(() => {

    let stored: string | null;

    try {

      stored = localStorage.getItem(favoriteKey);

      if (stored) {

        setFilms(JSON.parse(stored));

      }

    } catch (e) {

      setFilms([]);

    }

  }, []);

  return (

    <div>

      <div>Список избранных фильмов:</div>

      {films.map((film, index) => (

        <FilmCard
        
          key = { index }
          url = { film.url }
          name = { film.name }
          year = { film.year }
          rating = { film.rating }
          id = { film.id }

        />

      ))}

    </div>

  );

};

export default Favorites;