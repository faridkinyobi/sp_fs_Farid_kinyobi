import { useMutation } from '@tanstack/react-query';
import { deletData } from '@/utils/fetch';
export const useDeletCatagory = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body: { id: string }) => {
      return await deletData(`/categories/${body.id}`);
    },
    onSuccess,
  });
};
