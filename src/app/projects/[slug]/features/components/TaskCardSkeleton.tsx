import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TaskCardSkeleton() {
  return (
    <div className="rounded-md p-4 shadow transition space-y-10">
      <div className="space-y-1 w-full">
        <div className="flex flex-row justify-between">
          <Skeleton className="h-5 w-3/4 bg-muted" />
          <div className="flex flex-col justify-center items-center space-y-0.5">
            <Skeleton className="h-1.5 w-1.5 bg-muted rounded-full" />
            <Skeleton className="h-1.5 w-1.5 bg-muted rounded-full" />
            <Skeleton className="h-1.5 w-1.5 bg-muted rounded-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-1/3 bg-muted" />
      </div>
      <div className="flex items-center justify-between text-sm py-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 bg-muted rounded-full" />
          <Skeleton className="h-2 w-10 bg-muted rounded-full" />
        </div>
        <Skeleton className="h-10 w-16 bg-muted" />
      </div>
    </div>
  );
}
