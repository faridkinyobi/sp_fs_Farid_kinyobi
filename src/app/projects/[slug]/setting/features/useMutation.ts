import UsersActionServicesGet from '@/lib/actions/auth/services/usersServices';
import settingServiceActionCreat from '@/lib/actions/setting/settingService';
import { IsettingFormValidate } from '@/lib/validations';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useMutationFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await UsersActionServicesGet();
    },
  });
};
type Props = {
  onSuccess: (data: any) => void;
};

export const useMutationAddMember = ({ onSuccess }: Props) => {
  return useMutation({
    mutationFn: async (data: IsettingFormValidate) => {
      return await settingServiceActionCreat(data);
    },
    onSuccess,
  });
};

