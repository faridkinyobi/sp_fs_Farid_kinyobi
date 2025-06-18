'use client';
import React, { useCallback, useMemo } from 'react';
import { Colume } from './Colume';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMutationEditTask, useMutationFetchTask } from '../useMutation';

const COLUMMES = [
  {
    id: 'todo',
    title: 'todo',
  },
  {
    id: 'in-progress',
    title: 'in-progress',
  },
  {
    id: 'done',
    title: 'done',
  },
];

export default function ListColume() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading, refetch } = useMutationFetchTask({
    id: id ?? undefined,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutationEditTask({
    onSuccess: (res) => {
      if (res.status === 'error') {
        toast.error(res.error.message);
        return;
      }
      refetch();
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousData = queryClient.getQueryData(['tasks']);

      // update data lama dari cache berdasarkan query tesks
      queryClient.setQueryData(['tasks'], (old: any) =>
        old?.map((task: any) =>
          task.id === variables.id
            ? { ...task, status: variables.body.status }
            : task,
        ),
      );

      return { previousData };
    },
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      const taskId = active.id as string;
      const newStatus = over.id as string;

      let task: any = null;
      if (Array.isArray(data)) {
        task = data.find((t: any) => t.id === taskId);
      }
      if (!task) return;

      mutate({
        id: taskId,
        body: {
          ...task,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        },
      });
    },
    [data, mutate],
  );

  const filterTasksByStatus = useMemo(() => {
    const result: Record<string, any[]> = {};
    COLUMMES.forEach((col) => {
      result[col.title] = Array.isArray(data)
        ? data.filter(
            (task: any) =>
              task.status.trim().toLowerCase() ===
              col.title.trim().toLowerCase(),
          )
        : [];
    });
    return result;
  }, [data]);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMMES.map((items) => (
          <Colume
            title={items.title}
            column={items.id}
            key={items.id ?? undefined}
            data={filterTasksByStatus[items.title]}
            isLoading={isLoading}
          />
        ))}
      </DndContext>
    </div>
  );
}
