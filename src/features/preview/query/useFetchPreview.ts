import { getData } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';

export const useFetchPreview = (params: string) => {
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
