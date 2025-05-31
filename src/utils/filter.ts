'use client';
import { useMemo } from 'react';

interface FilterableItem {
  name: string;
  [key: string]: any;
}

export const FilterData = (
  data: FilterableItem[],
  search: string,
): FilterableItem[] => {
  return useMemo<FilterableItem[]>(() => {
    return search !== ''
      ? data.filter(
          (C: FilterableItem) =>
            C.name.toLocaleLowerCase() === search.toLowerCase(),
        )
      : data;
  }, [data, search]);
};

export const FilterDataArikel = (
  data: FilterableItem[],
  search: string,
): FilterableItem[] => {
  return useMemo<FilterableItem[]>(() => {
    return search !== ''
      ? data.filter((C: FilterableItem) => {
          const content = C?.content || '';
          const title = C?.title || '';
          const keyword = search || '';
          return (
            title.toLocaleLowerCase().includes(keyword.toLowerCase()) ||
            content.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
          );
        })
      : data;
  }, [data, search]);
};
