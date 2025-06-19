'use client';
import React, { useCallback } from 'react';
import { useMutationFetchProject } from '../useMutation';
import ProjectCardSkeleton from './ProjectCardSkeleton';

import { CardProject } from './CardProject';
import { DialogProjectModal } from './DialogProdcut';
import { ProviderContext } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function ListProject() {
  const { data, isLoading } = useMutationFetchProject();
  const router = useRouter();

  // context
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { setOpen, open, setId } = context;

  const handleShowEdit = useCallback(
    (data: any) => {
      setId(data);
      setOpen((prev: typeof open) => ({
        ...prev,
        project: !prev.project,
      }));
    },
    [setId, setOpen],
  );

  const handleSLug = React.useCallback(
    ({ id, name }: { id: string | undefined; name: string }) => {
      const push = router.push(`/projects/id?id=${id}&name=${name}`);
      return push;
    },
    [router],
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))
        : Array.isArray(data) &&
          data.map((items) => (
            <CardProject
              {...items}
              key={items.id}
              onCardClik={handleSLug}
              handleShowEdit={handleShowEdit}
              createdAt={
                items.createdAt instanceof Date
                  ? items.createdAt.toISOString()
                  : String(items.createdAt)
              }
            />
          ))}
    </div>
  );
}
