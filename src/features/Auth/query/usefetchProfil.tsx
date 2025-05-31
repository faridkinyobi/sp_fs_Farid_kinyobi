'use client';
import { getData } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';

export const useFetchProfil = () => {
  return useQuery({
    queryKey: ['fetchProfil'],
    queryFn: async () => {
      const res = await getData('auth/profile');
      if ('data' in res) {
        return res.data;
      }
      throw res;
    },
  });
};
