import { useMutation } from '@tanstack/react-query';
import { postData } from '@/utils/fetch';
import { IuseLoginProps, IAuthForm } from '../types/types';

export const useMutationAuth = ({ onSuccess, onError }: IuseLoginProps) => {
  return useMutation({
    mutationFn: async (data: IAuthForm) => {
      return await postData({
        url: 'auth/login',
        payload: data,
      });
    },
    onSuccess,
    onError,
  });
};
