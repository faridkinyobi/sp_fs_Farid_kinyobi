import { useMutation } from '@tanstack/react-query';
import debounce from 'debounce-promise';
import { postData } from '@/utils/fetch';
import { IcategoryForm, IuseCategoryProps } from '../types/types';

const debouncedPost = debounce(postData, 300);
export const useAddCategory = ({ onSuccess }: IuseCategoryProps) => {
  return useMutation({
    mutationFn: async (data: IcategoryForm) => {
      return await debouncedPost({ url: 'categories', payload: data });
    },
    onSuccess,
    // onError: (error) => {
    //   console.log(error);
    // },
  });
};
