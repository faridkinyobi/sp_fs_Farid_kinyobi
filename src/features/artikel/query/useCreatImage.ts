import { useMutation } from '@tanstack/react-query';
import { postData } from '@/utils/fetch';
import { IuseImgProps, imageUrlRespon } from '../types/types';

export const useCreatImage = ({ onSuccess }: IuseImgProps) => {
  return useMutation({
    mutationFn: async (data: imageUrlRespon) => {
      return await postData({ url: 'upload', payload: data });
    },
    onSuccess,
  });
};
