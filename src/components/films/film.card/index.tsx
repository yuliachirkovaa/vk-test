import { FC } from "react";
import s from "./film.card.module.scss"

interface FilmCardProps {
  url?: string;
  name: string;
  year: number;
  rating: number;
  id: number;
}

const FilmCard: FC<FilmCardProps> = ({ url, name, year, rating, id }) => {

  return (

    <li>

      <a href = {`/film/${id}`} className = {s.card}>

        <div className = {s.left}>
          <img src = { url || 'https://topnaroda.com/uploads/poster_none.png' } alt=" " />
        </div>

        <div className = {s.right}>

          <h2 className = {s.name}>{ name }</h2>
          <div>Год выпуска: { year }</div>
          <div>Рейтинг IMDB: { rating > 0 ? rating : 'нет голосов' }</div>

        </div>

      </a>

    </li>

  );

};

export default FilmCard;