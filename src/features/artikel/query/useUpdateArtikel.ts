import { putData } from '@/utils/fetch';
import { useMutation } from '@tanstack/react-query';
import { IFormArtikelValues, IuseArtikelProps } from '../types/types';

export const useUpdateArtikel = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body: { id: string; [key: string]: any }) => {
      return await putData(`/articles/${body.id}`, body);
    },
    onSuccess,
  });
};
