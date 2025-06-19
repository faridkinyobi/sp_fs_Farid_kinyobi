'use client';
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface HeaderTableProps {
  titleLink?: string;
  title?: string;
}

export function HeaderTask({ titleLink, title }: HeaderTableProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') ?? 'Unknown';
  const idproject = searchParams.get('id') ?? '';

  return (
    <div className="flex flex-wrap items-center justify-between">
      <h1 className="font-bold text-xl md:text-2xl capitalize">
        Nama Project: {title || name}
      </h1>
      {idproject && (
        <Button asChild variant="outline">
          <Link href={`/projects/${idproject}/setting`}>
            <Settings />
            {titleLink}
          </Link>
        </Button>
      )}
    </div>
  );
}
