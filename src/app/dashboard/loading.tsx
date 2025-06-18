import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import ProjectCardSkeleton from './features/components/ProjectCardSkeleton';

export default function loading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <Skeleton className="h-8 w-28 bg-muted" />
        <Skeleton className="h-10 w-32 bg-muted" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
