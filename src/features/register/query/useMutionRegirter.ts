import { useMutation } from '@tanstack/react-query';
import debounce from 'debounce-promise';
import { postData } from '@/utils/fetch';
import { IregisterForm, IuseRegisterProps } from '../types/types';

const debouncedPost = debounce(postData, 300);
export const useMutationRegister = ({ onSuccess }: IuseRegisterProps) => {
  return useMutation({
    mutationFn: async (data: IregisterForm) => {
      return await debouncedPost({ url: 'auth/register', payload: data });
    },
    onSuccess,
  });
};
