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
  const name = searchParams.get('name');
  const idproject = searchParams.get('id');
  // console.log(idproject);
  return (
    <div className="flex flex-wrap items-center justify-between">
      <h1 className="font-bold text-xl md:text-2xl capitalize">
        Nama Project: {title || name}
      </h1>
      <Link
        href={`/projects/${idproject}/setting`}
        type="button"
        className="gap-1.5 cursor-pointer flex  border border-border  py-2 px-3 rounded-lg bg-white hover:bg-secondary"
      >
        <Settings />
        {titleLink}
      </Link>
    </div>
  );
}
