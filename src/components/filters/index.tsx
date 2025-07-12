import { getGenres } from "@/scripts/backend";
import { Filters, Genres } from "@/types/filters";
import { useMemo, useState } from "react";

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

  (async () => {

    const data = await getGenres();
    setAllGenres(data);

  })();

  const applyFilters = () => {

    setFilters({
      genres: localGenres,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
    });

  };

  // Множественный выбор жанров
  const handleGenreToggle = (genre: string) => {

    setLocalGenres((prev) => {
      const next = prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre];
      return next;
    });

  };

  // Если год или рейтинг поменялись вручную — обновить локальное состояние
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

    >

      <div>

        <div>Жанры:</div>

        {allGenres.map(genre => (

          <label key = { genre.slug } style = {{ marginRight: 8 }}>
            <input
              type = "checkbox"
              checked = { localGenres.includes(genre.name) }
              onChange = { () => handleGenreToggle(genre.name) }
            />
            {genre.name}
          </label>

        ))}

      </div>

      <div>

        <div>Рейтинг (IMDB):</div>

        <input
          type = "number"
          min = { 0 }
          max = { 10 }
          value = { ratingFrom }
          onChange = {e => handleRangeChange("ratingFrom", Number(e.target.value))}
        />

        &nbsp;-&nbsp;

        <input
          type="number"
          min = { 0 }
          max = { 10 }
          value = { ratingTo }
          onChange = { e => handleRangeChange("ratingTo", Number(e.target.value)) }
        />

      </div>

      <div>

        <div>Год (с 1990):</div>

        <input
          type = "number"
          min = { 1990 }
          max = { yearTo }
          value = { yearFrom }
          onChange = { e => handleRangeChange("yearFrom", Number(e.target.value)) }
        />

        &nbsp;-&nbsp;

        <input
          type = "number"
          min = { yearFrom }
          max = { thisYear }
          value = { yearTo }
          onChange = { e => handleRangeChange("yearTo", Number(e.target.value)) }
        />

      </div>

      <button type = "submit">Применить фильтры</button>

    </form>

  );
  
};

export default FilmsFilters;