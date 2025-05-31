import LoadingCardArtikel from '@/components/molecule/LoadingCardArtikel';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function loading() {
  return (
    <div className="border-border  ">
      <div className="animate-pulse space-y-4">
        <Skeleton className="h-[96px] w-full bg-gray-200  " /> {/* FOO */}
        <Skeleton className="h-[20rem] w-full bg-gray-200 " /> {/* header */}
        <div className="mx-5 my-10 space-y-6">
          <Skeleton className="w-[5rem] h-[1.5rem] bg-gray-200 hidden md:block " />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10 md:space-y-0 space-y-10 ">
            <LoadingCardArtikel />
            <LoadingCardArtikel />
            <LoadingCardArtikel />
          </div>
        </div>
      </div>
    </div>
  );
}
