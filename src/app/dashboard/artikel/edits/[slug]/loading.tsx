import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="border-border bg-secondary rounded-2xl p-6">
      <div className="animate-pulse space-y-4">
        <Skeleton className="h-8 bg-gray-200 rounded w-1/3" />
        <Skeleton className="h-6 bg-gray-200 rounded w-full" />
        <Skeleton className="h-6 bg-gray-200 rounded w-full" />
        <Skeleton className="h-6 bg-gray-200 rounded w-full" />
        <Skeleton className="h-6 bg-gray-200 rounded w-full" />
        <Skeleton className="h-6 bg-gray-200 rounded w-full" />
        <Skeleton className="h-6 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
}
