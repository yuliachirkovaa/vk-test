import { getGenres } from "@/scripts/backend";
import { Filters, Genres } from "@/types/filters";
import { useEffect, useMemo, useState } from "react";
import s from "./filters.module.scss"

interface FilmsFiltersProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

const FilmsFilters: React.FC<FilmsFiltersProps> = ({ filters, setFilters }) => {

  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const [ allGenres, setAllGenres ] = useState<Genres[]>([]);
  const [ localGenres, setLocalGenres ] = useState<string[]>(filters.genres || []);
  const [ ratingFrom, setratingFrom ] = useState<number>(filters.ratingFrom ?? 0);
  const [ ratingTo, setratingTo ] = useState<number>(filters.ratingTo ?? 10);
  const [ yearFrom, setyearFrom ] = useState<number>(filters.yearFrom ?? 1990);
  const [ yearTo, setyearTo ] = useState<number>(filters.yearTo ?? thisYear);

  useEffect(() => {

    (async () => {

      const data = await getGenres();
      setAllGenres(data);

    })();

  }, []);

  const applyFilters = () => {

    setFilters({
      genres: localGenres,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
    });

  };

  const handleGenreToggle = (genre: string) => {

    setLocalGenres((prev) => {
      const next = prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre];
      return next;
    });

  };

  const handleRangeChange = (name: string, value: number) => {

    if (name === "ratingFrom") setratingFrom(value);
    if (name === "ratingTo") setratingTo(value);
    if (name === "yearFrom") setyearFrom(value);
    if (name === "yearTo") setyearTo(value);

  };

  return (

    <form

      onSubmit={e => {
        e.preventDefault();
        applyFilters();
      }}
      className = {s.container}

    >

      <div className = {s.block}>

        <div className = {s.type}>Жанры:</div>

        <div className = {s.genres}>

          {allGenres.map(genre => (

          <label key = { genre.slug } style = {{ marginRight: 8 }} className = {s.check}>
            <input
              type = "checkbox"
              checked = { localGenres.includes(genre.name) }
              onChange = { () => handleGenreToggle(genre.name) }
            />
            {genre.name}
          </label>

        ))}

        </div>

      </div>

      <div className = {s.block}>

        <div className = {s.type}>Рейтинг (IMDB):</div>

        <input
          type = "number"
          min = { 0 }
          max = { 10 }
          value = { ratingFrom }
          onChange = {e => handleRangeChange("ratingFrom", Number(e.target.value))}
          className = {s.input}
        />

        &nbsp;-&nbsp;

        <input
          type="number"
          min = { 0 }
          max = { 10 }
          value = { ratingTo }
          onChange = { e => handleRangeChange("ratingTo", Number(e.target.value)) }
          className = {s.input}
        />

      </div>

      <div className = {s.block}>

        <div className = {s.type}>Год (с 1990):</div>

        <input
          type = "number"
          min = { 1990 }
          max = { yearTo }
          value = { yearFrom }
          onChange = { e => handleRangeChange("yearFrom", Number(e.target.value)) }
          className = {s.input}
        />

        &nbsp;-&nbsp;

        <input
          type = "number"
          min = { yearFrom }
          max = { thisYear }
          value = { yearTo }
          onChange = { e => handleRangeChange("yearTo", Number(e.target.value)) }
          className = {s.input}
        />

      </div>

      <button type = "submit">Применить фильтры</button>

    </form>

  );
  
};

export default FilmsFilters;