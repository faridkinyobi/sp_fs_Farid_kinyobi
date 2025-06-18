import { useMutation } from '@tanstack/react-query';
import registerAction from '../../../lib/actions/auth/services/register';

export type IuseRegisterProps = {
  onSuccess: (data: any) => void;
};
export const useMutationRegister = ({ onSuccess }: IuseRegisterProps) => {
  return useMutation({
    mutationFn: async (data: any) => await registerAction(data),
    onSuccess,
  });
};
