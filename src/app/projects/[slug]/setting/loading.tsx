import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function loading() {
  return (
    <div className="flex items-center justify-center bg-white md:bg-background">
      <div className=" bg-white py-10 px-4 flex flex-col  items-center justify-center space-y-6 w-[400px] mx-4 md:mx-0  rounded-xl">
        <Skeleton className="h-6 w-32 bg-muted" />
        <div className="w-full space-y-3">
          <Skeleton className="h-4 w-32 bg-muted" />
          <Skeleton className="h-7 w-full bg-muted" />
          <Skeleton className="h-7 w-full bg-muted" />
        </div>

        <div className="w-full flex flex-col items-center space-y-3">
          <Skeleton className="h-7 w-full bg-muted" />

          <Skeleton className="h-5 w-32 bg-muted" />
        </div>
      </div>
    </div>
  );
}
