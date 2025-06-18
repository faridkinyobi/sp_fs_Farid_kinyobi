import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function loading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <Skeleton className="h-8 w-28 bg-muted" />
        <Skeleton className="h-10 w-32 bg-muted" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
        <div className="w-full h-full border rounded-lg shadow p-4 flex flex-row bg-secondary justify-between items-center">
          <Skeleton className="h-6 w-32 bg-muted" />
          <Skeleton className="h-8 w-32 bg-muted" />
        </div>
        <div className="w-full h-full border rounded-lg shadow p-4 flex flex-row bg-secondary justify-between items-center">
          <Skeleton className="h-6 w-32 bg-muted" />
          <Skeleton className="h-8 w-32 bg-transparent " />
        </div>
        <div className="w-full h-full border rounded-lg shadow p-4 flex flex-row bg-secondary justify-between items-center">
          <Skeleton className="h-6 w-32 bg-muted" />
          <Skeleton className="h-8 w-32 bg-transparent " />
        </div>
      </div>
    </div>
  );
}
