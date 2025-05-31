'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import FormAtikelClient from './FormAtikelClient';
import { useFetchQueryId } from '../query/useFetchQuery';

export default function ArtikelUpdateClient({ slug }: { slug: string }) {
  const { data: dataById } = useFetchQueryId(slug);

  return (
    <div className="border bg-secondary rounded-2xl">
      <div className=" space-y-6">
        <Link
          href={'/dashboard/artikel'}
          className="flex items-center py-5 border-b border-border px-5 "
        >
          <ArrowLeft />
          Create Articles
        </Link>
        <div className="px-6">
          <FormAtikelClient dataById={dataById} />
        </div>
      </div>
    </div>
  );
}
