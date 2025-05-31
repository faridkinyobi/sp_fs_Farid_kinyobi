'use client';
import { getData } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';
import debounce from 'debounce-promise';

export const useFetchCatagory = ({
  page,
  search,
}: {
  page?: number;
  search?: string;
}) => {
  const debouncedGet = search !== '' ? debounce(getData, 300) : getData;
  // console.log('search', search !== '' ? 'sss' : 'ggggg');
  return useQuery({
    queryKey: ['fetchDataCategory', page, search],
    queryFn: async () => {
      const res = await debouncedGet(`categories?page=${page}&limit=10`);
      if ('data' in res) {
        return res.data;
      }
      throw res;
    },
  });
};
