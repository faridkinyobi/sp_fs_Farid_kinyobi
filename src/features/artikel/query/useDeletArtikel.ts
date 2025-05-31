import { useMutation } from '@tanstack/react-query';
import { deletData } from '@/utils/fetch';

export const useDeletArtikel = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deletData(`/articles/${id}`);
    },
    onSuccess,
    onError: (error) => {
      // Handle error if needed
      console.error('Error deleting artikel', error);
    },
  });
};
