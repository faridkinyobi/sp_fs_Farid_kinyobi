import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import FormAtikelClient from './FormAtikelClient';
export default function ArtikelCreatClient() {
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
          <FormAtikelClient />
        </div>
      </div>
    </div>
  );
}
