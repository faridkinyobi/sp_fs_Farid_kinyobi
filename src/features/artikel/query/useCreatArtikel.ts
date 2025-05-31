import { useMutation } from '@tanstack/react-query';

import { postData } from '@/utils/fetch';
import { IuseArtikelProps, IFormArtikelValues } from '../types/types';

export const useCreatArtikel = ({ onSuccess }: IuseArtikelProps) => {
  return useMutation({
    mutationFn: async (data: IFormArtikelValues) => {
      return await postData({ url: 'articles', payload: data });
    },
    onSuccess,
  });
};
