import { useMutation, useQuery } from '@tanstack/react-query';
import { IuseProjectProps } from './types';
import ProjectServiceActionGet, {
  ProjectServiceActionCreat,
  ProjectServiceActionDelet,
  ProjectServiceActionUpdate,
} from '@/lib/actions/project/ProjectService';
import { IprojectFormValidate } from '@/lib/validations';

export const useMutationProject = ({ onSuccess }: IuseProjectProps) => {
  return useMutation({
    mutationFn: async (data: any) => await ProjectServiceActionCreat(data),
    onSuccess,
  });
};

export const useMutationEditProject = ({ onSuccess }: IuseProjectProps) => {
  return useMutation({
    mutationFn: async (data: { id: string; body: IprojectFormValidate }) => {
      const { id, body } = data;
      return await ProjectServiceActionUpdate(body, id);
    },
    onSuccess,
  });
};

export const useMutationDeletProject = ({ onSuccess }: IuseProjectProps) => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ProjectServiceActionDelet(id);
    },
    onSuccess,
  });
};

export const useMutationFetchProject = () => {
  return useQuery({
    queryKey: ['projects Fetch'],
    queryFn: async () => await ProjectServiceActionGet(),
    placeholderData: [],
  });
};
