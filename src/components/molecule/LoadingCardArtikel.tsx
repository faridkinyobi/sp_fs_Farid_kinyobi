import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function LoadingCardArtikel() {
  return (
    <div className="space-y-4 max-w-[335px]  md:max-w-[386.67px] mx-auto">
      {/* img */}
      <Skeleton className="w-full h-[12.5rem] md:h-[15rem] bg-gray-300 rounded-xl" />
      <div className="flex flex-col space-y-4">
        <Skeleton className="w-20 h-[1rem] bg-gray-300 rounded" />
        <Skeleton className="w-[20rem] h-[1rem] bg-gray-300 rounded" />
        <Skeleton className="w-[20rem] h-[1rem] bg-gray-300 rounded" />
        <div className="w-full  flex items-start justify-start space-x-2">
          <Skeleton className="w-[5rem] h-[1.5rem] bg-gray-300 rounded-full" />
          <Skeleton className="w-[5rem] h-[1.5rem] bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
