'use client'

import { formatDate } from "@/scripts/get.date";
import { FC, useEffect, useState } from "react";
import Modal, { ModalTitle } from "../modal";
import s from "./film.module.scss"
import { FilmItem } from "@/types/films";
import { addFilmToFavorites, removeFilmFromFavorites } from "@/scripts/add.film.to.favorites";

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

  const [ isAddModalOpened, setIsAddModalOpened ] = useState(false);
  const [ isRemoveModalOpened, setIsRemoveModalOpened ] = useState(false);
  const [ isFavorite, setIsFavorite ] = useState(false);

  const favoriteKey = 'favoriteFilms';
  let favorites: FilmItem[] = [];

  useEffect(() => {

     try {

      const stored = localStorage.getItem(favoriteKey);

      if (stored) {
        favorites = JSON.parse(stored);
      }

    } catch (e) {

      favorites = [];

    }

    if (favorites.some((f) => f.id === id)) {

      setIsFavorite(true);

    } 

  }, []);

  function addToFavorites() {

    setIsAddModalOpened(false);
    addFilmToFavorites(id, url || '', name, rating, year);
    setIsFavorite(true);

  }

  function removeFromFavorites() {

    setIsRemoveModalOpened(false);
    removeFilmFromFavorites(id);
    setIsFavorite(false);

  }

  return (
  
    <div className = {s.container}>

      <div className = {s.left}>
        <img src = { url || 'https://topnaroda.com/uploads/poster_none.png' } alt=" " />
      </div>

      <div className = {s.right}>

        <h1 className = {s.name}>{ name }</h1>
        {description && <div>{ description }</div>}
        <div>Рейтинг IMDB: { rating > 0 ? rating : 'нет голосов' }</div>
        <div>Мировая премьера: { date ? formatDate(date) : 'неизвестно' }</div>

        <div>
          Жанры: {genres.map(genre => genre.name).join(', ')}
        </div>

        {isFavorite 

          ? <button onClick = { () => setIsRemoveModalOpened(true) }>В избранном</button>
          : <button onClick = { () => setIsAddModalOpened(true) }>Добавить в избранное</button>
        
        }

        

      </div>

      {isAddModalOpened && 
      
        <Modal isOpen = { isAddModalOpened } onClose = { () => setIsAddModalOpened(false) }>

          <ModalTitle>Добавить фильм в список избранных?</ModalTitle>

          <div className = {s.modal}>

            <button onClick = { () => addToFavorites() }>Да</button>
            <button onClick = { () => setIsAddModalOpened(false) }>Отмена</button>

          </div>

        </Modal>

      }

      {isRemoveModalOpened && 
      
        <Modal isOpen = { isRemoveModalOpened } onClose = { () => setIsRemoveModalOpened(false) }>

          <ModalTitle>Удалить фильм из списка избранных?</ModalTitle>

          <div className = {s.modal}>

            <button onClick = { () => removeFromFavorites() }>Да</button>
            <button onClick = { () => setIsRemoveModalOpened(false) }>Отмена</button>

          </div>

        </Modal>

      }

    </div>

  );

};

export default Film;