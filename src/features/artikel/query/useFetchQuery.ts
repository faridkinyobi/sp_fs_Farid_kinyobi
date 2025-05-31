'use client';
import { getData } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';
import debounce from 'debounce-promise';

export const useFetchQuery = ({ params }: any) => {
  const debouncedGet = params !== '' ? debounce(getData, 400) : getData;

  return useQuery({
    queryKey: ['fetchData', params],
    queryFn: async () => {
      const res = await debouncedGet(`articles?${params}`);
      if ('data' in res) {
        return res.data;
      }
      throw res;
    },
  });
};
export const useFetchQueryId = (params: string) => {
  // console.log('params use', params);
  return useQuery({
    queryKey: ['fetchDataId', params],
    queryFn: async () => {
      const res = await getData(`articles/${params}`);
      if ('data' in res) {
        return res.data;
      }
      throw res;
    },
  });
};
