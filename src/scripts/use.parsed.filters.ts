import { useCallback, useMemo } from 'react'
import { Filters } from '@/types/filters'
import { useRouter, useSearchParams } from 'next/navigation'
import parseRangeParam from './parse.range.param';

function useParsedFilters(): [Filters, (filters: Filters) => void] {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [ratingFrom, ratingTo] = parseRangeParam(searchParams.get('rating.imdb') || '', 0, 10);
  const [yearFrom, yearTo] = parseRangeParam(searchParams.get('year') || '', 1990, new Date().getFullYear());

  const filters: Filters = useMemo(() => ({

    genres: searchParams.getAll('genres.name'),

    ratingFrom: ratingFrom,
    ratingTo: ratingTo,
    yearFrom: yearFrom,
    yearTo: yearTo,

  }), [searchParams])

  const setFilters = useCallback((filters: Filters) => {

    const params = new URLSearchParams();

    filters.genres.forEach(genre => params.append('genres.name', genre));

    if (filters.ratingFrom !== undefined && filters.ratingTo !== undefined) {
      params.set('rating.imdb', `${filters.ratingFrom}-${filters.ratingTo}`);
    } else if (filters.ratingFrom !== undefined && filters.ratingTo === undefined) {
      params.set('rating.imdb', `${filters.ratingFrom}-10`);
    } else if (filters.ratingFrom === undefined && filters.ratingTo !== undefined) {
      params.set('rating.imdb', `0-${filters.ratingTo}`);
    }

    if (filters.yearFrom !== undefined && filters.yearTo !== undefined) {
      params.set('year', `${filters.yearFrom}-${filters.yearTo}`);
    } else if (filters.yearFrom !== undefined && filters.yearTo === undefined) {
      params.set('year', `${filters.yearFrom}-${new Date().getFullYear()}`);
    } else if (filters.yearFrom === undefined && filters.yearTo !== undefined) {
      params.set('year', `1990-${filters.yearTo}`);
    }

    router.push(`?${params.toString()}`);

  }, [router]);

  return [filters, setFilters];

}

export default useParsedFilters;