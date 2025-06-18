import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectCardSkeleton() {
  return (
    <div className="block p-6 bg-white rounded-lg shadow space-y-5 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4 bg-muted" />
        <Skeleton className="h-4 w-full bg-muted" />
      </div>
      <Skeleton className="h-4 w-1/2 bg-muted" />
      <div className="flex items-center justify-between text-sm py-2">
        <Skeleton className="h-4 w-24 bg-muted" />
        <Skeleton className="h-4 w-28 bg-muted" />
      </div>
    </div>
  );
}
