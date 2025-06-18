import { useMutation, useQuery } from '@tanstack/react-query';

import {
  TaskServiceActionGet,
  TaskServiceActionCreat,
  TaskServiceActionUpdate,
  TaskServiceActionDelet,
} from '@/lib/actions/task/tastServices';
export type IuseTaskProps = {
  onSuccess: (data: any) => void;
  onMutate?: (...args: any[]) => void;
};

export const useMutationTask = ({ onSuccess }: IuseTaskProps) => {
  return useMutation({
    mutationFn: async (data: any) => await TaskServiceActionCreat(data),
    onSuccess,
  });
};
export const useMutationEditTask = ({ onSuccess, onMutate }: IuseTaskProps) => {
  return useMutation({
    mutationFn: async (data: { id: string; body: any }) => {
      const { id, body } = data;
      return await TaskServiceActionUpdate(body, id);
    },
    onSuccess,
    onMutate,
  });
};

export const useMutationFetchTask = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => {
      return await TaskServiceActionGet(id as string);
    },
    enabled: !!id, // id jalan jika tidak false (undefined/null/empty)
  });
};
export const useMutationDeletTask = ({ onSuccess }: IuseTaskProps) => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await TaskServiceActionDelet(id);
    },
    onSuccess,
  });
};
