import { FC } from "react";

interface FilmCardProps {
  url?: string;
  name: string;
  year: number;
  rating: number;
  id: number;
}

const FilmCard: FC<FilmCardProps> = ({ url, name, year, rating, id }) => {

  return (

    <a href = {`/film/${id}`}>

      <div>
        <img src = { url } alt=" " />
      </div>

      <div>{ name }</div>
      <div>Год выпуска: { year }</div>
      <div>Рейтинг IMDB: { rating > 0 ? rating : 'нет голосов' }</div>

    </a>

  );

};

export default FilmCard;