import { putData } from '@/utils/fetch';
import { useMutation } from '@tanstack/react-query';

export const useEditCategory = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body: { id: string; [key: string]: any }) => {
      return await putData(`/categories/${body.id}`, body);
    },
    onSuccess,
  });
};
