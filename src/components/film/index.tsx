'use client'

import { formatDate } from "@/scripts/get.date";
import { FC, useState } from "react";
import Modal, { ModalTitle } from "../modal";
import { FilmItem } from "@/types/films";

interface FilmProps {
  id: number;
  url?: string;
  name: string;
  description: string;
  rating: number;
  date?: string;
  genres: {name: string}[];
  year: number;
}

const Film: FC<FilmProps> = ({ id, url, name, description, rating, date, genres, year }) => {

  const [ isModalOpened, setIsModalOpened ] = useState(false);

  function addToFavorites() {

    setIsModalOpened(false);

    const favoriteKey = 'favoriteFilms';

    let favorites: FilmItem[] = [];

    try {

      const stored = localStorage.getItem(favoriteKey);

      if (stored) {
        favorites = JSON.parse(stored);
      }

    } catch (e) {

      favorites = [];

    }

    if (!favorites.some((f) => f.id === id)) {

      favorites.push({
        id,
        url,
        name,
        rating,
        year,
      });

      localStorage.setItem(favoriteKey, JSON.stringify(favorites));
      console.log(`Фильм '${name}' добавлен в избранное`);

    } else {

      console.log(`Фильм '${name}' уже есть в избранном!`);

    }

  }

  return (
  
    <div>

      <div>
        <img src = { url } alt=" " />
      </div>

      <div>{ name }</div>
      <div>{ description }</div>
      <div>Рейтинг IMDB: { rating > 0 ? rating : 'нет голосов' }</div>
      <div>Мировая премьера: { date ? formatDate(date) : 'неизвестно' }</div>

      <div>
        Жанры:
        {genres.map((genre, index) => (
          <div key = { index }>{ genre.name }</div>
        ))}
      </div>

      <button onClick = { () => setIsModalOpened(true) }>Добавить в избранное</button>

      {isModalOpened && 
      
        <Modal isOpen = { isModalOpened } onClose = { () => setIsModalOpened(false) }>

          <ModalTitle>Добавить фильм в список избранных?</ModalTitle>

          <div>

            <button onClick = { () => addToFavorites() }>Да</button>
            <button onClick = { () => setIsModalOpened(false) }>Отмена</button>

          </div>

        </Modal>

      }

    </div>

  );

};

export default Film;