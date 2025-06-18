import { useMutation } from '@tanstack/react-query';
import loginAction from '@/lib/actions/auth/services/login';

export type IuseLoginProps = {
  onSuccess: (data: any) => void;
};
export const useMutationAuth = ({ onSuccess }: IuseLoginProps) => {
  return useMutation({
    mutationFn: async (data: any) => await loginAction(data),
    onSuccess,
  });
};
