'use client'

import FilmCard from "@/components/films/film.card";
import { FilmItem } from "@/types/films";
import { FC, useEffect, useState } from "react";
import s from "./favorites.module.scss"

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

    <div className = {s.container}>

      <h1 className = {s.title}>Список избранных фильмов:</h1>

      {films.length > 0 

      ? <ul className = {s.list}>

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

        </ul>
      
      : <div className = {s.plug}>Вы пока не добавили ничего в избранное</div>
      
      }
      
    </div>

  );

};

export default Favorites;