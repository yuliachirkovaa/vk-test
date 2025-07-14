'use client';

import { getFilms } from "@/scripts/backend";
import useParsedFilters from "@/scripts/use.parsed.filters";
import { Film } from "@/types/films";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import FilmsFilters from "../filters";
import { NOT_NULL, PAGE_SIZE, TYPE } from "@/constants/films.params";
import { Filters } from "@/types/filters";
import FilmCard from "./film.card";
import s from "./films.module.scss"

interface FilmsProps {
  films: Film[];
  page: number;
  ssrFilters?: Filters;
}

function filtersEqual(a: Filters, b: Filters) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const Films: FC<FilmsProps> = ({ films: initialFilms, page: initialPage, ssrFilters }) => {

  const [ filters, setFilters ] = useParsedFilters();
  const didInitial = useRef(false);

  const [ films, setFilms ] = useState<Film[]>(initialFilms);
  const [ page, setPage ] = useState(initialPage || 1);
  const [ loading, setLoading ] = useState(false);
  const [ hasMore, setHasMore ] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!didInitial.current && ssrFilters && filtersEqual(filters, ssrFilters)) {

      didInitial.current = true;
      setHasMore(initialFilms.length === Number(PAGE_SIZE));
      return;

    }

    let ignore = false;

    (async () => {

      setLoading(true);
      setPage(1);
      const data = await getFilms('1', PAGE_SIZE, NOT_NULL, TYPE, filters);
      if (ignore) return;
      setFilms(data.docs || []);
      setHasMore((data.docs?.length || 0) === Number(PAGE_SIZE));
      setLoading(false);

    })();
    
    return () => { ignore = true; };

  }, [filters]);

  const loadMore = useCallback(async () => {

    if (loading || !hasMore) return;

    setLoading(true);
    
    try {

      const nextPage = page + 1;
      const data = await getFilms(nextPage.toString(), PAGE_SIZE, NOT_NULL, TYPE, filters);
      setFilms((prev) => [...prev, ...(data.docs || [])]);
      setPage(nextPage);
      setHasMore((data.docs?.length || 0) === Number(PAGE_SIZE));

    } catch {

      setHasMore(false);

    }

    setLoading(false);

  }, [page, filters, loading, hasMore]);

  useEffect(() => {

    if (!hasMore || loading) return;

    const node = loaderRef.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    }, { rootMargin: '100px' });

    observer.observe(node);

    return () => { observer.disconnect(); };

  }, [hasMore, loading, loadMore]);

  return (

    <div className = {s.container}>

      <FilmsFilters 

        filters = { filters } 
        setFilters = { setFilters } 
      
      />

      <h1 className = {s.title}>Список фильмов:</h1>

      <ul className = {s.list}>

        {films.map((film, index) => (

          <FilmCard
          
            key = { index }
            url = { film.poster?.url }
            name = { film.name }
            year = { film.year }
            rating = { film.rating?.imdb }
            id = { film.id }

          />

        ))}

      </ul>

      {hasMore && (
        <div ref = {loaderRef} className = {s.status}>
          {loading && <span>Загрузка...</span>}
        </div>
      )}

      {!hasMore && <div className = {s.status}>Все фильмы загружены</div>}

    </div>

  );

};

export default Films;